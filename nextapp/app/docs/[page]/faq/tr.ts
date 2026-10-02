import { fromStrings } from "./content.ts";

/**
 * Turkish participant FAQ.
 *
 * Strings are in reading order; see `fromStrings` for the exact sequence.
 * Inline markup, link targets and code spans must match English exactly — only
 * link labels are translated. App UI labels in **bold** match the app's own
 * Turkish strings. lib/faq.test.ts enforces the structure.
 */
export default fromStrings([
  "Bu sayfa, **Samply Research** uygulamasını kullanan bir çalışmaya katılan kişiler içindir. Samply, bir çalışmanın bildirimlerini ileten araçtır. Çalışmanın kendisi — soruları, takvimi, varsa ödemeler ve yanıtlarınız — genellikle bir üniversitede görev yapan bir araştırmacı tarafından yürütülür. Hangisine soracağınızı bilmek, çok daha hızlı yanıt almanızı sağlar.",

  "Kime sormalıyım?",
  "Çalışmanızı yürüten araştırmacıya",
  "Kaç bildirim alacağınız, ne zaman ve ne kadar süreyle",
  "Anket soruları, çalışmayan anket bağlantıları veya bir anketin içindeki hatalar",
  "Ödeme, ders kredisi, hediye çekleri veya diğer her türlü karşılık",
  "Kaçırılan bir bildirimin veya geç verilen bir yanıtın hâlâ sayılıp sayılmadığı",
  "Yanıtlarınızı geri çekmek veya yanıtlarınızın nasıl kullanıldığı",
  "Çalışma açıklamasında veya onam formunda yer alan her şey",
  "Samply desteğine",
  "Uygulama çöküyor veya açılmıyor",
  "Kaydolamıyor, giriş yapamıyor veya şifrenizi sıfırlayamıyorsunuz",
  "Samply hesabınız veya hesabınızın silinmesi",
  "Bu sayfadaki adımları uyguladıktan sonra bile hiçbir bildirim gelmiyor",
  "Bu web sitesiyle ilgili sorunlar",
  "Samply desteği yanıtlarınızı göremez, çalışma takvimini belirlemez ve karşılık ödeyemez ya da kredi veremez. Bu sorularda yalnızca araştırmacı yardımcı olabilir — önce Samply'ye yazmak yalnızca yanıtınızı geciktirir.",

  "Araştırmacınızla iletişime geçme",
  "Çalışmamın araştırmacısıyla nasıl iletişime geçerim?",
  "Samply Research uygulamasını açın, ana ekranınızdaki çalışmaya dokunun ve **Sorumlu araştırmacı** bölümüne kadar aşağı kaydırın. E-posta adresine dokunun: e-posta uygulamanız, konu satırında çalışmanın adı ve Samply ID'niz hazır olarak araştırmacıya bir ileti açar; böylece araştırmacı sizi hemen bulabilir.",
  "Aldığınız davet, çalışma açıklaması ve onam formu da genellikle iletişim bilgilerini içerir.",
  "Çalışmada hiçbir iletişim bilgisi görünmüyor. Şimdi ne yapmalıyım?",
  "Sizi çalışmaya getiren davete — bir e-posta, bir ders sayfası, bir afiş veya bir el ilanı — ve onam formuna bakın. Araştırmacıların bu yerlerden en az birinde bir iletişim bilgisi vermesi beklenir. Yine de bulamazsanız, çalışmanın adını uygulamada göründüğü şekliyle belirterek Samply desteğine yazın; araştırmacıya ulaşmanıza yardımcı olalım.",
  "Mesajıma neleri eklemeliyim?",
  "Uygulamada göründüğü şekliyle çalışmanın adı.",
  "**Samply ID**'niz. Araştırmacılar adınızı veya e-posta adresinizi değil bu kimliği görür; bu yüzden o olmadan verilerinizi bulamazlar.",
  "Ne olduğu ve yaklaşık ne zaman olduğu — örneğin gelmeyen bir bildirimin tarihi ve saati.",
  "Bildirim sorunları için: telefonunuzun modeli ve Android mi yoksa iOS mu kullandığı.",
  "Samply ID'm nedir ve nerede bulabilirim?",
  "Samply ID'niz, uygulamanın sizin için oluşturduğu rastgele bir koddur. Araştırmacılar adınız veya e-posta adresiniz yerine bu kodu görür; bu da yanıtlarınızın takma adlı kalmasını sağlar. Kimliğinizi uygulamada **Daha fazla → Ayarlar** altında, bu web sitesinde ise [katılımcı olarak giriş yaptıktan](/participant/login) sonra bulabilirsiniz.",
  "Bazı çalışmalar size ayrıca uygulamadaki çalışma ekranında gösterilen bir **Katılımcı kodu** da verir. Böyle bir kodunuz varsa, araştırmacıya yazarken onu da ekleyin.",

  "Bildirimler",
  "Bildirim almıyorum",
  "Uygulamada **Daha fazla → Bildirim kontrolü** bölümünü açın. Bu özellik, bir bildirimin geçtiği her adımı kontrol eder, hangisinin bozuk olduğunu gösterir ve bir çözüm sunar. En yaygın nedenler şunlardır:",
  "Samply bildirimleri telefonunuzun ayarlarında kapalı.",
  "**Android'de:** pil optimizasyonu uygulamayı uyku moduna alıyor. Samply için bunu kapatın — [dontkillmyapp.com](https://dontkillmyapp.com/) telefon modelinize özel adımları gösterir.",
  "**iPhone'da:** bir Odak modu veya Zamanlanmış Özet bildirimleri bekletiyor. Samply'nin bildirimleri hemen iletmesine izin verin.",
  "Uygulamayı yeniden yüklediniz veya yeni bir telefona geçtiniz. Tekrar giriş yapın, ardından Bildirim kontrolü'nde **Bu cihazı yeniden kaydet** seçeneğine dokunun.",
  "Bildirim kontrolü her şeyin yolunda olduğunu gösteriyorsa ve bildirimler yine de gelmiyorsa araştırmacıyla iletişime geçin. Çalışma duraklatılmış veya sona ermiş olabilir ya da şu anda gönderilmek üzere planlanmış bir şey olmayabilir.",
  "Bildirimler yanlış saatte geliyor",
  "Seyahat ettiyseniz veya telefonunuzun saat dilimi değiştiyse **Daha fazla → Ayarlar** bölümünü açın ve **Saat dilimi** kısmına bakın. Kayıtlı saat diliminiz ile gerçek saat diliminiz farklıysa **Mevcut saat dilimini kaydet** seçeneğine dokunun.",
  "Saat dilimi doğruysa, zamanlama çalışma tasarımının bir parçasıdır — birçok çalışma bildirimleri bilerek günün rastgele anlarında gönderir. Araştırmacıya sorun. Ayarlar'da girebileceğiniz tercih edilen zaman aralığı yalnızca araştırmacılar için bir bilgidir; tek başına bildirimleri engellemez.",
  "Çok fazla bildirim alıyorum veya bildirimlerin durmasını istiyorum",
  "Ne sıklıkta bildirim alacağınıza Samply değil araştırmacı karar verir; bu yüzden takviminizin değiştirilip değiştirilemeyeceğini ona sorun. Bir çalışmadan gelen tüm bildirimleri durdurmak için [çalışmadan ayrılın](/docs/faq#leave). Telefonunuzun ayarlarında bildirimleri kapatmak da onları durdurur, ancak bu durumda çalışma sizi yanıt vermiyor olarak kaydeder.",
  "Bir bildirimi kaçırdım. Hâlâ yanıt verebilir miyim?",
  "Aldığınız her bildirim uygulamanın **Geçmiş** sekmesinde listelenir ve anketi oradan açabilirsiniz. Birçok çalışma, bağlantıların bir süre sonra geçerliliğini yitirmesini sağlar, çünkü çok daha sonra verilen yanıtlar araştırma için daha az yararlıdır. **Bağlantının süresi doldu** mesajını görüyorsanız, araştırmacı o zaman aralığını kapatmıştır. Kaçırılan bir bildirimin ödemenizi veya kredinizi etkileyip etkilemeyeceği araştırmacıya bağlıdır.",

  "Anketler ve yanıtlar",
  "Anket bağlantısı açılmıyor veya bir hata gösteriyor",
  "Anketler Samply'de değil, araştırmacının kendi anket aracında — örneğin Qualtrics, SoSci Survey veya LimeSurvey'de — barındırılır. Kararlı bir internet bağlantısıyla tekrar deneyin. Anket sayfasının kendisi bir hata gösteriyorsa veya anketin kapalı olduğunu söylüyorsa araştırmacıyla iletişime geçin: bunu yalnızca o düzeltebilir. Bir ekran görüntüsü yardımcı olur.",
  "Bir anketi bitirdim ama uygulama onu tamamlanmış olarak göstermiyor",
  "Samply bir anketin bittiğini yalnızca anket sonunda sizi uygulamaya geri gönderirse öğrenir ve her çalışma bu şekilde ayarlanmamıştır. Yanıtlarınız kaybolmadı — araştırmacının anket aracında saklanıyor. Karşılığınız buna bağlıysa, yanıt verdiğiniz tarihi ve saati araştırmacıya bildirin.",
  "Yanıtlarımda bir hata yaptım",
  "Yanıtlarınız doğrudan araştırmacının anket aracına gider; Samply onları göremez veya değiştiremez. Anketin tarihini ve saatini ve neyi düzeltmek istediğinizi belirterek araştırmacıya yazın.",

  "Bir çalışmaya katılma ve çalışmadan ayrılma",
  "Bir çalışmaya nasıl katılırım?",
  "Uygulamada **Çalışma bul** seçeneğine dokunun ve çalışmanın QR kodunu tarayın ya da davetinizdeki 8 karakterli çalışma kodunu girin. Bir davet bağlantısını telefonunuzda açmak da işe yarar. Bazı çalışmalar ayrıca **Genel çalışmalar** altında listelenir.",
  "Uygulama kodum için hiçbir çalışma bulunamadığını söylüyor",
  "Kodda yazım hatası olup olmadığını kontrol edin — kod 8 karakterden oluşur. Kod doğruysa çalışma kapanmış veya henüz açılmamış olabilir. Hangisinin geçerli olduğunu araştırmacı size söyleyebilir.",
  "Bir çalışmadan nasıl ayrılırım?",
  "Çalışmayı uygulamada açın, en alta kaydırın ve **Çalışmadan ayrıl** seçeneğine dokunun. Bu işlem geri alınamadığı için uygulama onaylamanızı ister. O çalışmadan gelen bildirimler hemen durur.",
  "Bir çalışmadan ayrılmak yeni bildirimleri durdurur, ancak daha önce verdiğiniz yanıtları silmez — bunlar araştırmacıdadır. Geri çekilmelerini istiyorsanız Samply ID'nizi ekleyerek araştırmacıya yazın.",
  "Ödememi veya ders kredimi ne zaman alacağım?",
  "Karşılık Samply tarafından değil, araştırmacı tarafından düzenlenir ve ödenir. Samply katılımcılara yapılan ödemelerle ilgilenmez ve size ödeme yapılıp yapılmadığını göremez. Samply ID'nizi ekleyerek araştırmacıya sorun.",

  "Hesabınız ve verileriniz",
  "Şifremi unuttum",
  "Giriş ekranında **Şifrenizi mi unuttunuz?** seçeneğine dokunun ve e-posta adresinizi girin. Yeni bir şifre belirlemeniz için bir bağlantı alacaksınız. Birkaç dakika içinde gelmezse spam klasörünüzü kontrol edin; orada da yoksa Samply desteğiyle iletişime geçin.",
  "E-posta adresimi nasıl değiştiririm?",
  "Uygulamada **Daha fazla → Ayarlar** bölümünü açın ve e-posta adresinizi **Hesap bilgileri** altında düzenleyin. Değişikliğin geçerli olması için ardından çıkış yapıp tekrar giriş yapın.",
  "Araştırmacı benimle ilgili neleri görebilir?",
  "Araştırmacılar Samply ID'nizi görür — adınızı, e-posta adresinizi veya telefon numaranızı değil. Size ne zaman bildirim gönderildiğini ve bunları açıp açmadığınızı görürler; yanıtlarınızı ise kendi anket araçları üzerinden alırlar. Bir çalışma bildirimleri tetiklemek için konumunuzu kullanıyorsa, konumunuz telefonunuzda kalır ve araştırmacılarla paylaşılmaz.",
  "Bir araştırmacıya e-postayla yazarsanız, elbette e-posta adresinizi görür. [Gizlilik Politikası](/docs/policy), Samply'nin neleri sakladığını ayrıntılı olarak açıklar.",
  "Hesabımı ve verilerimi nasıl silerim?",
  "Uygulamada **Daha fazla → Ayarlar** bölümünü açın, **Hesabımı sil** seçeneğine dokunun ve şifrenizle onaylayın. Bu işlem Samply hesabınızı kaldırır, sizi tüm çalışmalarınızdan çıkarır ve Samply'nin sizinle ilgili tuttuğu kayıtları siler. Geri alınamaz.",
  "Samply hesabınızı silmek, bir araştırmacının anket aracında saklanan yanıtları silmez — Samply'nin bunlara erişimi yoktur. Bunların da kaldırılmasını istiyorsanız, hesabınızı silmeden **önce** Samply ID'nizi belirterek her araştırmacıya yazın. Sonrasında kimlik artık uygulamada gösterilmez.",
  "Verilerimin bir kopyasını alabilir miyim?",
  "Evet. Bu web sitesinde [katılımcı olarak giriş yapın](/participant/login) ve Samply'nin sizinle ilgili tuttuğu her şeyin bir kopyasını almak için **Verilerimi indir** seçeneğini seçin. Anket yanıtlarınızın bir kopyası için araştırmacıya sorun.",

  "Samply desteğiyle iletişime geçme",
  "Samply desteğiyle nasıl iletişime geçerim?",
  "[yury.shevchenko@uni.kn](mailto:yury.shevchenko@uni.kn) adresine yazın veya uygulamada **Daha fazla → İletişim** bölümünü açın. Lütfen telefonunuzun modelini, Android veya iOS sürümünü ve **Daha fazla → Hakkında** altında gösterilen uygulama sürümünü ekleyin. Yanıtlar genellikle bir ila iki iş günü sürer.",
  "Samply, Konstanz Üniversitesi'ndeki küçük bir ekip tarafından yürütülür. Belirli bir çalışmayla ilgili soruları yanıtlayamayız ve bunları iletmek yalnızca yanıtınızı geciktirir — bu yüzden lütfen bu soruları araştırmacıya gönderin.",
]);
