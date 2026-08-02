# VAKA 02 — Son Round — Kanıt/Belge Metinleri

## Zaman Çizelgesi (iç tutarlılık için)

| Saat | Olay |
|---|---|
| 19:30 | Selin ön görüşme için ofise gelir, misafir kartı alır, toplantıdan sonra havalimanına gider (kart iade edilmeden bina çıkışına yansımaz — log hatası) |
| 20:15 | Selin'in uçağı İstanbul'dan kalkar |
| 21:48–21:52 | Deniz, Ozan, Aylin gece toplantısı için 28. kata girer (Selin bu sırada uçaktadır) |
| 22:15 | Barış lobiden girer, 5 dk sonra çıkar (28. kata çıkmaz) |
| 22:30 | Deniz kısa bir mola için ofisine çekilir |
| 22:40 | Aylin kendi ofisine kartla girer |
| 22:45 | Ozan'ın gerçek girişi (yalnızca gölge log'da var) |
| 22:50–23:10 | Cinayet gerçekleşir |
| 23:15 | Ozan çıkar (yalnızca gölge log'da var) |
| 23:20 | Aylin çıkar |
| 23:30 | Yağmur, Deniz'i toplantıya çağırmaya gelip cesedi bulur |

---

## 1. Olay Yeri İnceleme Tutanağı
`tip: resmi_rapor`

**NOVA TEKNOLOJİ A.Ş. — OLAY YERİ İNCELEME TUTANAĞI**
Tutanak No: 2026/NR-041 · Düzenleyen: Komiser Zeynep Akalın
Konum: 28. Kat, CEO Ofisi

Kurbanın masasındaki kristal "Yılın Girişimcisi" ödülü kırık halde,
kurbanın yanında bulunmuştur; suç aleti olduğu değerlendirilmektedir.
Ofis kapısında zorla giriş izi yoktur. Mücadele izi sınırlıdır — kurbanın
saldırganı tanıdığı ve masasına sırtı dönükken ani bir darbe aldığı
değerlendirilmektedir. Odada, yatırım turu sözleşmesinin bir nüshası
üzerinde el yazısıyla yapılmış itiraz notları bulunmuştur.

---

## 2. Adli Tıp Ön Raporu
`tip: resmi_rapor`

**ADLİ TIP KURUMU — OTOPSİ ÖN RAPORU**
Rapor No: ATK-2026-0522 · Dr. Mert Solmaz

Ölümün 22:50–23:10 saatleri arasında gerçekleştiği değerlendirilmektedir.
Kafatasında tek, sert bir cisimle indirilmiş künt travma tespit edilmiştir.
Savunma izi yoktur — kurban darbeyi beklemiyordu.

---

## 3. Kartlı Geçiş Sistemi Ana Log Dökümü
`tip: gunluk_log`

**NOVA GÜVENLİK — 28. KAT ERİŞİM LOGU (Ana Sistem)**

21:48  D.ARAL     GİRİŞ   28. Kat
21:49  O.KIRCA    GİRİŞ   28. Kat
21:50  A.SEZER    GİRİŞ   28. Kat
21:52  S.KONUK    GİRİŞ   28. Kat (misafir kartı)
22:40  A.SEZER    GİRİŞ   Mali İşler Ofisi
23:15  S.KONUK    ÇIKIŞ   Bina (misafir kartı iade)
23:20  A.SEZER    ÇIKIŞ   28. Kat
23:30  Y.DİKER    GİRİŞ   28. Kat

(Not: Ozan Kırca'nın 21:49'daki ilk toplantı girişi dışında, gece
boyunca başka bir giriş/çıkış kaydı görünmüyor.)

---

## 4. IT Güvenlik Yedek/Anomali Raporu
`tip: resmi_rapor`

**NOVA IT GÜVENLİK — SUNUCU ANOMALİ TESPİT RAPORU**
Hazırlayan: Dış Denetim Firması (Sentinel Bilişim) · Talep: Kolluk Kuvvetleri

Ana erişim log sunucusu ile yedek ("gölge") log sunucusu karşılaştırıldığında,
**22:45 ve 23:15 saatlerine ait iki kayıt** ana sistemde silinmiş, ancak
gölge sunucuda hâlâ mevcut bulunmuştur:

22:45  O.KIRCA    GİRİŞ   28. Kat, CEO Ofisi
23:15  O.KIRCA    ÇIKIŞ   28. Kat

Silme işlemi, sistem yöneticisi (admin) yetkisiyle, 23:22'de gerçekleştirilmiş
olup, bu yetkiye şirket içinde yalnızca CTO erişebilmektedir. Silme
işleminin kaynağı olan cihaz, Ozan Kırca'nın şirket dizüstü bilgisayarıyla
eşleşmektedir.

---

## 5. Deniz–Ozan E-posta Yazışması
`tip: eposta`

**Kimden:** Deniz Aral · **Kime:** Ozan Kırca
**Konu:** Yeni tur — hisse yapısı hakkında
**Tarih:** Olaydan 3 gün önce, 23:41

> Ozan, avukatlarla konuştum. Yeni turda senin payın biraz daha
> sulanacak, biliyorsun bu normal — büyümek için gerekli. Ayrıca çekirdek
> modelin patent başvurusunu şirket adına değil benim adıma yapmamız
> konusunda ısrar ediyorum, yatırımcılar bunu istiyor. Yarın konuşalım.

**Ozan'ın yanıtı — aynı gün, 23:58**

> Deniz, o modeli GECELERİMİ VEREREK ben yazdım. Şirket adına bile değil,
> "senin" adına mı? Bu bir şaka olmalı. Yarın yüz yüze konuşacağız, ama
> söyleyeyim: bu kabul edilebilir bir şey değil.

---

## 6. Mali Denetim Notu — Aylin Sezer
`tip: resmi_rapor`

**İÇ DENETİM NOTU** (soruşturma dosyasına eklenmiştir)

Aylin Sezer, olay gecesi saat 23:05 civarında, şirketin son iki çeyrek
finansal kayıtlarından bir kısmını kişisel yedeğine aktarıp sunucudan
sildiği tespit edilmiştir. Sorgusunda, bu kayıtların CEO Deniz Aral'ın
bizzat talimatıyla yapılan, tartışmalı ancak yasal bir vergi
yapılandırması olduğunu, due diligence sürecinde yanlış anlaşılıp
şirketi zor durumda bırakmasından korktuğu için sakladığını beyan
etmiştir. Belgeler incelendiğinde beyanı doğrulanmıştır; cinayetle
bağlantısını gösteren bir bulguya rastlanmamıştır.

---

## 7. Lobi Güvenlik Kamerası Dökümü
`tip: gunluk_log`

**NOVA GÜVENLİK — LOBİ KAMERA GÖZLEM NOTU**

22:14  B.ETE lobiye girer, eski personel kartı okutulur (sistem uyarı
       verir ama görevli "eski çalışan, eşya almaya gelmiştir" diyerek
       geçirir).
22:15  B.ETE resepsiyon önünde bekler.
22:19  B.ETE bir kutu eşyayla lobiden çıkar. Asansöre hiç binmemiştir,
       28. kata çıkmamıştır.

---

## 8. Selin Konuk — Uçuş/Otel Kaydı
`tip: bilet_kaydi`

Yolcu: Selin Konuk
Uçuş No: TK-2074, İstanbul → İzmir
Kalkış: 20:15 · Varış: 21:25
Otel: Izmir Palas, Check-in: 22:02

Not: Olay gecesi saat 21:52'de bina girişinde "misafir kartı" kullanıldığı
görülse de, bu kartın o akşam erken saatte (19:30 toplantısı için) alınıp
iade edilmediği, güvenlik tarafından yanlışlıkla gece kaydına
işlendiği tespit edilmiştir. Uçuş ve otel kayıtları, Selin Konuk'un
21:25'te İzmir'de olduğunu doğrulamaktadır.

---

## 9. Yağmur Diker İfadesi
`tip: ifade`

*(Kişisel Asistan, 26 · Kurbanın son gördüğü kişilerden)*

> "Deniz'i son kez 22:25'te gördüm, ofisine çekiliyordu, biraz gergindi.
> Ben resepsiyonda kaldım, gece nöbetçisi Kadir ve temizlikçi Fatma
> Hanım'la birlikteydim, ikisi de doğrular. 23:30'da toplantı bitti,
> herkes onu bekliyordu, ben çağırmaya gittim... O halde buldum."
