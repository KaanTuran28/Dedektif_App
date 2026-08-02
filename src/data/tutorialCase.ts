import type { CaseData } from "@/types/case";

/** Gerçek bir vakanın minyatür kopyası — sadece "Nasıl Oynanır?" akışında
 * kullanılır, ana sayfada listelenmez, ilerleme/istatistiklere dahil edilmez. */
export const TUTORIAL_CASE: CaseData = {
  id: "tutorial-demo",
  order: 0,
  title: "Ofis Hırsızlığı",
  difficulty: "kolay",
  tagline: "Alıştırma dosyası",
  available: true,
  synopsis:
    "Büroda masada duran bir zarf dolusu nakit kayboldu. O aralıkta odaya sadece iki kişi girdi. Bu, gerçek vakalardan çok daha küçük bir alıştırma — mekanikleri denemen için buradasın.",
  victim: {
    name: "—",
    age: 0,
    description: "Bu bir alıştırma dosyası, gerçek bir kurban yok.",
  },
  suspects: [
    {
      id: "asli",
      name: "Aslı Ekinci",
      age: 29,
      role: "Muhasebeci",
      motive: "Maaşı bir haftadır gecikmişti, parayı 'ödünç' almayı düşünmüş olabilir.",
      opportunity: "Zarfın kaybolduğu aralıkta odaya son giren oydu.",
      statement: "\"Klasör almak için girdim, zarfa hiç dokunmadım.\"",
    },
    {
      id: "tarik",
      name: "Tarık Solmaz",
      age: 34,
      role: "Kurye",
      motive: "Belirgin bir motivi yok, parayla ilgili bir sorunu bilinmiyor.",
      opportunity: "Sadece imza almak için birkaç saniye içerideydi.",
      statement: "\"İmza aldım, hemen çıktım. Zarfı fark bile etmedim.\"",
    },
  ],
  documents: [
    {
      id: "guvenlik-notu",
      type: "resmi_rapor",
      title: "Güvenlik Notu",
      meta: "Bina güvenliği · gündüz vardiyası",
      body: `Zarf saat 14:00'te masada duruyordu, 14:30'da yoktu. Bu aralıkta odaya sadece iki kişi girdi: Tarık (14:12, birkaç saniye) ve Aslı (14:20, klasör almak için).

Ek not: Aslı'nın masasının çekmecesinde, işaretli banknotlarla seri numarası eşleşen birkaç kağıt para bulundu.`,
    },
    {
      id: "tarik-ifadesi",
      type: "ifade",
      title: "Tarık'ın İfadesi",
      meta: "Kurye · olay günü alınan ifade",
      body: `"Sadece imza almak için girdim, masaya hiç yaklaşmadım bile. Ne zarfı gördüm ne de içeriğini biliyordum."`,
    },
  ],
  timeline: [
    { time: "14:00", description: "Zarf masada son kez görülür." },
    { time: "14:12", description: "Tarık imza almak için odaya girer, birkaç saniye kalır." },
    { time: "14:20", description: "Aslı klasör almak için odaya girer." },
    { time: "14:30", description: "Zarfın kaybolduğu fark edilir." },
  ],
  hints: [],
  motiveQuestion: {
    prompt: "",
    options: [],
  },
  methodQuestion: {
    prompt: "",
    options: [],
  },
  solution: {
    killerId: "asli",
    explanation:
      "Güvenlik notu odaya son onun girdiğini gösteriyor, gecikmiş maaşı bir motif oluşturuyor ve çekmecesinden çıkan işaretli banknotlar meseleyi çözüyor. Tarık'ın ise ne motivi ne de fırsatı vardı — birkaç saniyeliğine, masaya yaklaşmadan içerideydi.",
  },
};
