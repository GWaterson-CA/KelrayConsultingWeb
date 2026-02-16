import { Badge } from "@/components/ui/badge";

type SectionHeadingProps = {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ badge, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {badge ? <Badge className="mb-3 w-fit">{badge}</Badge> : null}
      <h2 className="text-balance text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-lg text-slate-300">{description}</p> : null}
    </div>
  );
}
