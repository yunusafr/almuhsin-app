export default function SectionHeading({ badge, title, description }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {badge && (
        <span className="inline-block rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-400">
          {badge}
        </span>
      )}

      <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 lg:text-4xl dark:text-white">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}
