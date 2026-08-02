import type { CaseData } from "@/types/case";

export const vaka03: CaseData = {
  id: "vaka-03-zumrut-yali",
  order: 3,
  title: "Zümrüt Yalı",
  difficulty: "zor",
  tagline: "80. doğum günü kutlamasında, aile patriği kendi kadehinden içtiği zehirle can verdi.",
  synopsis:
    "Boğaz kıyısındaki tarihi Zümrüt Yalı'da, Erendil Holding'in kurucusu Necdet Erendil'in 80. doğum günü kutlanıyor. Üç kuşak aile üyesi ve yakın çevresi toplanmış. Kutlama kadehi kaldırılırken Necdet aniden fenalaşıp hayatını kaybediyor — özel viski kadehine zehir katılmış. Herkesin bir motivi var: miras, borç, ifşa olacak bir sır. Ama zehire gerçekten erişimi olan tek kişiyi bulmak gerekiyor. Bu, Yıldız Ekspresi ve Son Round'dan sonra ülke gündemini üçüncü kez sarsan bir cinayet vakası.",
  victim: {
    name: "Necdet Erendil",
    age: 80,
    description:
      "Erendil Holding'in kurucusu ve onursal başkanı. Sert, kontrolcü, vasiyetini sık sık değiştirmekle ailesini yıllardır tedirgin eden biri. Herkesin ondan bir beklentisi, herkesin ondan bir korkusu vardı.",
  },
  suspects: [
    {
      id: "aslan",
      name: "Aslan Erendil",
      age: 52,
      role: "Oğlu / CEO Adayı",
      motive:
        "Necdet, holding CEO'luğunu Aslan'a değil kız kardeşi Defne'ye devretmeyi planlıyordu; bu Aslan'ın otuz yıllık kariyer beklentisini yok ediyordu.",
      opportunity: "Kutlamanın büyük kısmında bahçede tek başına iş telefonu görüşmesi yaptığını söylüyor, tanığı yok.",
      statement:
        "\"Babamla CEO'luk konusunda tartıştık, evet. Ama onu öldürecek kadar mı? Hayır. Telefondaydım, biri doğrulayabilir sanmıştım ama kimse görmemiş.\"",
    },
    {
      id: "defne",
      name: "Defne Erendil-Kara",
      age: 48,
      role: "Kızı / Sanatçı",
      motive:
        "Babasıyla yıllar süren küslüğü barıştırma girişimi reddedilmişti; yeni vasiyetle CEO'luğun ona geçeceğini öğrenmemiş görünüyor — ya da öyle iddia ediyor.",
      opportunity: "Kutlama sırasında salonun köşesinde ailenin eski tablolarına bakarken tek başınaydı.",
      statement:
        "\"Yeni vasiyeti bilmiyordum, yemin ederim. Babamla barışmaya çalışıyordum, onu öldürüp bunu mu kaybedecektim?\"",
    },
    {
      id: "yildiz",
      name: "Yıldız Erendil",
      age: 45,
      role: "İkinci Eşi",
      motive:
        "Necdet boşanmayı düşünüyordu; bir aldatma iddiası nedeniyle mirastan büyük ölçüde mahrum bırakılma tehdidi vardı.",
      opportunity: "Kutlama boyunca misafirlerle sosyalleşiyordu, ama kadehin bekletildiği birkaç dakika onun da yakınındaydı.",
      statement:
        "\"Evet, boşanmayı konuşuyorduk. Ama ben ondan bir şey saklamıyorum, o beni suçluyordu. Mirası kaybetmek istemezdim tabii ki, ama bu cinayet işlemek için bir sebep değil.\"",
    },
    {
      id: "kaan",
      name: "Kaan Erendil",
      age: 24,
      role: "Torunu",
      motive:
        "Kumar borcu nedeniyle dedesinden gizlice büyük bir para istemiş, reddedilmişti; Necdet bunu ailesine anlatmakla tehdit ediyordu.",
      opportunity: "Kutlamanın çoğunda arkadaşlarıyla mesajlaşarak bahçenin dış tarafında oturuyordu.",
      statement:
        "\"Dedem parayı vermedi, kızgındım evet. Ama ailenin önünde rezil olmaktan korkuyordum, onu öldürmekten değil.\"",
    },
    {
      id: "umay",
      name: "Dr. Tarık Umay",
      age: 58,
      role: "Aile Doktoru",
      motive:
        "Geçmişte bir tıbbi ihmal / yanlış tedavi iddiasını Necdet biliyor ve bunu ifşa etmekle tehdit ediyordu — malpraktis davası riski kariyerini bitirebilirdi.",
      opportunity: "İlaç dolabına erişimi var, kutlamada da hazır bulunuyordu.",
      statement:
        "\"O dava yıllar önce kapandı, kimse hatırlamıyor sanıyordum. Necdet'in bunu bilmesi rahatsız ediciydi ama ilaç dolabımdan bir şey kaybolduğunu fark etmedim.\"",
    },
    {
      id: "sadi",
      name: "Sadi Yalman",
      age: 61,
      role: "Kahya",
      motive:
        "Necdet, gençliğinde Sadi'nin kardeşi Yusuf'u bir iş anlaşmazlığında dolandırıp intihara sürüklemişti. Sadi bunu yakın zamanda kardeşinin eski günlüğünden öğrendi.",
      opportunity: "Kırk yıldır evde çalışan güvenilir kahya; mutfağa, servis kadehlerine ve doktorun ilaç dolabına serbestçe erişebiliyor.",
      statement:
        "\"Kırk yıldır bu aileye hizmet ettim. Necdet Bey'e bir şey yapmamın hiçbir sebebi yok — o bana hep iyi davrandı.\"",
    },
  ],
  documents: [
    {
      id: "olay-yeri-raporu",
      type: "resmi_rapor",
      title: "Olay Yeri İnceleme Tutanağı",
      meta: "Zümrüt Yalı · Tutanak No: 2026/ZY-089 · Komiser Elif Sancar",
      body: `Necdet Erendil, kutlama salonunda, elinde özel viski kadehiyle yere yığılmış halde bulunmuştur. Kadehte iz miktarda beyaz kristal madde tespit edilmiş, laboratuvara gönderilmiştir. Kadehin, servis edilmeden önce yaklaşık 5 dakika süreyle salonun yan masasında beklediği, bu süre zarfında herkesin pasta kesimi için toplandığı ve masanın gözden kısmen kaçtığı tespit edilmiştir.

Mücadele izine rastlanmamıştır.`,
    },
    {
      id: "toksikoloji-raporu",
      type: "resmi_rapor",
      title: "Toksikoloji Raporu",
      meta: "Adli Tıp Kurumu · Rapor No: ATK-2026-0711 · Dr. Canan Ekiz",
      body: `Kadehte ve kurbanın kanında yüksek dozda digoksin (kalp yetmezliği tedavisinde kullanılan, dar terapötik aralıklı, reçeteli bir ilaç bileşeni) tespit edilmiştir. Bu dozda alınan digoksin, 15-20 dakika içinde ölümcül kalp ritim bozukluğuna yol açar — olay yerindeki zaman çizelgesiyle uyumludur.

Not: Digoksin serbestçe satılmaz, kontrollü ilaç dolaplarında bulunur.`,
    },
    {
      id: "vasiyet-taslagi",
      type: "resmi_rapor",
      title: "Yeni Vasiyet Taslağı",
      meta: "Erendil Ailesi Avukatı · Henüz imzalanmamış taslak",
      body: `Necdet Erendil'in avukatıyla üzerinde çalıştığı taslağa göre: Erendil Holding CEO'luğu Aslan Erendil'den alınıp Defne Erendil-Kara'ya devredilecek. Yıldız Erendil'in miras payı, sürmekte olan bir "güven kaybı" gerekçesiyle önemli ölçüde azaltılacak. Kaan Erendil'e doğrudan bir pay öngörülmemiş, babası Aslan üzerinden dolaylı pay alacak. Sadi Yalman'a, kırk yıllık hizmeti karşılığında sembolik bir emeklilik ikramiyesi bırakılmış.

Taslak henüz imzalanmamıştı.`,
    },
    {
      id: "kaan-mesaj",
      type: "whatsapp",
      title: "Kaan'ın Arkadaşıyla Yazışması",
      meta: "Kaan Erendil'in telefonundan · Olaydan bir hafta önce",
      messages: [
        { sender: "Efe (arkadaş)", time: "23:10", text: "Ne oldu, dedenden para kopardın mı?" },
        { sender: "Kaan", time: "23:14", text: "Hayır lan, resmen yüzüme güldü. 'Bu son uyarın' dedi.", self: true },
        { sender: "Efe (arkadaş)", time: "23:15", text: "Aileye söylerse yandın ama." },
        { sender: "Kaan", time: "23:20", text: "Biliyorum. Doğum günü partisinde bir yolunu bulmam lazım, borcu kapatmazsam işim bitik.", self: true },
      ],
    },
    {
      id: "umay-dava-ozeti",
      type: "resmi_rapor",
      title: "Eski Malpraktis Şikayeti Özeti",
      meta: "Sağlık Bakanlığı Arşivi · 14 yıl önce, işlemsiz kapanmış",
      body: `Dr. Tarık Umay hakkında, bir hastanın yanlış dozaj sonucu kalıcı hasar gördüğü iddiasıyla açılan şikayet, hastanın ailesiyle yapılan gizli bir maddi anlaşma sonrası geri çekilmiştir. Dosya kapanmış olmakla birlikte, tıp camiasında bilinmesi Dr. Umay'ın kariyerine ciddi zarar verebilir. Necdet Erendil'in bu anlaşmaya aracılık ettiği ve dosyanın bir kopyasını sakladığı bilinmektedir.`,
    },
    {
      id: "ozel-dedektif-raporu",
      type: "resmi_rapor",
      title: "Özel Dedektif Raporu — Yıldız Erendil",
      meta: "Necdet Erendil'in talimatıyla tutulmuş, gizli",
      body: `Necdet Erendil'in talebi üzerine yürütülen gözlem sonucunda, Yıldız Erendil'in son üç ayda bir iş insanıyla düzenli olarak buluştuğu tespit edilmiştir. Görüşmelerin niteliği kesin olarak belirlenememiştir, ancak Necdet Bey'e sunulan ön rapor "aldatma şüphesini güçlendiren" ifadesiyle özetlenmiştir. Necdet Bey bu raporu aldıktan sonra avukatıyla yeni vasiyet görüşmelerine hız vermiştir.`,
    },
    {
      id: "ilac-dolabi-log",
      type: "gunluk_log",
      title: "İlaç Dolabı Erişim Kayıt Defteri",
      meta: "Zümrüt Yalı — Dr. Umay'ın özel odası",
      body: `Dolap, şifreli bir kilitle korunmaktadır. Şifreyi bilen yalnızca iki kişi kayıtlıdır:
— Dr. Tarık Umay (kurucu/sahip)
— Sadi Yalman (temizlik ve düzenleme için yıllar önce doktor tarafından yetkilendirilmiş)

Son bir haftalık giriş kaydı:
Pazartesi — Dr. Umay, rutin envanter kontrolü
Perşembe — Sadi Yalman, "temizlik" notuyla giriş (olay gününden 3 gün önce)
Kutlama günü — kayıt yok, ancak dolabın son kontrolünde bir digoksin kutusunun eksik olduğu fark edilmiştir.`,
    },
    {
      id: "kardes-mektubu",
      type: "gunluk_log",
      title: "Yusuf'un Son Mektubu",
      meta: "Sadi Yalman'ın eşyaları arasında bulunmuş, otuz yıllık, el yazısı",
      body: `"Sadi kardeşim, eğer bunu okuyorsan artık burada değilim demektir. Necdet Bey'le kurduğumuz şirketi elimden aldı, imzaladığım kağıtların hileli olduğunu çok geç anladım. Her şeyimi kaybettim, borç içindeyim, sana yük olmak istemiyorum. Beni affet. Bunu kimseye anlatma, Necdet Bey güçlü biri, başına iş açma."

(Not: Bu mektup, Sadi Yalman'ın yakın zamanda ailesinin eski eşyalarını düzenlerken bulduğu belirtiliyor — kırk yıl boyunca kardeşinin gerçek ölüm nedenini bilmediğini iddia ediyor.)`,
    },
    {
      id: "hizmetci-ifadesi",
      type: "ifade",
      title: "İkinci Hizmetçi İfadesi",
      meta: "Nur Aydemir, 34 · Mutfak personeli",
      body: `"Kadehi ben hazırlamadım, Sadi Bey hazırladı, her zaman o hazırlar Necdet Bey'in özel içkisini, kimse karışmaz. Salona kendi götürdü, masaya bıraktı, sonra pasta için herkesi çağırdı. O birkaç dakika kadehin yanında kimse yoktu galiba, ben de mutfaktaydım. Sadi Bey çok sakin biriydi hep, bir şey fark etmedim."`,
    },
    {
      id: "eski-skandal-haberi",
      type: "haber_kupuru",
      title: "Otuz Yıl Önceki Ortaklık Davası",
      meta: "Gazete arşivinden bulunmuş, sararmış kupür",
      newsHeader: {
        publication: "Meridyen Gazetesi",
        headline: "Ortaklık Davası Trajediyle Sonuçlandı",
        byline: "Ekonomi Servisi",
        date: "Otuz yıl önce",
      },
      body: `Genç iş insanı Necdet Erendil ile ortağı Yusuf Yalman arasındaki hisse devri anlaşmazlığı geçtiğimiz ay mahkemeye taşınmış, dava Erendil lehine sonuçlanmıştı. Yalman'ın, imzaladığı devir belgelerinin gerçek şartlarını bilmediğini öne sürerek itiraz ettiği ancak mahkemenin bu itirazı reddettiği öğrenildi.

Ne yazık ki dava sonuçlandıktan kısa süre sonra Yusuf Yalman'ın ani vefat haberi camiada üzüntüyle karşılandı. Erendil, "Eski ortağımın kaybından derin üzüntü duyuyorum" açıklamasını yaptı.`,
    },
  ],
  timeline: [
    { time: "20:00", description: "Doğum günü kutlaması başlar, misafirler salona geçer." },
    { time: "20:45", description: "Necdet özel viskisini ister, Sadi mutfaktan hazırlar." },
    { time: "20:50", description: "Sadi kadehi salona getirip yan masaya bırakır, herkesi pasta için çağırır — kadeh birkaç dakika gözden kaçar." },
    { time: "20:55", description: "Sadi kadehi Necdet'e sunar." },
    { time: "21:00", description: "Necdet kadeh kaldırıp içer, kısa bir konuşma yapar." },
    { time: "21:05", description: "Necdet aniden fenalaşır." },
    { time: "21:10", description: "Dr. Umay müdahale eder, ama geç kalınmıştır." },
    { time: "21:15", description: "Necdet Erendil hayatını kaybeder." },
  ],
  hints: [
    "Bu vakada herkesin bir sırrı var ama sadece birinin gerçekten zehire erişimi olabilirdi.",
    "Kimin neye erişebildiğini gösteren kayıtları dikkatle karşılaştır — sıradan bir zehir değil bu.",
    "Kadehi kimin hazırlayıp taşıdığına dair bir tanıklık var, gözden kaçırma.",
  ],
  motiveQuestion: {
    prompt: "Katilin asıl motivi neydi?",
    options: [
      { id: "m1", label: "Kardeşinin yıllar önce Necdet tarafından dolandırılıp intihara sürüklenmesinin intikamı", correct: true },
      { id: "m2", label: "Miras payından mahrum kalma korkusu", correct: false },
      { id: "m3", label: "Kumar borcunun ailede ortaya çıkma korkusu", correct: false },
      { id: "m4", label: "Eski bir tıbbi ihmalin ifşa olma korkusu", correct: false },
    ],
  },
  methodQuestion: {
    prompt: "Katil, zehri nasıl uyguladı?",
    options: [
      { id: "y1", label: "Aile doktorunun ilaç dolabından aldığı digoksini, kendi hazırlayıp servis ettiği kadehe kattı", correct: true },
      { id: "y2", label: "Doğum günü pastasına zehir kattı", correct: false },
      { id: "y3", label: "Necdet'in günlük ilaçlarının dozunu değiştirdi", correct: false },
      { id: "y4", label: "Necdet'e fark ettirmeden doğrudan enjeksiyon yaptı", correct: false },
    ],
  },
  solution: {
    killerId: "sadi",
    explanation:
      "Katil, kırk yıllık kahya Sadi Yalman. Kardeşi Yusuf'un, gençliğinde Necdet tarafından hileli bir ortaklık anlaşmasıyla dolandırılıp her şeyini kaybettiğini ve bu yüzden intihar ettiğini, yakın zamanda kardeşinin eski bir mektubundan öğrendi. Kırk yıldır ailenin en güvenilir hizmetkarı olarak hem mutfağa hem Dr. Umay'ın ilaç dolabına serbestçe erişebiliyordu — dolaptan aldığı digoksini, her zaman kendisinin hazırladığı özel viski kadehine kattı. Diğer beş şüphelinin motivleri gerçek ve gürültülüydü (miras, kumar borcu, aldatma tehdidi, malpraktis ifşası) ama hiçbirinin zehire gerçek bir erişimi yoktu: Aslan ve Kaan'ın fırsat penceresi vardı ama zehri nereden bulacaklardı; Defne yeni vasiyeti bilmiyordu; Yıldız'ın erişimi yoktu; Dr. Umay'ın erişimi vardı ama kadehi o hazırlamadı, hazırlayan hep Sadi'ydi. İlaç dolabı erişim kaydı ve hizmetçi ifadesi, ipucu zincirini doğrudan Sadi'ye bağlıyordu.",
  },
};
