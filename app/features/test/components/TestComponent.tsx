import { useFetchSomething } from "../hooks/useFetchSomething";

const TestComponent = () => {
  const { data, isLoading, error } = useFetchSomething();

  if (isLoading) return <p>Loading data...</p>;
  if (error)
    return <p className="text-red-500">Error: {String(error.message)}</p>;

  return (
    <div>
      <h3>Fetched Title: {data?.title}</h3>
      <h3>Fetched Title: {data?.body}</h3>
    </div>
  );
};

export default TestComponent;
