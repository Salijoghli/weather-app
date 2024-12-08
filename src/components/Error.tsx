type ErrorProps = {
  error: Error;
};
export const ErrorComponent = ({ error }: ErrorProps) => {
  return (
    <div className="py-10 text-center text-red-500">
      <p>Error: {error.message}</p>
      <p>Please try searching for another city.</p>
    </div>
  );
};
