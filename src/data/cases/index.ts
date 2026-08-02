import type { CaseData } from "@/types/case";
import { vaka01 } from "./vaka-01-yildiz-ekspresi";

export const allCases: CaseData[] = [vaka01].sort((a, b) => a.order - b.order);

export function getCaseById(id: string): CaseData | undefined {
  return allCases.find((c) => c.id === id);
}
