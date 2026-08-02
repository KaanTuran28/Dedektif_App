import type { CaseData } from "@/types/case";

export const vaka03: CaseData = {
  id: "vaka-03-zumrut-yali",
  order: 3,
  title: "Zümrüt Yalı",
  difficulty: "zor",
  tagline: "80. doğum günü kutlamasında, aile patriği kendi kadehinden içtiği zehirle can verdi.",
  available: true,
  synopsis:
    "Boğaz'ın en eski yalılarından biri olan Zümrüt Yalı, bu akşam ışıl ışıldı. Erendil Holding'in efsanevi kurucusu Necdet Erendil'in 80. doğum günü kutlanıyordu; bahçedeki fenerler suya yansıyor, üç kuşak aile üyesi ve holdingin yakın çevresi geniş salonda toplanmıştı. Necdet, yıllardır olduğu gibi bu gece de odanın merkezindeydi — sert bakışları, keskin dili ve herkesi aynı anda hem büyüleyen hem korkutan o eski gücüyle.\n\nPasta kesilip kadehler kaldırılacağı sırada, Sadi'nin özenle hazırladığı özel viski Necdet'e sunuldu. Necdet kısa bir konuşma yaptı, kadehi kaldırdı, içti — ve birkaç dakika içinde aniden fenalaşıp yere yığıldı. Aile doktoru hemen müdahale etti ama çok geçti. Kadehte iz miktarda beyaz bir kristal madde bulundu: digoksin, dar terapötik aralıklı, sıkı kontrollü bir kalp ilacı.\n\nNecdet Erendil'in hayatı miras kavgalarıyla, borçlarla, eski ihanetlerle ve yıllarca özenle saklanmış sırlarla örülüydü — ve bu gece, o sırların hepsi aynı salonda, aynı masanın etrafında oturuyordu. Zehire gerçekten erişimi olan tek kişiyi bulman gerekiyor. Bu, Yıldız Ekspresi ve Son Round'dan sonra ülke gündemini üçüncü kez sarsan bir cinayet vakası.",
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
      statementIntro:
        "\"Otuz yılımı bu şirkete verdim, CEO'luğu babamdan sonra devralacağımı hep varsaydım. Yeni vasiyet taslağından geç haberim oldu, kız kardeşim Defne'ye devredileceğini öğrenince babamla sert bir tartışma yaşadık, evet. Ama kutlamanın çoğunda bahçede tek başıma iş telefonuyla uğraşıyordum, önemli bir görüşmeydi, kimsenin dikkatini çekmemiş olabilirim ama oradaydım.\"",
      statementQA: [
        { question: "Babanızla tartışmanız kutlamadan hemen önce miydi?", answer: "İki gün önceydi. O gece bir daha konuşmadık bile, mesafeliydik." },
        { question: "Telefon görüşmenizi doğrulayabilecek biri var mı?", answer: "Görüşme kaydı operatörde olmalı ama karşı taraftaki kişi yurt dışında, ulaşmak zaman alabilir." },
        { question: "Kadehin hazırlandığı sırada neredeydiniz?", answer: "Hâlâ bahçedeydim sanıyorum, saatleri tam takip etmedim açıkçası." },
        { question: "Yeni CEO'luk kararını kabul ettiniz mi?", answer: "Hayır, kesinlikle etmedim. Ama bu, babamı öldürmemi gerektirmez." },
      ],
    },
    {
      id: "defne",
      name: "Defne Erendil-Kara",
      age: 48,
      role: "Kızı / Sanatçı",
      motive:
        "Babasıyla yıllar süren küslüğü barıştırma girişimi reddedilmişti; yeni vasiyetle CEO'luğun ona geçeceğini öğrenmemiş görünüyor — ya da öyle iddia ediyor.",
      opportunity: "Kutlama sırasında salonun köşesinde ailenin eski tablolarına bakarken tek başınaydı.",
      statementIntro:
        "\"Babamla yıllardır küskündük, bu kutlamaya barışma umuduyla geldim aslında. Yeni vasiyetten haberim yoktu, yemin ederim — CEO'luğun bana geçeceğini öğrendiğimde şaşırdım, hatta biraz korktum, çünkü kardeşimin bunu nasıl karşılayacağını biliyordum. Kutlama sırasında salonun köşesinde ailenin eski tablolarına bakıyordum, yalnızdım, kimseyle konuşmuyordum.\"",
      statementQA: [
        { question: "Yeni vasiyeti gerçekten bilmiyor muydunuz?", answer: "Hayır. Babam böyle şeyleri asla önceden söylemezdi, sürpriz yapmayı severdi — kötü bir sürpriz oldu." },
        { question: "Kardeşinizle aranız nasıldı o gece?", answer: "Gergindi ama her zamanki gibiydi. Konuşmadık pek." },
        { question: "Tabloların yanında ne kadar süre kaldınız?", answer: "On, on beş dakika belki. Kadehle ilgili hiçbir şey görmedim, salonun diğer ucundaydım." },
      ],
    },
    {
      id: "yildiz",
      name: "Yıldız Erendil",
      age: 45,
      role: "İkinci Eşi",
      motive:
        "Necdet boşanmayı düşünüyordu; bir aldatma iddiası nedeniyle mirastan büyük ölçüde mahrum bırakılma tehdidi vardı.",
      opportunity: "Kutlama boyunca misafirlerle sosyalleşiyordu, ama kadehin bekletildiği birkaç dakika onun da yakınındaydı.",
      statementIntro:
        "\"Necdet'le boşanmayı konuşuyorduk, evet, bunu saklamayacağım. Bir aldatma iddiası öne sürmüştü, doğru değil ama beni buna ikna edemedim. Mirastan mahrum kalma tehdidi ağırdı üstümde. Kutlama boyunca misafirlerle sosyalleştim, herkesle konuştum, ev sahipliği yapmaya çalıştım — kadehin bekletildiği birkaç dakika da yakınlarda olabilirim ama ona dokunmadım.\"",
      statementQA: [
        { question: "Aldatma iddiasını nasıl öğrendiniz?", answer: "Bir özel dedektif tuttuğunu öğrendim, çok küçük düşürücüydü. Ama iddia asılsız." },
        { question: "Kadehin masada beklediği sırada nerede olduğunuzu hatırlıyor musunuz?", answer: "Salonun ortasındaydım, misafirlerle konuşuyordum. Kadehe yaklaşmadım." },
        { question: "Boşanma gerçekleşseydi ne kaybederdiniz?", answer: "Neredeyse her şeyi. Ama bu bir cinayet sebebi değil, ben zaten avukatımla konuşmaya başlamıştım." },
      ],
    },
    {
      id: "kaan",
      name: "Kaan Erendil",
      age: 24,
      role: "Torunu",
      motive:
        "Kumar borcu nedeniyle dedesinden gizlice büyük bir para istemiş, reddedilmişti; Necdet bunu ailesine anlatmakla tehdit ediyordu.",
      opportunity: "Kutlamanın çoğunda arkadaşlarıyla mesajlaşarak bahçenin dış tarafında oturuyordu.",
      statementIntro:
        "\"Dedem parayı vermedi, kızgındım evet. Kumar borcum var, bunu ailemin öğrenmesinden çok korkuyordum, dedem de bunu biliyordu, tehdit ediyordu neredeyse. Kutlamanın çoğunda bahçenin dış tarafında oturup arkadaşlarımla mesajlaşıyordum, kimseyle pek konuşmadım, kutlamaya da isteksiz katıldım açıkçası.\"",
      statementQA: [
        { question: "Borcunuzun tutarı nedir?", answer: "Söylemek istemiyorum ama... büyük. Dedemin bana yardım etmesi gerekiyordu." },
        { question: "Dedeniz sizi ailenize ifşa etmekle mi tehdit ediyordu?", answer: "Doğrudan değil ama ima ediyordu. 'Bu son uyarın' demişti." },
        { question: "Salona ne zaman girdiniz?", answer: "Pasta kesilmeden hemen önce, herkesle birlikte. Ondan önce bahçedeydim." },
      ],
    },
    {
      id: "umay",
      name: "Dr. Tarık Umay",
      age: 58,
      role: "Aile Doktoru",
      motive:
        "Geçmişte bir tıbbi ihmal / yanlış tedavi iddiasını Necdet biliyor ve bunu ifşa etmekle tehdit ediyordu — malpraktis davası riski kariyerini bitirebilirdi.",
      opportunity: "İlaç dolabına erişimi var, kutlamada da hazır bulunuyordu.",
      statementIntro:
        "\"Necdet Bey'in ailesine on beş yıldır doktorluk yapıyorum. Yıllar önce bir malpraktis şikayeti almıştım, kapandı, unutulduğunu sanıyordum. Necdet Bey'in bunu bildiğini ve arada bir hatırlattığını itiraf edeyim, rahatsız ediciydi ama bu beni cinayete sürükleyecek bir şey değil. Kutlamada hazır bulundum, ilaç dolabıma erişimim var elbette, ama bir eksiklik fark etmedim son kontrolüme kadar.\"",
      statementQA: [
        { question: "İlaç dolabınızın şifresini kimler biliyor?", answer: "Sadece ben, ve yıllar önce düzenleme için Sadi'ye de yetki vermiştim, unutmuşum bile." },
        { question: "Digoksin kutusunun eksikliğini ne zaman fark ettiniz?", answer: "Olaydan sonra, envanteri kontrol ederken. Çok şaşırdım." },
        { question: "Necdet Bey'e müdahale ederken neler gözlemlediniz?", answer: "Klasik bir digoksin zehirlenmesi belirtileri vardı ama iş işten geçmişti, çok hızlı ilerledi." },
      ],
    },
    {
      id: "sadi",
      name: "Sadi Yalman",
      age: 61,
      role: "Kahya",
      motive:
        "Necdet, gençliğinde Sadi'nin kardeşi Yusuf'u bir iş anlaşmazlığında dolandırıp intihara sürüklemişti. Sadi bunu yakın zamanda kardeşinin eski günlüğünden öğrendi.",
      opportunity: "Kırk yıldır evde çalışan güvenilir kahya; mutfağa, servis kadehlerine ve doktorun ilaç dolabına serbestçe erişebiliyor.",
      statementIntro:
        "\"Kırk yıldır bu aileye hizmet ettim, Necdet Bey'e bir şey yapmamın hiçbir sebebi yok — bana hep iyi davrandı, en azından öyle sanıyordum. Kadehi her zaman ben hazırlarım, o gece de öyle yaptım, mutfaktan getirip salona bıraktım, sonra herkesi pasta için çağırdım. O birkaç dakika kadehin yanında değildim, mutfağa dönmüştüm.\"",
      statementQA: [
        { question: "Kardeşiniz Yusuf hakkında yakın zamanda bir şey öğrendiniz mi?", answer: "(uzun bir sessizlik) ...Eski bir mektup buldum eşyalarını düzenlerken. Ama bu eski bir hikaye, otuz yıl önce oldu." },
        { question: "Necdet Bey'in kardeşinizin ölümüyle bir ilgisi olduğunu düşünüyor musunuz?", answer: "Mektupta öyle yazıyordu ama... ben bunu yeni öğrendim, ne yapacağımı bile bilmiyordum." },
        { question: "İlaç dolabına en son ne zaman girdiniz?", answer: "Üç gün önce, temizlik için. Bu rutin bir şey, yıllardır böyle yaparım." },
        { question: "Kadehi hazırlarken yalnız mıydınız?", answer: "Evet, mutfakta yalnızdım. Her zaman öyle olur, kimse karışmaz benim işime." },
      ],
    },
    {
      id: "melis",
      name: "Melis Erendil",
      age: 46,
      role: "Gelini (Aslan'ın Eşi)",
      motive:
        "Necdet, geçen ay Melis'in şirket kredi kartıyla yaptığı büyük kişisel harcamaları fark etmiş, bunu ailenin önünde açıklamakla tehdit etmişti — hem evliliği hem itibarı için yıkıcı olurdu.",
      opportunity:
        "Kutlama boyunca 'yardım ediyorum' bahanesiyle mutfağa ve servis alanına sık sık girip çıkıyordu.",
      statementIntro:
        "\"Necdet Bey'in harcamalarımı fark ettiğini biliyordum, birkaç hafta önce beni kenara çekip çok sert konuştu. Utanç vericiydi ama bu ailenin her bireyinin başına gelebilecek bir şey, kimse mükemmel değil. O gece mutfağa birkaç kez girdim, servise yardım ediyordum, Sadi Bey'e de yardım ettim aslında birkaç tepsi taşırken. Kadehle hiç ilgilenmedim, onun neyle ilgili olduğunu bile bilmiyordum.\"",
      statementQA: [
        { question: "Necdet Bey'in sizi ifşa etmekle tehdit etmesi ne zaman oldu?", answer: "İki hafta önce, aile yemeğinde. Herkesin içinde değil ama sonrasında ailenin öğreneceğinden korktum." },
        { question: "Mutfağa kaç kez girdiniz?", answer: "Üç, dört kez belki. Sadi Bey'e yardım ediyordum, o kadar kalabalıkta tek başına yetişemez." },
        { question: "Kadehin hazırlandığı anı gördünüz mü?", answer: "Hayır, o sırada salonda misafirlerle ilgileniyordum sanırım." },
      ],
    },
    {
      id: "emin",
      name: "Emin Doğaner",
      age: 55,
      role: "Aile Avukatı / İş Ortağı",
      motive:
        "Necdet'in bazı şirket hisselerini kendi üzerine geçiren belgede usulsüzlük vardı; Necdet bunu son anda fark edip belgeyi iptal ettirmek ve konuyu savcılığa taşımakla tehdit etmişti.",
      opportunity:
        "Kutlamaya 'yeni vasiyet taslağını görüşmek' bahanesiyle davetliydi, kutlamadan önce Necdet'le baş başa uzun bir görüşme yapmıştı.",
      statementIntro:
        "\"Necdet Bey'in avukatlığını yirmi yıldır yapıyorum, ona her şeyi borçluyum aslında. O belge meselesi bir yanlış anlaşılmaydı, açıklamaya çalıştım ama beni dinlemedi, savcılığa gideceğini söyledi. Kutlamadan önce özel olarak görüştük, sert bir tartışma oldu, kabul ediyorum. Ama sonra salona döndüm, kutlamanın geri kalanında misafirlerle birlikteydim, kimseyle yalnız kalmadım.\"",
      statementQA: [
        { question: "Necdet Bey'le tartışmanız ne zaman, ne kadar sürdü?", answer: "Kutlama başlamadan önce, yaklaşık yirmi dakika. Kütüphanede konuştuk." },
        { question: "Savcılığa gitme tehdidi ciddi miydi?", answer: "Maalesef evet. Kariyerimin ve baromdaki itibarımın sonu olurdu." },
        { question: "Kadehin servis edildiği sırada neredeydiniz?", answer: "Salondaydım, diğer misafirlerle birlikte. Kadehe yaklaşmadım, buna gerek de yoktu." },
      ],
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
    {
      id: "kredi-karti-notu",
      type: "resmi_rapor",
      title: "Şirket Kredi Kartı İnceleme Notu",
      meta: "Erendil Holding İç Denetim · Gizli",
      body: `İç denetim ekibi tarafından yapılan rutin inceleme sırasında, Melis Erendil'e (Aslan Erendil'in eşi) tahsis edilen şirket kredi kartıyla son altı ayda yapılan harcamaların büyük kısmının kişisel nitelikte olduğu tespit edilmiştir. Necdet Erendil, bulguları görür görmez konuyu bizzat takip etmek istediğini belirtmiş, "ailevi bir mesele olarak" ele alınmasını istemiştir.`,
    },
    {
      id: "hisse-devri-inceleme",
      type: "resmi_rapor",
      title: "Hisse Devri Belgesi İncelemesi",
      meta: "Erendil Holding Hukuk Servisi · Acil İnceleme Talebi",
      body: `Necdet Erendil'in talimatıyla incelenen 2019 tarihli hisse devri belgesinde, holding avukatı Emin Doğaner adına devredilen %4'lük payın imza sürecinde usulsüzlük şüphesi bulunmaktadır. Necdet Erendil, belgeyi "yakın zamanda fark ettiğini" ve "derhal iptal sürecini başlatacağını" belirten yazılı bir talimat vermiştir. Belgenin savcılığa intikal ettirilip ettirilmeyeceği netlik kazanmamıştır.`,
    },
  ],
  timeline: [
    { time: "19:35", description: "Emin Doğaner, kutlama başlamadan önce Necdet'le kütüphanede özel bir görüşme yapar, sert bir tartışma yaşanır." },
    { time: "20:00", description: "Doğum günü kutlaması başlar, misafirler salona geçer." },
    { time: "20:15", description: "Melis, servise yardım etmek için mutfağa girer." },
    { time: "20:35", description: "Melis tekrar mutfağa girip çıkar." },
    { time: "20:45", description: "Necdet özel viskisini ister, Sadi mutfaktan hazırlar." },
    { time: "20:50", description: "Sadi kadehi salona getirip yan masaya bırakır, herkesi pasta için çağırır — kadehe dokunan son kişi oydu, kendisi 'hiçbir sebebim yok' diyor.", contradicts: "sadi" },
    { time: "20:55", description: "Sadi kadehi Necdet'e sunar." },
    { time: "21:00", description: "Necdet kadeh kaldırıp içer, kısa bir konuşma yapar." },
    { time: "21:05", description: "Necdet aniden fenalaşır." },
    { time: "21:10", description: "Dr. Umay müdahale eder, ama geç kalınmıştır." },
    { time: "21:15", description: "Necdet Erendil hayatını kaybeder." },
  ],
  hints: [
    "Bu vakada herkesin bir sırrı var ama sadece birinin gerçekten zehire erişimi olabilirdi.",
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
      "Katil, kırk yıllık kahya Sadi Yalman. Kardeşi Yusuf'un, gençliğinde Necdet tarafından hileli bir ortaklık anlaşmasıyla dolandırılıp her şeyini kaybettiğini ve bu yüzden intihar ettiğini, yakın zamanda kardeşinin eski bir mektubundan öğrendi. Kırk yıldır ailenin en güvenilir hizmetkarı olarak hem mutfağa hem Dr. Umay'ın ilaç dolabına serbestçe erişebiliyordu — dolaptan aldığı digoksini, her zaman kendisinin hazırladığı özel viski kadehine kattı. Diğer yedi şüphelinin motivleri gerçek ve gürültülüydü (miras, kumar borcu, aldatma tehdidi, malpraktis ifşası, harcama skandalı, hisse usulsüzlüğü) ama hiçbirinin zehire gerçek bir erişimi yoktu: Aslan ve Kaan'ın fırsat penceresi vardı ama zehri nereden bulacaklardı; Defne yeni vasiyeti bilmiyordu; Yıldız'ın erişimi yoktu; Dr. Umay'ın erişimi vardı ama kadehi o hazırlamadı, hazırlayan hep Sadi'ydi; Melis ve Emin'in kutlama öncesi/sırasındaki hareketleri gerçekti ama ikisinin de ilaç dolabına erişimi yoktu. İlaç dolabı erişim kaydı ve hizmetçi ifadesi, ipucu zincirini doğrudan Sadi'ye bağlıyordu.",
  },
};
