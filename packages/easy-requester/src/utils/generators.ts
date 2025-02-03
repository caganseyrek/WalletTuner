import { type RequesterInternals } from "@/globals";
import Debugger from "./debugger";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace GeneratorInternals {
  /**
   * Parameters for generating headers.
   * Omits the method because method is not needed for internally generated headers by the requester.
   * Omits the generatedHeaders parameter because the generator loops the given values
   * and omitted value is only needed for holding the generated value from the generator
   */
  type GenerateHeaderParams = Omit<Omit<RequesterInternals.RequestHeaderParams, "method">, "generatedHeaders"> &
    /**
     * For adding bearer token to the Authorization header
     */
    Pick<RequesterInternals.RequestAuthParams, "accessToken">;
  type GenerateEndpointFromObjectParams = Pick<RequesterInternals.RequestURLParams, "endpoint">;
  type GenerateURLParams = RequesterInternals.RequestURLParams;
}

/**
 * Utility class for generating headers, endpoints, and URLs.
 */
class Generators {
  /**
   * Generates HTTP headers based on the provided parameters.
   * @param {GeneratorInternals.GenerateHeaderParams} GenerateHeaderParams - The parameters for generating the headers.
   * @returns {object} The generated headers object.
   */
  public static generateHeaders(GenerateHeaderParams: GeneratorInternals.GenerateHeaderParams): object {
    Debugger.log(this.generateHeaders.name, "Generating headers...");
    const generatedHeaders = {
      ...GenerateHeaderParams.customHeaders,
      "Content-Type": GenerateHeaderParams.contentType,
      ...(GenerateHeaderParams.accessToken && {
        Authorization: `Bearer ${GenerateHeaderParams.accessToken}`,
      }),
      ...(GenerateHeaderParams.responseLang && { "Accept-Language": GenerateHeaderParams.responseLang }),
    };
    Debugger.log(this.generateHeaders.name, `Generating headers: ${JSON.stringify(generatedHeaders)}`);
    return generatedHeaders;
  }

  /**
   * Generates an endpoint string from the provided object or string.
   * @param {GeneratorInternals.GenerateEndpointFromObjectParams} generateEndpointFromObjectParams - The parameters for generating the endpoint.
   * @returns {string} The generated endpoint string.
   */
  public static generateEndpointFromObject(
    generateEndpointFromObjectParams: GeneratorInternals.GenerateEndpointFromObjectParams,
  ): string {
    let generatedEndpoint: string = "";

    Debugger.log(this.generateEndpointFromObject.name, "Generating endpoint...");
    if (typeof generateEndpointFromObjectParams.endpoint === "object") {
      Object.entries(generateEndpointFromObjectParams.endpoint).forEach(([key, value]) => {
        if (typeof value !== "string") {
          Debugger.error(
            this.generateEndpointFromObject.name,
            `Expected value for key "${key}" to be typeof 'string'.`,
          );
        }
        const sanitizedValue = value.replace(/^\/|\/$/g, "");
        generatedEndpoint += `/${sanitizedValue}`;
      });
      Debugger.log(
        this.generateEndpointFromObject.name,
        `Generating endpoint from object: ${JSON.stringify(generatedEndpoint)}`,
      );
      return generatedEndpoint;
    }
    generatedEndpoint = "/" + generateEndpointFromObjectParams.endpoint.replace(/^\/|\/$/g, "");
    Debugger.log(
      this.generateEndpointFromObject.name,
      `Generating endpoint from string: ${JSON.stringify(generatedEndpoint)}`,
    );
    return generatedEndpoint;
  }

  /**
   * Generates a full URL from the provided parameters.
   * @param {GeneratorInternals.GenerateURLParams} generateURLParams - The parameters for generating the URL.
   * @returns {string} The generated URL string.
   */
  public static generateURL(generateURLParams: GeneratorInternals.GenerateURLParams): string {
    Debugger.log(this.generateURL.name, "Generating request URL...");
    const urlString: string = `${generateURLParams.protocol}://${generateURLParams.baseURL}${
      generateURLParams.port ? `:${generateURLParams.port}` : ""
    }`;
    const endpointString: string = this.generateEndpointFromObject({ endpoint: generateURLParams.endpoint });
    const queryString: string = generateURLParams.query
      ? `?${new URLSearchParams(generateURLParams.query).toString()}`
      : "";

    const generatedURL: string = `${urlString}${endpointString}${queryString}`;
    Debugger.log(this.generateURL.name, `Generated request URL: ${generatedURL}`);
    return generatedURL;
  }
}

export default Generators;
