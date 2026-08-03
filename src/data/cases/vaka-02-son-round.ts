import type { CaseData } from "@/types/case";

export const vaka02: CaseData = {
  id: "vaka-02-son-round",
  order: 2,
  title: "Son Round",
  difficulty: "orta",
  tagline: "Büyük yatırım turunun imzalanacağı gece, genç bir CEO kendi ofisinde öldürüldü.",
  available: true,
  synopsis:
    "İstanbul'un finans merkezindeki cam kule, gece yarısına yaklaşırken hâlâ ışıklarla doluydu. Nova Teknoloji'nin 28. katındaki toplantı odasında, şirketin değerini kat kat artıracak dev bir yatırım turunun son imzaları atılmak üzereydi — bu, kurucu ortak ve CEO Deniz Aral'ın yıllardır peşinde koştuğu andı.\n\nToplantı bitip herkes dağıldığında, Deniz kendi ofisine çekildi. Asistanı Yağmur, saat 23:30'da onu imza törenine çağırmaya geldiğinde kapı aralıktı. İçeri girdiğinde bulduğu manzara onu dondurdu: Deniz, masasının önünde, kafasına aldığı sert bir darbeyle cansız yatıyordu. Suç aleti, az önce kazandığı 'Yılın Girişimcisi' ödülünün kristal heykelciğiydi — kırılmış parçaları etrafa saçılmıştı.\n\n28. kata sadece kartlı geçişle giriliyor, her hareket saniyesi saniyesine loglanıyordu. Ama güvenlik ekibi logu incelediğinde beklenen şeyi bulamadı — kimsenin orada olmadığını değil, bir kaydın sistemden eksik olduğunu gördüler. Bu kazayla olmuş bir şey değildi; biri, o gece binada bulunan sekiz kişiden biri, izlerini bilerek silmişti. Birkaç ay önce ülke gündemini sarsan Yıldız Ekspresi cinayetinin ardından, kamuoyu bir kez daha benzer bir gizemle çalkalanıyordu — bu sefer failin peşinde teknoloji vardı, ama gerçeği ortaya çıkaracak olan yine sabır ve dikkatti.",
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
    {
      id: "cem",
      name: "Cem Baydar",
      age: 47,
      role: "Hukuk Müşaviri",
      motive:
        "Deniz, Cem'in yatırımcı fonlardan birinde gizlice hissesi olduğunu öğrenmişti — bariz bir çıkar çatışması. O gece yönetim kuruluna resmi olarak bildireceğini söylemişti, bu Cem'in kariyerinin ve barosundaki itibarının sonu olabilirdi.",
      opportunity:
        "Sözleşme maddelerini son kez gözden geçirmek için o akşam 28. kattaydı, geç saate kadar çalıştı.",
      statementIntro:
        "\"Nova'nın hukuk müşavirliğini beş yıldır yapıyorum, bu yatırım turunun sözleşmesini ben hazırladım. O akşam son değişiklikleri gözden geçirmek için ofisteydim, evet. Deniz'in bana kızgın olduğunu biliyordum, bir çıkar çatışması iddiası vardı, kabul ediyorum hata yaptım ama bunu düzeltecektim. Toplantı odasında çalışıp saat 22:30 gibi çıktım, evime gittim.\"",
      statementQA: [
        { question: "Çıkar çatışması iddiasını açıklar mısınız?", answer: "Yatırımcı fonlardan birinde küçük bir payım var, açıklamam gerekirdi, unuttum ya da göz ardı ettim, kasıtlı değildi." },
        { question: "Deniz sizi yönetim kuruluna şikayet edecek miydi?", answer: "Öyle söylemişti, evet. Kariyerimi riske atan bir durumdu ama bu beni cinayete sürüklemez." },
        { question: "22:30'da çıktığınızı kim doğrulayabilir?", answer: "Güvenlik kamerası lobi çıkışını göstermeli. Kartımla çıkış yaptım." },
      ],
    },
    {
      id: "zehra",
      name: "Zehra Akman",
      age: 38,
      role: "Rakip Şirket CEO'su",
      motive:
        "Kendi girişimi Nova'nın en değerli mühendislerini transfer etmeye çalışıyordu; Deniz bunu öğrenip yatırımcılara Zehra'nın şirketini kötüleyen bir rapor gönderme tehdidinde bulunmuştu, bu Zehra'nın kendi yatırım turunu tehlikeye atabilirdi.",
      opportunity:
        "O akşam binada, alt katta farklı bir toplantı için bulunuyordu, güvenlik kartı 21:40 giriş kaydı gösteriyor.",
      statementIntro:
        "\"Deniz'le rekabetimiz herkesçe biliniyor, gizlemeyeceğim. O akşam binada başka bir toplantı için bulunuyordum, 22. katta bir ortak görüşmemiz vardı, Deniz'in ofisine hiç çıkmadım. Aramızdaki gerginlik iş dünyasında sık rastlanan bir şey, cinayetle bir ilgisi yok.\"",
      statementQA: [
        { question: "Deniz'in sizi tehdit ettiği doğru mu?", answer: "Evet, yatırımcılara kötü bir rapor göndereceğini söylemişti. Sinir bozucuydu ama alışığım bu tür şeylere." },
        { question: "22. kattaki toplantınızın saatini doğrulayabilir misiniz?", answer: "Tabii, üç kişiyle birlikteydim, 21:40'tan 23:00'a kadar sürdü." },
        { question: "28. kata hiç çıkmadınız mı?", answer: "Hayır, asansöre bile binmedim, neden çıkayım ki?" },
      ],
    },
    {
      id: "kerem",
      name: "Kerem Arslan",
      age: 39,
      role: "Sessiz Ortak / Kurucu",
      motive:
        "Nova'yı Deniz ve Ozan'la birlikte kurmuştu ama yıllar içinde kararlardan dışlanmış, hisseleri sembolik bir düzeye indirilmişti; bu yatırım turunun kendisini tamamen tasfiye edeceğini öğrenmişti.",
      opportunity:
        "Artık şirkette aktif çalışmıyor olsa da eski kartı hâlâ aktifti, kimse bunu fark etmemişti.",
      statementIntro:
        "\"Nova'yı üçümüz kurduk, ben, Deniz ve Ozan. Zamanla şirketin günlük işlerinden uzaklaştırıldım, 'stratejik' dediler buna. Bu turun beni tamamen tasfiye edeceğini öğrendiğimde çok kırıldım, yıllarımın karşılığı bu muydu diye sordum kendime. O akşam binadaydım, evet, kartımın hâlâ çalıştığını bilmiyordum bile, eski alışkanlıkla denedim, açıldı. Ama Deniz'in ofisine gitmedim, sadece eski çalışma odamı özlemiştim, oturdum biraz.\"",
      statementQA: [
        { question: "Kartınızın hâlâ aktif olduğunu bilmiyor muydunuz?", answer: "Hayır, şaşırdım açıkçası. Kimse iptal etmeyi düşünmemiş olmalı." },
        { question: "Binada ne kadar kaldınız?", answer: "Yarım saat kadar, eski odamda oturdum, biraz düşündüm, sonra çıktım." },
        { question: "Deniz'le en son ne zaman konuştunuz?", answer: "İki hafta önce, kısa bir telefon görüşmesi. O gece hiç konuşmadık." },
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

Silme işlemi, sistem yöneticisi (admin) yetkisiyle, 23:22'de gerçekleştirilmiş olup, bu yetkiye şirket içinde yalnızca CTO erişebilmektedir. Silme işleminin kaynağı olan cihazın envanter sicil numarası (NV-LT-014), IT zimmet kayıtlarında CTO'ya tahsisli dizüstü bilgisayar olarak görünmektedir.`,
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
      body: `"Deniz'i son kez 22:25'te gördüm, ofisine çekiliyordu, biraz gergindi. Ben resepsiyonda kaldım, gece nöbetçisi Kadir ve temizlikçi Fatma Hanım'la birlikteydim, ikisi de doğrular. 23:30'da toplantı bitti, herkes onu bekliyordu, ben çağırmaya gittim... O halde buldum."

(Sorgu sırasında kendiliğinden eklemiş: "Deniz'in tuhaf bir huyu vardı, önemli şeyleri hep tersten yazardı, üniversiteden kalma bir alışkanlıkmış diyordu, hep gülerdik buna.")`,
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
      body: `Yapay zeka alanında hızla büyüyen Nova Teknoloji'nin, şirket değerini kat kat artıracak yeni bir yatırım turuna hazırlandığı öğrenildi. Sektör kaynakları, imza töreninin bu hafta içinde gerçekleşeceğini belirtirken, şirket içi kaynaklar bazı ortaklık paylarının yeniden yapılandırılacağına dair "gerilimli" görüşmelerin sürdüğünü aktardı. Nova Teknoloji'den konuya ilişkin resmi bir açıklama gelmedi.

(Kupürün kenarına elle bir rakam karalanmış: 9.)`,
    },
    {
      id: "board-eposta",
      type: "eposta",
      title: "Yönetim Kuruluna Taslak E-posta",
      meta: "Deniz Aral'ın taslaklar klasöründe bulundu, gönderilmemiş",
      emailHeader: {
        from: "Deniz Aral",
        to: "Yönetim Kurulu",
        subject: "Acil — Hukuk Müşavirliği Çıkar Çatışması",
        date: "Olay günü, 20:12",
      },
      body: `Değerli kurul üyeleri, yatırım turu görüşmeleri sırasında hukuk müşavirimiz Cem Baydar'ın, yatırımcı fonlarımızdan birinde önceden beyan edilmemiş bir hissesi olduğunu öğrendim. Bu açık bir çıkar çatışması ve sözleşme sürecinin bütünlüğünü riske atıyor. Toplantıdan hemen sonra bu konuyu resmi olarak gündeme getireceğim.

(Not: E-posta gönderilmemiş, taslak olarak kalmış. Taslağın otomatik kaydedilen sürüm geçmişinde bir versiyon numarası dikkat çekiyor: v.6.)`,
    },
    {
      id: "muhendis-transfer-mesaj",
      type: "whatsapp",
      title: "Mühendis Transferi Yazışması",
      meta: "Şirket dizüstü bilgisayarında bulundu, kurbanın kıdemli mühendisine ait",
      messages: [
        { sender: "İşe Alım Uzmanı (Zehra'nın şirketi)", time: "19:02", text: "Teklifimizi tekrar düşündün mü? Paket çok daha iyi, biliyorsun." },
        { sender: "Kıdemli Mühendis", time: "19:10", text: "Düşünüyorum ama Deniz bu hafta bir şeyler sezdi galiba, çok gergin." },
        { sender: "İşe Alım Uzmanı", time: "19:12", text: "Zehra Hanım aceleye getirmemizi istiyor, yatırım turu kapanmadan karar verelim diyor." },
        { sender: "Kıdemli Mühendis", time: "19:15", text: "Tamam, toplantıdan sonra konuşalım, şu an ofisteyim.", self: true },
      ],
    },
    {
      id: "eski-ortaklik-ozeti",
      type: "resmi_rapor",
      title: "Eski Ortaklık Sözleşmesi Özeti",
      meta: "Ticaret Sicili kayıtları · Nova Teknoloji kuruluş belgeleri",
      body: `Nova Teknoloji, sekiz yıl önce Deniz Aral, Ozan Kırca ve Kerem Arslan tarafından eşit ortaklıkla (%33,3) kurulmuştur. İzleyen yıllarda yapılan art arda hisse ihraçları ve yeniden yapılandırmalarla Kerem Arslan'ın payı kademeli olarak %2,1'e kadar düşürülmüştür. İncelenen taslak yatırım turu sözleşmesinde, Kerem Arslan'a ait payın "seyreltme koruması" maddesinden hariç tutulduğu, bu turun tamamlanmasıyla payının sembolik bir düzeyin de altına ineceği görülmektedir.

(Belgenin fotokopisine iliştirilmiş küçük bir post-it notunda tek bir rakam yazıyor: 3.)`,
    },
    {
      id: "kilitli-usb",
      type: "sifreli_kayit",
      title: "Kilitli USB Bellek",
      meta: "Deniz Aral'ın masa çekmecesinde bulundu, adli bilişim incelemesinde",
      body: `Deniz'in masasının en alt çekmecesinde, üzerinde etiket olmayan küçük bir USB bellek bulundu. İçinde tek bir metin dosyası var ama açıldığında ekranda anlamsız bir karakter dizisi beliriyor — dosya bozuk değil, bilerek böyle bırakılmış gibi görünüyor.`,
      cipherEncoded: "=4Sbp9JxlNWZ5VWbyVmdg4Wa6lGIhx2chBSYuVnYgwicvlXsE/ZxxSMbhd6wgEWeh1GbhBSYuFLxkFGIpRmbltGIpRnblRXYwBibhp3T",
      cipherAnswer: "Ozan patenti kendi adına almaya çalışıyor, buna asla izin vermeyeceğim.",
      cipherReveal: `[Kurtarılan dosya — Deniz Aral'ın kişisel notu]

"Ozan patenti kendi adına almaya çalışıyor, buna asla izin vermeyeceğim. Yarın imza gecesi bu konuyu açık açık konuşacağım, ne kadar sinirlenirse sinirlensin — bu onun emeği, biliyorum, ama şirketin de hakkı var. Bir orta yol bulmalıyız yoksa bu iş büyür."`,
      cipherHints: [
        "Bu karakterler bilindik bir kodlamaya benziyor ama düz çözülmüyor.",
        "Deniz'in eski bir alışkanlığını hatırla — önemli şeyleri hep tersten yazarmış.",
      ],
    },
    {
      id: "deniz-ani-kutusu",
      type: "kilitli_kasa",
      title: "Deniz'in Kilitli Anı Kutusu",
      meta: "Evinde, çalışma odasındaki rafta bulundu",
      body: `Deniz'in evinde, çalışma odasındaki bir rafta küçük, ahşap bir kutu bulundu. Üç haneli bir kombinasyon kilidi var. Asistanı Yağmur, Deniz'in önemli anılarını hep aynı üç rakamla kilitlediğini, ama rakamları hiç bilmediğini söylüyor — belki de dosyaların kenarında unutulmuş küçük ayrıntılarda saklıdır.`,
      lockDigits: 3,
      lockAnswer: "369",
      lockReveal: `[Kutunun içinden çıkanlar]

Eski bir fotoğraf: genç Deniz, Ozan ve Kerem, ilk ofislerinin önünde, üçü de gülüyor. Arkasında Deniz'in el yazısıyla: "Bir gün bunun ne kadar büyüyeceğini kimse bilemez. İyi ki sizi tanıdım." Fotoğrafın tarihi, şirketin kuruluşundan sadece birkaç ay öncesine ait.`,
      lockHints: [
        "Deniz'in bu kutuyu nasıl kilitlediğini bilen yok ama üç ayrı yerde bıraktığı üç rakam varmış gibi görünüyor — bulduğunda küçükten büyüğe sırala.",
        "Bir haber küpürü, eski bir ortaklık belgesi, bir e-posta taslağı... üçünde de köşede unutulmuş birer rakam var.",
      ],
    },
  ],
  timeline: [
    { time: "19:30", description: "Selin ön görüşme için ofise gelir, misafir kartı alır, ardından havalimanına gider." },
    { time: "20:15", description: "Selin'in uçağı İstanbul'dan kalkar." },
    { time: "21:40", description: "Zehra Akman, 22. kattaki farklı bir toplantı için binaya girer." },
    { time: "21:48–21:52", description: "Deniz, Ozan ve Aylin gece toplantısı için 28. kata girer." },
    { time: "21:52", description: "Kart sisteminde Selin adına bir giriş kaydı görünüyor — kendisi 'o saatte İzmir'deydim' diyor.", contradicts: "selin" },
    { time: "22:00", description: "Kerem Arslan, hâlâ aktif olan eski kartıyla binaya girer, eski çalışma odasına gider." },
    { time: "22:10", description: "Cem Baydar, toplantı odasında sözleşme maddelerini son kez gözden geçirir." },
    { time: "22:14–22:19", description: "Barış lobiye girer, eşyalarını alıp 5 dakikada çıkar (28. kata çıkmaz)." },
    { time: "22:30", description: "Kerem eski odasından ayrılıp binadan çıkar." },
    { time: "22:30", description: "Cem Baydar binadan çıkar." },
    { time: "22:40", description: "Aylin kendi ofisine kartla girer." },
    { time: "22:45", description: "Ozan'ın gerçek girişi (yalnızca gölge log'da var) — kendisi 'evdeydim, o gece binaya hiç gitmedim' diyor.", contradicts: "ozan" },
    { time: "22:50–23:10", description: "Cinayet gerçekleşir." },
    { time: "23:00", description: "Zehra'nın toplantısı sona erer, o da binadan çıkar." },
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
      "Katil, ortak kurucu ve CTO Ozan Kırca. Yatırım turu imza gecesi, herkesin dikkati toplantıdayken Deniz'in ofisine girdi, hisse sulandırma ve patent tartışmasını büyüttü, öfkeyle masadaki kristal ödülle Deniz'e vurdu. CTO olarak erişebildiği bina güvenlik sisteminden kendi giriş kaydını sildi — ana logda kimsenin görünmemesi ilk bakışta onu temize çıkarır gibiydi, ama bu ayrıcalığa sadece CTO'nun sahip olması aslında onu işaret ediyordu. IT güvenlik ekibinin yedek 'gölge log' sunucusunda gerçek girişi (22:45–23:15) ortaya çıktı. E-posta yazışması, hem finansal hem duygusal (ihanet) boyutuyla en güçlü motivi doğruluyordu. Diğer yedi şüphelinin hepsinin gerçek bir motivi ve fırsatı vardı ama hiçbiri cinayete karışmamıştı: Aylin kariyer kaygısıyla belge saklamıştı, Barış hiç 28. kata çıkmamıştı, Selin o saatte İzmir'deydi, Yağmur'un iki tanıklı alibisi vardı, Cem sadece sözleşmeyi düzeltip erken çıkmıştı, Zehra hiç 28. kata uğramamıştı, Kerem ise eski odasında oturup dışarı çıkmıştı — hiçbirinin bina güvenlik sisteminin admin yetkisine erişimi yoktu, oysa bu, olayı çözen en kritik ayrıntıydı.",
  },
};
