import { ConfigSection } from "@/globals";
import Debugger from "./debugger";

type GenerateEndpointParams = Pick<ConfigSection.URLParams, "endpoint">;
type GenerateHeaderParams = Omit<ConfigSection.HeaderParams, "method"> & Pick<ConfigSection.AuthParams, "accessToken">;
type GenerateURLParams = ConfigSection.URLParams;

class Generator {
  private constructor() {}

  private static generateEndpoint(generateEndpointParams: GenerateEndpointParams): string {
    let endpoint: string = "";
    if (typeof generateEndpointParams.endpoint === "object") {
      Object.entries(generateEndpointParams.endpoint).forEach(([key, value]) => {
        if (typeof value !== "string") {
          Debugger.error(this.generateEndpoint.name, `Expected value for key "${key}" to be typeof 'string'.`);
        }
        const sanitizedValue = value.replace(/^\/|\/$/g, "");
        endpoint += `/${sanitizedValue}`;
      });
      Debugger.log(this.generateEndpoint.name, `Generating endpoint from object: ${JSON.stringify(endpoint)}`);
      return endpoint;
    }
    endpoint = "/" + generateEndpointParams.endpoint.replace(/^\/|\/$/g, "");
    Debugger.log(this.generateEndpoint.name, `Generating endpoint from string: ${JSON.stringify(endpoint)}`);
    return endpoint;
  }

  public static generateHeaders(generateHeaderParams: GenerateHeaderParams): object {
    Debugger.log(this.generateHeaders.name, "Generating headers...");
    const generatedHeaders = {
      ...generateHeaderParams.customHeaders,
      "Content-Type": generateHeaderParams.contentType,
      ...(generateHeaderParams.accessToken && {
        Authorization: `Bearer ${generateHeaderParams.accessToken}`,
      }),
      ...(generateHeaderParams.responseLang && { "Accept-Language": generateHeaderParams.responseLang }),
    };
    Debugger.log(this.generateHeaders.name, `Generating headers: ${JSON.stringify(generatedHeaders)}`);
    return generatedHeaders;
  }

  public static generateURL(generateURLParams: GenerateURLParams): string {
    const urlString: string = `${generateURLParams.protocol}://${generateURLParams.baseURL}${generateURLParams.port ? `:${generateURLParams.port}` : ""}`;
    const endpointString: string = this.generateEndpoint({ endpoint: generateURLParams.endpoint });
    const queryString: string = generateURLParams.query
      ? `?${new URLSearchParams(generateURLParams.query).toString()}`
      : "";

    const generatedURL: string = `${urlString}${endpointString}${queryString}`;
    Debugger.log(this.generateURL.name, `Generated request URL: ${generatedURL}`);
    return generatedURL;
  }
}

export default Generator;
