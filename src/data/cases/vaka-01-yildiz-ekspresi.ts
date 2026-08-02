import type { CaseData } from "@/types/case";

export const vaka01: CaseData = {
  id: "vaka-01-yildiz-ekspresi",
  order: 1,
  title: "Yıldız Ekspresi",
  difficulty: "orta",
  tagline: "Kar fırtınasında mahsur kalan trende, kilitli bir kompartımanda bir cinayet işlendi.",
  synopsis:
    "Ankara'dan Kars'a giden gece treni Yıldız Ekspresi, şiddetli bir kar fırtınası nedeniyle dağların arasında bir tünelde durmak zorunda kaldı. Sabaha karşı, özel kompartımanında seyahat eden zengin antika koleksiyoncusu Kemal Aydınlı, kendi koleksiyonundan bir Osmanlı hançeriyle öldürülmüş halde bulundu. Kompartımanın kapısı içeriden sürgülüydü, penceresi buzdan açılamaz durumdaydı. Tren tünelde durduğu için kimse inip kaçamazdı. Katil hâlâ trende, beş kişiden biri. Kanıtları incele, çelişkileri yakala ve katili bul.",
  victim: {
    name: "Kemal Aydınlı",
    age: 58,
    description:
      "İstanbul'da tanınmış bir antika ve sanat eseri koleksiyoncusu/galerici. Kars'a, kaynağı tartışmalı bir Selçuklu tası için gidiyordu. Sert bir pazarlıkçı; geçmişte birçok kişiyi kırdığı, bazılarını dolandırdığı söyleniyor.",
  },
  suspects: [
    {
      id: "nihal",
      name: "Nihal Aydınlı",
      age: 52,
      role: "Eşi",
      motive:
        "Kemal boşanma sürecini başlatmış, mal paylaşımında Nihal'i büyük ölçüde dışlayan yeni bir vasiyet hazırlatmıştı.",
      opportunity:
        "Kompartımanın yan odasında seyahat ediyordu; bağlantı kapısının anahtarı ondaydı.",
      statement:
        "\"Uyuyordum, hiçbir şey duymadım. Kemal'le aramız gerginti ama onu öldürecek biri değilim ben.\"",
    },
    {
      id: "emre",
      name: "Emre Solak",
      age: 27,
      role: "Genç Asistanı",
      motive:
        "Kemal, Emre'nin galeriden zimmetine para geçirdiğini öğrenmişti; onu kovup şikayet edeceğini söylemişti.",
      opportunity: "Kemal'in kompartıman anahtarının yedeğini asistan olarak taşıyordu.",
      statement:
        "\"Vagon restoranında oturup rapor hazırlıyordum, saatlerce oradaydım. Kemal Bey'i son gördüğümde gayet iyiydi.\"",
    },
    {
      id: "selim",
      name: "Selim Barkın",
      age: 61,
      role: "Rakip Koleksiyoncu",
      motive:
        "Kemal'le yıllardır süren bir rekabetleri vardı; Kemal'in Selçuklu tasını 'kaçak' yollardan aldığını ifşa etmekle tehdit ediyordu.",
      opportunity: "Koridorun karşı ucunda, aynı vagonda kalıyordu.",
      statement:
        "\"Kitap okuyordum, saat 03:30'a kadar uyanıktım. Kemal'le aramızda husumet var ama bu kadarı da olmaz.\"",
    },
    {
      id: "ferit",
      name: "Ferit Kaya",
      age: 45,
      role: "Eski İş Ortağı",
      motive:
        "Yıllar önce Kemal'le ortak bir dolandırıcılık işine karışmış, Kemal suçu üstüne yıkıp hapse girmesine izin vermişti. Yeni tahliye oldu.",
      opportunity: "Bileti son anda, farklı bir isimle alınmıştı — gizlenme çabası.",
      statement:
        "\"Bu trende olduğumu inkar etmiyorum ama Kemal'le konuşmadım bile. Eski defterleri kapatmaya çalışıyordum, o kadar.\"",
    },
    {
      id: "bora",
      name: "Bora Yalçın",
      age: 38,
      role: "Vagon Görevlisi",
      motive:
        "Kemal, geçen sefer 'kaybettiği' değerli bir kolyeyle ilgili Bora hakkında şikayette bulunacağını söylemişti.",
      opportunity: "Master anahtar ondaydı, tüm kompartımanlara girebilirdi.",
      statement:
        "\"Tüm gece koridorda devriyedeydim. Defterimde her hareketim yazılı, saklayacak bir şeyim yok.\"",
    },
  ],
  documents: [
    {
      id: "olay-yeri-raporu",
      type: "resmi_rapor",
      title: "Olay Yeri İnceleme Tutanağı",
      meta: "T.C. Devlet Demiryolları · Tutanak No: 2026/YE-014 · Komiser Yrd. Hakan Ört",
      body: `Kompartıman kapısı iç sürgüsü kapalı halde bulunmuştur. Pencere kışlık yalıtım nedeniyle dıştan buzlanmış, açılamayacak durumdadır. Kurbanın koleksiyonuna ait, kabzası sedef kakmalı bir Osmanlı hançeri, göğüs bölgesinde tek darbe halinde saplı bulunmuştur. Mücadele izine rastlanmamıştır — kurbanın saldırganı tanıdığı ve yakınına kadar sokulmasına izin verdiği değerlendirilmektedir.

Kompartıman kapısının hemen dışında, koridor zemininde, üzerinde "E.S." harfleri kazınmış küçük bir gümüş kol düğmesi bulunmuş, delil poşetine alınmıştır. Sahibi henüz tespit edilememiştir.

Not (teknik detay): Kompartıman kapı sürgüsü, trenin eski model vagonlarında görülen türden olup, koridor tarafından ince bir alet sokularak dışarıdan da manipüle edilebilecek bir mekanizmaya sahiptir. Bu, "içeriden kilitli" görünümünün tek başına saldırganı dışlamayacağı anlamına gelir.`,
    },
    {
      id: "otopsi-raporu",
      type: "resmi_rapor",
      title: "Adli Tıp / Otopsi Ön Raporu",
      meta: "Adli Tıp Kurumu · Rapor No: ATK-2026-0417 · Dr. Feride Kansu",
      body: `Ölümün, vücut ısısı düşüşü ve erken dönem lividite bulgularına göre 03:30–04:00 saatleri arasında gerçekleştiği değerlendirilmektedir.

Göğüs ön yüzünde, yukarıdan aşağıya doğru yaklaşık 15–20 derecelik açıyla inen tek bir bıçak yarası tespit edilmiştir. Kurbanın boyu 1.82 m'dir. Yaranın giriş açısı ve derinliği, saldırganın kurbandan belirgin şekilde kısa boylu (tahmini 1.62–1.69 m aralığında) olduğuna işaret etmektedir. Kurbanın elleri ve tırnak altlarında savunma izi bulunmamıştır.

Sonuç: Saldırgan muhtemelen kısa boylu, kurbanın güvendiği/yakınına serbestçe yaklaşabildiği biridir.`,
    },
    {
      id: "avukat-telefon",
      type: "telefon_dokumu",
      title: "Avukatla Telefon Görüşmesi Dökümü",
      meta: "Nihal Aydınlı'nın hattından · Operatör kaydı · Olaydan bir gün önce",
      dialogue: [
        { speaker: "Nihal", text: "Avukat Bey, yeni vasiyeti gördüm. Beni neredeyse hiçbir şeyden pay almadan bırakmış. Otuz yıllık evliliğim bu muydu?" },
        { speaker: "Avukat Tuncay Berk", text: "Nihal Hanım, sakin olun. Kemal Bey boşanma dilekçesini de dosyaladı zaten, biliyorsunuz. Vasiyeti bu yüzden değiştirmiş olabilir." },
        { speaker: "Nihal", text: "Bunu ona bırakamam. Kars'tan dönmeden bir çözüm bulmam lazım. Trende de yalnız kalacağız, konuşacağım onunla." },
        { speaker: "Avukat", text: "Sert konuşmayın, elinizi güçlendirecek bir şey yapmayın. Hukuki yoldan gidelim." },
      ],
    },
    {
      id: "galeri-mesaj",
      type: "whatsapp",
      title: "Galeri Müdürü ile Yazışma",
      meta: "Emre Solak'ın telefonundan · Olaydan iki gün önce",
      messages: [
        { sender: "Aylin Ergen", time: "21:47", text: "Emre, Kemal Bey seninle konuşmak istiyor. Zimmet defterindeki 40 bin liralık farkı sordu bana. Sana da soracak." },
        { sender: "Emre Solak", time: "21:52", text: "Bir açıklaması var, hallederim.", self: true },
        { sender: "Aylin Ergen", time: "21:53", text: "Umarım. Bu iş açığa çıkarsa sadece kovulmakla kalmazsın, biliyorsun. Kemal Bey şikayetçi de olur." },
        { sender: "Emre Solak", time: "21:58", text: "Trende konuşacağız onunla zaten. Bir yolunu bulurum.", self: true },
        { sender: "Emre Solak", time: "22:01", text: "Lütfen bu konuşmayı kimseye söyleme Aylin.", self: true },
      ],
    },
    {
      id: "cay-fincani",
      type: "resmi_rapor",
      title: "Adli İnceleme Notu — Çay Fincanı",
      meta: "Kompartıman 4 · Selim Barkın",
      body: `Kompartıman 4'te, Selim Barkın'a ait masada yarısı içilmiş bir bardak çay bulunmuştur. Sıcaklık ölçümü ve çay tortusunun analizine göre, çayın yaklaşık 02:30 civarında demlenip içilmeye başlandığı, ardından bir süre daha ortada bekletildiği tespit edilmiştir. Bu durum, Selim Barkın'ın ifadesinde belirttiği "03:30'a kadar uyanık, kitap okuyordum" beyanıyla çelişmektedir — bulgular, şahsın büyük olasılıkla saat 03:00 civarında uyuyakaldığını göstermektedir.`,
    },
    {
      id: "bilet-kaydi",
      type: "bilet_kaydi",
      title: "Bilet Satış Kaydı — Ferit Kaya",
      meta: "T.C. Devlet Demiryolları",
      body: `Bilet No: YE-2026-88231
Yolcu Adı (bilette): "Ferhat Kayacan"
Satın Alma: Kalkıştan 40 dk önce, gişeden, nakit
Kompartıman: 9

Ek not (görevli el yazısı): Yolcunun kimliği kontrol edildiğinde, gerçek adının Ferit Kaya olduğu, biletteki isimle uyuşmadığı görülmüştür. Yolcu "bir yanlışlık olmuş" demiş, tutanak tutulmamıştır.`,
    },
    {
      id: "devriye-log",
      type: "gunluk_log",
      title: "Vagon Görevlisi Devriye Log Defteri",
      meta: "Bora Yalçın'ın el yazısı notları",
      body: `03:10 — Restoran vagonunu kontrol ettim, servis kapanıyor.
03:22 — 3. vagon koridorunda tur attım, sessiz.
03:41 — Tren durdu, lokomotif ekibiyle telsizden konuştum (çığ uyarısı).
03:50 — Koridorda Nihal Hanım'ı gördüm, tuvalete gidiyordu, iyi görünüyordu.
04:05 — 7 no'lu kompartımanın kapısı aralık buldum, seslendim, cevap gelmeyince içeri girdim. Kemal Bey'i o halde buldum. Derhal makinist kabinini aradım.

(Not: 03:25–03:45 arası defterde herhangi bir kayıt yoktur — Bora bu saatlerde lokomotif ekibiyle telsiz görüşmesi yaptığını, koridordan uzak kaldığını ifade etmiştir.)`,
    },
    {
      id: "gorgu-tanigi",
      type: "ifade",
      title: "Görgü Tanığı İfadesi",
      meta: "Süheyla Tekand, 74 · Kompartıman 6 · Kurbanın karşı komşusu",
      body: `"Uyuyamıyordum, kapıyı aralık bırakmıştım, trenin içi çok kuru oluyor da. Saat tam kaç bilmiyorum ama tren durduktan az sonraydı, koridordan biri geçti. Hızlı yürüyordu. Gözlüğüm yoktu, yüzünü net göremedim ama boyu kısaydı, benim oğlum kadar var ya da daha az — o da 1.68 falandır. Bilek hizasında bir şey parladı, ışığı öyle fark ettim. Kimseye laf etmek istemem ama sorunca söylemem gerekti."`,
    },
  ],
  timeline: [
    { time: "03:15", description: "Vagon restoranda akşam servisi biter." },
    { time: "03:20", description: "Emre, Kemal'in kompartımanından çıkar (son görülen kişi)." },
    { time: "03:25", description: "Emre 'rapor hazırlamaya' restorana gideceğini söyler." },
    { time: "03:30–04:00", description: "Garson, Emre'yi restoranda görmediğini belirtiyor." },
    { time: "03:40", description: "Tren, çığ riski nedeniyle tünelde durur." },
    { time: "03:45", description: "Cinayet gerçekleşir (otopsi tahmini)." },
    { time: "03:50", description: "Nihal, koridorda görevli tarafından görülür (tuvalete gidiyordu)." },
    { time: "04:05", description: "Bora, devriye sırasında cesedi bulur." },
  ],
  hints: [
    "Otopsi raporundaki açı analizini dikkatlice oku — katilin boyu hakkında bir şey söylüyor.",
    "Restoran garsonunun anlattıklarıyla Emre'nin ifadesi örtüşmüyor. Bu çelişkiye odaklan.",
    "Olay yeri raporundaki 'E.S.' harfleri kimin baş harfleri olabilir?",
  ],
  motiveQuestion: {
    prompt: "Katilin asıl motivi neydi?",
    options: [
      { id: "m1", label: "Zimmete geçirdiği para ortaya çıkmıştı, kovulma ve hapis tehdidi vardı", correct: true },
      { id: "m2", label: "Miras/vasiyet paylaşımından pay alamama", correct: false },
      { id: "m3", label: "Kaçak eser ticaretinin ifşa olma korkusu", correct: false },
      { id: "m4", label: "Geçmişteki bir dolandırıcılığın intikamı", correct: false },
    ],
  },
  methodQuestion: {
    prompt: "Katil kompartımana nasıl girip 'içeriden kilitli' görüntüsü yarattı?",
    options: [
      { id: "y1", label: "Yedek anahtarla girdi, eski model sürgüyü dışarıdan ince bir aletle manipüle etti", correct: true },
      { id: "y2", label: "Buzlu pencereyi kırıp içeri girdi", correct: false },
      { id: "y3", label: "Görevlinin master anahtarını çaldı", correct: false },
      { id: "y4", label: "Kurban kapıyı kendi açtı, saldırgan çıkarken normal şekilde kilitledi", correct: false },
    ],
  },
  solution: {
    killerId: "emre",
    explanation:
      "Katil, asistan Emre Solak. Vagon restoranından sıvışıp yedek anahtarla kompartımana girdi, Kemal'i kendi hançeriyle öldürdü ve eski model sürgü mekanizmasını dışarıdan manipüle ederek kapıyı 'içeriden kilitli' gösterdi. Otopsi raporu saldırganın kısa boylu olduğunu gösteriyor (1.62–1.69 m) — bu aralığa Nihal ve Emre giriyordu. Olay yeri raporundaki 'E.S.' kazılı kol düğmesi ile görgü tanığının 'bilek hizasında parlayan bir şey' tanıklığı (erkek gömleğine ait bir kol düğmesi, kadın değil) ipucu zincirini Emre'ye bağlıyor. Motivi de en acil olandı: zimmet ortaya çıkmıştı, kovulma ve hapis tehdidi kapıdaydı. Diğer şüphelilerin çelişkileri gerçekti ama masum açıklamalara dayanıyordu: Nihal tuvalete gitmişti, Selim erkenden uyuyakalmıştı, Ferit sadece şartlı tahliye ihlali yapmamak için kimliğini gizliyordu, Bora ise anahtarını hiç kullanmamıştı.",
  },
};
