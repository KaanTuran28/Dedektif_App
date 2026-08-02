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

## Oynanış Cilası + Stres Testi (2026-08-02, beşinci güncelleme)
- **Sürekli ambiyans sesi tamamen kaldırıldı** (`src/lib/sound.ts`) — kullanıcı
  "sürekli müzik/ses kötü" dedi. Artık ses SADECE etkileşimde çalıyor
  (kağıt, tık, damga); arka planda çalan hiçbir şey yok.
- **Suçlama onay adımı eklendi:** "Dosyayı Kapat"a basınca artık direkt
  suçlamıyor, "X'i suçlamak üzeresin, emin misin? [Vazgeç] [Evet, Suçla]"
  paneli açılıyor — yanlışlıkla dokunup geri alınamaz kararı bozma riskini
  azaltıyor.
- **Canlı ilerleme göstergesi eklendi:** Header'da "🔍 %XX incelendi" —
  rütbe sistemine giren kanıt/şüpheli inceleme oranını artık oyuncu da
  anlık görebiliyor (önceden tamamen görünmezdi, sadece sonuç ekranında
  ortaya çıkıyordu).
- **Kapsamlı stres testi yapıldı** (Playwright): hızlı sekme geçişi ×20,
  kart açma/kapama art arda, ses aç/kapa spam, pano sürükleme stres testi,
  suçlama akışında çift tıklama/iptal/tekrar seçme, sayfa yenileme sonrası
  durum kontrolü, tarayıcı ileri/geri navigasyonu — **0 konsol hatası**.
- **Bir gerçek kırılganlık bulundu ve düzeltildi:** Delil panosunda hızlı
  fare sürüklemesi bazen arka plandaki talimat metnini yanlışlıkla seçip
  (native text selection) kırmızı `::selection` rengiyle işaretliyordu.
  Düzeltme: pano canvas'ına `select-none` eklendi
  (`src/components/EvidenceBoard.tsx`).
- Playwright ile doğrulandı: sürükleme sonrası artık hiç metin seçilmiyor,
  ilerleme göstergesi canlı güncelleniyor. GitHub'a push edildi.

## Ortak Evren Kararı Netleşti (2026-08-02, altıncı güncelleme)
- Açık kalan tasarım kararı çözüldü: **hafif ortak evren + easter egg'ler**
  (bkz. `PLAN.md` §9 — tam kurallar orada). Özet: vakalar bağımsız çözülebilir
  kalıyor, sıra şart değil, ama sonraki vakalar öncekilere tek cümlelik saf
  flavor-text göndermeler yapabiliyor (asla çözüm/ipucu mantığına dokunmadan).
- Kronolojik sıra korunuyor (Vaka 01 → Vaka 02 → ...), referans hep geriye
  doğru.
- İleride kullanılabilecek hazır bir araç olarak tekrarlayan bir gazete adı
  ("Meridyen Gazetesi") ve gazeteci karakteri ("Pelin Ergüven") önerisi not
  edildi — zorunlu değil, henüz hiçbir vakada kullanılmadı.
- **Uygulandı:** Vaka 02'nin (`Son Round`) synopsis'ine Vaka 01'e ("Yıldız
  Ekspresi") tek cümlelik geriye dönük bir gönderme eklendi (hem
  `vakalar/vaka-02-son-round.md` hem `src/data/cases/vaka-02-son-round.ts`).
  Build doğrulandı, GitHub'a push edildi.

## Backlog Sprint — 13 Görevin Tamamı (2026-08-02, yedinci güncelleme)
Kullanıcı `PLAN.md` §10'daki backlog'un **tamamını** sırayla yapmamı istedi.
Kendi görev listemi oluşturup (13 görev) hepsini bitirdim, her aşamada
build + Playwright testi yaptım. Özet:

**Şema & çekirdek sistemler**
- `CaseData` şemasına `timeline[]`, `hints[]`, `motiveQuestion`,
  `methodQuestion` eklendi; Vaka 01 ve Vaka 02'ye geriye dönük işlendi.
- `src/lib/rank.ts` artık puanlı: doğru suçlama(40) + kapsam(0-30) +
  motiv(15) + yöntem(15) - ipucu(5/tane). A/B Sınıfı Dedektif / Şanslı
  Tahmin / Vaka Kapandı eşikleri buna göre.
- `src/lib/progress.ts`: `hintsUsed`, `bestPoints`, `bestRankLabel` eklendi.

**Yeni oynanış özellikleri**
- **İpucu paneli** (`HintPanel.tsx`): sınırlı ipucu, kullanınca rütbe düşüyor.
- **Zaman Çizelgesi sekmesi** (`Timeline.tsx`): vakanın kronolojik olay şeridi.
- **Suçlama sonrası motiv+yöntem soruları**: doğru şüpheliyi bulmak artık
  yetmiyor, "neden" ve "nasıl"ı da bilmek gerekiyor, rütbeye yansıyor.
- **Rozet/başarım sistemi** (`src/lib/achievements.ts`): Titiz Dedektif,
  İlk Bakışta, Tam İsabet, Seri Dedektif — tüm vakalar genelinde kalıcı.
- **Delil panosuna not iğneleme**: kartlara kısa kişisel not eklenebiliyor,
  kalıcı.
- **Sonuç ekranı paylaşım kartı** (`src/lib/shareCard.ts`): canvas ile
  üretilen PNG, `navigator.share` destekleniyorsa paylaşım sayfası, yoksa
  indirme. Dış servis/dosya kullanılmıyor.
- **Vaka kapanış animasyonu**: "Vaka Seçimine Dön"e basınca "Dosya
  Kapatıldı" damgası, sonra ana sayfaya yönlendiriyor.
- **Mini istatistik paneli** (`StatsPanel.tsx`, ana sayfada): çözülen vaka
  sayısı, ortalama puan, rozet durumu (kilitli/açık hepsi görünüyor).

**Vaka 03 — "Zümrüt Yalı"**
- Zor zorluk, villa/aile cinayeti teması, **zehirleme** yöntemi (Vaka
  01=bıçak, Vaka 02=künt travma, Vaka 03=zehir — üç farklı yöntem
  bilinçli çeşitlilik için). 6 şüpheli (Vaka 01/02'den daha fazla, "zor"
  seviyeye uygun). Katil: kahya Sadi Yalman, "en sadık görünen kişi"
  twist'i. Ortak evren kuralına uyarak synopsis'te Vaka 01 ve Vaka 02'ye
  gönderme var.

**Test turları ve bulunan gerçek hatalar (hepsi düzeltildi)**
- WebKit (Safari motoru) + iPhone dokunmatik emülasyonuyla tam test —
  0 hata. (Not: gerçek fiziksel cihaz testinin yerini tutmaz ama Chromium'a
  göre çok daha yakın bir yaklaşım.)
- **Erişilebilirlik taraması sırasında gerçek bir bug bulundu:** Delil
  panosu kartlarına hem kendi `onKeyDown` (Enter/Space) hem de Framer
  Motion'ın kendi yerleşik klavye-tap desteği aynı anda tepki veriyordu —
  bu da her Enter basışında bağlantıyı önce kurup hemen geri açıyordu
  (net etki: hiçbir şey olmuyormuş gibi görünüyordu). Kendi `onKeyDown`'ı
  kaldırıp motion'ın yerleşik desteğine güvenmek sorunu çözdü. Şimdi board
  tamamen klavyeyle de kullanılabiliyor (Tab ile kart seç, Enter ile
  bağla/seç).
- Diğer erişilebilirlik düzeltmeleri: açılış sinemasına `autoFocus`,
  not defterine `aria-label`, pano not textarea'sına görünür focus ring.
- Son regresyon: 2 vaka gerçekten çözülüp "Seri Dedektif" rozetinin doğru
  açıldığı, ana sayfa sayaçlarının (2/3, ortalama puan, 3/4 rozet) doğru
  güncellendiği, sayfa yenileme sonrası kalıcılığın çalıştığı, hızlı sekme
  geçişi stresinin sorun çıkarmadığı doğrulandı — **0 konsol hatası**.

Tüm değişiklikler GitHub'a push edildi (bkz. commit geçmişi:
"Backlog 1/2", "Backlog 2/2", ve bu güncellemeyle birlikte final commit).

## Sıradaki Adım
1. `PLAN.md` §10'daki backlog'un **tamamı bitti** (2026-08-02) — sıradaki
   büyük karar kullanıcıda: **Vercel'e deploy** mi, yoksa **Vaka 04** mü?
   Kullanıcı daha önce "Vercel şimdilik kalsın" demişti, bu yüzden deploy
   hâlâ yapılmadı — tekrar sorulabilir ya da içerik üretimine devam edilebilir.
2. Faz 2 devam edebilir: Vaka 04 teması "ünlü/influencer cinayeti" kalan
   son seçenek (villa zaten Vaka 03'te kullanıldı). Yeni vaka eklemek artık
   kanıtlanmış şekilde kolay — `src/data/cases/`'a dosya + `index.ts`'e
   kayıt, geri kalan her şey (ses/rütbe/pano/ipucu/zaman çizelgesi/rozet)
   otomatik çalışıyor.
3. Açık soru: "ChipChop" adlı referans kaynak bulunamadı, kullanıcıdan link istenecek
4. Gerçek FİZİKSEL cihazda (özellikle iOS Safari) test hâlâ yapılmadı —
   yalnızca Playwright'ın WebKit motoruyla (Chromium'dan daha yakın ama
   birebir aynı değil) test edildi. Ses/animasyon gerçek iPhone'da bir kez
   denenirse iyi olur.
5. `PLAN.md` §7.1'deki bazı mekanik ilhamlar hâlâ uygulanmadı: kademeli
   hedef sistemi (tek final suçlaması yerine ara adımlar — kısmen motiv/
   yöntem sorularıyla karşılandı ama tam anlamıyla değil), tam sezonluk/
   bağlı vaka evreni (şu an sadece hafif flavor-text göndermeler var, §9'da
   bilinçli olarak seçildi)

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
