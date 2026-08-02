# Proje Durumu (Hafıza Dosyası)

> Bu dosya, oturumlar arasında "kaldığımız yerden devam etmek" için var.
> Her çalışma seansının sonunda burayı güncelle.

**Son güncelleme:** 2026-08-02 (Faz 1 MVP tamamlandı)

## GitHub
- Repo: https://github.com/KaanTuran28/Dedektif_App.git (public, kullanıcının kendi hesabı)
- Tüm commit'ler kullanıcının kendi git kimliğiyle atılıyor (`Kaan Turan`,
  zaten global git config'te ayarlı — değiştirilmedi). Bundan sonra hep
  böyle devam edecek, başka bir isimle/bot kimliğiyle commit ATILMAYACAK.
- `gh` CLI zaten `KaanTuran28` hesabına authenticated.

## Neredeyiz
- Referans ürün (Trendyol'daki 4 vakalı dedektif kutu oyunu) ve dijital
  benzerleri (cinayetoyunu.com, 5N1Dedektif, Chronicles of Crime) araştırıldı.
- Kapsamlı plan `PLAN.md` dosyasına yazıldı; ek olarak kullanıcının verdiği
  referans listesi (Unsolved Case Files, Hunt A Killer, Chronicles of Crime
  community editor, Sherlock Holmes Consulting Detective, Detective: A Modern
  Crime Board Game) araştırılıp mekanik ilhamlar `PLAN.md` §7.1'e eklendi.
- **Platform kararı verildi:** Web uygulaması / PWA. Native masaüstü veya
  mobil app yapılmayacak.
- **Teknoloji kuruldu (öneri değil, artık gerçek):** Next.js 16 (App Router,
  TypeScript, Tailwind v4, Turbopack), proje kök dizine kuruldu (npm paket adı
  `supheli`). Path alias `@/*` → `src/*`.
- **Oyun adı/ton kararı verildi:** **ŞÜPHELİ**. Karanlık/gizemli, kork-board
  + kırmızı iplik estetiği. Palet: #1A1A1A siyah, #8B0000 koyu kırmızı,
  #D4AF37 altın vurgu. Slogan: "Herkes bir şey saklıyor." Fontlar: Playfair
  Display (başlık) + Inter (gövde), ikisi de Türkçe karakter destekli.
- **Vaka 01 — "Yıldız Ekspresi" tamamen oynanabilir halde (Faz 1 MVP bitti):**
  - İçerik: `vakalar/vaka-01-yildiz-ekspresi.md` (iskelet) ve
    `vakalar/vaka-01-belgeler.md` (8 belgenin tam metni) — insan-okunur referans.
  - Kod karşılığı: `src/data/cases/vaka-01-yildiz-ekspresi.ts` (aynı içerik,
    oyunun kullandığı gerçek veri kaynağı).
  - Ekranlar: `/` (vaka seçimi) → `/vaka/vaka-01-yildiz-ekspresi` (Vaka /
    Kanıtlar / Şüpheliler / Notlar sekmeleri, localStorage not defteri,
    Katili Suçla akışı, Sonuç ekranı).
  - **Playwright ile uçtan uca test edildi** (masaüstü 1280px + mobil 390px):
    tüm akış çalışıyor, 0 console hatası, suçlama mantığı doğru çalışıyor
    (Emre Solak seçilince "Vakayı Çözdün" dönüyor). Ekran görüntüleri
    scratchpad'de, kullanıcıya rapor edildi.
  - `npm run build` başarılı, `/vaka/[caseId]` `generateStaticParams` ile
    statik olarak önceden üretiliyor (SSG).

## Görsel Tasarım Geçişi (2026-08-02, aynı gün ikinci güncelleme)
İlk MVP "düz yazı okuyormuşuz gibi" hissettiriyordu — kullanıcı geri
bildirimiyle tam bir "dava dosyası" görsel diline geçildi:
- `motion` (Framer Motion) eklendi: sekme geçişleri, kanıt/şüpheli kartı
  açılma animasyonu, suçlama sonucunda **damga (stamp) animasyonu**
  (ÇÖZÜLDÜ altın / YANLIŞ ŞÜPHELİ kırmızı). `MotionConfig reducedMotion="user"`
  ile erişilebilirlik (azaltılmış hareket tercihi) global olarak saygı görüyor.
- Yeni fontlar: IBM Plex Mono (resmi belgeler/bilet/log — "yazılmış" hissi),
  Caveat (el yazısı — ifade imzası, günlük log etiketi, slogan).
- Kanıt kartları artık türüne göre farklı görünüyor: resmi_rapor kırmızı
  eğik "RESMİ" damgalı kağıt, whatsapp gerçek telefon ekranı mockup'ı içinde,
  bilet_kaydi bilet kuponu gibi, ifade ataşlı+el yazısı imzalı kağıt.
- Şüpheli kartları "mugshot" tarzına çevrildi: silüet + cetvel-arka planlı
  fotoğraf çerçevesi + altın "Ş-01" vaka etiketi.
- Katili Suçla ekranı artık bir "teşhis dizisi" (lineup): seçilen şüphelinin
  fotoğrafında kırmızı hedef halkası beliriyor.
- Ana sayfa kork-pano (corkboard) dokusu + kırmızı iplik + iğneyle
  tutturulmuş dosya kartı halini aldı.
- Tüm kartlarda id'den türetilen sabit (deterministic) hafif eğim var
  (`src/lib/tilt.ts`) — "pinlenmiş ama mükemmel hizalı değil" hissi,
  hydration hatası yaratmadan (Math.random KULLANILMADI, bilerek).
- Playwright ile hem masaüstü hem mobilde tekrar görsel test edildi, 0 konsol
  hatası. GitHub'a push edildi.

## Oyun Zevki / "İçindeymiş Gibi Hissettirme" Geçişi (2026-08-02, üçüncü güncelleme)
Kullanıcı 4 öneriden hepsini seçti, hepsi uygulandı:
- **Ses tasarımı** (`src/lib/sound.ts`): dışarıdan ses dosyası YOK, tamamen
  Web Audio API ile üretiliyor (telif riski sıfır) — kağıt hışırtısı (kanıt/
  şüpheli kartı aç/kapa), damga "gümm" sesi (suçlama sonucu), tık sesi (sekme
  geçişi/pano bağlama), ambiyans (kahverengi gürültü + hafif tiz katman,
  tarayıcı autoplay kısıtı nedeniyle ilk kullanıcı etkileşiminden sonra
  başlıyor). Header'da 🔊/🔇 aç-kapa butonu, tercih localStorage'da kalıcı.
- **Açılış sineması**: vaka sayfası ilk açıldığında "DOSYA NO: 01" → başlık →
  "Dosya Açılıyor" damgası beliren tam ekran bir intro (`IntroCinematic`,
  `CaseGame.tsx` içinde). `useReducedMotion()` true ise tamamen atlanıyor
  (erişilebilirlik). Tıklayınca da atlanabiliyor.
- **Dedektif rütbe sistemi** (`src/lib/rank.ts`): kaç kanıt/şüpheli
  incelendiği (`viewedDocs`/`viewedSuspects` state, kartların `onOpen`
  callback'i ile besleniyor) suçlama anında bir "coverage" oranına
  dönüşüyor. Doğru + yüksek kapsam = "A Sınıfı Dedektif", doğru + düşük
  kapsam = "Şanslı Tahmin", yanlış = "Vaka Kapandı". Sonuç ekranında damga
  animasyonunun altında ayrı bir rütbe kartı olarak gösteriliyor.
- **Etkileşimli delil panosu** (`src/components/EvidenceBoard.tsx`, yeni
  "Pano" sekmesi): tüm kanıt+şüpheli kartları sürüklenebilir küçük kartlar
  olarak bir kork-pano üzerinde duruyor (motion `drag`), pozisyonlar
  `localStorage`'da kalıcı (`src/lib/board.ts`). İki karta sırayla tıklayınca
  (motion `onTap`, drag'den ayrı algılanıyor) aralarına kırmızı SVG ipliği
  çiziliyor/kaldırılıyor, bağlantılar da kalıcı. "Panoyu Sıfırla" butonu var.
- Playwright ile tüm yeni özellikler test edildi (intro, pano sürükle/bağla,
  ses kapama, rütbeli sonuç ekranı) — 0 konsol hatası. GitHub'a push edildi.

## Vaka 02 — "Son Round" Eklendi (2026-08-02, dördüncü güncelleme)
- Faz 2 başladı. İkinci vaka: **"Son Round"** — teknoloji şirketi ofisi teması
  (Vaka 01'in tren/kapalı mekanından bilinçli olarak farklı bir ortam).
- **Çözücü ipucu türü de bilinçli olarak farklı:** Vaka 01 fiziksel kanıta
  (boy analizi) dayanıyordu, Vaka 02 dijital/adli bilişim kanıtına (kartlı
  geçiş sistemi ana logunda katilin kaydının OLMAMASI — çünkü tek o kişi
  admin yetkisiyle silebiliyor — ve bir yedek "gölge log" sunucusunda gerçek
  kaydın bulunması). Oyuncuyu "log'da yoksa suçsuzdur" varsayımına karşı test
  ediyor.
- Katil: Ozan Kırca (CTO). İçerik: `vakalar/vaka-02-son-round.md` (iskelet) +
  `vakalar/vaka-02-belgeler.md` (9 belgenin tam metni) + kod karşılığı
  `src/data/cases/vaka-02-son-round.ts`, `src/data/cases/index.ts`'e eklendi.
- **Yeni belge türü eklendi: `eposta`** (`src/types/case.ts`,
  `DocumentCard.tsx`) — Kimden/Kime/Konu/Tarih başlıklı, resmi rapordan
  görsel olarak ayrışan bir e-posta görünümü. Yeni vaka eklemek istisnasız
  kolay: sadece `src/data/cases/` içine dosya ekleyip `index.ts`'e kaydetmek
  yeterli, ses/rütbe/pano sistemleri otomatik çalışıyor.
- **Gerçek bir bug bulundu ve düzeltildi:** `DocumentCard`/`SuspectCard`'da
  `setOpen((v) => { ...yan etki (ses çalma, üst bileşene onOpen bildirimi)...
  return !v })` şeklindeki kod React'in "state updater fonksiyonu SAF olmalı"
  kuralını çiğniyordu → konsolda "Cannot update a component while rendering
  a different component" hatası veriyordu. Düzeltme: yan etkiler updater
  fonksiyonunun DIŞINA alındı (`const next = !open; setOpen(next); ...`).
  Bu, Vaka 01'de fark edilmemişti çünkü Vaka 01 testlerinde bu spesifik
  etkileşim yolu tetiklenmemişti — Playwright ile Vaka 02'yi test ederken
  yakalandı.
- Playwright ile uçtan uca test edildi (yeni e-posta belgesi dahil), 0 hata.
  GitHub'a push edildi.

## Sıradaki Adım
1. Vercel'e (veya benzeri ücretsiz host) deploy — henüz yapılmadı, kullanıcı onayı bekleniyor
2. Faz 2 devam: 2-3 vaka daha yazmak (Vaka 01 tren, Vaka 02 ofis temalıydı —
   sırada "lüks villa" veya "ünlü/influencer" teması olabilir, bkz. PLAN.md)
   (not: yeni vaka eklemek artık kanıtlanmış şekilde kolay — sadece
   `src/data/cases/` içine dosya eklenip `index.ts`'e kaydediliyor,
   ses/rütbe/pano otomatik çalışıyor)
3. Açık soru: "ChipChop" adlı referans kaynak bulunamadı, kullanıcıdan link istenecek
4. `PLAN.md` §7.1'deki mekanik ilhamlarından hangilerinin Faz 2/3'e alınacağına karar vermek
   (özellikle: kademeli hedef sistemi, sezonluk/bağlı vaka evreni)
5. Gerçek cihazda (özellikle mobil Safari) ses/animasyon testi henüz yapılmadı —
   yalnızca masaüstü Chromium'da test edildi, iOS'ta Web Audio autoplay
   davranışı farklı olabilir, bir sonraki oturumda kontrol edilmeli

## Kararlar Günlüğü
- **2026-08-02:** Platform olarak Web App/PWA seçildi (native app'e karşı).
  Gerekçe: ücretsiz dağıtım, tek kod tabanı, store sürtünmesi yok, anında
  güncelleme. Bkz. `PLAN.md` §3.
- **2026-08-02:** Oyun adı **ŞÜPHELİ**, ton: karanlık/gizemli/kork-board
  estetiği olarak seçildi.
- **2026-08-02:** İlk vaka teması "tren/kapalı mekan gizemi" seçildi, Vaka 01
  ("Yıldız Ekspresi") iskeleti yazıldı — bkz. `vakalar/vaka-01-yildiz-ekspresi.md`.
- **2026-08-02:** Next.js 16 iskeleti kuruldu, Vaka 01 uçtan uca oynanabilir
  hale getirildi, Playwright ile test edildi, GitHub'a
  (`KaanTuran28/Dedektif_App`) push edildi.

## Notlar
- Detaylı plan ve tüm gerekçeler: `PLAN.md`
- Vaka içerikleri: `vakalar/` klasöründe
- Kullanıcı bu oyunu tamamlandığında ücretsiz olarak yayınlamak istiyor.
