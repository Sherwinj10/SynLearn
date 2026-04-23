import { notFound } from "next/navigation";
import { getSyndromeBySlug, SYNDROME_CONTENT } from "@/lib/syndromeContent";
import { SyndromeDetailPage } from "@/components/SyndromeDetailPage";

export function generateStaticParams() {
  return SYNDROME_CONTENT.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSyndromeBySlug(slug);
  if (!s) return { title: "Not Found" };
  return {
    title: `${s.name} | SynLearn`,
    description: s.subtitle,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const syndrome = getSyndromeBySlug(slug);
  if (!syndrome) notFound();
  return <SyndromeDetailPage syndrome={syndrome} />;
}
