import ContentCard from "./content-card";

export default function SectionCard({ title, description, children }) {
  return (
    <ContentCard>
      <div className="mb-6">
        <h3 className="font-semibold text-lg">{title}</h3>

        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      {children}
    </ContentCard>
  );
}
