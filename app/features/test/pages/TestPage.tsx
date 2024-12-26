// app/features/test/pages/TestPage.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/store";
import { increment, setMessage } from "../testSlice";
import { useTestSliceInit } from "../useTestSliceInit";
import { useAuthCheck } from "../../auth/hooks/useAuthCheck";
import TestComponent from "../components/TestComponent";

interface RootStateWithTest extends RootState {
  test?: {
    value: number;
    message: string;
  };
}
const defaultTestState = { value: 0, message: "No data" };

export default function TestPage() {
  useTestSliceInit(); // inject test slice if not present

  const dispatch = useDispatch();

  // Provide stable fallback
  const testState =
    useSelector((state: RootStateWithTest) => state.test) || defaultTestState;
  const { value, message } = testState;

  const { isAuthorized, isLoading } = useAuthCheck({
    requiredRoles: [], // e.g. ["manager"]
    requiredPermissions: [], // e.g. ["read:report"]
  });

  if (isLoading) {
    return <div>Verifying access...</div>;
  }
  if (!isAuthorized) {
    return (
      <div className="text-red-500">You are not authorized for this route.</div>
    );
  }

  return (
    <main className="p-4 flex flex-col gap-4">
      <h2 className="text-primary text-xl font-bold">Test Feature</h2>
      <div className="bg-card p-4 rounded shadow-sm">
        <p className="text-secondary">
          Current value: <strong>{value}</strong>
        </p>
        <p className="mt-2 text-accent">
          Message: <em>{message}</em>
        </p>
      </div>

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => dispatch(increment())}
          className="bg-primary text-bg py-2 px-4 rounded"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(setMessage("Updated from Test Feature!"))}
          className="bg-secondary text-bg py-2 px-4 rounded"
        >
          Set Message
        </button>
      </div>
      <TestComponent />
    </main>
  );
}
