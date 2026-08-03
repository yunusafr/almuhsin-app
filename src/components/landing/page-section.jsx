export default function PageSection({ title, description, children, className }) {
  return (
    <section className={className}>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-3xl">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-3xl leading-8 text-muted-foreground">
          {description}
        </p>
      )}

      {children && <div className="mt-8">{children}</div>}
    </section>
  );
}
