# Proje Durumu (Hafıza Dosyası)

> Bu dosya, oturumlar arasında "kaldığımız yerden devam etmek" için var.
> Her çalışma seansının sonunda burayı güncelle.

**Son güncelleme:** 2026-08-03 (TAM ORTAK OYUN ODASI özelliği TAMAMLANDI +
**kritik service worker önbellek hatası düzeltildi** — kullanıcı "GitHub'a
gidiyor ama Vercel'de yüklenmiyor" dedi, bkz. "Service Worker Önbellek
Hatası Bulundu ve Düzeltildi")

## GitHub
- Repo: https://github.com/KaanTuran28/Dedektif_App.git (public, kullanıcının kendi hesabı)
- Tüm commit'ler kullanıcının kendi git kimliğiyle atılıyor (`Kaan Turan`,
  zaten global git config'te ayarlı — değiştirilmedi). Bundan sonra hep
  böyle devam edecek, başka bir isimle/bot kimliğiyle commit ATILMAYACAK.
- `gh` CLI zaten `KaanTuran28` hesabına authenticated.

## Canlı Yayın (2026-08-02)
- **Oyun artık canlıda:** https://dedektif-app.vercel.app (doğrulandı — 3
  vaka, doğru zorluk etiketleriyle görünüyor)
- Vercel dashboard: https://vercel.com/t-x/dedektif-app (kullanıcının kendi
  hesabı üzerinden GitHub reposuna bağlı)
- GitHub `main` dalına her push otomatik olarak Vercel'de yeniden deploy
  ediyor (continuous deployment) — ayrıca manuel deploy adımı gerekmiyor.

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

## İkinci İyileştirme Turu (2026-08-02, sekizinci güncelleme)
Kullanıcının 6 yeni isteği sırayla uygulandı:

1. **Sekme kilidi:** "Soruşturmaya Başla"ya basılmadan Kanıtlar/Şüpheliler/
   Zaman/Pano/Notlar erişilemiyor (🔒 ikonlu, devre dışı görünüyor).
   `CaseGame.tsx`'e `started` state'i eklendi.
2. **Daha az detaylı ipuçları:** Her 3 vakanın `hints[]` alanı, doğrudan
   sonucu/şüpheliyi söylemeyen, daha muğlak metinlerle yeniden yazıldı.
3. **Zorluk bazlı puan tavanı:** `src/lib/rank.ts` artık zorluğa göre
   ölçekleniyor — kolay=100, orta=150, zor=200 maksimum puan. İç hesap
   hâlâ 0-100% performans üzerinden, sonra zorluğun tavanına çarpılıyor.
   **Vaka 01 "kolay" olarak yeniden sınıflandırıldı** (zaten en basit vaka
   — yeni içerik yazmadan zorluk çeşitliliği elde edildi: kolay/orta/zor).
4. **Yönlü ok bağlantılar:** `EvidenceBoard.tsx`'teki düz kırmızı çizgiler,
   SVG `marker-end` ile ok ucuna çevrildi; yön hep ilk tıklanan karttan
   ikinciye doğru (bağlantı verisi zaten bu sırayı tutuyordu).
5. **4 yeni görsel belge türü:** `guvenlik_kamerasi` (video çerçevesi +
   REC + zaman damgası mockup'ı), `sosyal_medya` (avatar/gönderi kartı),
   `haber_kupuru` ("Meridyen Gazetesi" markalı, ortak evrene bağlanan sahte
   gazete küpürü), `ses_kaydi` (dalga formu görselleştirmesi + döküm).
   Hepsi tamamen CSS/SVG ile üretiliyor, dış dosya/görsel/ses YOK.
   Retrofit: Vaka 01'e sosyal medya, Vaka 02'ye kamera+ses kaydı (biri
   dönüştürüldü, biri yeni), Vaka 03'e haber küpürü eklendi.
6. **Gerçek haber/OSINT talebi konusunda bilinçli sapma:** Kullanıcı gerçek
   olaylara/haberlere internet linki istedi; bunun yerine TAMAMEN KURGUSAL
   ama gerçekçi "Meridyen Gazetesi" haber küpürü ve sahte sosyal medya
   gönderileri yapıldı — gerçek insanları/olayları kurguya karıştırmanın
   etik/hukuki riski kullanıcıya açıklandı, dış link eklenmedi.

**Yan ürün — isim çakışması düzeltmesi:** Vaka 03 içeriği yazılırken fark
edilmeden Vaka 01 ve Vaka 02'deki isimlerle çakışan iki karakter adı vardı
("Bora" → Vaka 01'in Bora Yalçın'ı, "Ferit Umay" → Vaka 01'in Ferit Kaya'sı).
İkisi de yeniden adlandırıldı (Efe, Dr. Tarık Umay) — ortak evrende
istemsiz/yanıltıcı çakışma olmasın diye.

Playwright ile tam regresyon: 3 vakada da sekme kilidi + tam gezinme,
mobil dokunmatik (kilitli/açık sekme sayısı doğrulandı), zorluk bazlı puan
hesabı (kolay 70/100, zor 144/200 gibi doğru ölçeklendi) — **0 hata**.

## Zaman Çizelgesi Bulmacaya Çevrildi (2026-08-02, dokuzuncu güncelleme)
Kullanıcının önerilerden seçtiği "en büyük tekil kazanım": Zaman Çizelgesi
artık salt-okunur değil, gerçek bir sürükle-bırak bulmacası.

- **Şema:** `TimelineEvent`'e `contradicts?: suspectId` eklendi. Her vakada
  1-3 olay bir şüphelinin ifadesiyle çelişecek şekilde işaretlendi (Vaka 01:
  Emre/Nihal/Selim — Selim için yeni bir olay eklendi; Vaka 02: Ozan/Selin
  — Selin için yeni bir olay eklendi; Vaka 03: Sadi).
- **Mekanik** (`Timeline.tsx` baştan yazıldı): Çelişkisi olan şüpheliler bir
  "kart tepsisi"nde duruyor, oyuncu Framer Motion `drag` +
  `dragSnapToOrigin` ile kartı doğru olaya sürüklüyor. Doğru bırakınca olay
  altın kesikli çerçeveye dönüşüp "✓ [İsim] ile eşleşti" yazıyor ve iki
  notalık yükselen bir ses çalıyor (`playMatch`); yanlış bırakınca olay
  hafifçe sallanıyor ve alçalan bir ses çalıyor (`playMismatch`), kart
  `dragSnapToOrigin` sayesinde otomatik tepsiye geri dönüyor.
- **Kalıcılık:** `src/lib/timelinePuzzle.ts`, çözülen eşleşmeleri
  localStorage'da vaka başına saklıyor.
- **Yeni rozet:** "Çelişki Avcısı" — bir vakadaki tüm çelişkileri
  yakalayınca açılıyor (`unlockContradictionHunter`).
- **Test:** Fare tabanlı sürükle-bırak Playwright'ta uçtan uca doğrulandı
  (yanlış eşleştirme çözmüyor, doğru eşleştirme sırayla 1/3→2/3→3/3
  ilerliyor, sayfa yenileme sonrası kalıcı, rozet doğru açılıyor) — 0 hata.
  **Dürüst not:** Manuel `TouchEvent` simülasyonuyla ek bir dokunmatik test
  denendi ama sonuçsuz kaldı — bu, Playwright/Chromium'un script'ten
  gönderilen ham TouchEvent'leri Framer Motion'ın kullandığı Pointer
  Events API'sine otomatik çevirmemesinden kaynaklanan bir **test
  metodolojisi sınırlaması**, uygulama hatası değil (aynı `drag` mekanizması
  zaten EvidenceBoard'da kullanılıyor ve gerçek `page.mouse` tabanlı testler
  pointer event'leri doğru tetikliyor). Yine de gerçek bir telefonda bir kez
  denenmesi iyi olur — bu not zaten "gerçek cihaz testi" açık maddesiyle
  birleşti.

## Arkadaş Testi İçin Kilitleme + Nasıl Oynanır Rehberi (2026-08-02, onuncu güncelleme)
Kullanıcı canlı linki bir arkadaşına test için gönderecek, iki hazırlık istedi:

1. **Sadece Vaka 01 açık:** `CaseData`'ya `available: boolean` eklendi.
   Vaka 01 `true`, Vaka 02/03 `false`. Ana sayfada kilitli vakalar
   "🔒 Yakında Açılacak" etiketiyle, tıklanamaz/soluk halde gösteriliyor.
   **Direkt link korumasi da var:** `/vaka/vaka-02-son-round` gibi bir
   linke doğrudan gidilirse de "Bu Dosya Henüz Açılmadı" ekranı çıkıyor —
   sadece ana sayfa değil, route seviyesinde de kilitli. İstatistik paneli
   de sadece açık vakaları sayıyor (0/1, 0/3 değil).
   **Geri açmak kolay:** İleride tüm vakaları herkese açmak için tek
   yapılacak şey `available: false` olan vakalarda bunu `true` yapmak.
2. **"Nasıl Oynanır?" rehberi** (`HowToPlayModal.tsx`): 7 adımlı, ikonlu bir
   modal. Sitenin **ilk ziyaretinde otomatik açılıyor** (localStorage
   `supheli:rehber-gorundu` flag'i ile bir kereliğine), ayrıca ana sayfada
   her zaman "📖 Nasıl Oynanır?" butonuyla tekrar açılabiliyor.

Playwright ile doğrulandı: ilk ziyarette rehber otomatik açılıyor, ikinci
ziyarette açılmıyor, kilitli kartlara tıklama hiçbir şey yapmıyor, direkt
link de kilitli, Vaka 01 sorunsuz oynanabiliyor — 0 hata. GitHub'a push
edildi, Vercel otomatik deploy edecek.

## Onbirinci–Onaltıncı Güncelleme Özeti (2026-08-02/03, sıkıştırılmış)
Çok sayıda ardışık tur oldu, en önemli sonuçlar:

- **Vaka oturum/süre sistemi:** `src/lib/progress.ts`'e `startCase`,
  `getRemainingMs`, `endCaseManually`, `markTimedOut` eklendi. Her vakada
  **1 saatlik süre sınırı** var, dolunca otomatik "Süre Doldu" sonucu.
  İstediğin an "Vazgeç" ile de sonlandırılabiliyor. Ana sayfa artık devam
  eden vakalarda "▶ Kaldığın Yerden Devam Et" + kalan süre gösteriyor,
  tekrar "Başlat" butonu göstermiyor.
- **Pano tamamen yeniden tasarlandı:** Artık kartlar başta küçük bir "tray"
  kutusunda duruyor, dokunarak seçip panoda istediğin yere yerleştiriyorsun
  (`↩` ile geri alınabiliyor). Performans sorunu (sürüklerken kasma) motion
  value tabanlı pozisyon sistemine geçilerek çözüldü — React state artık
  her drag frame'inde tetiklenmiyor.
- **Zaman Çizelgesi bulmacası kaldırıldı:** Sürükle-bırak/eşleştirme
  mekaniği sökülüp düz, salt-okunur kronolojik bir listeye çevrildi (mobilde
  kaydırmayı engellediği için). "Çelişki Avcısı" rozeti bu yüzden kaldırıldı.
- **İnteraktif tutorial:** Statik "Nasıl Oynanır" modalı kaldırıldı,
  yerine gerçek bileşenleri (DocumentCard/SuspectCard/Timeline/EvidenceBoard)
  kullanan küçük bir alıştırma vakası geldi (`TutorialFlow.tsx`,
  `src/data/tutorialCase.ts`).
- **Renk kodlama:** Kanıt türlerine (`src/lib/docColor.ts`) ve her
  şüpheliye (`src/lib/suspectColor.ts`, id'den deterministik) sabit renkler
  atandı; kartlar, pano ve suçlama ekranında tutarlı görünüyor.
  Kanıtlar sekmesi artık türe göre kategorilere gruplanıyor
  (`src/lib/docCategories.ts`): Resmi Belgeler / İletişim / Kişisel
  Kayıtlar / Basın.
- **Şüpheli ifadeleri yeniden yazıldı:** `Suspect.statement` (tek cümle)
  yerine `statementIntro` (uzun anlatı) + `statementQA` (polisle soru-cevap
  dizisi) geldi — gerçek bir sorgu tutanağı hissi için.
- **İçerik zenginleştirildi ve TÜM VAKALAR AÇILDI:** Üç vakanın da sinopsisi
  uzun/atmosferik hale getirildi, haber küpürleri eklendi. Yıldız Ekspresi
  5→8, Son Round 5→8, Zümrüt Yalı 6→8 şüpheliye çıkarıldı, her birine yeni
  kanıtlar eklendi. **`available: false` kalmadı, üçü de oynanabilir.**
- **PWA altyapısı ilk kez kuruldu:** `public/manifest.json`, uygulama
  ikonları (`public/icons/`, "Ş" damgası tasarımı), `public/sw.js` (offline
  önbellek, sadece üretimde kayıt oluyor — `ServiceWorkerRegister.tsx`
  `NODE_ENV==="production"` kontrolü yapıyor, dev'de karışmasın diye).
- **StatsPanel "Dedektif Dosyası" listesi:** Ana sayfada her vaka için ayrı
  satırda en iyi rütbe/puan ya da başarısız/henüz-çözülmedi durumu.
- **Paylaşım kartı** artık `reason`'a göre (süre doldu/vazgeçildi/yanlış
  şüpheli/çözüldü) ayrı renkli döner damga görseli üretiyor.
- **Önemli standing-feedback:** Ambiyans/arka plan müziği DAHA ÖNCE
  denenmiş ve rahatsız edici bulunup kaldırılmıştı; bu bilgi kod yorumunda
  duruyordu, tekrar sorulup tekrar reddedildi. **Bir daha ambiyans müzik
  önerilmeyecek/eklenmeyecek** — bkz. auto-memory
  `feedback_no_ambient_audio.md`.

## Sohbet Özelliği Tamamlandı (2026-08-03, onyedinci güncelleme)
Kullanıcı `firebase login` yaptı ve Firebase Console'da `dedektif-84c7b`
adlı projeyi zaten oluşturmuştu; MCP bağlantısı bu oturumda bağlandı ve
kalan tüm adımlar uçtan uca tamamlandı:

- **Firestore kuruldu ve deploy edildi:** `firebase_init` ile proje köküne
  `firebase.json` + `firestore.rules` + `firestore.indexes.json` eklendi,
  `firebase_deploy --only firestore` ile kurallar canlıya alındı.
- **Veri modeli:** `rooms/{roomCode}/messages/{messageId}` — her mesaj
  `name`, `text`, `colorHue`, `createdAt` (server timestamp) alanlarını
  taşıyor. **Oda kavramı vaka id'sinden ayrı tutuldu:** `src/lib/chat.ts`
  vaka id'sinden deterministik kısa bir varsayılan oda kodu türetiyor
  (`defaultRoomCodeFor`) — aynı vakayı açan herkes otomatik aynı odaya
  düşüyor, ama istenirse farklı bir kod girip özel bir odaya geçilebiliyor.
- **Güvenlik kuralları (`firestore.rules`):** herkes okuyabilir/yazabilir
  (hesap sistemi yok, kapsam dışı) ama `create` alanları doğrulanıyor —
  isim ≤40 karakter, mesaj ≤500 karakter, `colorHue` sayı, `createdAt`
  sunucu zaman damgasıyla eşleşmeli; `update`/`delete` tamamen kapalı
  (mesajlar değişmez/kalıcı).
- **`src/lib/firebase.ts`:** client SDK init (`initializeApp` + `getFirestore`),
  config `NEXT_PUBLIC_FIREBASE_*` env değişkenlerinden okunuyor
  (`.env.local`'da, gitignore'da zaten `.env*` vardı).
- **`src/components/CaseChat.tsx`:** isim+oda kodu girme ekranı → katılınca
  Firestore `onSnapshot` ile canlı akan mesaj listesi + gönderme kutusu.
  Her katılımcının ismi `src/lib/chat.ts`'teki `hueForName` ile deterministik
  bir HSL rengine boyanıyor (suspectColorFor deseniyle aynı mantık).
  Kimlik (isim+renk) `localStorage`'da global, oda kodu vaka başına kalıcı.
  `CaseGame.tsx`'te Notlar sekmesinde `Notebook` ile yan yana (masaüstünde
  2 sütun, mobilde alt alta) gösteriliyor.
- **Test:** İki ayrı Playwright browser context'i (iki farklı "kullanıcı")
  aynı vakanın Notlar sekmesinde farklı isimlerle odaya katılıp gerçek
  Firestore üzerinden karşılıklı mesajlaştı — her iki taraf da diğerinin
  mesajını gördü. Mobil viewport'ta da sohbet kutusu görünür/kullanılabilir
  durumda. `npm run build` başarılı.
- **Vercel env değişkenleri eklendi ve push edildi:** Kullanıcı 6
  `NEXT_PUBLIC_FIREBASE_*` değişkenini Vercel dashboard'a (Production/
  Preview/Development hepsine) ekledi, ardından commit GitHub'a push
  edildi (`68ef194`) — Vercel otomatik yeniden deploy etti. Canlıda da
  doğrulanmalı (bir sonraki oturumda kontrol edilebilir): sohbet kutusu
  gerçek Firestore'a bağlanıyor mu, iki farklı cihaz/tarayıcıdan aynı
  vakayı açıp mesajlaşabiliyor mu.
- Kapsam bilinçli olarak dar tutuldu: sadece yazılı sohbet, pano/kanıt gibi
  tam ortak state paylaşımı yok — bu istenirse sonraki bir faz.

## Ortak Oyun Odası Tamamlandı (2026-08-03, onsekizinci güncelleme)
Kullanıcı önceki turda eklenen basit sohbet kutusunu yeterli bulmadı,
**gerçek eş zamanlı ortak oyun** istedi: oda kur, kod arkadaşa gitsin,
katılsın, pano/kanıt görülme durumu herkese yansısın, suçlamada katılımcı
sayısı kadar oy gerekli olsun. Plan modunda tasarlanıp (bir Plan sub-agent'ı
ile doğrulanıp) kullanıcıyla netleştirilen kararlar:
- Oybirliği şart (çoğunluk değil) — hem katil hem motiv hem yöntem
  turlarında.
- Oybirliği sağlanamazsa oylar otomatik sıfırlanıp tur yeniden başlıyor
  (manuel "yeniden oyla" butonu yok, sürtünmesiz).
- Kanıt/şüpheli "incelendi" durumu oda genelinde paylaşımlı (kişiye özel
  değil).
- Bir önceki turda eklenen basit/otomatik-kodlu sohbet kutusu bu sisteme
  TAMAMEN taşındı — artık tek bir "oda" kavramı var, ayrı bir sohbet kodu
  kalmadı.

**Mimari:**
- **Firestore veri modeli:** `caseRooms/{kod}` (faz, paylaşımlı `votes` map'i
  — katil/motiv/yöntem turlarının üçü de aynı jenerik alanı kullanıyor ve
  tur bitince temizleniyor —, `viewedDocIds`/`viewedSuspectIds`,
  `hintsUsed`, `participantCount`, `result`), alt koleksiyonlar
  `participants/{katılımcıId}` ve `messages/{mesajId}` (sohbet, eski
  `rooms/{kod}` koleksiyonunun yerini aldı), ayrıca `board/state` (pano —
  pozisyon/bağlantı/not) ayrı bir doküman (sık yazılan pano, seyrek yazılan
  oda durumunu gereksiz yere tetiklemesin diye).
- **`src/lib/room.ts`:** tüm Firestore CRUD/subscribe fonksiyonları +
  `castVote` — oybirliği çözümü tek bir `runTransaction` içinde yapılıyor
  (oku-kontrol-yaz, Firestore'un optimistic concurrency'siyle yarış
  durumuna karşı güvenli; SDK çakışan transaction'ları otomatik retry
  ediyor). Yanlış katil seçilirse motiv/yöntem turlarına hiç girilmeden
  direkt "Vaka Kapandı" sonucuna gidiyor (solo moddaki mantıkla birebir
  aynı, `rankFor()` fonksiyonu solo ile birebir paylaşılıyor).
- **`src/components/RoomEvidenceBoard.tsx`:** `EvidenceBoard.tsx`'in
  Firestore senkronlu hali — kendi sürüklediğin kart, gelen bir uzak
  güncellemeyle çakışmasın diye `draggingIdRef` ile korunuyor, sürükleme
  bitince (drag-end) commit ediliyor (her frame'de değil, yazma trafiği
  düşük kalsın diye).
- **`src/components/RoomCaseGame.tsx`:** oda kur/katıl formu, bekleme odası
  (katılımcı listesi + "Soruşturmayı Başlat"), yatırım sekmesi kabuğu
  (solo ile aynı Vaka/Kanıtlar/Şüpheliler/Zaman/Pano/Notlar sekmeleri),
  paylaşımlı ipucu paneli (kullanımı TÜM takımın puanını düşürüyor), canlı
  oy sayaçlı katil/motiv/yöntem oylama ekranları, paylaşımlı sonuç ekranı
  — sonuç geldiğinde her katılımcının kendi cihazı `recordAccusation`/
  `checkAchievements` çağırıyor ki ana sayfadaki istatistikler/rozetler
  solo modla aynı şekilde güncellensin.
- **`src/components/CaseEntry.tsx`** (yeni giriş noktası): açılış
  sinematiğini bir kez gösterip "Tek Başına Oyna" (değişmeyen `CaseGame`)
  / "👥 Arkadaşlarınla Oyna" (`RoomCaseGame`) seçimi sunuyor. `page.tsx`
  artık `CaseGame` yerine `CaseEntry` render ediyor.
- **`CaseChat.tsx`** kendi katılma formunu kaybetti, artık dumb bir bileşen
  (`{roomCode, name, colorHue}` prop'u alıyor), `caseRooms/{kod}/messages`
  koleksiyonuna bağlanıyor. **Solo modda artık hiç sohbet kutusu yok.**
- **`firestore.rules`** güncellendi ve deploy edildi: `caseRooms` +
  `participants` + `board` + `messages` kural ağacı eklendi, eski
  `rooms/{kod}/messages` bloğu kaldırıldı. Kimlik doğrulama olmadığı için
  kurallar sadece yazılan verinin ŞEKLİNİ doğrulayabiliyor ("kim yazdığını"
  değil) — bu, zaten var olan sohbet güven modeliyle aynı, bilinçli kabul
  edilen bir sınır.
- **Bilinçli kapsam dışı bırakılanlar:** oda modunda 1 saatlik süre sınırı
  yok; "Odadan Ayrıl" dışında bağlantı kopma/presence takibi yok (biri
  sekmeyi kapatıp ayrılmazsa gerekli oy sayısı kilitlenebilir — bilinen
  risk, kabul edildi); pano üzerinde aynı anda aynı kartı iki kişi
  sürüklerse son yazan kazanır (son derece düşük ihtimal, çözülmedi).

**Test:** İki bağımsız Playwright browser context'i ile gerçek Firestore'a
karşı uçtan uca doğrulandı — oda kurma, kod ile katılma, katılımcı listesi
senkronu, paylaşımlı pano (biri kart yerleştirince diğeri anında görüyor),
oybirliği olmayan oylamanın otomatik sıfırlanması (0/2'ye dönüyor),
oybirliğiyle katil→motiv→yöntem zincirinin ilerlemesi, paylaşımlı sonuç
ekranı (takım rütbesi dahil) — hepsi iki tarafta da senkron. Test
sırasında görülen "HTTP 400 FAILED_PRECONDITION" hataları, eşzamanlı oy
transaction'larında Firestore'un beklenen optimistic-concurrency
çakışması — SDK otomatik retry ediyor, gerçek bir hata değil (her
kontrolün sonucu hep doğru çıktı). `npm run build` temiz geçti.

**Not:** `npm run lint` bazı "Cannot access refs during render" / "Avoid
calling setState() directly within an effect" hataları veriyor ama bunlar
bu oturumdan ÖNCE de vardı (EvidenceBoard.tsx, CaseGame.tsx, page.tsx,
StatsPanel.tsx — hiçbiri değişmedi), yeni dosyalar (RoomEvidenceBoard.tsx,
RoomCaseGame.tsx) aynı deseni birebir taklit ettiği için aynı uyarıyı
veriyor. Regresyon değil, ayrı bir gündem maddesi olarak bekliyor.

## Güvenlik/Süreç Denetimi ve İki Gerçek Hata Bulundu (2026-08-03, ondokuzuncu güncelleme)
Kullanıcı "testlerini yap, güvenlik ve süreç hatalarını kontrol et" dedi.
Yapılanlar:
- **Deployed Firestore kuralları** `firebase_get_security_rules` ile çekilip
  yerel `firestore.rules` ile birebir eşleştiği doğrulandı.
- **Kod denetimi:** `room.ts`'teki tüm transaction'lar tek tek elden
  geçirildi (yarış durumu, katılımcı sayısı tutarlılığı, kural
  şekli/boyut sınırları). Kimlik doğrulama olmadığı için "kim yazdığını"
  değil "ne yazıldığını" doğrulayan kural tasarımı bilinçli kabul edildi
  (zaten önceki turda belgelenmişti).
- **GERÇEK HATA #1 (süreç):** `leaveRoom`, bir katılımcı ayrıldığında oy
  çözümleme mantığını (`tryResolvePhase`) yeniden ÇALIŞTIRMIYORDU — yani 3
  kişiden 2'si aynı şeyi oyladıktan sonra anlaşmayan 3. kişi odadan
  ayrılsa bile, tur otomatik ilerlemiyor, birinin oyunu TEKRAR vermesi
  gerekiyordu. Düzeltme: oy çözümleme mantığı `castVote` içinden saf bir
  `tryResolvePhase(room, phase)` fonksiyonuna çıkarıldı, hem `castVote`
  hem `leaveRoom` kendi transaction'ları içinde bu fonksiyonu çağırıyor.
  İki bağımsız Playwright context'i ile doğrulandı: 3 kişi katılıp 2'si
  anlaşmazlığa düşünce (2/3, henüz sıfırlanmıyor) 3. kişi ayrılınca
  anlaşmazlık doğru şekilde otomatik sıfırlanıyor (0/2), sonra kalan 2
  kişi hemfikir olunca tur doğru ilerliyor.
- **GERÇEK HATA #2 (süreç/UX regresyonu):** Yeni `CaseEntry.tsx`, sayfa
  yenilendiğinde HER ZAMAN açılış sinematiğine ve mod seçim ekranına
  dönüyordu — devam eden bir solo oyunu ya da katılınmış bir odayı
  "unutuyordu". Bu, projenin önceden kurulmuş "Kaldığın Yerden Devam Et"
  ilkesini bozan bir regresyondu. Düzeltme: `CaseEntry` artık mount
  olurken `getStoredRoomCode`/`getCaseProgress(...).inProgress` kontrolü
  yapıp uygun moda (ve sinematiği atlayarak) otomatik dönüyor.
- **Ek kenar durum testleri (Playwright):** solo mod regresyon yok,
  geçersiz oda koduyla katılma doğru hata veriyor, sayfa yenileme sonrası
  odaya otomatik dönme (düzeltmeden sonra), paylaşımlı ipucu sınırı aşılmaya
  çalışılınca hata vermiyor (buton devre dışı kalıyor) — hepsi 0 konsol
  hatasıyla doğrulandı.
- Test sırasında görülen "HTTP 400 FAILED_PRECONDITION" hataları yine
  Firestore'un eşzamanlı transaction retry mekanizmasının beklenen/zararsız
  gürültüsü (önceki turda da not edilmişti).
- `npm run build` temiz. `npm run lint`'teki "Cannot access refs during
  render" / "Avoid calling setState in effect" uyarıları hâlâ SADECE bu
  oturumdan önce var olan dosyalarda (bkz. önceki not) — yeni eklenen iki
  düzeltmede yeni bir lint hatası yok.

## Service Worker Önbellek Hatası Bulundu ve Düzeltildi (2026-08-03, yirminci güncelleme)
Kullanıcı "GitHub'a gidiyor ama Vercel'de yüklenmiyor" dedi. Vercel deploy
durumu GitHub commit status'ları üzerinden (`gh api .../status`) kontrol
edildi — build başarıyla tamamlanmıştı ("Deployment has completed"), yani
build hatası değildi. Tarayıcı eklentisi kurulu olmadığı için canlı sitede
gerçek bir JS/konsol incelemesi yapılamadı, ama kod incelemesiyle **gerçek
ve ciddi bir hata** bulundu:

- **Kök neden:** `public/sw.js` (PWA service worker) **cache-first**
  stratejisi kullanıyordu (`return cached || network`) — önbellekte bir
  şey varsa onu hemen döndürüyor, ağdan gelen taze sürümü sadece arka
  planda "bir sonraki sefer" için güncelliyordu. Next.js her `npm run
  build`'de JS/CSS dosyalarının adını (content hash) değiştiriyor. Sonuç:
  daha önce siteyi ziyaret etmiş biri (deploy'dan önce), yeni bir deploy
  sonrası hâlâ ESKİ önbellekteki HTML'i alıyor, o HTML artık sunucuda
  OLMAYAN eski dosya adlarına işaret ediyor → JS dosyaları 404 veriyor →
  uygulama hiç başlamıyor, sayfa boş/bozuk kalıyor. Bu, siteyi daha önce
  ziyaret etmiş HERKESİ (geliştirici dahil) her yeni deploy'dan sonra
  etkileyen klasik bir "PWA + hash'li dosya adları" hatası.
- **Düzeltme:** Strateji **network-first**'e çevrildi — her istek önce
  ağdan denenir (her zaman taze), önbellek SADECE ağ erişilemezken
  (gerçek çevrimdışı durum) devreye giriyor. Ayrıca `CACHE_NAME`
  `supheli-v1` → `supheli-v2` yapıldı ki mevcut (bozuk) önbellek, yeni
  service worker aktive olduğunda otomatik silinsin (`activate`
  handler'daki eski-cache-temizleme mantığı zaten vardı, sadece isim hiç
  değişmediği için hiç tetiklenmiyordu).
- **Kullanıcının yapması gereken (bir kereliğine):** Bu düzeltme
  deploy olduktan sonra, daha önce siteyi ziyaret etmiş bir tarayıcıda
  BİR KEZ sert yenileme (Ctrl+Shift+R) ya da site verilerini temizleme
  gerekebilir — yeni service worker'ın devreye girip eski önbelleği
  silmesi için. Ondan sonra hiç bozulmamış gibi, her deploy sonrası
  otomatik taze içerik gelecek.
- **Doğrulanamayan kısım (dürüst not):** Bu oturumda gerçek bir tarayıcıda
  canlı siteyi açıp konsolu görme imkânı olmadı (kullanıcı Chrome
  eklentisini kurmadı), bu yüzden teşhis tamamen kod incelemesine dayanıyor
  — yüksek güvenle doğru teşhis ama kullanıcının deploy sonrası gerçekten
  düzeldiğini teyit etmesi gerekiyor.

## Sıradaki Adım
1. **Kullanıcı bu düzeltmenin canlıda işe yaradığını doğrulamalı** (bir
   kereliğine sert yenileme sonrası).
2. Canlıda gerçek iki cihaz/tarayıcıyla son bir doğrulama iyi olur
   (yerelde Playwright ile kapsamlı doğrulandı ama gerçek ağ gecikmesiyle
   bir kez daha denemek faydalı).
3. Diğer açık öneriler (henüz seçilmedi, öncelik değil): gerçek fiziksel
   cihaz testi (özellikle iOS Safari — hâlâ hiç yapılmadı, sadece
   Playwright WebKit emülasyonu var), Vaka 04 içeriği, oda modunda süre
   sınırı / presence-kopma takibi eklemek istenirse, önceden var olan
   (bu oturuma ait olmayan) lint hatalarının temizlenmesi.

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
