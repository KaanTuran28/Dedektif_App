import type { CaseData } from "@/types/case";

export const vaka02: CaseData = {
  id: "vaka-02-son-round",
  order: 2,
  title: "Son Round",
  difficulty: "orta",
  tagline: "Büyük yatırım turunun imzalanacağı gece, genç bir CEO kendi ofisinde öldürüldü.",
  available: false,
  synopsis:
    "Nova Teknoloji, İstanbul'da hızla büyüyen bir yapay zeka girişimi. Bu gece, şirketin değerini kat kat artıracak büyük bir yatırım turu imzalanacaktı. Saat 23:30'da, 28. kattaki CEO ofisinde kurucu ortak ve CEO Deniz Aral, kafasına aldığı sert bir darbeyle ölü bulundu. Suç aleti, kendi masasındaki kristal 'Yılın Girişimcisi' ödülü. Kata sadece kartlı geçişle giriliyor, her hareket loglanıyor — ama log, beklenenin aksine kimsenin orada olmadığını değil, bir kaydın eksik olduğunu gösteriyor. Katil hâlâ o gece binada olan beş kişiden biri. Birkaç ay önce ülke gündemini sarsan Yıldız Ekspresi cinayetinin ardından, kamuoyu bir kez daha benzer bir gizemle çalkalanıyor.",
  victim: {
    name: "Deniz Aral",
    age: 34,
    description:
      "Nova Teknoloji'nin kurucu ortağı ve CEO'su. Karizmatik, hırslı, medyanın gözdesi. Şirketi büyütmek için sert kararlar almaktan çekinmeyen biri — bu gece imzalanacak yatırım turunda bazı ortaklarının hisselerini büyük ölçüde sulandıran maddeler olduğu ortaya çıkıyor.",
  },
  suspects: [
    {
      id: "ozan",
      name: "Ozan Kırca",
      age: 36,
      role: "Ortak Kurucu / CTO",
      motive:
        "Deniz, yeni yatırım turunda Ozan'ın hisselerini ciddi şekilde sulandıran bir madde eklemiş, üstelik Ozan'ın geliştirdiği çekirdek teknolojiyi kendi adına patentletmeye çalıştığını gösteren bir yazışma ortaya çıkmıştı.",
      opportunity:
        "CTO olarak bina güvenlik/kartlı geçiş sisteminin admin erişimine sahip — kendi giriş kaydını sistemden silebilir.",
      statementIntro:
        "\"Deniz'le sekiz yıl önce bu şirketi kurduk, yıllarımı bu şirkete verdim. Son yatırım turunda hisselerimin ciddi şekilde sulandırılacağını öğrendiğimde şok oldum, üstelik yıllarımı verdiğim çekirdek teknolojiyi kendi adına patentletmek istiyordu. O gece evdeydim, bu yorucu tartışmadan sonra sakinleşmem gerekiyordu. Log kayıtlarına bakarsanız zaten binada görünmüyorum.\"",
      statementQA: [
        { question: "Deniz'le e-posta yazışmanızda çok sinirli görünüyorsunuz, doğru mu?", answer: "Evet, çok kızgındım. Ama kızgınlık cinayet demek değil." },
        { question: "O gece gerçekten evde miydiniz, doğrulayabilecek biri var mı?", answer: "Yalnız yaşıyorum, kimse doğrulayamaz. Ama neden yalan söyleyeyim ki?" },
        { question: "Bina güvenlik sisteminin admin yetkisine kimin erişimi var?", answer: "Benim, CTO olarak. Ama bunu asla kötüye kullanmadım." },
        { question: "Sistemde bir kayıt silindiyse bunu kimin yapabileceğini düşünürsünüz?", answer: "(uzun bir duraksama) Bilmiyorum. Belki bir teknik sorun olmuştur." },
      ],
    },
    {
      id: "aylin",
      name: "Aylin Sezer",
      age: 41,
      role: "Mali İşler Direktörü (CFO)",
      motive:
        "Şirketin finansallarında bir usulsüzlük şüphesi vardı, yatırım turunun due diligence sürecinde ortaya çıkacaktı; Deniz bunu biliyordu.",
      opportunity: "O gece geç saate kadar ofisteydi, 28. kata erişimi var.",
      statementIntro:
        "\"Nova'da altı yıldır CFO'yum, sayılarla yaşarım. O gece geç saate kadar ofisteydim, evet, bazı finansal kayıtları kişisel yedeğime aktarıp sildim ama bunun cinayetle hiçbir ilgisi yok. Deniz'in kendi talimatıyla yaptığımız, sınırda ama yasal bir vergi yapılandırmasıydı, due diligence'ta yanlış anlaşılıp hem şirketi hem beni zor durumda bırakmasından korktum. Saat 23:20 gibi çıktım, Deniz'i yaşarken son görenlerden değildim bile.\"",
      statementQA: [
        { question: "Neden finansal kayıtları sildiniz?", answer: "Panikledim. Yatırım turunun gözden geçirmesi başlayacaktı, o kayıtlar yanlış yorumlanabilirdi." },
        { question: "Bu, Deniz'in bilgisi dahilinde miydi?", answer: "Evet, talimat ondan gelmişti aslında. Ama o artık burada değil, ben tek başıma savunmasız kaldım." },
        { question: "23:05'te tam olarak neredeydiniz?", answer: "Kendi ofisimdeydim, sunucudaki dosyalarla uğraşıyordum." },
        { question: "Deniz'in ofisine hiç girdiniz mi o gece?", answer: "Hayır, bir kez bile. Onunla konuşacak halim de yoktu açıkçası, bu iş beni fazlasıyla germişti." },
      ],
    },
    {
      id: "baris",
      name: "Barış Ete",
      age: 29,
      role: "Eski Yazılımcı (kovulan)",
      motive:
        "İki ay önce haksız yere kovulduğunu düşünüyor, işe iade davası açmış; Deniz'in yeni işverenlere kötü referans verdiğini öğrenmiş.",
      opportunity: "Eski kartı iptal edilmemiş, o gece lobiden içeri girmiş.",
      statementIntro:
        "\"İki ay önce haksız yere kovuldum, buna hâlâ inanıyorum. Deniz'in yeni işverenlere kötü referans verdiğini öğrendiğimde çok kırıldım, bir de üstüne işe iade davası açtım. O gece sadece eşyalarımı almak için geldim, güvenlik beni eski kartımla içeri aldı, resepsiyonda birkaç dakika bekledim, kutumu alıp çıktım. Asansöre bile binmedim, 28. kata hiç çıkmadım.\"",
      statementQA: [
        { question: "Neden o saatte, gece geldiniz eşyalarınızı almaya?", answer: "Gündüz kimseyle karşılaşmak istemedim, utanç vericiydi benim için." },
        { question: "Deniz'i görmeyi bekliyor muydunuz?", answer: "Hayır, ondan uzak durmak istiyordum aslında. Görsem ne söyleyeceğimi bile bilmiyordum." },
        { question: "Lobiden sonra nereye gittiniz?", answer: "Direkt arabama, eve gittim. Kamera kayıtları da bunu gösteriyor zaten, beş dakika kaldım sadece." },
      ],
    },
    {
      id: "selin",
      name: "Selin Konuk",
      age: 45,
      role: "Yatırımcı / VC Ortağı",
      motive:
        "Deniz, imza gecesi son anda anlaşma şartlarını kendi lehine değiştirmeye çalışmış; Selin'in fonu için büyük bir kayıp anlamına geliyordu. Ayrıca Deniz, Selin'in geçmişte örtbas ettiği bir skandalı biliyordu.",
      opportunity:
        "Akşamüstü ön görüşme için binadaydı, gece toplantısına da katılması bekleniyordu.",
      statementIntro:
        "\"Fonumuz Nova'ya iki yıl önce yatırım yaptı, bu gece imzalanacak yeni tur benim için de kritikti. Akşamüstü ön görüşme için ofisteydim, sonra havalimanına gidip İzmir'e uçtum, orada başka bir toplantım vardı. Deniz'in son anda şartları kendi lehine değiştirmeye çalıştığını biliyordum, bu fonumuz için ciddi bir kayıp anlamına geliyordu, kızgındım ama İstanbul'da bile değildim o saatte.\"",
      statementQA: [
        { question: "Bina girişinde misafir kartınızla bir kayıt var, bunu açıklar mısınız?", answer: "O kart akşamüstü toplantısı içindi, iade etmeyi unutmuş olabilirim ama ben 20:15 uçağıyla İstanbul'dan ayrıldım." },
        { question: "Deniz'in sizinle ilgili bildiği bir sır olduğu doğru mu?", answer: "Geçmişte örtbas ettiğim bir olay vardı, evet, bunu biliyordu. Ama bunu kullanmadı, en azından henüz." },
        { question: "İzmir'deki otel kaydınızı doğrulatabilir miyiz?", answer: "Tabii, check-in saatim 22:02, resepsiyon hatırlar beni." },
      ],
    },
    {
      id: "yagmur",
      name: "Yağmur Diker",
      age: 26,
      role: "Kişisel Asistanı",
      motive:
        "Deniz ile gizli bir ilişkisi vardı; Deniz ilişkiyi bitirip Selin'in ekibinden biriyle görüşmeye başlamıştı, Yağmur bunu yeni öğrenmişti.",
      opportunity: "Ofise sürekli girip çıkan tek kişi, kimse hareketini sorgulamaz.",
      statementIntro:
        "\"Deniz'in kişisel asistanıyım, iki yıldır. Aramızda gizli bir ilişki vardı, bunu şimdi saklamanın anlamı yok. Son zamanlarda ilişkimizi bitirdi, Selin'in ekibinden biriyle görüşmeye başladığını öğrendim, çok kırıldım ama bu beni cinayete sürükleyecek bir şey değil. O gece resepsiyonda bekledim, gece nöbetçisi ve temizlikçiyle birlikteydim, 23:30'da toplantıyı hatırlatmaya gittiğimde onu o halde buldum.\"",
      statementQA: [
        { question: "İlişkinizin bitmesi sizi ne kadar etkiledi?", answer: "Çok. Ama onu öldürmek... hayır, asla düşünmedim bile." },
        { question: "23:30'a kadar nerede olduğunuzu doğrulayabilecek biri var mı?", answer: "Evet, gece nöbetçisi Kadir ve temizlikçi Fatma Hanım, ikisi de yanımdaydı." },
        { question: "Ofise sık girip çıktığınız doğru mu?", answer: "Evet, işim gereği, kimse hareketimi sorgulamaz. Ama o gece 22:25'ten sonra hiç girmedim, ta ki onu bulana kadar." },
      ],
    },
  ],
  documents: [
    {
      id: "olay-yeri-raporu",
      type: "resmi_rapor",
      title: "Olay Yeri İnceleme Tutanağı",
      meta: "Nova Teknoloji A.Ş. · Tutanak No: 2026/NR-041 · Komiser Zeynep Akalın",
      body: `Kurbanın masasındaki kristal "Yılın Girişimcisi" ödülü kırık halde, kurbanın yanında bulunmuştur; suç aleti olduğu değerlendirilmektedir. Ofis kapısında zorla giriş izi yoktur. Mücadele izi sınırlıdır — kurbanın saldırganı tanıdığı ve masasına sırtı dönükken ani bir darbe aldığı değerlendirilmektedir.

Odada, yatırım turu sözleşmesinin bir nüshası üzerinde el yazısıyla yapılmış itiraz notları bulunmuştur.`,
    },
    {
      id: "otopsi-raporu",
      type: "resmi_rapor",
      title: "Adli Tıp Ön Raporu",
      meta: "Adli Tıp Kurumu · Rapor No: ATK-2026-0522 · Dr. Mert Solmaz",
      body: `Ölümün 22:50–23:10 saatleri arasında gerçekleştiği değerlendirilmektedir. Kafatasında tek, sert bir cisimle indirilmiş künt travma tespit edilmiştir. Savunma izi yoktur — kurban darbeyi beklemiyordu.`,
    },
    {
      id: "kart-log-ana",
      type: "gunluk_log",
      title: "Kartlı Geçiş Sistemi Ana Log Dökümü",
      meta: "Nova Güvenlik · 28. Kat Erişim Logu (Ana Sistem)",
      body: `21:48  D.ARAL     GİRİŞ   28. Kat
21:49  O.KIRCA    GİRİŞ   28. Kat
21:50  A.SEZER    GİRİŞ   28. Kat
21:52  S.KONUK    GİRİŞ   28. Kat (misafir kartı)
22:40  A.SEZER    GİRİŞ   Mali İşler Ofisi
23:15  S.KONUK    ÇIKIŞ   Bina (misafir kartı iade)
23:20  A.SEZER    ÇIKIŞ   28. Kat
23:30  Y.DİKER    GİRİŞ   28. Kat

(Not: Ozan Kırca'nın 21:49'daki ilk toplantı girişi dışında, gece boyunca başka bir giriş/çıkış kaydı görünmüyor.)`,
    },
    {
      id: "it-anomali-raporu",
      type: "resmi_rapor",
      title: "IT Güvenlik Yedek/Anomali Raporu",
      meta: "Sentinel Bilişim (Dış Denetim) · Talep: Kolluk Kuvvetleri",
      body: `Ana erişim log sunucusu ile yedek ("gölge") log sunucusu karşılaştırıldığında, 22:45 ve 23:15 saatlerine ait iki kayıt ana sistemde silinmiş, ancak gölge sunucuda hâlâ mevcut bulunmuştur:

22:45  O.KIRCA    GİRİŞ   28. Kat, CEO Ofisi
23:15  O.KIRCA    ÇIKIŞ   28. Kat

Silme işlemi, sistem yöneticisi (admin) yetkisiyle, 23:22'de gerçekleştirilmiş olup, bu yetkiye şirket içinde yalnızca CTO erişebilmektedir. Silme işleminin kaynağı olan cihaz, Ozan Kırca'nın şirket dizüstü bilgisayarıyla eşleşmektedir.`,
    },
    {
      id: "eposta-deniz-ozan",
      type: "eposta",
      title: "Deniz–Ozan E-posta Yazışması",
      meta: "Olaydan 3 gün önce",
      emailHeader: {
        from: "Deniz Aral",
        to: "Ozan Kırca",
        subject: "Yeni tur — hisse yapısı hakkında",
        date: "23:41",
      },
      body: `Ozan, avukatlarla konuştum. Yeni turda senin payın biraz daha sulanacak, biliyorsun bu normal — büyümek için gerekli. Ayrıca çekirdek modelin patent başvurusunu şirket adına değil benim adıma yapmamız konusunda ısrar ediyorum, yatırımcılar bunu istiyor. Yarın konuşalım.

— Ozan'ın yanıtı (aynı gün, 23:58) —

Deniz, o modeli GECELERİMİ VEREREK ben yazdım. Şirket adına bile değil, "senin" adına mı? Bu bir şaka olmalı. Yarın yüz yüze konuşacağız, ama söyleyeyim: bu kabul edilebilir bir şey değil.`,
    },
    {
      id: "mali-denetim-notu",
      type: "resmi_rapor",
      title: "Mali Denetim Notu — Aylin Sezer",
      meta: "İç Denetim Notu (soruşturma dosyasına eklenmiştir)",
      body: `Aylin Sezer, olay gecesi saat 23:05 civarında, şirketin son iki çeyrek finansal kayıtlarından bir kısmını kişisel yedeğine aktarıp sunucudan sildiği tespit edilmiştir. Sorgusunda, bu kayıtların CEO Deniz Aral'ın bizzat talimatıyla yapılan, tartışmalı ancak yasal bir vergi yapılandırması olduğunu, due diligence sürecinde yanlış anlaşılıp şirketi zor durumda bırakmasından korktuğu için sakladığını beyan etmiştir. Belgeler incelendiğinde beyanı doğrulanmıştır; cinayetle bağlantısını gösteren bir bulguya rastlanmamıştır.`,
    },
    {
      id: "lobi-kamera",
      type: "guvenlik_kamerasi",
      title: "Lobi Güvenlik Kamerası Görüntüsü",
      meta: "Nova Güvenlik · Kamera 02 — Lobi",
      cameraTimestamp: "CAM-02 · 22:14:37",
      body: `22:14 — B.ETE lobiye girer, eski personel kartı okutulur (sistem uyarı verir ama görevli "eski çalışan, eşya almaya gelmiştir" diyerek geçirir).
22:15 — B.ETE resepsiyon önünde bekler.
22:19 — B.ETE bir kutu eşyayla lobiden çıkar. Asansöre hiç binmemiştir, 28. kata çıkmamıştır.`,
    },
    {
      id: "ofis-ses-kaydi",
      type: "ses_kaydi",
      title: "Ofis Koridorundan Duyulan Ses Kaydı",
      meta: "Temizlik personelinin telefonuyla yanlışlıkla kaydedilmiş",
      audioDuration: "0:38",
      body: `(Boğuk, net olmayan sesler)
"...senin adına... bu kabul edilemez bir şey..."
(bir şeylerin masaya sertçe konulduğu / devrildiği ses)
"...yarın konuşacağız zaten, şimdi olmaz..."
(ardından sessizlik, uzaklaşan ayak sesleri)

Not: Kayıt saat 22:47 civarına ait, kimin sesi olduğu net olarak ayırt edilememektedir.`,
    },
    {
      id: "selin-ucus-kaydi",
      type: "bilet_kaydi",
      title: "Selin Konuk — Uçuş/Otel Kaydı",
      meta: "THY / Izmir Palas Otel",
      body: `Yolcu: Selin Konuk
Uçuş No: TK-2074, İstanbul → İzmir
Kalkış: 20:15 · Varış: 21:25
Otel: Izmir Palas, Check-in: 22:02

Not: Olay gecesi saat 21:52'de bina girişinde "misafir kartı" kullanıldığı görülse de, bu kartın o akşam erken saatte (19:30 toplantısı için) alınıp iade edilmediği, güvenlik tarafından yanlışlıkla gece kaydına işlendiği tespit edilmiştir. Uçuş ve otel kayıtları, Selin Konuk'un 21:25'te İzmir'de olduğunu doğrulamaktadır.`,
    },
    {
      id: "yagmur-ifade",
      type: "ifade",
      title: "Yağmur Diker İfadesi",
      meta: "Kişisel Asistan, 26 · Kurbanın son gördüğü kişilerden",
      body: `"Deniz'i son kez 22:25'te gördüm, ofisine çekiliyordu, biraz gergindi. Ben resepsiyonda kaldım, gece nöbetçisi Kadir ve temizlikçi Fatma Hanım'la birlikteydim, ikisi de doğrular. 23:30'da toplantı bitti, herkes onu bekliyordu, ben çağırmaya gittim... O halde buldum."`,
    },
    {
      id: "nova-haber",
      type: "haber_kupuru",
      title: "Yatırım Turu Öncesi Merak",
      newsHeader: {
        publication: "Meridyen Gazetesi",
        headline: "Nova Teknoloji Dev Yatırım Turuna Hazırlanıyor",
        byline: "Ekonomi Servisi",
        date: "Olaydan 2 gün önce",
      },
      body: `Yapay zeka alanında hızla büyüyen Nova Teknoloji'nin, şirket değerini kat kat artıracak yeni bir yatırım turuna hazırlandığı öğrenildi. Sektör kaynakları, imza töreninin bu hafta içinde gerçekleşeceğini belirtirken, şirket içi kaynaklar bazı ortaklık paylarının yeniden yapılandırılacağına dair "gerilimli" görüşmelerin sürdüğünü aktardı. Nova Teknoloji'den konuya ilişkin resmi bir açıklama gelmedi.`,
    },
  ],
  timeline: [
    { time: "19:30", description: "Selin ön görüşme için ofise gelir, misafir kartı alır, ardından havalimanına gider." },
    { time: "20:15", description: "Selin'in uçağı İstanbul'dan kalkar." },
    { time: "21:48–21:52", description: "Deniz, Ozan ve Aylin gece toplantısı için 28. kata girer." },
    { time: "21:52", description: "Kart sisteminde Selin adına bir giriş kaydı görünüyor — kendisi 'o saatte İzmir'deydim' diyor.", contradicts: "selin" },
    { time: "22:14–22:19", description: "Barış lobiye girer, eşyalarını alıp 5 dakikada çıkar (28. kata çıkmaz)." },
    { time: "22:40", description: "Aylin kendi ofisine kartla girer." },
    { time: "22:45", description: "Ozan'ın gerçek girişi (yalnızca gölge log'da var) — kendisi 'evdeydim, o gece binaya hiç gitmedim' diyor.", contradicts: "ozan" },
    { time: "22:50–23:10", description: "Cinayet gerçekleşir." },
    { time: "23:15", description: "Ozan çıkar (yalnızca gölge log'da var)." },
    { time: "23:20", description: "Aylin çıkar." },
    { time: "23:30", description: "Yağmur, Deniz'i toplantıya çağırmaya gelip cesedi bulur." },
  ],
  hints: [
    "Bir sistemde bir kaydın 'olmaması' her zaman masumiyet göstermez. Kimin o tür bir kaydı değiştirebilecek yetkisi olabileceğini düşün.",
    "Motivi en güçlü görünenler bazen doğru kişi olmayabilir — kimin gerçekten erişimi olduğuna odaklan.",
  ],
  motiveQuestion: {
    prompt: "Katilin asıl motivi neydi?",
    options: [
      { id: "m1", label: "Hisse sulandırma + kendi geliştirdiği teknolojinin patentinin elinden alınması", correct: true },
      { id: "m2", label: "Finansal usulsüzlüğün ifşa olma korkusu", correct: false },
      { id: "m3", label: "Haksız işten çıkarılma", correct: false },
      { id: "m4", label: "Yatırım anlaşmasının bozulması", correct: false },
    ],
  },
  methodQuestion: {
    prompt: "Katil, giriş kaydını nasıl 'yok' gösterdi?",
    options: [
      { id: "y1", label: "CTO olarak sahip olduğu admin yetkisiyle kendi log kaydını ana sistemden sildi", correct: true },
      { id: "y2", label: "Hiç kart kullanmadan merdivenden çıktı", correct: false },
      { id: "y3", label: "Başka birinin kartını çaldı", correct: false },
      { id: "y4", label: "Güvenlik kamerasını manuel olarak kapattı", correct: false },
    ],
  },
  solution: {
    killerId: "ozan",
    explanation:
      "Katil, ortak kurucu ve CTO Ozan Kırca. Yatırım turu imza gecesi, herkesin dikkati toplantıdayken Deniz'in ofisine girdi, hisse sulandırma ve patent tartışmasını büyüttü, öfkeyle masadaki kristal ödülle Deniz'e vurdu. CTO olarak erişebildiği bina güvenlik sisteminden kendi giriş kaydını sildi — ana logda kimsenin görünmemesi ilk bakışta onu temize çıkarır gibiydi, ama bu ayrıcalığa sadece CTO'nun sahip olması aslında onu işaret ediyordu. IT güvenlik ekibinin yedek 'gölge log' sunucusunda gerçek girişi (22:45–23:15) ortaya çıktı. E-posta yazışması, hem finansal hem duygusal (ihanet) boyutuyla en güçlü motivi doğruluyordu. Diğer şüphelilerin çelişkileri gerçekti ama masum açıklamalara bağlanıyordu: Aylin kariyer kaygısıyla belge saklamıştı, Barış hiç 28. kata çıkmamıştı, Selin o saatte İzmir'deydi, Yağmur'un iki tanıklı alibisi vardı.",
  },
};
