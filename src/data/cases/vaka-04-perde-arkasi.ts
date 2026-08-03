import type { CaseData } from "@/types/case";

export const vaka04: CaseData = {
  id: "vaka-04-perde-arkasi",
  order: 4,
  title: "Perde Arkası",
  difficulty: "zor",
  tagline: "Bir oyunun prömiyer gecesi, ünlü yönetmen sahne arkasında cansız bulundu.",
  available: true,
  synopsis:
    "Şehrin en eski tiyatrolarından biri olan Meridyen Sahnesi, bu akşam yıllardır beklenen bir prömiyere hazırlanıyordu: usta yönetmen ve yazar Orhan Tez'in son oyunu 'Son Perde'. Salon tıklım tıklımdı, eleştirmenler ön sıralardaydı, kulis ise her zamanki gibi kontrollü bir kaosa bürünmüştü — kostüm değişimleri, ışık işaretleri, fısıltıyla söylenen replikler.\n\nBirinci perde arası verildiğinde, sahne amiri ikinci perdeyi başlatmak için Orhan'ı çağırmaya gitti — yönetmen, her prömiyerde yaptığı gibi, ışık kumanda panosuna kendi eliyle son bir kez dokunmadan sahneye geçmezdi, bu onun otuz yıllık bir ritüeliydi. Panonun önünde buldu onu: yere yığılmış, elinde hâlâ panonun kapağı, gövdesinde elektrik çarpmasının izleri. Panonun içindeki bir kablo, kasıtlı olarak sıyrılmış ve topraklama devre dışı bırakılmıştı.\n\nO gece kulis arkasında sekiz kişi vardı — oyuncular, teknik ekip, yapımcı, bir eleştirmen. Herkesin salonun karanlığında bir yerlerde olması gerekiyordu ama kimse birbirini tam olarak göremiyordu. Birkaç ay önce bir villa cinayetiyle sarsılan kamuoyu, bu kez sahnenin arkasındaki gerçek dramla çalkalanıyor. Perde bir daha hiç aynı şekilde açılmayacak — sen de kulisin gölgelerinde saklanan gerçeği bulmalısın.",
  victim: {
    name: "Orhan Tez",
    age: 62,
    description:
      "Kuşağının en saygın tiyatro yönetmeni ve yazarı. Sert, mükemmeliyetçi, oyuncularına karşı hem baba hem despot olabilen biri. 'Son Perde', otuz yıllık kariyerinin son büyük eseri olarak duyurulmuştu.",
  },
  suspects: [
    {
      id: "derin",
      name: "Derin Aksoy",
      age: 34,
      role: "Başrol Oyuncusu",
      motive:
        "On iki yıldır Orhan'ın en güvendiği oyuncusuydu. Orhan, ulusal turne için onun yerine genç Mina Sarıca'yı almaya karar vermiş, bunu Derin'e hiç söylemeden yapımcıyla anlaşmıştı.",
      opportunity:
        "Birinci perde arasında soyunma odasında kostüm değiştiriyordu — ama soyunma odası, ışık kumanda panosuna sadece bir koridor uzaklıktaydı.",
      statementIntro:
        "\"On iki yıl Orhan'la çalıştım, ona her şeyimi borçluyum sanıyordum. Ara verildiğinde soyunma odama gittim, ikinci kostümüme geçtim, kimse benimle değildi ama bu normal, herkes kendi işiyle meşguldü. Orhan'ı en son perde arasından hemen önce, sahnede gördüm, gayet iyiydi. Onu bir daha görmedim, ta ki... haberi alana kadar.\"",
      statementQA: [
        { question: "Ulusal turne kararını biliyor muydunuz?", answer: "Hayır, o gece hiçbir şey bilmiyordum. Sonradan öğrendim, bu bile bana çok acı verdi." },
        { question: "Soyunma odasında sizi gören oldu mu?", answer: "Sanmıyorum, kapım kapalıydı, kostüm değişimi mahremdir, kimse rahatsız etmez." },
        { question: "Işık panosuna hiç yaklaştınız mı o gece?", answer: "Hayır, o benim işim değil, oraya neden gideyim ki?" },
        { question: "Orhan'la aranızda son zamanlarda bir gerginlik var mıydı?", answer: "Yorgunluktan kaynaklanan küçük sürtüşmeler oluyordu tabii, prömiyer stresi. Ama ciddi bir şey yoktu." },
      ],
    },
    {
      id: "tayfun",
      name: "Tayfun Serin",
      age: 52,
      role: "Yapımcı",
      motive:
        "Prodüksiyona kişisel servetinin büyük bir kısmını yatırmıştı. Orhan, prömiyerden bir gün önce oyunu 'hazır değil' diyerek erteleme, hatta iptal etme tehdidinde bulunmuştu — bu Tayfun'u iflasın eşiğine getirebilirdi.",
      opportunity:
        "O gece lobide yatırımcı misafirlerle ilgileniyordu, ama birinci perde arasında birkaç dakikalığına ortadan kayboldu.",
      statementIntro:
        "\"Bu oyuna her şeyimi yatırdım, hâlâ da öyle düşünüyorum, doğru bir yatırımdı. Orhan'ın erteleme tehdidi beni çıldırttı, itiraf ediyorum, sert bir tartışma yaşadık. Ama o gece lobideydim, önemli yatırımcılarımızla ilgileniyordum, orada kalmam gerekiyordu, işim başımdan aşkındı.\"",
      statementQA: [
        { question: "Erteleme tehdidini nasıl aldınız?", answer: "Paniklemiştim açıkçası. Ama sonra sakinleşti, prömiyer için devam etme kararı aldı." },
        { question: "Lobiden ayrıldığınız bir an oldu mu?", answer: "Birkaç dakika, evet, bir telefon görüşmesi için dışarı çıktım. Ama kulise hiç gitmedim." },
        { question: "Görüşmeyi doğrulayabilecek biri var mı?", answer: "Aradığım kişi yurt dışında, operatör kaydı olmalı ama henüz ulaşamadım." },
      ],
    },
    {
      id: "gul",
      name: "Gül Baransel",
      age: 45,
      role: "Sahne Amiri",
      motive:
        "Geçen sezon yaşanan bir teknik aksaklık yüzünden Orhan onu herkesin önünde aşağılamış, 'bir daha olursa kovulursun' demişti. O gece de küçük bir dekor sorunu yaşanmıştı.",
      opportunity:
        "Işık ve ses ekibini yönetiyor, kumanda panosunun anahtarı her zaman onda duruyor.",
      statementIntro:
        "\"Yirmi yıldır bu tiyatroda çalışıyorum, sahne benim evim gibidir. O gece bir dekor parçası sıkışmıştı, arasını onunla uğraşarak geçirdim, iki sahne işçisi de yanımdaydı. Orhan'ın bana geçen sezon söylediklerini unutmadım ama bu işi seviyorum, riske atacak bir şey yapmam.\"",
      statementQA: [
        { question: "Panonun anahtarı gerçekten her zaman sizde mi?", answer: "Evet, göreve başlarken teslim alırım. Ama pano zaten kilitli değildi, prömiyer gecesi sık kullanıldığı için açık bırakılır." },
        { question: "Dekor sorununu kim doğrulayabilir?", answer: "İki sahne işçim, Kaya ve Deren. İkisi de o an yanımdaydı, tüm ara boyunca." },
        { question: "Orhan'ın sizi tehdit ettiği doğru mu?", answer: "Tehdit değil, uyarıydı diyelim. Haklıydı da bir yerde, ama sert söylemişti." },
      ],
    },
    {
      id: "zafer",
      name: "Zafer Kutlu",
      age: 48,
      role: "Baş Işık/Elektrik Teknisyeni",
      motive:
        "Aylardır fazla mesai ücretlerini alamıyordu; Orhan'a defalarca söylemesine rağmen bir çözüm çıkmamıştı, son haftalarda iyice bıkkın ve öfkeliydi.",
      opportunity:
        "Elektrik sistemine dair en derin bilgiye sahip kişi, panoya her an rahatça erişebiliyor.",
      statementIntro:
        "\"On beş yıldır bu tiyatronun elektrik işlerine bakıyorum, sistemi avucumun içi gibi bilirim. Fazla mesailer meselesi doğru, sinir bozucuydu, ama bu Orhan Bey'i öldürecek bir şey değil, param için beklerim ben. O gece ses kontrol kabinindeydim, ikinci perde ışık işaretlerini hazırlıyordum, kabin görevlisi de yanımdaydı.\"",
      statementQA: [
        { question: "Panonun içindeki sıyrılmış kabloyu siz mi fark ettiniz?", answer: "Hayır, olaydan sonra ekip geldiğinde görüldü. Ben o sırada kabindeydim." },
        { question: "Kabin görevlisi ifadenizi doğruluyor mu?", answer: "Evet, sorun onunla konuşun, tüm ara boyunca birlikteydik." },
        { question: "Panoya en son ne zaman dokundunuz?", answer: "Prömiyerden önce, rutin kontrol için. Her şey normaldi o zaman." },
      ],
    },
    {
      id: "onur",
      name: "Onur Vural",
      age: 29,
      role: "Genç Oyun Yazarı / Eski Asistan",
      motive:
        "Orhan'ın asistanlığını yaparken yazdığı bir taslağın, neredeyse birebir 'Son Perde'nin temelini oluşturduğunu iddia ediyordu. Orhan bunu reddedip Onur'u sessiz kalmakla tehdit etmişti.",
      opportunity:
        "O gece salonda, seyirciler arasında oturuyordu — kulise girme yetkisi yoktu.",
      statementIntro:
        "\"O taslağı üç yıl önce, onun asistanıyken yazdım. 'Son Perde'yi izlerken kendi kelimelerimi duydum, yemin ederim. Orhan'la bunu konuşmaya çalıştım, beni 'hayal görmekle' suçladı, avukatlarını hatırlattı. O gece salondaydım, biletim ikinci sıradaydı, kulise hiç girmedim, girme yetkim de yoktu zaten.\"",
      statementQA: [
        { question: "Taslağınızın bir kopyası var mı?", answer: "Var, tarihli bir dosya olarak duruyor. Bunu ispatlayabilirim diye düşünüyorum." },
        { question: "Kulise girmeyi hiç denediniz mi?", answer: "Hayır, güvenlik zaten izin vermezdi, herkes tanır beni orada, 'eski asistan' olarak anılırım hâlâ." },
        { question: "Orhan'a karşı öfkeniz ne kadar büyüktü?", answer: "Büyüktü, hâlâ da öyle. Ama onu öldürmek davamı kaybettirir, mantıksız olur." },
      ],
    },
    {
      id: "mina",
      name: "Mina Sarıca",
      age: 26,
      role: "Genç Yardımcı Oyuncu",
      motive:
        "Orhan'ın turne için onu seçtiği söyleniyordu — bu, kariyerinin en büyük fırsatıydı. Bazı çevreler, Derin'in yerini almak için Orhan'a yakınlaştığını fısıldıyordu.",
      opportunity:
        "İkinci sahnesi için hazırlanıyordu, sahnenin hemen yanındaki bekleme alanındaydı — ama orası pek çok kişi tarafından görülebilir bir yerdi.",
      statementIntro:
        "\"Turne haberini ben de o gece, ara sırasında öğrendim, Orhan bana özel söyledi, çok heyecanlandım itiraf edeyim. Bekleme alanındaydım, sahne yönetmeni yardımcısı ve birkaç oyuncu daha oradaydı, kimse yalnız değildi orada. Derin Hanım'ın bundan haberi olduğunu sanmıyordum, keşke olmasaydı böyle olmasaydı her şey.\"",
      statementQA: [
        { question: "Turne haberini Orhan size ne zaman, nasıl söyledi?", answer: "Ara başlar başlamaz, kulağıma fısıldadı âdeta, 'seninle konuşacağız' dedi. Çok mutlu olmuştum." },
        { question: "Derin Hanım'ın çalışma alışkanlıklarından bahseder misiniz?", answer: "Hep tuhaf bir şey yapardı, repliklerini bazen ters okuyarak ezberlerdi, aynadan okur gibi. Herkes alışıktı buna, 'eski bir tiyatro numarası' derdi." },
        { question: "Bekleme alanında sizi kimler gördü?", answer: "Sahne yönetmeni yardımcısı Ela, ve iki dansçı arkadaşım. Hepsi doğrular." },
      ],
    },
    {
      id: "sevgi",
      name: "Sevgi Tez",
      age: 58,
      role: "Eşi",
      motive:
        "Boşanma sürecindeydiler. Orhan, telif haklarının büyük kısmını yeni bir vasiyetle bir vakfa devretmeyi planlıyordu — bu, Sevgi'yi neredeyse hiçbir şeysiz bırakacaktı.",
      opportunity:
        "Locada, davetliler arasında oturuyordu; ara sırasında kulise kısa bir ziyarette bulunduğunu kendisi de kabul ediyor.",
      statementIntro:
        "\"Otuz beş yıl evli kaldık, son birkaç ayda her şey çözülmeye başladı. Yeni vasiyetten geç haberim oldu, beni neredeyse hiçbir şeyden mahrum bırakıyordu, çok kırıldım. O gece locadaydım, ara sırasında ona 'iyi şanslar' demek için kulise kısa bir uğradım, birkaç dakika sürdü, sonra locama döndüm.\"",
      statementQA: [
        { question: "Kulise ne zaman, ne kadar süreyle gittiniz?", answer: "Ara başlar başlamaz, beş dakika kadar. Onu görmedim bile, kapısı kapalıydı, geri döndüm." },
        { question: "Vasiyet konusunu Orhan'la konuştunuz mu?", answer: "Konuşmaya çalıştım, o beni dinlemek istemedi. 'Sonra' dedi, hep 'sonra' derdi." },
        { question: "Locaya döndüğünüzü kim doğrulayabilir?", answer: "Yanımdaki misafirler, ikinci perde başlarken oradaydım, bunu herkes gördü." },
      ],
    },
  ],
  documents: [
    {
      id: "olay-yeri-raporu",
      type: "resmi_rapor",
      title: "Olay Yeri İnceleme Tutanağı",
      meta: "Meridyen Sahnesi · Tutanak No: 2026/PS-057 · Komiser Aren Doğuş",
      body: `Kurban, sahne arkası ışık kumanda panosunun önünde, panonun kapağı elinde açık halde bulunmuştur. Panonun içinde, ana topraklama kablosunun kasıtlı olarak sıyrıldığı ve devre dışı bırakıldığı tespit edilmiştir. Zorla giriş izi yoktur — pano, prömiyer gecelerinde sık kullanıldığı için genellikle kilitsiz bırakılmaktadır.

Panonun hemen yanında, üzerinde tek bir rakam yazan eski bir kulis fişi bulunmuştur: "Loca 2".`,
    },
    {
      id: "adli-tip-raporu",
      type: "resmi_rapor",
      title: "Adli Tıp Ön Raporu",
      meta: "Adli Tıp Kurumu · Rapor No: ATK-2026-0839 · Dr. Selen Akbulut",
      body: `Ölümün, birinci perde arasının başladığı 20:50 ile ikinci perdenin başlamasının planlandığı 21:15 arasında, tahminen 20:58–21:06 saatleri arasında gerçekleştiği değerlendirilmektedir. Vücutta yüksek voltajlı elektrik akımına özgü yanık izleri tespit edilmiştir. Savunma izi yoktur — kurban müdahaleyi beklemiyordu.`,
    },
    {
      id: "elektrik-uzman-raporu",
      type: "resmi_rapor",
      title: "Elektrik Sistemi İnceleme Raporu",
      meta: "Bağımsız Elektrik Mühendisi · Kolluk Kuvvetleri Talebiyle",
      body: `Panodaki topraklama kablosunun sıyrılma şekli, rastgele bir arızayla açıklanamayacak kadar düzenlidir; kabloya bilerek, temel düzeyde elektrik bilgisiyle müdahale edilmiş olması muhtemeldir. Bu iş, sistemin tamamına hakim bir uzmanlık gerektirmez — sadece hangi kablonun kesileceğini bilmek yeterlidir.

Not: Panonun üstünde, teknik ekibin vardiya çizelgesinden düşmüş görünen küçük bir kağıt parçası vardı, üzerinde "5 numaralı devre" ibaresi ve elle çizilmiş tek bir rakam: "5".`,
    },
    {
      id: "vardiya-cizelgesi",
      type: "gunluk_log",
      title: "Teknik Ekip Vardiya Çizelgesi",
      meta: "Zafer Kutlu'nun el yazısı notları",
      body: `20:30 — Işık ekibi son kontrolleri tamamladı, pano rutin kontrolden geçirildi, her şey normal.
20:45 — Birinci perde başladı, ekip kontrol kabinine geçti.
20:50 — Perde arası, ikinci perde ışık işaretleri hazırlanmaya başlandı.
21:10 — Orhan Bey'in bulunduğu haberi geldi, kabin boşaltıldı.

(Not: 20:50–21:10 arası kabinde ben ve kabin görevlisi Derya birlikteydik, ikimiz de panoya gitmedik.)`,
    },
    {
      id: "loca-kaydi",
      type: "bilet_kaydi",
      title: "Prömiyer Gecesi Loca/Bilet Kaydı",
      meta: "Meridyen Sahnesi Gişe Kaydı",
      body: `Davetli Listesi (kısmi):
- Sevgi Tez — Loca 3
- Tayfun Serin'in yatırımcı misafirleri — Loca 1, Loca 4
- Basın/eleştirmen kartları — Salon, ön sıra

Not: "Loca 2" kaydı bu listede görünmüyor — bu loca, prömiyer gecesi teknik ekip tarafından malzeme deposu olarak kullanılmak üzere geçici olarak boşaltılmıştı.`,
    },
    {
      id: "meridyen-elestiri",
      type: "haber_kupuru",
      title: "Prömiyer Öncesi Söyleşi",
      meta: "Meridyen Gazetesi · Kültür-Sanat Servisi",
      newsHeader: {
        publication: "Meridyen Gazetesi",
        headline: "Orhan Tez: 'Son Perde Benim En Kişisel Oyunum'",
        byline: "Pelin Ergüven",
        date: "Olaydan 2 gün önce",
      },
      body: `Usta yönetmen Orhan Tez, bu akşam sahnelenecek "Son Perde" için sorularımızı yanıtladı: "Otuz yıldır bu sahnedeyim, sahneye koyduğum sekizinci oyun bu, ama en kişisel olanı. Ekibime güveniyorum, özellikle de yıllardır yanımda olan isimlere." Tez, geçtiğimiz aylarda gündeme gelen "esinlenme" iddialarına ise yorum yapmak istemedi.

(Muhabir notu, kupürün kenarına: kültür servisi arşivinde bu tam olarak Tez'in sekizinci prömiyeri olarak kayıtlı — "8".)`,
    },
    {
      id: "tayfun-mesaj",
      type: "whatsapp",
      title: "Yatırımcıyla Yazışma",
      meta: "Tayfun Serin'in telefonundan · Olaydan bir gün önce",
      messages: [
        { sender: "Yatırımcı (Kerim Sav)", time: "22:14", text: "Orhan'ın erteleme lafları doğru mu? Bu doğruysa yatırımımı geri çekmeyi düşünürüm." },
        { sender: "Tayfun Serin", time: "22:20", text: "Endişelenme, ben hallederim, prömiyer yarın gerçekleşecek, söz veriyorum.", self: true },
        { sender: "Yatırımcı", time: "22:22", text: "Umarım, çünkü battığımız para küçük değil." },
        { sender: "Tayfun Serin", time: "22:25", text: "Biliyorum, biliyorum. Bir yolunu buldum, merak etme.", self: true },
      ],
    },
    {
      id: "mina-eposta",
      type: "eposta",
      title: "Turne Kadrosu Taslak E-postası",
      meta: "Tayfun Serin'in taslaklar klasöründe bulundu, gönderilmemiş",
      emailHeader: {
        from: "Tayfun Serin",
        to: "Turne Ajansı",
        subject: "Son Perde — Ulusal Turne Kadrosu",
        date: "Olaydan 4 gün önce",
      },
      body: `Orhan'ın talimatıyla iletiyorum: ulusal turnede başrolü Mina Sarıca üstlenecek. Derin Aksoy'a bu değişiklik henüz resmi olarak bildirilmedi, Orhan bunu bizzat, prömiyerden sonra yapmak istiyor.

(Not: E-posta gönderilmemiş, taslak olarak kalmış.)`,
    },
    {
      id: "onur-ifade",
      type: "ifade",
      title: "Onur Vural İfadesi",
      meta: "Genç Yazar, 29 · Salonda seyirciler arasında",
      body: `"O taslağı üç yıl önce yazdım, Orhan'ın asistanıyken. 'Son Perde'nin iskeleti neredeyse birebir aynı, buna yemin edebilirim. Ona bunu söylediğimde beni küçümsedi, 'kimse sana inanmaz' dedi. O gece salondaydım, ikinci sıra, koltuk numaram kayıtlı. Kulise girme yetkim yok, güvenlik beni tanır, izin vermezler."`,
    },
    {
      id: "sevgi-telefon",
      type: "telefon_dokumu",
      title: "Avukatla Telefon Görüşmesi Dökümü",
      meta: "Sevgi Tez'in hattından · Olaydan iki gün önce",
      dialogue: [
        { speaker: "Sevgi", text: "Avukat Hanım, yeni vasiyeti gördüm. Neredeyse her şeyi vakfa bırakıyor, otuz beş yıllık evliliğimiz bu muydu?" },
        { speaker: "Avukat", text: "Sevgi Hanım, sakin olun, boşanma süreci devam ederken bu tür değişiklikler itiraz edilebilir." },
        { speaker: "Sevgi", text: "Prömiyerden sonra onunla konuşacağım, bir çözüm bulmalıyız." },
        { speaker: "Avukat", text: "Sert konuşmayın, elinizi güçlendirecek bir şey yapmayın. Hukuki yoldan gidelim." },
      ],
    },
    {
      id: "derin-eski-roportaj",
      type: "haber_kupuru",
      title: "On Beş Yıl Önceki Bir Röportaj",
      meta: "Yerel bir dergi arşivinden bulunmuş, unutulmuş bir kupür",
      newsHeader: {
        publication: "Sahne Dergisi",
        headline: "Kulisten Sahneye: Genç Bir İsim",
        byline: "Arşiv",
        date: "On beş yıl önce",
      },
      body: `Röportajımızın bu haftaki konuğu, üç yıldır bir tiyatronun ışık ekibinde teknisyen olarak çalışan, ama oyunculuğa geçmeyi hayal eden genç bir isim: Derin Aksoy. "Işık masasında geçirdiğim yıllar bana sahneyi başka türlü öğretti, ne zaman doğru anın geldiğini artık hissediyorum" diyor Aksoy, yakında bir oyunculuk sınavına gireceğini söylüyor.

(Not: Bu kupür, Derin Aksoy'un resmi biyografisinde hiç yer almıyor — kariyerine doğrudan oyuncu olarak başladığı bilinir.)`,
    },
    {
      id: "orhan-sandigi",
      type: "kilitli_kasa",
      title: "Orhan'ın Kilitli Aksesuar Sandığı",
      meta: "Yönetmen odasında bulundu",
      body: `Orhan'ın odasında, eski bir aksesuar sandığı bulundu. Üç haneli bir kombinasyon kilidi var. Sahne ekibinden biri, Orhan'ın önemli şeyleri hep aynı üç rakamla kilitlediğini hatırlıyor — belki bu rakamlar, o gece etrafta bulunan küçük ayrıntılarda saklı.`,
      lockDigits: 3,
      lockAnswer: "258",
      lockReveal: `[Sandığın içinden çıkanlar]

Eski, solmuş bir fotoğraf: ışık masasının başında genç bir teknisyen, gururla gülümsüyor. Arkasında el yazısıyla: "Derin Aksoy, ışık ekibi, on beş yıl önce." Fotoğrafın yanında Orhan'ın kendi el yazısıyla bir not: "Bu kızda bir şey var, bir gün sahneye çıkacak, biliyorum."`,
      lockHints: [
        "Orhan'ın önemli şeyleri hep aynı üç rakamla kilitlediği söyleniyor. Bu rakamları o gece etrafta bulunan küçük ayrıntılarda bulup küçükten büyüğe doğru dene.",
        "Bir loca fişi, bir devre numarası, bir gazete kupürü... o gecenin küçük ayrıntılarına tekrar bak.",
      ],
    },
    {
      id: "derin-gunluk",
      type: "sifreli_kayit",
      title: "Soyunma Odasında Bulunan Günlük Sayfası",
      meta: "Derin Aksoy'un soyunma odasında, aynanın arkasına sıkıştırılmış",
      body: `Derin'in soyunma odasında, aynanın arkasına sıkıştırılmış tek bir sayfa bulundu. Üzerindeki yazı harflerin karman çorman bir dizilimi gibi görünüyor — anlamsız bir karmaşa. Sayfanın geri kalanı boş.`,
      cipherEncoded: "=4SsETWehNHIld6wphGItFLxsFLx5BSarlGIu9GIskGZylGdfWcafScZkBSauVmYg4WYoJ3T",
      cipherAnswer: "Orhan beni değiştirdi, on iki yılım hiçe saydı.",
      cipherReveal: `[Kurtarılan sayfa — Derin Aksoy'un el yazısı, olay gecesi kaydedilmiş]

"Orhan beni değiştirdi, on iki yılım hiçe saydı. Mina'yı turneye çıkaracakmış, bana tek kelime etmeden karar vermiş. On iki yıl sonra bu mu? Bu sahneyi ona ben kazandırdım, unutmuş görünüyor."`,
      cipherHints: [
        "Bu tuhaf karakter dizisi bir kodlama olabilir — alfabesi tanıdık geliyor mu?",
        "Belki bir şeyi ters çevirmen gerekiyor. Derin'in repliklerini nasıl ezberlediğini hatırlayan birini bulmaya çalış.",
      ],
    },
  ],
  timeline: [
    { time: "20:30", description: "Işık ekibi son kontrolleri tamamlar, pano rutin kontrolden geçer." },
    { time: "20:45", description: "Birinci perde başlar." },
    { time: "20:50", description: "Perde arası verilir. Orhan, Mina'ya turne haberini fısıldar." },
    { time: "20:52", description: "Sevgi, kulise kısa bir ziyarette bulunur, birkaç dakika sonra locasına döner." },
    { time: "20:55", description: "Tayfun, lobiden birkaç dakikalığına ayrılır." },
    { time: "20:58", description: "Derin, soyunma odasına gider — kendisi 'kimse beni görmedi' diyor, ama bir sahne işçisi onu koridorda, ışık panosuna doğru yürürken gördüğünü belirtiyor.", contradicts: "derin" },
    { time: "20:58–21:06", description: "Cinayet gerçekleşir (adli tıp tahmini)." },
    { time: "21:00", description: "Gül, sıkışan bir dekor parçasıyla iki sahne işçisinin yardımıyla uğraşır." },
    { time: "21:10", description: "Sahne amiri Orhan'ı çağırmaya gider, cesedi bulur." },
    { time: "21:15", description: "İkinci perde ertelenir, salon bilgilendirilir." },
  ],
  hints: [
    "Herkesin bir alibi'si var gibi görünüyor ama panoya kimin teknik bilgiyle yaklaşabileceğini düşünmek yeterli değil — kimin bu bilgiye SAHİP OLDUĞU asıl soru.",
    "Bazı kariyerler beklenmedik yerlerden başlar. Şüphelilerin geçmişini bir kez daha gözden geçir.",
  ],
  motiveQuestion: {
    prompt: "Katilin asıl motivi neydi?",
    options: [
      { id: "m1", label: "On iki yıllık kariyerinin, kendisine hiç söylenmeden elinden alınması", correct: true },
      { id: "m2", label: "Fazla mesai ücretlerinin ödenmemesi", correct: false },
      { id: "m3", label: "Prodüksiyona yatırılan paranın kaybedilme riski", correct: false },
      { id: "m4", label: "Bir intihal iddiasının reddedilmesi", correct: false },
    ],
  },
  methodQuestion: {
    prompt: "Katil, cinayeti nasıl işledi?",
    options: [
      { id: "y1", label: "Eski teknik geçmişini kullanarak ışık panosundaki topraklama kablosunu kasıtlı olarak sıyırdı", correct: true },
      { id: "y2", label: "Panoyu kısa devre yaptırıp yangın çıkardı", correct: false },
      { id: "y3", label: "Baş elektrikçiyi kandırıp panoyu ona açtırttı", correct: false },
      { id: "y4", label: "Orhan'ı sahnede, herkesin önünde itip düşürdü", correct: false },
    ],
  },
  solution: {
    killerId: "derin",
    explanation:
      "Katil, başrol oyuncusu Derin Aksoy. Oyunculuğa geçmeden önce üç yıl bir tiyatronun ışık ekibinde teknisyen olarak çalışmıştı — bu, resmi biyografisinde hiç yer almayan, neredeyse unutulmuş bir detaydı. Perde arasında, Orhan'ın kendisini turne kadrosundan çıkarıp yerine Mina'yı koyduğunu henüz bilmeden ama sezerek, soyunma odasına gidiyormuş gibi görünüp ışık panosuna yöneldi; temel elektrik bilgisiyle topraklama kablosunu sıyırdı. Elektrik uzmanının 'temel düzeyde bilgi yeterli' tespiti ile on beş yıllık unutulmuş röportaj, ipucu zincirini ona bağlıyordu; bir sahne işçisinin onu koridorda panoya doğru giderken gördüğü tanıklığı ise 'kimse beni görmedi' ifadesiyle doğrudan çelişiyordu. Diğer altı şüphelinin hepsinin gerçek bir motivi vardı ama hiçbiri cinayete karışmamıştı: Tayfun lobide yatırımcılarla meşguldü, Gül iki tanıkla dekorla uğraşıyordu, Zafer kabin görevlisiyle birlikteydi, Onur'un kulise girme yetkisi bile yoktu, Mina onlarca kişinin gözü önündeki bekleme alanındaydı, Sevgi'nin kulis ziyareti kısa ve tanıklıydı. Motivi de en acısıydı: on iki yıllık bir kariyer, tek bir söz edilmeden elinden alınmıştı.",
  },
};
