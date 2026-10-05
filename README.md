# ŞÜPHELİ — Dijital Dedektif Oyunu 🕵️

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-ffca28?logo=firebase&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-offline_ready-5A0FC8)
![License](https://img.shields.io/badge/license-MIT-green)

<p align="center"><b><a href="#english">English</a></b> · <b><a href="#türkçe">Türkçe</a></b></p>

**Live demo:** https://dedektif-app.vercel.app

---

## English

**ŞÜPHELİ** ("Everyone's hiding something.") is a free, multi-case digital
detective / murder-mystery game — a web app and installable PWA. It recreates
the feel of a physical "case file" box game in the browser: read the case,
sift through realistic documents, question the suspects, build a chain of logic,
and name the killer. Play on your own or gather friends in a shared room and
solve the case together by vote.

### Gameplay loop

1. **Read** the case — victim, synopsis and the mood.
2. **Examine** the evidence: official reports, chat logs, transcripts, emails, social posts and more.
3. **Question** the suspects by comparing their statements and interrogation answers.
4. **Build** your theory on the cork evidence board and cross-reference the timeline.
5. **Accuse** the killer, then answer the follow-up **motive** and **method** questions — these feed your detective rank.
6. **Reveal** the solution and see how you did.

### Features

- **Two ways to play:** solo (`/vaka`) or with friends in a shared room (`/oda`), where the group meets, votes on which case to open, and then votes on the killer, motive and method together.
- **Rich document types** rendered in-character: official report, WhatsApp chat, phone transcript, ticket record, daily log, witness statement, email, security-camera note, social-media post, news clipping, audio-recording summary, plus two interactive puzzles — an **encrypted record** (cipher to crack) and a **locked safe** (combination lock).
- **Investigation tools:** a draggable **evidence board** with pinned cards and connecting strings, a chronological **timeline**, a personal **notebook**, and a sequential **hint** system for when you get stuck.
- **Suspects** with their own statements, motives, opportunities and police Q&A.
- **Detective ranks & achievements** based on accuracy and coverage, plus a shareable result card.
- **Installable PWA:** add to home screen, portrait-first mobile layout, and offline support via a service worker.
- Atmospheric design with Playfair Display / Inter / IBM Plex Mono / Caveat typography and subtle Motion animations.

### Cases

Four cases ship with the game (shown in order; some may appear as "coming soon"
until unlocked):

1. **Yıldız Ekspresi** — a case aboard the Star Express.
2. **Son Round** — a boxing-world mystery.
3. **Zümrüt Yalı** — a waterfront-mansion case.
4. **Perde Arkası** — a theatre-themed case.

New cases are self-contained `CaseData` objects under `src/data/cases/`, so the
game grows just by adding a file.

### Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Firebase
Firestore (real-time multiplayer rooms) · Motion (animation). Multiplayer rooms
run entirely on Firestore — a room document moves through phases
(`voting-case → investigating → voting-killer → voting-motive → voting-method →
revealed`) and abandoned rooms clean themselves up via Firestore's TTL, with no
Cloud Functions required.

### Project structure

```
src/
├── app/                 # App Router pages
│   ├── page.tsx         # Home: solo vs. multiplayer choice + tutorial
│   ├── vaka/            # Solo case list and /vaka/[caseId] play screen
│   └── oda/             # Multiplayer room (RoomCaseGame)
├── components/          # Game UI (evidence board, timeline, notebook, suspect/document cards, chat…)
├── data/
│   ├── cases/           # One file per case (vaka-01…04) + index
│   └── tutorialCase.ts  # Mini onboarding case
├── lib/                 # Game logic (room, chat, board, rank, progress, cipher, achievements, firebase…)
└── types/case.ts        # CaseData / Suspect / CaseDocument type model
```

### Setup

**1. Install**
```bash
npm install
```

**2. Firebase (free)**
1. Create a project at [console.firebase.google.com](https://console.firebase.google.com) and enable **Cloud Firestore**.
2. From **Project settings → General → Your apps (Web)**, copy the config values.
3. Deploy the included Firestore rules and indexes (requires the [Firebase CLI](https://firebase.google.com/docs/cli)):
   ```bash
   firebase deploy --only firestore:rules,firestore:indexes
   ```

**3. Environment variables**

Create a `.env.local` file in the project root (do **not** commit it — it is
git-ignored). These `NEXT_PUBLIC_*` values are the standard Firebase web config;
real protection comes from the Firestore security rules in `firestore.rules`.

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=000000000000
NEXT_PUBLIC_FIREBASE_APP_ID=1:000000000000:web:xxxxxxxx
```

**4. Run locally**
```bash
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

**5. Deploy (Vercel)**

Import the repo on [vercel.com](https://vercel.com), add the same environment
variables under **Environment Variables**, and deploy.

### License

MIT — see [LICENSE](./LICENSE).

---

## Türkçe

**ŞÜPHELİ** ("Herkes bir şey saklıyor.") ücretsiz, çok vakalı bir dijital
dedektif / cinayet çözme oyunudur — bir web uygulaması ve kurulabilir PWA.
Fiziksel bir "dava dosyası" kutu oyununun hissini tarayıcıya taşır: vakayı oku,
gerçekçi belgeleri incele, şüphelileri sorgula, bir mantık zinciri kur ve katili
bul. Tek başına oyna ya da arkadaşlarınla ortak bir odada buluşup vakayı birlikte,
oylayarak çöz.

### Oynanış akışı

1. Vakayı **oku** — kurban, özet ve atmosfer.
2. Kanıtları **incele**: resmi raporlar, sohbet dökümleri, ifadeler, e-postalar, sosyal medya ve dahası.
3. Şüphelileri, ifadelerini ve sorgu cevaplarını karşılaştırarak **sorgula**.
4. Teorini mantar **kanıt panosunda** kur ve **zaman çizelgesiyle** çapraz kontrol et.
5. Katili **suçla**, ardından **neden** (motiv) ve **nasıl** (yöntem) takip sorularını yanıtla — bunlar dedektif rütbeni etkiler.
6. Çözümü **aç** ve nasıl yaptığını gör.

### Özellikler

- **İki oynama yolu:** tek başına (`/vaka`) ya da ortak odada arkadaşlarınla (`/oda`) — grup buluşur, hangi vakayı açacağına oylayarak karar verir, sonra katil, motiv ve yöntemi birlikte oylar.
- **Zengin belge türleri** kendi kimliğinde gösterilir: resmi rapor, WhatsApp sohbeti, telefon dökümü, bilet kaydı, günlük log, tanık ifadesi, e-posta, güvenlik kamerası notu, sosyal medya gönderisi, haber küpürü, ses kaydı özeti; ayrıca iki interaktif bulmaca — **şifreli kayıt** (çözülecek şifre) ve **kilitli kasa** (kombinasyon kilidi).
- **İnceleme araçları:** iğnelenmiş kartlar ve bağlantı ipleriyle sürüklenebilir bir **kanıt panosu**, kronolojik bir **zaman çizelgesi**, kişisel bir **defter** ve takıldığında sırayla açılan bir **ipucu** sistemi.
- Kendi ifadeleri, motivleri, fırsatları ve polis soru-cevabı olan **şüpheliler**.
- Doğruluk ve kapsama göre **dedektif rütbeleri ve başarımlar**, ve paylaşılabilir bir sonuç kartı.
- **Kurulabilir PWA:** ana ekrana ekleme, dikey öncelikli mobil düzen ve service worker ile çevrimdışı destek.
- Playfair Display / Inter / IBM Plex Mono / Caveat tipografisi ve ince Motion animasyonlarıyla atmosferik tasarım.

### Vakalar

Oyunla birlikte dört vaka gelir (sıralı; bazıları kilidi açılana kadar "Yakında
Açılacak" görünebilir):

1. **Yıldız Ekspresi** — Yıldız Ekspresi treninde geçen bir vaka.
2. **Son Round** — boks dünyasında bir gizem.
3. **Zümrüt Yalı** — yalı temalı bir vaka.
4. **Perde Arkası** — tiyatro temalı bir vaka.

Yeni vakalar `src/data/cases/` altında kendi içinde tam `CaseData` nesneleridir;
yani oyun yalnızca bir dosya eklenerek büyür.

### Teknoloji

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Firebase
Firestore (gerçek zamanlı çok oyunculu odalar) · Motion (animasyon). Çok oyunculu
odalar tamamen Firestore üzerinde çalışır — bir oda belgesi fazlar arasında
ilerler (`voting-case → investigating → voting-killer → voting-motive →
voting-method → revealed`) ve terk edilen odalar Firestore'un TTL özelliğiyle
kendi kendini temizler; Cloud Functions gerekmez.

### Proje Yapısı

```
src/
├── app/                 # App Router sayfaları
│   ├── page.tsx         # Ana sayfa: tek/çok oyunculu seçimi + rehber
│   ├── vaka/            # Tekli vaka listesi ve /vaka/[caseId] oyun ekranı
│   └── oda/             # Çok oyunculu oda (RoomCaseGame)
├── components/          # Oyun arayüzü (kanıt panosu, zaman çizelgesi, defter, şüpheli/belge kartları, sohbet…)
├── data/
│   ├── cases/           # Her vaka için bir dosya (vaka-01…04) + index
│   └── tutorialCase.ts  # Kısa tanıtım vakası
├── lib/                 # Oyun mantığı (room, chat, board, rank, progress, cipher, achievements, firebase…)
└── types/case.ts        # CaseData / Suspect / CaseDocument tip modeli
```

### Kurulum

**1. Yükle**
```bash
npm install
```

**2. Firebase (ücretsiz)**
1. [console.firebase.google.com](https://console.firebase.google.com) üzerinde bir proje oluştur ve **Cloud Firestore**'u etkinleştir.
2. **Project settings → General → Your apps (Web)** bölümünden config değerlerini kopyala.
3. Depodaki Firestore kurallarını ve index'lerini yayınla ([Firebase CLI](https://firebase.google.com/docs/cli) gerektirir):
   ```bash
   firebase deploy --only firestore:rules,firestore:indexes
   ```

**3. Ortam değişkenleri**

Proje kök dizininde bir `.env.local` dosyası oluştur (bu dosyayı **commit etme** —
git tarafından yok sayılır). Bu `NEXT_PUBLIC_*` değerleri standart Firebase web
config'idir; asıl koruma `firestore.rules` içindeki Firestore güvenlik
kurallarından gelir.

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=000000000000
NEXT_PUBLIC_FIREBASE_APP_ID=1:000000000000:web:xxxxxxxx
```

**4. Yerelde çalıştır**
```bash
npm run dev      # http://localhost:3000
```

Diğer script'ler: `npm run build`, `npm run start`, `npm run lint`.

**5. Yayınla (Vercel)**

Repoyu [vercel.com](https://vercel.com) üzerinde içe aktar, aynı ortam
değişkenlerini **Environment Variables** bölümüne ekle ve deploy et.

### Lisans

MIT — bkz. [LICENSE](./LICENSE).
