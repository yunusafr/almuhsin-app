import { useCountUp } from "@/hooks/use-count-up";

function formatValue(value, decimals) {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export default function AnimatedStat({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration,
}) {
  const numeric = typeof value === "number" && Number.isFinite(value);

  const { ref, value: animated } = useCountUp(numeric ? value : 0, {
    duration,
    enabled: numeric,
  });

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {numeric ? formatValue(animated, decimals) : value}
      {suffix}
    </span>
  );
}
