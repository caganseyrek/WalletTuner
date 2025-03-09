import { HelmetOptions } from "helmet";

import config from "../config";

const HELMET_OPTIONS: HelmetOptions = {
  xPoweredBy: false,
  crossOriginResourcePolicy: { policy: "same-origin" },
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginEmbedderPolicy: { policy: "require-corp" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ['"self"', `'${config.CLIENT_URL}'`],
      scriptSrc: ["'self'", `'${config.CLIENT_URL}'`],
      imgSrc: ["'self'", `'${config.CLIENT_URL}'`],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: "true",
      blockAllMixedContent: "true",
    },
  },
  hsts: {
    includeSubDomains: true,
    preload: true,
  },
  xFrameOptions: { action: "deny" },
  dnsPrefetchControl: { allow: false },
  noSniff: true,
};

export default HELMET_OPTIONS;
