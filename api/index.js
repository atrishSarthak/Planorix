import { createRequestHandler } from "@react-router/node";

// @ts-ignore
import * as build from "../build/server/index.js";

export default createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});
