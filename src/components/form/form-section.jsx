export default function FormSection({
  title,
  description,
  children,
  className = "",
}) {
  return (
    <section
      className={`rounded-3xl border bg-card p-6 shadow-sm ${className}`}
    >
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h3 className="text-lg font-semibold">
              {title}
            </h3>
          )}

          {description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}

      {children}
    </section>
  );
}