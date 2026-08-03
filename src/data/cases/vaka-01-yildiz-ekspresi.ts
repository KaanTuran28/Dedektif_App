import type { CaseData } from "@/types/case";

export const vaka01: CaseData = {
  id: "vaka-01-yildiz-ekspresi",
  order: 1,
  title: "Yıldız Ekspresi",
  difficulty: "kolay",
  tagline: "Kar fırtınasında mahsur kalan trende, kilitli bir kompartımanda bir cinayet işlendi.",
  available: true,
  synopsis:
    "Ankara'dan Kars'a giden gece treni Yıldız Ekspresi, yılın en şiddetli kar fırtınalarından birine yakalandı. Pencerelerin ardında rüzgar uğulduyor, vagonlar sarsıla sarsıla ilerliyordu; gece yarısını geçtiğinde tren, dağların arasındaki eski bir tünelde durmak zorunda kaldı — önden gelen çığ uyarısı, makinistleri beklemeye zorlamıştı. Yolcular kompartımanlarına çekilmiş, koridorlar sessizliğe bürünmüştü.\n\nSabaha karşı saat dörde doğru, vagon görevlisi Bora Yalçın'ın devriye turu bir çığlıkla değil, sessizlikle bozuldu: 7 numaralı kompartımanın kapısı aralıktı, içeride ışık yanıyordu ama cevap gelmiyordu. İçeri girdiğinde bulduğu manzara onu dondurdu — İstanbul'un tanınmış antika koleksiyoncusu Kemal Aydınlı, kendi koleksiyonuna ait sedef kakmalı bir Osmanlı hançeriyle göğsünden vurulmuş, yerde cansız yatıyordu.\n\nKompartımanın kapısı içeriden sürgülüydü. Penceresi, kışlık yalıtım yüzünden dıştan buzlanmış, açılamaz durumdaydı. Tren tünelde durduğu için kimse dışarı çıkıp kaçamazdı — katil hâlâ trendeydi, o gece uyanık ya da uyur görünen sekiz kişiden biri. Kemal Aydınlı'nın yıllara yayılan husumetleri, borçları, ihanetleri ve sırları şimdi tek tek koridorlara taşınıyordu. Kanıtları incele, çelişkileri yakala ve tünelin içinde kilitli kalan gerçeği bul.",
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
      statementIntro:
        "\"Otuz yıl oldu Kemal'le evleneli. İlk yıllar güzeldi, sonra iş büyüdükçe o değişti, ben de alıştım galiba — ya da alışmış numarası yaptım. Son bir ayda avukatıyla sık sık görüştüğünü biliyordum ama boşanma kağıtlarını görünce itiraf edeyim, çok kırıldım. O gece erken yattım, üzgündüm, uyku hapı almıştım. Tren durduğunda bile uyanmadım, sabaha karşı tuvalete kalktığımda görevli beni gördü, sonra her şeyi öğrendim.\"",
      statementQA: [
        { question: "Kocanızla aranızdaki anlaşmazlığı biliyor muydunuz?", answer: "Yeni vasiyeti görmüştüm, evet. Beni neredeyse hiçbir şeyden mahrum bırakıyordu. Kızgındım ama bu kadarını yapacak biri değilim." },
        { question: "Uyku hapı aldığınızı doğrulayabilecek biri var mı?", answer: "Hayır, kompartımanda yalnızdım. Ama ilacın kutusu hâlâ çantamda, isterseniz bakın." },
        { question: "Bağlantı kapısının anahtarı sizde miydi?", answer: "Evet, hep bendeydi. Ama o gece hiç kullanmadım, neden kullanayım ki?" },
        { question: "Kocanızın ölümünden kim fayda sağlar?", answer: "Eski vasiyete göre ben. Yeni olan imzalanmamıştı hâlâ, bunu sonradan öğrendim." },
      ],
    },
    {
      id: "emre",
      name: "Emre Solak",
      age: 27,
      role: "Genç Asistanı",
      motive:
        "Kemal, Emre'nin galeriden zimmetine para geçirdiğini öğrenmişti; onu kovup şikayet edeceğini söylemişti.",
      opportunity: "Kemal'in kompartıman anahtarının yedeğini asistan olarak taşıyordu.",
      statementIntro:
        "\"Kemal Bey'in yanında üç yıldır çalışıyorum, ona çok şey borçluyum. O gece vagon restoranında oturmuş, ertesi gün Kars'taki alım için rapor hazırlıyordum. Saat kaçta çıktığımı tam hatırlamıyorum ama uzun süre orada kaldım. Kemal Bey'i en son kompartımanına döndüğünde gördüm, gayet iyiydi, bana ertesi günün planını anlattı. Sonra ben de kendi yerime geçtim, uyudum. Sabah haberi alınca inanamadım.\"",
      statementQA: [
        { question: "Kemal Bey'le aranızda son günlerde bir gerginlik yaşandı mı?", answer: "Hayır, hiçbir şey yoktu, çok iyi anlaşıyorduk." },
        { question: "Restoran vagonunda sizi gören oldu mu?", answer: "Garson vardı sanırım, ama o kadar yoğun bir gece değildi, dikkat etmemiş olabilir." },
        { question: "Kompartıman anahtarınız neredeydi?", answer: "Bende, asistan olarak hep taşırım. Ama o gece hiç kullanmadım." },
        { question: "Kol düğmenizden biri eksik mi?", answer: "(uzun bir sessizlik) Fark etmemiştim. Belki kaybetmişimdir, bilmiyorum." },
      ],
    },
    {
      id: "selim",
      name: "Selim Barkın",
      age: 61,
      role: "Rakip Koleksiyoncu",
      motive:
        "Kemal'le yıllardır süren bir rekabetleri vardı; Kemal'in Selçuklu tasını 'kaçak' yollardan aldığını ifşa etmekle tehdit ediyordu.",
      opportunity: "Koridorun karşı ucunda, aynı vagonda kalıyordu.",
      statementIntro:
        "\"Kemal'le otuz yılı aşkın bir rekabetimiz vardı, bunu saklamayacağım. Aynı müzayedelere girer, aynı eserlerin peşinden koşardık. Son dönemde onun bazı parçalarının kaynağı hakkında ciddi şüphelerim vardı, bunu ona da söyledim, kızdı. O gece kompartımanımda kitap okuyordum, çay içtim, saat 03:30 gibi hâlâ uyanık olduğumu sanıyordum ama galiba bir ara dalmışım, tam hatırlamıyorum. Uyandığımda tren durmuştu, sonra kargaşa başladı.\"",
      statementQA: [
        { question: "Çayınızı ne zaman içtiniz?", answer: "02:30 gibi demlemiştim sanırım. Sonra kitaba döndüm." },
        { question: "Kemal'i tehdit ettiğiniz doğru mu?", answer: "Tehdit değil, uyarıydı. 'Bunu ifşa ederim' dedim, bu bir tehdit mi sayılır bilmiyorum." },
        { question: "Uyuduğunuzu şimdi mi fark ediyorsunuz?", answer: "Utanarak söylüyorum ama evet. Yaşım gereği erken uyuklarım bazen, farkında bile olmam." },
        { question: "Kompartımanınızdan çıktınız mı hiç?", answer: "Hayır, sabaha kadar oradaydım, eminim." },
      ],
    },
    {
      id: "ferit",
      name: "Ferit Kaya",
      age: 45,
      role: "Eski İş Ortağı",
      motive:
        "Yıllar önce Kemal'le ortak bir dolandırıcılık işine karışmış, Kemal suçu üstüne yıkıp hapse girmesine izin vermişti. Yeni tahliye oldu.",
      opportunity: "Bileti son anda, farklı bir isimle alınmıştı — gizlenme çabası.",
      statementIntro:
        "\"On iki yıl önce Kemal'le ortak bir işe girdik, sonra her şey yolundan çıktı. Bir dolandırıcılık suçlaması geldi, ben içeri girdim, o dışarıda kaldı — evet, bu adaletsizdi ve evet, hâlâ öfkeliyim. Yeni tahliye oldum, bu trende olmam tesadüf değil, itiraf ediyorum, biletimi başka bir isimle aldım çünkü Kemal'in beni fark edip yolculuğu değiştirmesinden korktum. Ama ona yaklaşmadım bile. Sadece izledim, ne yapacağıma karar veremedim.\"",
      statementQA: [
        { question: "Neden farklı bir isimle bilet aldınız?", answer: "Şartlı tahliyeyle dışarıdayım, Kemal'le aynı ortamda görünmek bile sorun yaratabilirdi. Saklanmak zorundaydım." },
        { question: "Kemal'le konuştunuz mu hiç o gece?", answer: "Hayır, bir kez bile. Kompartımanımdan neredeyse hiç çıkmadım." },
        { question: "Ona hâlâ kızgın mısınız?", answer: "Elbette. On iki yılımı aldı benden. Ama onu öldürmek intikam değil, yeni bir hapis cezası demek — buna değmez." },
      ],
    },
    {
      id: "bora",
      name: "Bora Yalçın",
      age: 38,
      role: "Vagon Görevlisi",
      motive:
        "Kemal, geçen sefer 'kaybettiği' değerli bir kolyeyle ilgili Bora hakkında şikayette bulunacağını söylemişti.",
      opportunity: "Master anahtar ondaydı, tüm kompartımanlara girebilirdi.",
      statementIntro:
        "\"On beş yıldır bu hatta çalışıyorum, her şeyi kayda geçiririm, öğretilen budur. O gece rutin devriyedeydim, restoran vagonunu kontrol ettim, koridorları dolaştım. Çığ uyarısı gelince lokomotif ekibiyle telsizden konuştum, bu birkaç dakikamı aldı, defterime tam olarak yazamadım çünkü elimde telsiz vardı. Sonra tekrar tura çıktım, 7 numaralı kapıyı aralık bulunca içeri seslendim, cevap gelmeyince girdim ve o hâlde buldum.\"",
      statementQA: [
        { question: "Master anahtarınız her zaman üzerinizde mi?", answer: "Evet, göreve başlarken teslim alırım, mesai bitene kadar bende kalır." },
        { question: "Kemal Bey'le bir sorununuz var mıydı?", answer: "Geçen sefer kaybolan bir kolye yüzünden beni suçlamıştı, adil değildi ama şikayet resmi olarak sonuçlanmadı." },
        { question: "Telsiz görüşmesi defterinize neden işlenmedi?", answer: "Elim doluydu, unuttum yazmayı. Lokomotif ekibi konuşmayı doğrulayabilir." },
        { question: "7 numaralı kapıya varana kadar başka biriyle karşılaştınız mı?", answer: "Hayır, koridor boştu. Kar fırtınası yüzünden herkes kompartımanlarına çekilmişti." },
      ],
    },
    {
      id: "yusuf",
      name: "Yusuf Aydınlı",
      age: 31,
      role: "Kayıp Oğul",
      motive:
        "Kemal'in ilk evliliğinden oğlu. Kemal onu ve annesini yıllar önce terk etmişti; yeni vasiyette adı hiç geçmiyordu. Trene, babasıyla resmi olarak yüzleşmek için kimliğini gizleyerek bindi.",
      opportunity:
        "Bileti kompartıman 11'e aitti, koridorun öbür ucunda; kimseye kim olduğunu söylemedi.",
      statementIntro:
        "\"Kemal benim babam ama bunu ona söylemeyeli yıllar oldu. Annemi ve beni terk ettiğinde ben sekiz yaşındaydım. Yıllarca ondan hiçbir haber almadım, sonra geçen ay bir avukat aradı, yeni vasiyette adımın hiç geçmediğini öğrendim. Bu treni öğrendiğimde bir dürtüyle bilet aldım, ona söylemeden, kompartıman 11'e yerleştim. Onunla yüzleşmek istiyordum, sadece konuşmak. Kapısına kadar gittim gece, elimi kaldırdım ama vuramadım. Korktum, geri döndüm, kompartımanımda sabahı ettim.\"",
      statementQA: [
        { question: "Neden kimliğinizi gizlediniz?", answer: "Çünkü onu şaşırtmak, hazırlıksız yakalamak istedim. Belki de sadece cesaretim yoktu doğrudan yüzleşmeye." },
        { question: "Kapısına kaç kere gittiniz?", answer: "Bir kere. Uzun süre orada durdum ama kapıyı çalmadım." },
        { question: "Sizi kapının önünde gören oldu mu?", answer: "Bilmiyorum, koridor karanlıktı, kimseyle karşılaşmadım sanıyorum." },
        { question: "Geri döndükten sonra kompartımanınızdan çıktınız mı?", answer: "Hayır, sabaha kadar oradaydım. Uyuyamadım ama dışarı çıkmadım." },
      ],
    },
    {
      id: "sibel",
      name: "Sibel Konuk",
      age: 34,
      role: "Gazeteci",
      motive:
        "Kemal'in kaçak eser ticaretini aylardır araştırıyordu, yayına hazır bir dosyası vardı. Kemal bunu öğrenip avukatlarıyla onu susturmakla tehdit etmişti.",
      opportunity:
        "Kompartımanı Kemal'inkine yakındı; tuvalete gitmek bahanesiyle sık sık kapısının önünden geçiyordu.",
      statementIntro:
        "\"Aylardır Kemal Aydınlı'nın koleksiyonundaki bazı parçaların nereden geldiğini araştırıyorum, kaçak eser ticaretine dair ciddi bulgularım var. Bu yolculuğu, Kars'taki kaynağımla buluşacağını öğrendiğim için seçtim, itiraf ediyorum, onu gözlemliyordum. Kompartımanım onunkine yakındı, birkaç kez tuvalete gitme bahanesiyle önünden geçtim, ne yaptığını anlamaya çalıştım. Ama içeri girmedim, onunla konuşmadım bile. Sabah olanları duyunca dehşete düştüm — haberim için değil, bir insan öldü çünkü.\"",
      statementQA: [
        { question: "Kemal Bey sizin araştırmanızdan haberdar mıydı?", answer: "Evet, avukatları aracılığıyla beni susturmaya çalışıyordu. Bu bir tehditti ama beni durdurmadı." },
        { question: "Kapısının önünden kaç kez geçtiniz?", answer: "İki, belki üç kez. Saatini tam hatırlamıyorum." },
        { question: "İçeriden bir ses duydunuz mu?", answer: "Hayır, son geçişimde sessizdi. O yüzden bir şey olduğunu düşünmedim." },
        { question: "Kaynağınızın kimliğini paylaşır mısınız?", answer: "Hayır, gazetecilik etiği buna izin vermiyor. Ama bu cinayetle ilgisi yok, emin olabilirsiniz." },
      ],
    },
    {
      id: "deniz",
      name: "Deniz Ilgaz",
      age: 43,
      role: "Vagon Restoran Şefi",
      motive:
        "Geçen yıl Kemal'e özel bir tablo satmıştı, ödemesi hâlâ yapılmamıştı. O akşam parasını istemiş, Kemal onunla diğer yolcuların önünde alay ederek kovmuştu.",
      opportunity:
        "Restoran vagonunda çalışıyordu, oradan tüm vagonlara kolayca geçiş yapabiliyordu.",
      statementIntro:
        "\"Geçen yıl Kemal Bey'e kendi param ve emeğimle yaptığım bir tablo sattım, güzel bir fiyata anlaştık ama ödeme hep ertelendi. O akşam, restoranda, bir kez daha sordum parayı. Diğer masaların önünde beni küçümsedi, 'bu kadar küçük hesaplarla benimle konuşacak seviyede değilsin' dedi. Utandım, öfkelendim ama servise devam ettim, işim bu. Gece boyunca restoran ve mutfak arasında gidip geldim, yoğun bir vardiyaydı. Sabah haberi aldığımda hâlâ param yoktu, hâlâ da yok.\"",
      statementQA: [
        { question: "Tartışmadan sonra Kemal Bey'le tekrar konuştunuz mu?", answer: "Hayır, o kompartımanına çekildi, ben restoranda kaldım." },
        { question: "Vardiyanız boyunca sizi gören oldu mu?", answer: "Mutfak personeli vardı ama gece ilerledikçe çoğu dinlenmeye çekildi. Yalnız kaldığım anlar oldu, itiraf ediyorum." },
        { question: "Restoran vagonundan başka vagonlara geçtiniz mi?", answer: "Malzeme almak için bir kez depo vagonuna gittim, birkaç dakika sürdü, o kadar." },
        { question: "Emre Solak'ı restoranda gördünüz mü?", answer: "Hayır, o gece onu hiç görmedim, oysa 'orada rapor hazırlıyordum' diyormuş, garip." },
      ],
    },
  ],
  documents: [
    {
      id: "olay-yeri-raporu",
      type: "resmi_rapor",
      title: "Olay Yeri İnceleme Tutanağı",
      meta: "T.C. Devlet Demiryolları · Tutanak No: 2026/YE-014 · Komiser Yrd. Hakan Ört",
      body: `Kompartıman kapısı iç sürgüsü kapalı halde bulunmuştur. Pencere kışlık yalıtım nedeniyle dıştan buzlanmış, açılamayacak durumdadır. Kurbanın koleksiyonuna ait, kabzası sedef kakmalı bir Osmanlı hançeri, göğüs bölgesinde tek darbe halinde saplı bulunmuştur. Mücadele izine rastlanmamıştır — kurbanın saldırganı tanıdığı ve yakınına kadar sokulmasına izin verdiği değerlendirilmektedir.

Kompartıman kapısının hemen dışında, koridor zemininde, üzerine bir çift baş harf kazınmış küçük bir gümüş kol düğmesi bulunmuş, delil poşetine alınmıştır. Kazıma yüzeysel ve eskimiş olduğundan harflerden yalnızca ikincisi ("...S.") net okunabilmektedir; ilk harf aşınmadan dolayı belirsizdir. Sahibi henüz tespit edilememiştir.

Not (teknik detay): Kompartıman kapı sürgüsü, trenin eski model vagonlarında görülen türden olup, koridor tarafından ince bir alet sokularak dışarıdan da manipüle edilebilecek bir mekanizmaya sahiptir. Bu, "içeriden kilitli" görünümünün tek başına saldırganı dışlamayacağı anlamına gelir.

Kurbanın yelek cebinde, üzerine tek bir rakam kazınmış küçük bir bakır madalyon bulunmuştur: "4". Anlamı şu an için çözülememiştir.`,
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
        { sender: "Aylin Ergen", time: "22:03", text: "Söylemem ama telefonuna güvenme, notlarını hâlâ o tuhaf ters yazı huyunla mı kilitliyorsun? Onu da kırmak zor değil aslında." },
        { sender: "Emre Solak", time: "22:05", text: "Kimse çözemiyor, kafamda tutması kolay oluyor. Neyse, konu kapansın.", self: true },
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

(Not: 03:25–03:45 arası defterde herhangi bir kayıt yoktur — Bora bu saatlerde lokomotif ekibiyle telsiz görüşmesi yaptığını, koridordan uzak kaldığını ifade etmiştir.)

(Ek not: Kemal Bey'in kompartımanında, masada kağıt ağırlığı olarak kullanılan eski bir zar gördüm, üste gelen yüzünde tek bir nokta vardı — tuhaf bir ayrıntı, ne olur ne olmaz diye not düşüyorum.)`,
    },
    {
      id: "gorgu-tanigi",
      type: "ifade",
      title: "Görgü Tanığı İfadesi",
      meta: "Süheyla Tekand, 74 · Kompartıman 6 · Kurbanın karşı komşusu",
      body: `"Uyuyamıyordum, kapıyı aralık bırakmıştım, trenin içi çok kuru oluyor da. Saat tam kaç bilmiyorum ama tren durduktan az sonraydı, koridordan biri geçti. Hızlı yürüyordu. Gözlüğüm yoktu, yüzünü net göremedim ama boyu kısaydı, benim oğlum kadar var ya da daha az — o da 1.68 falandır. Bilek hizasında bir şey parladı, ışığı öyle fark ettim. Kimseye laf etmek istemem ama sorunca söylemem gerekti."`,
    },
    {
      id: "kemal-sosyal-paylasim",
      type: "sosyal_medya",
      title: "Kemal'in Paylaşımı",
      meta: "Olaydan 4 gün önce, herkese açık",
      socialPost: {
        author: "Kemal Aydınlı",
        handle: "@kemalaydinli.sanat",
        time: "4 gün önce",
        text: "Koleksiyonuma çok özel bir Selçuklu tası daha katılıyor. Kars yolculuğunu sabırsızlıkla bekliyorum. Kıskananlar bilir 😏",
        likes: 214,
        comments: 38,
      },
    },
    {
      id: "yusuf-not-defteri",
      type: "gunluk_log",
      title: "Yusuf'un Not Defteri Sayfası",
      meta: "Kompartıman 11'de bulundu, Yusuf Aydınlı'nın el yazısı",
      body: `Bugün ya da hiç. Yıllarca kaçtım ama artık kaçamıyorum. Annem öldüğünde bir telefon bile etmedi. Şimdi de beni yokmuşum gibi bir vasiyetten siliyor. Sadece bir kere yüzüne bakıp "beni hatırlıyor musun" diye sormak istiyorum. Belki hiçbir şey demeden döneceğim. Belki de değil.`,
    },
    {
      id: "sibel-eposta",
      type: "eposta",
      title: "Editöre Gönderilen E-posta",
      meta: "Sibel Konuk'un dizüstü bilgisayarından, olaydan 3 gün önce",
      emailHeader: {
        from: "sibel.konuk@habermerkezi.example",
        to: "editor@habermerkezi.example",
        subject: "Kaçak Eser Dosyası — Kemal Aydınlı",
        date: "Olaydan 3 gün önce",
      },
      body: `Dosya neredeyse hazır ama bir sorun var: Kemal Aydınlı avukatları aracılığıyla yayından önce beni susturmaya çalışıyor. Kars'a gidiyor, oradaki kaynağımla da görüşecekmiş — bu yolculuk dosyanın son parçası olabilir. Riskli olduğunu biliyorum ama trene bineceğim, uzaktan takip edeceğim onu. Yayın tarihini bir hafta erteleyelim, elimde daha güçlü kanıt olacak.`,
    },
    {
      id: "restoran-sikayet-defteri",
      type: "resmi_rapor",
      title: "Restoran Vagonu Şikayet ve Hesap Defteri",
      meta: "T.C. Devlet Demiryolları · Vagon Restoran · Deniz Ilgaz'ın kaydı",
      body: `22:30 civarı — Kemal Aydınlı Bey, geçen sezon kendisine sattığım tabloya dair ödemeyi bir kez daha erteledi. Diğer masalardaki yolcuların önünde "böyle küçük hesapları benimle konuşacak seviyede değilsin" dedi. Sesini yükseltmedim, servise devam ettim. Parayı istemeye devam edeceğim ama bu şekilde konuşulmayı hak etmiyorum.

(Vardiya amiri notu: Şikayet resmi olarak kayda geçmiştir, gerekirse işlem yapılacaktır.)`,
    },
    {
      id: "koridor-kamera",
      type: "guvenlik_kamerasi",
      title: "Koridor Güvenlik Kamerası — 7. Vagon",
      meta: "Kısmen arızalı kayıt, düşük çözünürlük",
      cameraTimestamp: "03:0X:XX",
      body: `Görüntüde koridorda bir gölge geçişi seçilebiliyor ancak kar fırtınası nedeniyle sinyal kaybı ve düşük çözünürlük yüzünden kimlik teşhisi yapılamamıştır. Boy, yürüyüş hızı ya da kıyafet detayı net değildir. Teknik ekip, kamera sisteminin gece 02:50 civarında kısa süreli arızalandığını, tam olarak ne zaman düzeldiğinin belirsiz olduğunu belirtmiştir.`,
    },
    {
      id: "meridyen-haber",
      type: "haber_kupuru",
      title: "Koleksiyon Çevrelerinde Tartışma",
      newsHeader: {
        publication: "Meridyen Gazetesi",
        headline: "Ünlü Koleksiyoncunun Eserleri Tartışma Yarattı",
        byline: "Kültür-Sanat Servisi",
        date: "Olaydan 9 gün önce",
      },
      body: `Sanat çevrelerinde tanınan koleksiyoner Kemal Aydınlı'nın son dönemde edindiği bazı parçaların kökeni hakkında sorular gündeme geldi. Rakip koleksiyonerler arasında "belgesi eksik parçalar" iddiaları dolaşırken, Aydınlı iddiaları "haset" olarak nitelendirip yorum yapmadı. Kültür mirası uzmanları, bu tür anlaşmazlıkların koleksiyoner çevrelerinde yeni olmadığını, geçmişte de benzer ortaklıkların mahkemelik davalara dönüştüğünü hatırlattı.`,
    },
    {
      id: "kemal-sesli-not",
      type: "ses_kaydi",
      title: "Kemal'in Sesli Notu",
      meta: "Telefonunda bulundu, olay gecesi kaydedilmiş",
      audioDuration: "0:47",
      body: `"Kendime not: Yusuf diye biri kompartımana geldi, tanımadım, tanımak da istemiyorum, güvenliğe söyleyeceğim... O gazeteci kadın bir şey biliyormuş gibi davranıyor, avukatları arayacağım sabah... Deniz'e bir kuruş daha vermem, o tablo zaten şaibeliydi... Emre'yle de konuşmam lazım, o defter meselesini kapatmalıyım... Ha bir de, kasadaki eski kilidi unutma, hep aynı üç rakamı kullanırım, biri yedi, biliyorsun."`,
    },
    {
      id: "kemal-kilitli-kutu",
      type: "kilitli_kasa",
      title: "Kemal'in Kilitli Kutusu",
      meta: "Bagajında, deri bir çanta cebinde bulundu",
      body: `Kemal'in bagajında, küçük pirinç bir kutu bulundu. Üç haneli bir çevirmeli kilidi var, anahtarı yok. Kemal'in yakınlarından biri, onun önemli şeyleri hep aynı üç rakamla kilitlediğini söylüyor — belki bu rakamlar, çevresindeki küçük ayrıntılarda saklı.`,
      lockDigits: 3,
      lockAnswer: "147",
      lockReveal: `[Kutunun içinden çıkanlar]

Eski, katlanmış bir belge: Selçuklu tasının kökenine dair el yazısıyla notlar... "Bu parça izinsiz bir kazıdan geliyor, resmi belgeler sahte." Kemal bunu biliyordu ve saklıyordu — Selim'in aylardır öne sürdüğü iddianın haklı çıktığını gösteriyor.`,
      lockHints: [
        "Kemal'in önemli şeyleri hep aynı üç rakamla kilitlediği söyleniyor. Bu rakamları belgelerin arasında bulup küçükten büyüğe doğru dene.",
        "Bir zar, bir madalyon, bir ses kaydı... Kemal'in çevresindeki küçük ayrıntılara tekrar bak.",
      ],
    },
    {
      id: "emre-kilitli-not",
      type: "sifreli_kayit",
      title: "Telefonda Kilitli Not",
      meta: "Emre Solak'ın telefonundan, adli bilişim ekibince kurtarıldı",
      body: `Emre'nin telefonundaki Notlar uygulamasında, başlıksız, kilitli tek bir kayıt bulunmuştur. İçeriği alışıldık bir metin gibi görünmüyor — harf ve rakamların rastgele bir karmaşası. Adli bilişim ekibi, bunun karmaşık bir şifreleme değil, basit ama alışılmadık bir şekilde gizlenmiş bir not olabileceğini düşünüyor.`,
      cipherEncoded: "=4yavlHIfWMvD7mtDTGIpJXZnByaxSMdyFGIskGZuVmcfSstDDSsEvmchZGI5VmQgwWYtV2S",
      cipherAnswer: "Kemal Bey farkı öğrendi, artık geri dönüş yok.",
      cipherReveal: `[Kurtarılan not — Emre Solak'ın telefonundan]

"Kemal Bey farkı öğrendi, artık geri dönüş yok. Belki hâlâ bir açıklama bulabilirim ama sesindeki o ton... Beni sadece kovmakla kalmayacak, şikayetçi de olacak sanırım. Trende bir şey yapmalıyım, bir çözüm bulmalıyım."`,
      cipherHints: [
        "Bu tuhaf karakter dizisi bir kodlama olabilir — alfabesi tanıdık geliyor mu?",
        "Belki bir şeyi ters çevirmen gerekiyor. Emre'nin bu notları nasıl 'kilitlediğinden' bahseden birini hatırlıyor musun?",
      ],
    },
  ],
  timeline: [
    { time: "22:30", description: "Deniz, restoran vagonunda parasını istediği için Kemal'le tartışır, herkesin önünde küçümsenir." },
    { time: "02:50", description: "Yusuf, kompartıman 11'den çıkıp koridorda dolaşır, Kemal'in kapısının önünde durur, sonra geri döner." },
    { time: "03:00", description: "Selim'in kompartımanındaki çay fincanı, aslında bu saatte demlenip içildiğini gösteriyor — kendisi '03:30'a kadar uyanıktım' diyor.", contradicts: "selim" },
    { time: "03:05", description: "Sibel, tuvalete giderken Kemal'in kapısının önünden geçer; içeriden ses gelmediğini sonradan belirtiyor." },
    { time: "03:15", description: "Vagon restoranda akşam servisi biter." },
    { time: "03:20", description: "Emre, Kemal'in kompartımanından çıkar (son görülen kişi)." },
    { time: "03:25", description: "Emre 'rapor hazırlamaya' restorana gideceğini söyler." },
    { time: "03:30–04:00", description: "Deniz, Emre'yi restoranda görmediğini belirtiyor.", contradicts: "emre" },
    { time: "03:40", description: "Tren, çığ riski nedeniyle tünelde durur." },
    { time: "03:45", description: "Cinayet gerçekleşir (otopsi tahmini)." },
    { time: "03:50", description: "Nihal, koridorda görevli tarafından görülür — kendisi 'uyuyordum, hiçbir şey duymadım' diyor.", contradicts: "nihal" },
    { time: "04:05", description: "Bora, devriye sırasında cesedi bulur." },
  ],
  hints: [
    "Herkesin bir alibi'si var gibi görünüyor ama zamanlamalar hep doğrulanmış değil. Kim, iddia ettiği yerde olduğunu kanıtlayamıyor?",
    "Olay yerinde sahibi belirsiz küçük bir eşya bulunmuştu. Şüphelilerin isimlerini bir kez daha gözden geçir.",
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
      "Katil, asistan Emre Solak. Vagon restoranından sıvışıp yedek anahtarla kompartımana girdi, Kemal'i kendi hançeriyle öldürdü ve eski model sürgü mekanizmasını dışarıdan manipüle ederek kapıyı 'içeriden kilitli' gösterdi. Otopsi raporu saldırganın kısa boylu olduğunu gösteriyor (1.62–1.69 m) — bu aralığa Nihal ve Emre giriyordu. Olay yeri raporundaki kısmen okunaklı '...S.' kazılı kol düğmesi ile görgü tanığının 'bilek hizasında parlayan bir şey' tanıklığı (erkek gömleğine ait bir kol düğmesi, kadın değil — Nihal'i eleyen ayrıntı) ipucu zincirini daraltıyor; asistanın kol düğmesinin eksik olduğunu kendi de fark etmemiş olması ('belki kaybetmişimdir, bilmiyorum') ve soyadının kazımayla örtüşmesi zinciri Emre'ye bağlıyor. Motivi de en acil olandı: zimmet ortaya çıkmıştı, kovulma ve hapis tehdidi kapıdaydı. Diğer şüphelilerin hepsinin gerçek bir sırrı vardı ama hiçbiri cinayete karışmamıştı: Nihal tuvalete gitmişti, Selim erkenden uyuyakalmıştı, Ferit sadece şartlı tahliye ihlali yapmamak için kimliğini gizliyordu, Bora anahtarını hiç kullanmamıştı, Yusuf babasının kapısına kadar gidip geri dönmüştü, Sibel sadece haberi için gözlem yapıyordu, Deniz ise tartışıp öfkeyle ayrılmış ama parasını bile alamamıştı.",
  },
};
