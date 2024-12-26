// app/features/test/useTestSliceInit.ts
import { useEffect } from "react";
import testReducer from "./testSlice";
import { injectReducer } from "../../store/store"; // <-- adjust path if needed

/**
 * This hook injects the test reducer into the store
 * exactly once (on mount).
 */
export function useTestSliceInit() {
  useEffect(() => {
    injectReducer("test", testReducer);
  }, []);
}
