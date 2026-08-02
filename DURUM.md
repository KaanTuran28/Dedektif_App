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

## Sıradaki Adım
1. GitHub'a ilk push yapıldı/yapılıyor (bkz. Kararlar Günlüğü)
2. Kullanıcıya yerel test talimatı verildi (bkz. altta)
3. Vercel'e (veya benzeri ücretsiz host) deploy — henüz yapılmadı, kullanıcı onayı bekleniyor
4. Faz 2: 3-4 vaka daha yazmak, vaka seçim ekranını çoklu vakaya göre geliştirmek
5. Açık soru: "ChipChop" adlı referans kaynak bulunamadı, kullanıcıdan link istenecek
6. `PLAN.md` §7.1'deki mekanik ilhamlarından hangilerinin Faz 2/3'e alınacağına karar vermek
   (özellikle: kademeli hedef sistemi, sezonluk/bağlı vaka evreni, skor sistemi)

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
