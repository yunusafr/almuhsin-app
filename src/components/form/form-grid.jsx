export default function FormGrid({ children, cols = 2 }) {
  const gridCols = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  return <div className={`grid gap-5 ${gridCols[cols]}`}>{children}</div>;
}
