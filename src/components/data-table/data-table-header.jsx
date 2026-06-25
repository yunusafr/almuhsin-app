export default function DataTableHeader({
  title,
  description,
  search,
  actions,
}) {
  return (
    <div className="flex items-center justify-between p-6 border-b">
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex items-center gap-2">
        {search}
        {actions}
      </div>
    </div>
  );
}
