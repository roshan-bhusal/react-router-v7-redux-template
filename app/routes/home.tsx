import { store, injectReducer } from "../store/store";
import homeReducer, { setMessage } from "../features/home/store/homeSlice";
import {
  parseJWTFromRequest,
  verifyRolesAndPermissions,
} from "../features/auth/ssrAuth";
import type { Route } from "./+types/home";
/* 
  1) This loader runs on the server (and client if navigated to client-side).
     We can inject the home reducer on the server to ensure SSR has the slice. 
     Then we dispatch any actions we need for pre-rendering.
*/
export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie") || "";
  const jwtPayload = await parseJWTFromRequest(cookieHeader);
  // 2) If no JWT or invalid, redirect or throw 401
  if (!jwtPayload) {
    throw new Response("Unauthorized", { status: 401 });
  }

  // 3) Check minimum role/permission. In this example, we just require a valid user
  const hasAccess = verifyRolesAndPermissions(jwtPayload, {
    requiredRoles: ["superadmin"], // No specific role needed, just not empty
    requiredPermissions: ["edit:user"], // No specific permission needed
  });

  if (!hasAccess) {
    throw new Response("Forbidden", { status: 403 });
  }
  // Inject the reducer on the server
  injectReducer("home", homeReducer);

  // Optionally, set some server-side data
  store.dispatch(setMessage("Hello from the SSR loader for Home!"));

  return null; // or return data
}

export function meta() {
  return [
    { title: "Home (SSR)" },
    { name: "description", content: "This route is server-side rendered." },
  ];
}

export default function Home() {
  // The slice is already injected, so we can read from Redux
  // or run further queries in the client if needed.
  return (
    <main className="p-4">
      <h1 className="text-primary text-2xl">SSR Home</h1>
      <p className="text-secondary mt-2">
        Data loaded on the server. Open DevTools to see the SSR state.
      </p>
    </main>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = "Something went wrong!";

  if (error instanceof Response) {
    if (error.status === 401) {
      message = "Unauthorized: Please log in.";
    } else if (error.status === 403) {
      message = "Forbidden: You do not have access.";
    }
    return (
      <main className="p-4 text-red-500">
        <h1>Error {error.status}</h1>
        <p>{message}</p>
      </main>
    );
  }

  // other error fallback
  return (
    <main className="p-4 text-red-500">
      <h1>Oops!</h1>
      <p>{String(error)}</p>
    </main>
  );
}
