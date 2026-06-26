export default function FormSection({ title, description, children }) {
  return (
    <div className="p-6 border-b last:border-b-0">
      <div className="mb-6">
        <h3 className="font-semibold text-lg">{title}</h3>

        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      {children}
    </div>
  );
}
