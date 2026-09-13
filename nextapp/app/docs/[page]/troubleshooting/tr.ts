import { fromStrings } from "./content.ts";

/** Turkish troubleshooting page. See de.ts for the translation contract. */
export default fromStrings([
  "Samply ile yaşanan sorunların çoğu arıza değil yapılandırma kaynaklıdır ve neredeyse tamamı ilk bildirim gitmeden önce görülebilir. Bu sayfa teknik olarak neyin yanlış olduğuna göre değil, sizin fark edeceğiniz belirtilere göre sıralanmıştır.",
  "Çalışmanız henüz başlamadıysa en hızlı yol, çalışma panelindeki **Kurulum kontrolü**: yapılandırmanızı inceler ve gerçek gönderim hattından geçen bir test bildirimi sunarak anket bağlantısını katılımcının telefonunun aldığı hâliyle gösterir. Aşağıdakilerin neredeyse tamamı bu tek kontrolle yakalanır.",

  "1 · Bir katılımcı artık bildirim almıyor",
  "En sık gelen bildirim budur ve çözümleri birbirinden çok farklı olan birkaç nedeni vardır. Listeyi yukarıdan aşağıya işleyin — her nedenin ne sıklıkla doğru çıktığına göre sıralanmıştır.",

  "Katılımcı uygulamayı yeniden kurdu ya da telefon değiştirdi",
  "Ne oluyor:",
  "push jetonu kişiyi değil, uygulama kurulumunu tanımlar. Yeniden kurulum, yeni bir cihaza geri yükleme ya da bazı durumlarda işletim sistemi güncellemesi yeni bir jeton üretir; eskisi kalıcı olarak çalışmaz olur.",
  "Siz ne görürsünüz:",
  "analiz sayfası „N katılımcı artık bildirim alamıyor” uyarısını gösterir. Samply bunu push hizmetinin teslim makbuzlarından öğrenir, genellikle bir sonraki gönderimden sonraki bir saat içinde.",
  "Çözüm:",
  "katılımcı Samply Research'ü açar ve oturum açar. Bu, cihazı otomatik olarak yeniden kaydeder. Emin değilse, uygulama menüsünden **Bildirim kontrolü** ekranını açıp **Bu cihazı yeniden kaydet** düğmesine dokunmasını isteyin — aynı onarım, bilinçli olarak yapılmış hâli.",

  "Android uygulamayı uyutuyor",
  "Ne oluyor:",
  "birçok Android üreticisi sistemin üstüne agresif pil yönetimi ekler. Bildirim Google'ın sunucularınca kabul edilir, ardından telefonun kendisi tarafından geciktirilir ya da atılır. Samsung, Xiaomi, OnePlus, Huawei, Oppo ve Vivo bilinen örneklerdir; davranış üreticiye ve Android sürümüne göre değişir.",
  "Siz ne görürsünüz:",
  "**hiçbir şey.** Asıl önemli nokta bu. Bildirim teslim için kabul edildiğinden Samply onu gönderilmiş sayar ve hiçbir yerde uyarı çıkmaz. Tek işaret, sunucu tarafındaki tüm göstergeler sağlıklı görünürken eksik bildirimlerden şikâyet eden bir katılımcıdır.",
  "Çözüm:",
  "katılımcı Samply'yi pil optimizasyonundan çıkarır. Adımlar üreticiye göre değişir; [dontkillmyapp.com](https://dontkillmyapp.com/) bunları cihaz cihaz belgeler — mevcut en iyi kaynaktır ve Android telefonu olan katılımcılara doğrudan göndermeye değer. Uygulamadaki **Bildirim kontrolü** ekranı da telefon ayarlarına bağlantı verir.",
  "Önleme:",
  "bunu sonradan değil, tanıtım yönergelerinizde belirtin. Android katılımcılardan ilk gün istemek bir dakika sürer; beşinci gün sormak, verilerini çoktan kaybettiğiniz anlamına gelir.",

  "Bildirim izni hiç verilmedi ya da geri alındı",
  "Ne oluyor:",
  "uygulama ilk açılışta izin ister. Katılımcı reddederse — ya da sonradan bildirimleri kapatırsa, bazı kişiler telefonlarını düzenlerken bunu toplu yapar — hiçbir şey teslim edilemez.",
  "Siz ne görürsünüz:",
  "izin hiç verilmediyse katılımcının push jetonu yoktur: kayıtlı görünür ama hiçbir şey almaz. Sonradan geri alındıysa jeton sunucu açısından bir süre daha çalışıyor olabilir.",
  "Çözüm:",
  "uygulama menüsündeki **Bildirim kontrolü** izin durumunu doğrudan gösterir ve doğru ayar sayfasını açar.",

  "Katılımcı katıldı ama uygulamayı bir daha hiç açmadı",
  "Bir cihaz, uygulama çalışırken bildirimlere kaydolur. Bağlantıyla katılıp ardından uygulamayı kapatan ve bir daha açmayan biri kaydı hiç tamamlamamış olabilir. Kaydı vardır; cihazına ulaşılamaz.",

  "iOS Odak modları ya da Planlanmış Özet",
  "iOS bildirimleri tutup toplu teslim edebilir ya da bir Odak modunda sessize alabilir. Katılımcılar bunun açık olduğunu çoğu zaman fark etmez. Bildirim ulaşır — sadece planladığınız anda değil; bu da deneyim örneklemesinde çoğu kez hiç ulaşmamakla aynı kapıya çıkar. Katılımcılardan Samply'ye anında teslim izni vermelerini isteyin.",

  "Telefon gönderim anında kapalı ya da çevrimdışıydı",
  "Push hizmetleri bir mesajı bir süre tutar ve cihaz tekrar bağlandığında teslim eder, ancak bunu garanti etmez ve süresi dolmuş bir bağlantı o noktada işe yaramayabilir. Tasarımınız bir bildirimin dar bir pencerede ulaşmasına bağlıysa, geç ulaşanların pencere dışında yanıtlanmaması için bağlantıya süre sınırı koyun — ve bir miktar kayıp bekleyin.",

  "2 · Anket dışa aktarımında katılımcı kimliği yok",
  "Olabilecek en zararlı şey budur; çünkü sessizce olur ve çalışma çoktan bittikten sonra, analiz sırasında fark edilir.",
  "Kimin neyi yanıtladığını sonradan yeniden kurmanın yolu yoktur. Tasarımınız kişi düzeyinde veya çok düzeyli analiz gerektiriyorsa, bunu ilk gün bir test bildirimiyle doğrulayın.",

  "Bildirim bağlantısında kimlik yer tutucusu yok",
  "Ne oluyor:",
  "web bağlantısında `%SAMPLY_ID%` yoksa ankete hiçbir kimlik ulaşmaz. Her yanıt anonimdir ve eşleştirilemez.",
  "Çözüm:",
  "zamanlama düzenleyicisi artık siz yazarken uyarıyor, kurulum kontrolü de bunu bildiriyor. URL'yi elle birleştirmek yerine **Bu bağlantıyı benim için oluştur** yapıcısını kullanın — platformunuzun beklediği adlarla doğru parametreleri ekler.",

  "Bağlantı bozuk — yinelenen bir yer tutucu ya da ikinci bir „?”",
  "Ne oluyor:",
  "bir URL yalnızca tek bir `?` içerebilir; sonraki parametreler `&` ile birleştirilir. Sona ikinci bir `?id=%SAMPLY_ID%` yapıştırmak, önceki parametrenin değerinin sonrasındaki her şeyi yutmasına yol açar ve anket bozuk bir kimlik ya da hiçbir şey kaydeder.",
  "Çözüm:",
  "yinelenen yer tutucu veya fazladan ikinci `?` içeren bir zamanlamayı kaydetmek artık belirli bir mesajla engelleniyor. Eski bir zamanlamayı düzenliyorsanız kontrolü çalıştırmak için yeniden kaydedin.",

  "Kimlik ulaşıyor ama anket aracınız onu saklamıyor",
  "Ne oluyor:",
  "çoğu platform, siz bildirmedikçe beklenmeyen URL parametrelerini yok sayar. Qualtrics'te Survey Flow içinde, adı sorgu anahtarıyla büyük-küçük harf dâhil *tam olarak* eşleşen bir Embedded Data alanı bulunmalıdır. SoSci parametrenin kaydedilmesini ister; LimeSurvey ise panel entegrasyonunda tanımlanmasını.",
  "Bunu nasıl ayırt edersiniz:",
  "Samply'nin test bildiriminin kimliği bağlantıda gösterdiği, ancak dışa aktarımınızda sütunun hâlâ boş olduğu durumdur. Sorun anket aracı tarafındadır.",
  "Çözüm:",
  "platformunuz için [entegrasyon kılavuzunu](/docs/integrations) izleyin, ardından bir test yanıtı doldurup dışa aktarımı indirerek sütunun dolduğunu doğrulayın. Ayrılmış parametre adlarına dikkat edin — her aracın birkaçı vardır ve platform bazında listelenmiştir.",

  "Katılımcılar bunun yerine kodu elle yazıyor",
  "Bu işe yarar, ancak her bildirimde yük ekler ve sonradan temizlemeniz gereken yazım hataları ile tutarsız büyük-küçük harf kullanımı doğurur. Parametreyi düzgünce aktarmak için yirmi dakika ayırmaya değer.",

  "3 · Yanıt oranları yanlış görünüyor ya da hatırlatmalar herkese gidiyor",

  "Tamamlanmalar hiç kaydedilmiyor",
  "Ne oluyor:",
  "Samply bir anketin bittiğini ancak anket kendisine söylerse bilir. Bunun için iki şey gerekir: bildirim bağlantısında `%MESSAGE_ID%` ve anketinizin sonunda `/studies/<study-code>/done/<message-id>` adresine geri yönlendirme; mesaj kimliği aracınızın kendi sözdizimiyle geri verilir. Aracınız kendi parametrelerini yalnızca sabit bir yönlendirme URL'sine ekleyebiliyorsa, bunun yerine `/studies/<study-code>/done?messageid=<message-id>` adresini kullanın — Samply her iki biçimi de kabul eder.",
  "Siz ne görürsünüz:",
  "analiz sayfası, bir çalışma bildirim gönderdiği hâlde hiç tamamlanma kaydetmediğinde uyarır. Bu uyarı toplama sırasında görünür, sonrasında değil.",
  "Ayrıca bilinmesi gereken:",
  "bazı araçlar harici bir URL'ye hiç yönlendiremez, bazıları ise yalnızca ücretli planlarda. [Uyumluluk tablosu](/docs/integrations) hangilerinin olduğunu gösterir.",

  "Hatırlatmalar zaten yanıtlamış kişilere ulaşıyor",
  "Neden:",
  "bir tamamlanma kaydedilir kaydedilmez hatırlatmalar otomatik olarak iptal edilir — ancak tamamlanma takibi kurulmamışsa Samply kimin yanıtladığını bilemez ve her hatırlatma herkese gider. Bu, yukarıdakiyle aynı kök nedendir ve elle ayıklamanız gereken yinelenen gönderimler üretir.",
  "Çözüm:",
  "`%MESSAGE_ID%` ekleyin ve anket sonu yönlendirmesini ayarlayın. Zamanlama düzenleyicisindeki hatırlatma adımı, eksik olduklarında sizi uyarır.",

  "Bir katılımcı yanıtladı ama yanıtlamamış görünüyor",
  "Samply bir bildirimi, katılımcı ona dokunduysa, uygulamadaki geçmişinden açtıysa ya da anket tamamlanmayı bildirdiyse yanıtlanmış sayar. Bunların hiçbiri olmadıysa — örneğin bağlantıyı masaüstü tarayıcısına kopyaladıysa — yanıt anket aracınızda vardır ama Samply onu ilişkilendiremez. Samply'nin uyum oranını kesin saymadan önce anket dışa aktarımınızla karşılaştırın.",

  "4 · Analiz sayfasındaki sayılar yanlış görünüyor",

  "Sayılar zamanla azalıyor gibi",
  "Sayfanın üstündeki dönem seçicisini kontrol edin. **Tüm çalışma** varsayılandır; *7g* gibi sabit bir dönem, şimdiye sabitlenmiş kayan bir penceredir; bu nedenle çalışma ilerledikçe daha eski mesajlar sayımdan çıkar. Hiçbir şey kaybolmaz — pencere kaydı. Kümülatif sayılar için **Tüm çalışma** seçeneğine dönün.",

  "„Zamanlama performansı” yalnızca „(izlenmeyen zamanlama)” gösteriyor",
  "2026 ortasından önce gönderilen bildirimler, kendilerini üreten zamanlamayla etiketlenmemişti; bu yüzden geriye dönük ilişkilendirilemezler. Yeni gönderimler etiketleniyor. Olay bağımlı ve API ile tetiklenen bildirimlerin haklı olarak zamanlaması yoktur ve her zaman burada görünür.",

  "Sayılar anket aracımınkilerle uyuşmuyor",
  "Farklı şeyler ölçüyorlar ve bir miktar sapma beklenir. Samply bildirimleri ve onlarla etkileşimleri sayar; anket aracınız gönderimleri sayar. Kısmi yanıtlar, masaüstünde başlatılan yanıtlar ve yinelenen gönderimler ikisini birbirinden ayırır. Test bildirimleri Samply'nin sayılarından ve dışa aktarımından çıkarılmıştır, dolayısıyla farkı açıklamaz. Kendi analiziniz için ham olay günlüğünü çalışmanın Geçmiş sayfasından dışa aktarın ve ihtiyacınız olanı doğrudan hesaplayın.",

  "5 · Hiç bildirim gönderilmedi",
  "Şunları sırayla kontrol edin:",
  "**Çalışma etkin mi?** Etkin olmayan bir çalışma hiçbir şey göndermez.",
  "**Katılan oldu mu?** Alıcısı olmayan bir zamanlama gönderim üretmez.",
  "**Zamanlama doğru kişileri hedefliyor mu?** Kimsenin bulunmadığı bir grupla sınırlıysa ya da oluşturma anında kayıtlı olan katılımcılarla sınırlıyken kohortunuz sonradan katıldıysa, kuyruk boş kalır.",
  "**Saat dilimini kontrol edin.** Yanlış saat diliminde ayarlanmış bir zamanlama yanlış yerel saatte tetiklenir — çoğu kez gecenin ortasında; bu da yanlış yapılandırmadan çok yanıtsızlık gibi görünür.",
  "**Planlanmış kuyruğa bakın.** Her zamanlama, katılımcı ve gönderim zamanı başına bir satır olarak açılır. Kuyruk boşsa zamanlama hiçbir şey üretmemiştir ve neden teslimde değil, yukarıdadır.",

  "6 · Katılımcılara ne söylemeli",
  "Katılımcı tarafındaki sorunların çoğunu siz değil, katılımcı çözer. Bunu tepkisel olarak göndermek yerine tanıtım materyalinize koymaya değer:",
  "Uygulama sorduğunda bildirimlere izin verin. Reddettiyseniz telefonunuzun ayarlarından açabilirsiniz.",
  "**Android'de:** Samply için pil optimizasyonunu kapatın, yoksa telefon bildirimleri geciktirir veya engeller. [dontkillmyapp.com](https://dontkillmyapp.com/) tam olarak sizin telefonunuza ait adımları içerir.",
  "iPhone'da: Samply'nin hemen teslim edebildiğinden, Planlanmış Özet'te tutulmadığından ve bir Odak modunda sessize alınmadığından emin olun.",
  "Uygulamayı yeniden kurar ya da telefon değiştirirseniz Samply'yi açıp tekrar oturum açın, böylece cihazınız yeniden kaydedilir.",
  "Bildirimler gelmeyi keserse uygulama menüsünden **Bildirim kontrolü**'nü açın. Hangi adımın koptuğunu tam olarak gösterir ve tek dokunuşla onarım sunar.",

  "7 · Bütün bunları önlemek",
  "Katılımcı toplamadan önce çalışma panelinizde **Kurulum kontrolü**'nü çalıştırın ve kendinize bir test bildirimi gönderin. Test olağan gönderim hattından geçer ve dört şeyi bildirir: bildirimin gönderildiğini, bağlantının katılımcı kimliğini taşıdığını, açıldığını ve tamamlanmanın geri bildirildiğini. Dördünü de geçen bir çalışma, bu sayfada anlatılan hiçbir biçimde başarısız olmaz.",
  "Ardından kendiniz eksiksiz bir yanıt doldurun ve **dışa aktarımı indirin**. Anket aracınızın kimliği gerçekten sakladığını doğrulamanın tek yolu budur; Samply bunu kendi tarafından göremez. Beş dakika sürer ve katılımcı toplamadan önce yapabileceğiniz en değerli şeydir.",
  "Buradaki bir şey gördüğünüzle uyuşmuyorsa ya da bu sayfanın anlatmadığı bir sorunla karşılaşırsanız [bize yazın](/docs/collaborate) — liste gelen bildirimlerle büyüyor.",
]);
