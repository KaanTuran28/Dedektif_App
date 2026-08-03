import type { CaseData } from "@/types/case";
import { vaka01 } from "./vaka-01-yildiz-ekspresi";
import { vaka02 } from "./vaka-02-son-round";
import { vaka03 } from "./vaka-03-zumrut-yali";
import { vaka04 } from "./vaka-04-perde-arkasi";

export const allCases: CaseData[] = [vaka01, vaka02, vaka03, vaka04].sort((a, b) => a.order - b.order);

export function getCaseById(id: string): CaseData | undefined {
  return allCases.find((c) => c.id === id);
}
