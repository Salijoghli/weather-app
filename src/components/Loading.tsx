export const Loading = () => {
  return (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center bg-[rgba(0,0,0,0.5)]"
      style={{ borderColor: "#000 transparent #555 transparent" }}
    >
      <div className="w-16 h-16 border-8 rounded-full animate-spin" />
    </div>
  );
};
