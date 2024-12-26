# **React + Vite + TS + Tailwind + Redux (Dynamic Slices) + React Query + Partial SSR + Logging + Docker + PM2**

A **feature-based** React 19 + Vite template using **TypeScript**, **Redux Toolkit** (dynamic slices), **React Query**, **Tailwind** (custom theming), partial **SSR**, **role-based routing**, **logging**, and a **Docker + PM2** production setup. Ideal for **scalable**, **modular**, and **future-proof** applications.

---

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Folder Structure](#folder-structure)
4. [How to Use - Step by Step](#how-to-use---step-by-step)
   - [Setup & Installation](#setup--installation)
   - [Development Workflow](#development-workflow)
   - [Environment Variables](#environment-variables)
   - [How to Use Redux](#how-to-use-redux)
   - [How to Use React Query](#how-to-use-react-query)
   - [How to Use Logging](#how-to-use-logging)
   - [Partial SSR & Role-Based Routes](#partial-ssr--role-based-routes)
5. [Building & Production](#building--production)
6. [Docker & PM2 Setup](#docker--pm2-setup)
7. [FAQ / Troubleshooting](#faq--troubleshooting)
8. [Testing & Future Enhancements](#testing--future-enhancements)
9. [Contributing](#contributing)
10. [License](#license)

---

## **Project Overview**

This template empowers you to:

- Spin up a **React 19 + Vite** application with **TypeScript**.
- Use **Redux Toolkit** with **dynamic reducer injection** to keep your store modular.
- Incorporate **React Query** for caching and asynchronous data handling.
- Style with **Tailwind** but only with custom color tokens (no default palette).
- Optionally enable **SSR** on certain routes (via React Router v7’s file-based approach).
- Enforce **role-based routing** (e.g., `admin`, `manager`, `guest`) using SSR loaders or a client hook.
- Log messages consistently using a **logging system** that can adapt for dev or production.
- Containerize with **Docker** for consistent deployments, optionally managed by **PM2** if you have a Node-based server or SSR.

---

## **Key Features**

1. **Dynamic Redux Slices** – Increases scalability by loading only the slices you need on demand.
2. **React Query** – Provides robust data caching, re-fetching, and error handling.
3. **Feature-Based Structure** – Each feature has its own folder, maintaining **separation of concerns**.
4. **Tailwind Custom Theme** – No default color palette, purely brand-based.
5. **Partial SSR** – Use SSR for some routes or skip it for client-only pages.
6. **Role-Based Routing** – SSR or CSR approach to enforce user roles and permissions.
7. **Central Logging** – A single logger that logs info, warn, and error with consistent formatting.
8. **Docker + PM2** – Multi-stage Dockerfile for production builds, with PM2 to manage server processes if needed.

---

## **Folder Structure**

A recommended layout (adapt or rename as you see fit):

```
.
├── app
│   ├── app.css               # Tailwind directives + custom theme variables
│   ├── root.tsx              # Main entry (Provider, QueryClientProvider, etc.)
│   ├── routes
│   │   ├── home.tsx          # SSR or partial SSR route (example)
│   │   ├── test.tsx          # Another route
│   │   └── +types            # (Optional) route-based type definitions
│   ├── store
│   │   └── store.ts          # Central store + dynamic injection
│   ├── features
│   │   ├── auth
│   │   │   ├── authSlice.ts
│   │   │   ├── hooks
│   │   │   │   └── useAuthCheck.ts
│   │   │   ├── ssrAuth.ts
│   │   │   └── types
│   │   ├── home
│   │   │   ├── store
│   │   │   │   └── homeSlice.ts
│   │   │   ├── pages
│   │   │   │   └── HomePage.tsx
│   │   │   └── hooks
│   │   └── test
│   │       ├── testSlice.ts
│   │       ├── pages
│   │       │   └── TestPage.tsx
│   │       └── hooks
│   └── common
│       ├── logging
│       │   └── logger.ts
│       ├── api
│       │   ├── httpClient.ts
│       │   ├── queryClient.ts
│       │   └── hooks
│       │       └── useGenericQuery.ts (optional)
├── .env.example
├── Dockerfile
├── package.json
├── README.md
└── vite.config.ts
```

---

## **How to Use - Step by Step**

### **Setup & Installation**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-org/this-template.git
   cd this-template
   ```
2. **Install Dependencies**
   ```bash
   npm ci
   ```
3. **Copy & Configure Env**

   - `cp .env.example .env`
   - Adjust your variables like `VITE_API_URL`, `JWT_SECRET`, etc.

4. **Start Dev Server**
   ```bash
   npm run dev
   ```
   - Visit [http://localhost:5173](http://localhost:5173).

### **Development Workflow**

- **Hot Reloading** with Vite: edits in `.tsx` or `.ts` instantly reflect.
- **Type Checking**: `npm run typecheck`.
- **Build**: `npm run build` (outputs a production bundle or SSR build).
- **Start**: `npm run start` for a Node server or static serving (depending on your setup).

### **Environment Variables**

- Use `import.meta.env.VITE_*` to access client-side variables in React.
- For SSR or Node code, use `process.env.*`.
- Example keys in `.env.example`:
  ```bash
  NODE_ENV=development
  PORT=3000
  VITE_API_URL=https://api.example.com
  JWT_SECRET=change_me
  ```

---

### **How to Use Redux**

1. **Static vs. Dynamic Slices**

   - **Static**: Some reducers (e.g., `auth`) are always in `store.ts`:
     ```ts
     const staticReducers = { auth: authReducer };
     ```
   - **Dynamic**: For a feature slice, only inject it when a user visits that feature.

2. **Create a Slice** (example in `app/features/test/testSlice.ts`):

   ```ts
   import { createSlice, PayloadAction } from "@reduxjs/toolkit";

   interface TestState {
     value: number;
   }
   const initialState: TestState = { value: 0 };

   const testSlice = createSlice({
     name: "test",
     initialState,
     reducers: {
       increment: (state) => {
         state.value += 1;
       },
       setValue: (state, action: PayloadAction<number>) => {
         state.value = action.payload;
       },
     },
   });

   export const { increment, setValue } = testSlice.actions;
   export default testSlice.reducer;
   ```

3. **Inject the Slice** in your component or route:

   ```ts
   import { useEffect } from "react";
   import testReducer from "../testSlice";
   import { injectReducer } from "../../../store/store";

   export function useTestSliceInit() {
     useEffect(() => {
       injectReducer("test", testReducer);
     }, []);
   }
   ```

4. **Dispatch & Select** data:

   ```tsx
   import { useSelector, useDispatch } from "react-redux";
   import { increment, setValue } from "../testSlice";
   import { RootState } from "../../../store/store";

   const value = useSelector((state: RootState) => state.test?.value);
   const dispatch = useDispatch();

   dispatch(increment());
   dispatch(setValue(10));
   ```

**Result**: You only load the `test` slice when it’s needed, keeping your store lean.

---

### **How to Use React Query**

1. **Setup**:

   - In `root.tsx`:

     ```tsx
     import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

     const queryClient = new QueryClient();
     function App() {
       return (
         <Provider store={store}>
           <QueryClientProvider client={queryClient}>
             <Outlet />
           </QueryClientProvider>
         </Provider>
       );
     }
     export default App;
     ```

2. **Create a Hook**:

   ```ts
   import { useQuery } from "@tanstack/react-query";

   async function fetchSomething() {
     const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
     if (!res.ok) throw new Error("Network error");
     return res.json();
   }

   export function useFetchPost() {
     return useQuery({
       queryKey: ["post", 1],
       queryFn: fetchSomething,
     });
   }
   ```

3. **Use the Hook**:

   ```tsx
   // In a page/component
   const { data, isLoading, error } = useFetchPost();
   if (isLoading) return <p>Loading...</p>;
   if (error) return <p>Error: {String(error)}</p>;
   return <p>Title: {data?.title}</p>;
   ```

4. **Advantages**:
   - Auto Caching
   - Stale/Refetch logic
   - Built-in error & loading states.

---

### **How to Use Logging**

1. **Import the Logger**:

   ```ts
   import { logger } from "app/common/logging/logger";
   logger.info("Test message", {
     title: "Optional Title",
     detail: { foo: "bar" },
   });
   ```

2. **Available Methods**:

   - `logger.info(msg, options?)`
   - `logger.warn(msg, options?)`
   - `logger.error(msg, options?)`

3. **Extending**:
   - In production, route logs to an API or file-based logging if SSR is active.

---

### **Partial SSR & Role-Based Routes**

1. **Mark a Route as SSR**:

   - In `react-router.config.ts`, `ssr: true` by default.
   - Or set `export const ssr = false;` in a route file to skip SSR.

2. **Role Checks**:

   - **SSR** in route loader:
     ```ts
     export async function loader({ request }: LoaderArgs) {
       const user = decodeCookieJWT(request.headers.get("Cookie"));
       if (!user || user.role !== "admin") {
         throw new Response("Forbidden", { status: 403 });
       }
       return null;
     }
     ```
   - **CSR** in a hook:
     ```ts
     const { isAuthorized } = useAuthCheck({ requiredRoles: ["admin"] });
     if (!isAuthorized) return <p>Forbidden</p>;
     ```

3. **Error Boundaries**:
   - SSR: route-based `ErrorBoundary` catches thrown `Response(403)`.
   - CSR: throw new Error("Forbidden") or handle in your component.

---

## **Building & Production**

1. **Build**:

   ```bash
   npm run build
   ```

   - Outputs optimized files (CSR or SSR build).

2. **Start**:

   ```bash
   npm run start
   ```

   - Typically used if you have an SSR Node server or a static server.

3. **Production Config**:
   - Ensure `NODE_ENV=production` and other env variables are set.

---

## **Docker & PM2 Setup**

1. **Dockerfile** (Multi-stage example):

   ```dockerfile
   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM node:20-alpine
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm ci --omit=dev
   RUN npm install -g pm2
   COPY --from=builder /app/build /app/build
   EXPOSE 3000
   CMD ["pm2-runtime", "build/server/index.js"]
   ```

2. **Run Docker**:

   ```bash
   docker build -t my-react-app .
   docker run -p 3000:3000 my-react-app
   ```

3. **PM2**:
   - `pm2-runtime` manages your Node process (especially if SSR).
   - If purely static, you can use Nginx or another approach.

---

## **FAQ / Troubleshooting**

1. **Property 'test' Does Not Exist**

   - The `test` slice might not be injected or your TypeScript definitions need an optional property in `RootState`.

2. **RemoveChild Node Error (Hydration)**

   - SSR mismatch. Possibly disable SSR for that route or ensure server & client produce identical HTML at first render.

3. **No Overload Matches This Call (React Query)**

   - Use the object signature:
     ```ts
     useQuery({ queryKey: ["key"], queryFn });
     ```

4. **Docker Build Too Large**
   - Verify multi-stage build.
   - Omit dev dependencies in the final stage.

---

## **Testing & Future Enhancements**

- **Jest/React Testing Library** for unit/integration testing.
- **ESLint & Prettier** for code style enforcement.
- **CI/CD** with GitHub Actions or GitLab CI to automate build, test, Docker push.
- **Advanced SSR** with streaming or advanced data hydration.
- **External Logging** (e.g., Sentry, Datadog).

---

## **Contributing**

1. **Fork** this repository.
2. **Create a feature branch** (`feat/new-feature`).
3. **Commit** with clear messages.
4. **Open a Pull Request** referencing any relevant issues.
5. **Wait for Review** and approval.

---

## **License**

This project is provided under the [MIT License](https://opensource.org/licenses/MIT).
