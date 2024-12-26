// app/routes/+types/test.d.ts
import type { MetaFunction } from "@react-router/dev";

export declare namespace Route {
  // Define the arguments passed to the meta function (extend as needed)
  export interface MetaArgs {
    params?: Record<string, string>; // Parameters from the route
    location?: { pathname: string }; // The current path
  }

  // Type alias for the meta function
  export type MetaFunction = MetaFunction;
}
