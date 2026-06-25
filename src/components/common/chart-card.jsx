import ContentCard from "./content-card";

export default function ChartCard({ title, children }) {
  return (
    <ContentCard>
      <div className="mb-6">
        <h3 className="font-semibold">{title}</h3>
      </div>

      {children}
    </ContentCard>
  );
}
