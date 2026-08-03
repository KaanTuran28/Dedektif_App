/**
 * "Şifreli Kayıt" bulmacası için saf yardımcı fonksiyonlar.
 * Kodlama şeması: ters-çevrilmiş(base64(düz metin)) — oyuncu ham metni
 * doğrudan bir base64 çözücüye yapıştırırsa geçersiz/bozuk çıktı alır,
 * çünkü karakter sırası ters. Bu "ayna" fikrinin nasıl fark edileceği
 * vaka içeriğinde flavor-text bir ipucuyla anlatılır — burada değil.
 */

/** İçerik yazarken (dev-time) kullanılan, vaka verisine gömülecek
 * şifreli metni üretir. Türkçe karakterler dahil UTF-8 güvenli. */
export function encodeMirrorBase64(plain: string): string {
  const base64 =
    typeof window === "undefined"
      ? Buffer.from(plain, "utf8").toString("base64")
      : window.btoa(unescape(encodeURIComponent(plain)));
  return base64.split("").reverse().join("");
}

/** Oyuncunun girdiği cevabı beklenen çözümle karşılaştırmak için normalize eder:
 * kırpma, Türkçe-duyarlı küçük harfe çevirme, iç boşlukları teke indirme,
 * noktalama işaretlerini yok sayma. */
export function normalizeAnswer(s: string): string {
  return s
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/[.,!?;:'"()\-_/\\]/g, "")
    .replace(/\s+/g, " ");
}

export function answersMatch(input: string, expected: string): boolean {
  return normalizeAnswer(input) === normalizeAnswer(expected);
}

/** kilitli_kasa (kombinasyon kilidi) karşılaştırması — rakam olmayan her şeyi
 * yok sayar, böylece "1-4-7" ya da "147" fark etmeksizin kabul edilir. */
export function digitsMatch(input: string, expected: string): boolean {
  const onlyDigits = (s: string) => s.replace(/\D/g, "");
  const a = onlyDigits(input);
  const b = onlyDigits(expected);
  return a.length > 0 && a === b;
}
