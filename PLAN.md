# Dijital Dedektif Oyunu — Detaylı Plan

## 1. Vizyon

Ücretsiz, web tabanlı, çok vakalı (multi-case) bir dedektif/cinayet çözme oyunu.
Mobil, tablet ve PC'de sorunsuz çalışacak, senaryo şeklinde ilerleyen, birden
fazla dava dosyası içeren dijital bir deneyim. Referans nokta: Trendyol'daki
"4 farklı dava dosyalı" fiziksel kutu oyunu — aynı hissi web'de yaratmak.

## 2. Araştırma Özeti

### Fiziksel kutu oyunları (referans üründeki gibi)
Bir dava dosyası genelde şunları içerir:
- Şüpheli ifadeleri
- WhatsApp görüşme dökümleri
- Sosyal medya paylaşımları (Twitter vb.)
- Drone videosu / kamera görüntüsü tarifi
- Balistik raporu, adli tıp raporu
- Forum mesajlaşmaları, gazete küpürü
- Karakter haritası, kuş bakışı olay yeri haritası
- İtiraf mektubu (genelde kapalı zarfta, oyun sonunda açılan "cevap")

Oynanış akışı: **(1) olayı oku → (2) kanıtları/ifadeleri incele → (3) şüphelileri
sorgula/karşılaştır → (4) mantık zinciriyle katili belirle → (5) suçla / cevabı aç**

### Dijital benzerleri (rakip/referans analizi)
- **cinayetoyunu.com** (TR, doğrudan rakip): Web tabanlı SPA. Google auth veya
  misafir modu, ilerleme localStorage'da. Backend: Supabase, ödeme: Stripe.
  3 adımlı oynanış (dosyayı aç → kanıtı analiz et → katili tek tahminle bul,
  yanlış tahmin vakayı kalıcı bitiriyor). Ücretsiz giriş vakaları + premium
  abonelik (aylık/yıllık) ile kilitli vakalar. ~8+ vaka, zorluk seviyeleri var.
- **5N1Dedektif**: Tamamen dijital dedektiflik oyunu, kanıt analizi + sorgu +
  mantık zinciri kurma üzerine.
- **Chronicles of Crime** (kutu oyunu + companion app, global): QR kod okutarak
  konum/karakter/nesne açma, 360° sahne inceleme, tanıklarla "sohbet" (bazıları
  yalan söylüyor/kaçıyor), uzman aranabiliyor (adli tabip, hacker, kriminolog),
  oyun içi zaman yönetimi var, final "Solve the Case" ekranında soru-cevapla
  puanlanıyor.

**Çıkarım:** Bizim oyun, kutu oyunundaki "gerçekçi belge/dosya" hissini,
Chronicles of Crime'daki interaktif inceleme/sorgu akışıyla birleştirip,
cinayetoyunu.com'un web-first teknik yaklaşımını (ama ücretsiz) izleyebilir.

## 3. Platform Kararı: Web Uygulaması (PWA) ✅

**Neden native masaüstü/mobil uygulama DEĞİL:**
- Apple Store yıllık 99$ ücret + inceleme süreci + güncelleme onay gecikmesi
- Ayrı platformlar için ayrı geliştirme/bakım yükü (iOS + Android + Windows + Mac)
- "İndir/kur" sürtünmesi, ücretsiz/casual bir oyun için gereksiz bariyer

**Neden Web App (PWA — Progressive Web App):**
- Tek kod tabanı, tek link → herkes tarayıcıdan anında oynar, kurulum yok
- Responsive tasarımla mobil/tablet/PC'ye otomatik uyum (senin istediğin gibi)
- PWA manifest + service worker ile "ana ekrana ekle" ve çevrimdışı oynanabilirlik
  eklenebilir → native app hissi verir ama store'a bağımlı değildir
- Yeni vaka eklediğinde anında tüm kullanıcılara ulaşır (native'de store onayı bekler)
- Ücretsiz barındırma (Vercel/Cloudflare Pages) senin "ücretsiz yayınlayacağım"
  hedefinle birebir örtüşüyor
- Kapı kapanmıyor: ileride istenirse Capacitor/Tauri ile aynı koddan store'a da
  paketlenebilir (gerekirse sonradan eklenecek bir katman, şimdiden şart değil)

**Sonuç:** Web sitesi/web uygulaması (PWA) olarak geliştirilecek. Ayrı bir
masaüstü/mobil app YAPILMAYACAK (en azından ilk fazlarda).

## 4. Teknoloji Yığını (Önerilen)

| Katman | Seçim | Neden |
|---|---|---|
| Framework | Next.js (React) + TypeScript | Statik export, SEO, PWA desteği hazır paketlerle kolay |
| Stil | Tailwind CSS | Hızlı, responsive, tutarlı tasarım |
| Vaka içeriği | JSON/Markdown dosyaları | Senaryo yazımı kod bilgisi gerektirmesin, içerik/kod ayrı |
| İlerleme kaydı | localStorage (başlangıç) → opsiyonel Supabase (bulut senkron, ileride) | Hesapsız oynanabilsin, sonra istenirse hesap eklenir |
| Barındırma | Vercel (ücretsiz) veya Cloudflare Pages | Otomatik HTTPS + CDN + ücretsiz |
| PWA altyapısı | next-pwa / Workbox | manifest + service worker, offline oynanabilirlik |

## 5. Oyun Yapısı / Mekanikler

- **Vaka Seçim Ekranı:** Birden fazla dava dosyası listelenir (sırayla açılan
  kilit sistemi mi, serbest seçim mi — karar bekliyor).
- **Vaka İçi Akış:**
  1. Senaryo girişi (atmosferik olay anlatımı)
  2. Kanıt/Belge inceleme: olay yeri raporu, otopsi raporu, mesaj dökümleri,
     sosyal medya, gazete küpürü — sekmeli "dosya gözatma" arayüzü
  3. Şüpheli profilleri + ifadeler (motiv, alibi)
  4. (İleri faz) Sorgulama: seçmeli sorularla şüpheliyi sıkıştırma
  5. Not defteri: oyuncunun kendi ipucu/bağlantılarını yazabildiği alan
  6. Suçlama ekranı: katili seç (+ motiv/yöntem/kanıt soruları, Chronicles of
     Crime'daki gibi puanlama için)
  7. Sonuç ekranı: doğru/yanlış, tam hikâyenin açıklanması, puan/rozet
- İpucu (hint) sistemi ve zorluk seviyeleri (opsiyonel, sonraki faz)
- Vakalar bağımsız mı yoksa ortak bir dedektif karakteri/evrenle mi bağlı
  olacak — karar bekliyor

## 6. Yol Haritası

**Faz 0 — Konsept & Tasarım** *(şu an burdayız)*
- Oyun adı, görsel kimlik/atmosfer tonu (karanlık-noir mi, modern-minimal mi)
- İlk vakanın tam senaryosu (belgeler, şüpheliler, çözüm) — kod öncesi netleşmeli
- Vaka içerik şablonu (JSON şeması)

**Faz 1 — MVP (Tek Vaka, Backend Yok)**
- Next.js iskeleti, responsive temel arayüz
- Tek vakayı uçtan uca oynanabilir hale getirme
- localStorage ile ilerleme
- Ücretsiz hosting'e deploy → canlı test linki

**Faz 2 — İçerik Genişletme**
- 3-4 vaka daha yazma ve entegre etme
- Not defteri, ipucu sistemi, vaka seçim ekranı

**Faz 3 — PWA Cilası**
- manifest.json, service worker, offline oynanabilirlik
- Gerçek mobil/tablet cihazlarda dokunmatik UX testi

**Faz 4 — (Opsiyonel) Hesap & Bulut**
- Supabase ile kayıt/skor/ilerleme senkronu (istenirse)

**Faz 5 — Yayın**
- Domain, sosyal paylaşım kartı (OG image), temel SEO
- Geri bildirim toplama

**Faz 6 — Yayın Sonrası**
- Yeni vakalar, sezonluk içerik, topluluk geri bildirimine göre iyileştirme

## 7. Açık Kararlar (Sıradaki Konuşma Konuları)

- [x] Oyunun adı ve görsel/atmosfer yönü → **ŞÜPHELİ**, karanlık/gizemli,
      kork-board + kırmızı iplik estetiği. Palet: #1A1A1A / #8B0000 / #D4AF37.
- [x] İlk vaka teması → Tren/kapalı mekan gizemi ("Yıldız Ekspresi",
      bkz. `vakalar/vaka-01-yildiz-ekspresi.md`)
- [x] İlk vakanın tam belge metinleri → yazıldı, bkz. `vakalar/vaka-01-belgeler.md`
- [x] Vakalar arası ortak evren/karakter olacak mı → **Hafif ortak evren +
      easter egg'ler**. Detay için bkz. §9.
- [ ] Sorgulama mekaniği derinliği (düz okuma mı, seçmeli soru-cevap mı)
- [ ] Vaka kilit sistemi mi, serbest seçim mi

## 7.1 İlham Kaynakları — Referans Oyun Mekanikleri

Kullanıcının işaret ettiği ürünlerin mekanik analizi (senaryo/karakter/metin
**kopyalanmayacak** — sadece yapı ve mekanik fikir olarak kullanılacak, telif
sorunu yaratmamak için tüm vaka içerikleri bizim orijinal yazımımız olacak):

- **Unsolved Case Files:** Vaka, birbirini takip eden 3 hedefe bölünmüş;
  her hedefte oyuncu cevabını resmi bir "cevap sayfası"nda kontrol ediyor,
  yanlışsa spoiler vermeden 3'e kadar ipucu hakkı var, doğruysa bir sonraki
  mühürlü zarf açılıyor. **Fikir:** Tek final suçlaması yerine, vaka içinde
  2-3 ara "hedef/soru" + kademeli açılan bölümler (Faz 2 adayı).
- **Hunt A Killer:** Vakalar bir TV sezonu gibi kurgulanmış — 6 bölüm,
  her biri bir öncekinin üzerine inşa ediliyor, hepsi final açılışına
  bağlanıyor. Fiziksel + dijital (hikaye içi web sitesi) karışık medya.
  **Fikir:** "Ortak evren" kararımız için güçlü bir referans — vakalarımızı
  bağımsız değil, sezonluk/bölümlü bir yapıda kurgulayabiliriz.
- **Chronicles of Crime (Community Editor):** Oyuncuların kendi
  senaryolarını yazabildiği ücretsiz bir "Senaryo Editörü" var, `.communityscenario`
  dosyaları paylaşılıyor. **Fikir:** İleride (Faz 5+) kendi basit "vaka
  editörü" aracımızı yapıp içerik üretimini hızlandırabiliriz / topluluğa
  açabiliriz.
- **Sherlock Holmes: Consulting Detective:** Gazete + adres rehberi + harita
  ile ipucu avı; final "quiz"de az yer gezip doğru cevaplayan daha yüksek
  puan alıyor. **Fikir:** Skor sistemi — az kanıtla/az yanlış tahminle
  çözmek daha yüksek puan versin (Faz 2 skor/rozet sistemi için).
- **Detective: A Modern Crime Board Game:** "Antares Database" adlı dijital
  bir sorgulama sistemi var (DNA/parmak izi gir, eşleşme bul); zaman
  maliyeti olan aksiyonlar; vakalar birbirine bağlı, bir vakadaki kararlar
  sonrakini etkiliyor. **Fikir:** İleri fazda oyuncunun kanıtları
  "sorgulayabildiği" basit bir dijital araç (örn. isim/ipucu arama) ve
  vakalar arası kararların iz bırakması.
- **ChipChop:** Aratıldı ama doğrulanabilir bir kaynak bulunamadı — kullanıcıdan
  link/daha fazla detay istenecek.

## 8. Marka Kimliği: ŞÜPHELİ

- **İsim:** ŞÜPHELİ
- **Slogan:** "Herkes bir şey saklıyor."
- **Palet:** #1A1A1A (siyah), #8B0000 (koyu kırmızı), #D4AF37 (altın vurgu),
  kağıt/krem tonları belge arka planları için
- **Görsel dil:** Kork-board (mantar pano) + kırmızı iplikle bağlanan kanıtlar,
  dramatik başlık fontu + okunaklı gövde metni, dedektifin "duvar" hissi

## 9. Ortak Evren Kanonu (Hafif Bağ + Easter Egg'ler)

**Karar (2026-08-02):** Vakalar birbirinden **bağımsız çözülebilir** kalacak
— sıra şart değil, bir vakayı oynamadan diğerini anlamak/çözmek mümkün.
Ama hepsi aynı kurgusal Türkiye'de geçiyor ve aralarında **bulmaca
mantığını hiç etkilemeyen**, sadece birden fazla vaka oynayan dikkatli
oyuncuyu ödüllendiren küçük referanslar olacak.

**Kurallar:**
- Yeni bir vaka yazarken, mümkünse önceki vaka(lar)a **tek cümlelik, saf
  flavor-text bir gönderme** ekle (genelde `synopsis` alanına — kanıt
  belgelerine değil, çünkü kanıtlar çözüm mantığının parçası, oraya
  eklenen bir detay yanlışlıkla ipucu sanılabilir).
- Bu göndermeler **asla** çözüme, ipucuna ya da şüpheli kimliğine
  dokunmaz — sadece "aynı dünyadayız" hissi verir (örn. bir önceki
  vakadaki cinayetin ülke gündemini sarstığından bahsetmek).
- Vakalar arası **kronolojik sıra** korunur (Vaka 01 önce, Vaka 02 sonra,
  vb.) — sonraki vaka öncekine referans verebilir, tersi olmaz.
- İleride (isteğe bağlı, henüz karar verilmedi) tekrarlayan bir gazete adı
  (öneri: **Meridyen Gazetesi**) ve/veya cinayet vakalarını takip eden
  tekrarlayan bir gazeteci karakteri (öneri: **Pelin Ergüven**) tüm
  vakalarda flavor-text seviyesinde geçebilir — bir "easter egg" imzası
  gibi. Zorunlu değil, sadece hazır bir araç.

**Uygulandı:** Vaka 02 ("Son Round") synopsis'ine, Vaka 01'e ("Yıldız
Ekspresi") tek cümlelik geriye dönük bir gönderme eklendi.
