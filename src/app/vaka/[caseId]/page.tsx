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

  return <CaseGame data={caseData} />;
}
