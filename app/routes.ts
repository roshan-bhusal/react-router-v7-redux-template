// app/routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"), // Home route (root/index route it will be SSR)
  route("test", "routes/test.tsx"), // Test  route it will be CSR
] satisfies RouteConfig;
