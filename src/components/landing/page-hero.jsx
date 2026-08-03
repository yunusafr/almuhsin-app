export default function PageHero({ badge, title, description }) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50 pb-16 pt-36 dark:border-slate-800 dark:bg-slate-950">
      {/* Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-green-600/15 blur-[160px]" />
        <div className="absolute -right-32 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        {badge && (
          <span className="inline-block rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-300">
            {badge}
          </span>
        )}

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-5xl">
          {title}
        </h1>

        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
