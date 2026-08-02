import Link from "next/link";
import { notFound } from "next/navigation";
import { allCases, getCaseById } from "@/data/cases";
import { CaseGame } from "@/components/CaseGame";

export function generateStaticParams() {
  return allCases.map((c) => ({ caseId: c.id }));
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const caseData = getCaseById(caseId);

  if (!caseData) {
    notFound();
  }

  if (!caseData.available) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center py-24">
        <p className="text-4xl mb-4">🔒</p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">
          Bu Dosya Henüz Açılmadı
        </h1>
        <p className="text-text-dim max-w-sm mb-6">
          {caseData.title} yakında açılacak. Şimdilik oynanabilir vakaya göz atabilirsin.
        </p>
        <Link
          href="/"
          className="inline-block rounded-sm bg-accent-gold text-black px-6 py-3 font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity"
        >
          Vaka Seçimine Dön
        </Link>
      </main>
    );
  }

  return <CaseGame data={caseData} />;
}
