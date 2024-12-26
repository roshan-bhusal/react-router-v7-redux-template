import React from "react";

/**
 * This is our HomePage component within the 'home' feature.
 * Eventually, you'll import custom hooks, helpers, and types
 * from the sibling folders (hooks, helpers, types).
 */
export function HomePage() {
  return (
    <main className="flex bg-bg flex-col items-center  justify-center min-h-screen py-8 px-4">
      <h1 className="text-4xl font-bold text-primary ">Home Feature</h1>
      <p className="text-lg mt-4 max-w-xl text-primary">
        This is the new HomePage component in our feature-based structure.
      </p>
    </main>
  );
}

export default HomePage;
