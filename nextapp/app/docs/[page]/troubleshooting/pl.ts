import { fromStrings } from "./content.ts";

/** Polish troubleshooting page. See de.ts for the translation contract. */
export default fromStrings([
  "Większość problemów z Samply to kwestie konfiguracji, a nie awarie, i niemal wszystkie widać, zanim wyjdzie pierwsze powiadomienie. Ta strona jest uporządkowana według tego, co byś zauważył, a nie według tego, co jest technicznie nie tak.",
  "Jeśli badanie jeszcze się nie zaczęło, najszybszą drogą jest **Sprawdzenie konfiguracji** na pulpicie badania: analizuje ustawienia i proponuje powiadomienie testowe, które przechodzi prawdziwą drogą wysyłki i pokazuje link do ankiety dokładnie tak, jak otrzymał go telefon uczestnika. Niemal wszystko poniżej wychwytuje ta jedna kontrola.",

  "1 · Uczestnik przestał otrzymywać powiadomienia",
  "To najczęstsze zgłoszenie, mające kilka przyczyn o bardzo różnych rozwiązaniach. Przejdź listę od góry — jest uporządkowana według tego, jak często dana przyczyna okazuje się właściwa.",

  "Uczestnik przeinstalował aplikację albo zmienił telefon",
  "Co się dzieje:",
  "token push identyfikuje instalację aplikacji, a nie osobę. Ponowna instalacja, przywrócenie na nowym urządzeniu lub czasem aktualizacja systemu generują nowy token, a stary przestaje działać na stałe.",
  "Co widzisz:",
  "strona analityki pokazuje „N uczestnik(ów) nie może już otrzymywać powiadomień”. Samply dowiaduje się tego z potwierdzeń doręczenia usługi push, zwykle w ciągu godziny od kolejnej wysyłki.",
  "Rozwiązanie:",
  "uczestnik otwiera Samply Research i loguje się. Urządzenie zostaje wtedy zarejestrowane ponownie automatycznie. Jeśli ma wątpliwości, poproś o otwarcie ekranu **Sprawdzenie powiadomień** w menu aplikacji i dotknięcie **Zarejestruj to urządzenie ponownie** — ta sama naprawa, wykonana świadomie.",

  "Android usypia aplikację",
  "Co się dzieje:",
  "wielu producentów Androida dokłada agresywne zarządzanie baterią ponad system. Powiadomienie jest przyjmowane przez serwery Google, a potem opóźniane lub odrzucane przez sam telefon. Samsung, Xiaomi, OnePlus, Huawei, Oppo i Vivo to typowi winowajcy; zachowanie różni się zależnie od producenta i wersji Androida.",
  "Co widzisz:",
  "**nic.** To najważniejszy punkt. Powiadomienie zostało przyjęte do doręczenia, więc Samply liczy je jako wysłane i nigdzie nie pojawia się ostrzeżenie. Jedynym sygnałem jest uczestnik zgłaszający brakujące zaproszenia, podczas gdy wszystkie wskaźniki po stronie serwera wyglądają zdrowo.",
  "Rozwiązanie:",
  "uczestnik wyłącza optymalizację baterii dla Samply. Kroki różnią się u producentów, a [dontkillmyapp.com](https://dontkillmyapp.com/) opisuje je urządzenie po urządzeniu — to najlepsze dostępne źródło i warto wysłać je bezpośrednio uczestnikom z telefonami Android. Ekran **Sprawdzenie powiadomień** w aplikacji także prowadzi do ustawień telefonu.",
  "Zapobieganie:",
  "wspomnij o tym w instrukcjach wprowadzających, a nie po fakcie. Poproszenie uczestników Androida pierwszego dnia kosztuje minutę; pytanie piątego dnia oznacza, że ich dane już przepadły.",

  "Zgoda na powiadomienia nigdy nie została udzielona albo została cofnięta",
  "Co się dzieje:",
  "aplikacja prosi o zgodę przy pierwszym uruchomieniu. Jeśli uczestnik odmówi — albo później wyłączy powiadomienia, co niektórzy robią hurtowo, porządkując telefon — nic nie może zostać doręczone.",
  "Co widzisz:",
  "jeśli zgody nigdy nie udzielono, uczestnik nie ma tokenu push: figuruje jako zapisany, ale nigdy nic nie otrzymuje. Jeśli cofnięto ją później, z punktu widzenia serwera token może jeszcze przez pewien czas działać.",
  "Rozwiązanie:",
  "**Sprawdzenie powiadomień** w menu aplikacji pokazuje stan zgody bezpośrednio i otwiera właściwą stronę ustawień.",

  "Uczestnik dołączył, ale nigdy więcej nie otworzył aplikacji",
  "Urządzenie rejestruje się do powiadomień, gdy aplikacja działa. Ktoś, kto dołącza przez link, potem zamyka aplikację i nigdy jej nie otwiera, może nigdy nie dokończyć rejestracji. Wiersz istnieje; urządzenie jest nieosiągalne.",

  "Tryby skupienia iOS albo zaplanowane podsumowanie",
  "iOS potrafi wstrzymać powiadomienia i doręczyć je zbiorczo albo wyciszyć w trybie skupienia. Uczestnicy często nie wiedzą, że to działa. Powiadomienie dociera — tylko nie wtedy, kiedy je zaplanowałeś, co w experience sampling często znaczy tyle co niedotarcie. Poproś uczestników, by pozwolili Samply doręczać natychmiast.",

  "Telefon był wyłączony albo offline w chwili wysyłki",
  "Usługi push przetrzymują wiadomość przez jakiś czas i doręczają ją, gdy urządzenie wróci do sieci, ale tego nie gwarantują, a wygasły link może już wtedy nie mieć sensu. Jeśli twój schemat wymaga, by zaproszenie dotarło w wąskim oknie, ustaw wygaśnięcie linku, aby spóźnione doręczenia nie były wypełniane poza oknem — i licz się z pewną stratą.",

  "2 · Eksport z ankiety nie zawiera identyfikatora uczestnika",
  "To najbardziej szkodliwa rzecz, jaka może się zdarzyć, bo dzieje się bezgłośnie i wychodzi na jaw przy analizie, gdy badanie już się skończyło.",
  "Nie da się później odtworzyć, kto co odpowiedział. Jeśli twój schemat wymaga analiz na poziomie osoby lub wielopoziomowych, sprawdź to pierwszego dnia powiadomieniem testowym.",

  "Link powiadomienia nie zawiera symbolu zastępczego ID",
  "Co się dzieje:",
  "bez `%SAMPLY_ID%` w linku ankieta nie otrzymuje żadnego identyfikatora. Każda odpowiedź jest anonimowa i nie da się jej powiązać.",
  "Rozwiązanie:",
  "edytor harmonogramów ostrzega o tym już podczas pisania, a sprawdzenie konfiguracji to zgłasza. Użyj kreatora **Zbuduj ten link za mnie** zamiast składać adres ręcznie — doda właściwe parametry z nazwami, których oczekuje twoja platforma.",

  "Link jest zniekształcony — zdublowany symbol zastępczy albo drugi „?”",
  "Co się dzieje:",
  "adres URL może zawierać tylko jeden `?`; kolejne parametry łączy się przez `&`. Doklejenie drugiego `?id=%SAMPLY_ID%` sprawia, że wartość poprzedniego parametru pochłania wszystko dalej, a ankieta zapisuje zniekształcony identyfikator albo żaden.",
  "Rozwiązanie:",
  "zapisanie harmonogramu ze zdublowanym symbolem zastępczym albo zbędnym drugim `?` jest teraz blokowane konkretnym komunikatem. Jeśli edytujesz starszy harmonogram, zapisz go ponownie, aby uruchomić kontrolę.",

  "ID dociera, ale twoje narzędzie ankietowe go nie zapisuje",
  "Co się dzieje:",
  "większość platform ignoruje nieoczekiwane parametry URL, dopóki ich nie zadeklarujesz. W Qualtrics w Survey Flow musi istnieć pole Embedded Data o nazwie *dokładnie* zgodnej z kluczem zapytania, łącznie z wielkością liter. SoSci wymaga zarejestrowania parametru; LimeSurvey potrzebuje go zdefiniowanego w integracji panelowej.",
  "Jak to rozpoznać:",
  "to przypadek, w którym powiadomienie testowe Samply pokazuje ID obecne w linku, a twój eksport wciąż ma pustą kolumnę. Problem leży po stronie narzędzia ankietowego.",
  "Rozwiązanie:",
  "postępuj według [przewodnika integracji](/docs/integrations) dla swojej platformy, potem wypełnij odpowiedź testową i pobierz eksport, aby potwierdzić, że kolumna jest wypełniona. Uważaj na zarezerwowane nazwy parametrów — każde narzędzie ma jakieś, są wypisane osobno dla każdej platformy.",

  "Uczestnicy zamiast tego wpisują kod ręcznie",
  "To działa, ale zwiększa obciążenie przy każdym zaproszeniu i wprowadza literówki oraz niespójną wielkość liter, które trzeba będzie potem czyścić. Warto poświęcić dwadzieścia minut na porządne przekazanie parametru.",

  "3 · Wskaźniki odpowiedzi wyglądają źle albo przypomnienia trafiają do wszystkich",

  "Ukończenia nigdy nie są rejestrowane",
  "Co się dzieje:",
  "Samply wie, że ankieta została ukończona, tylko jeśli ankieta mu to powie. Wymaga to dwóch rzeczy: `%MESSAGE_ID%` w linku powiadomienia oraz przekierowania na końcu ankiety z powrotem na `/studies/<study-code>/done/<message-id>`, przy czym identyfikator wiadomości zwracany jest składnią właściwą dla twojego narzędzia.",
  "Co widzisz:",
  "strona analityki ostrzega, gdy badanie wysłało powiadomienia, ale nie zarejestrowało żadnego ukończenia. To ostrzeżenie pojawia się w trakcie zbierania danych, a nie po nim.",
  "Warto też wiedzieć:",
  "niektóre narzędzia w ogóle nie potrafią przekierować na zewnętrzny adres, a inne tylko w płatnych planach. [Tabela zgodności](/docs/integrations) pokazuje które.",

  "Przypomnienia docierają do osób, które już odpowiedziały",
  "Dlaczego:",
  "przypomnienia są anulowane automatycznie, gdy tylko zarejestrowane zostanie ukończenie — ale jeśli śledzenie ukończeń nie jest skonfigurowane, Samply nie może wiedzieć, kto odpowiedział, i każde przypomnienie idzie do wszystkich. To ta sama przyczyna źródłowa co wyżej i skutkuje zdublowanymi zgłoszeniami, które trzeba będzie odsiać ręcznie.",
  "Rozwiązanie:",
  "dodaj `%MESSAGE_ID%` i przekierowanie na końcu ankiety. Krok przypomnień w edytorze harmonogramów ostrzega, gdy ich brakuje.",

  "Uczestnik odpowiedział, ale figuruje jako nieodpowiadający",
  "Samply liczy powiadomienie jako obsłużone, jeśli uczestnik je kliknął, otworzył z historii w aplikacji albo ankieta zgłosiła ukończenie. Jeśli nic z tego nie nastąpiło — na przykład skopiował link do przeglądarki na komputerze — odpowiedź istnieje w twoim narzędziu, ale Samply nie potrafi jej przypisać. Porównaj z eksportem z ankiety, zanim uznasz wskaźnik zgodności Samply za ostateczny.",

  "4 · Liczby na stronie analityki wyglądają błędnie",

  "Liczniki zdają się z czasem maleć",
  "Sprawdź wybór okresu u góry strony. **Całe badanie** to ustawienie domyślne; stały okres, np. *7 d*, to ruchome okno zakotwiczone w teraźniejszości, więc starsze wiadomości wypadają z licznika w miarę trwania badania. Nic nie ginie — przesunęło się okno. Wróć do **Całe badanie**, aby zobaczyć wartości skumulowane.",

  "„Skuteczność harmonogramów” pokazuje tylko „(nieśledzony harmonogram)”",
  "Powiadomienia wysłane przed połową 2026 roku nie były znakowane harmonogramem, który je wytworzył, więc nie można ich przypisać wstecz. Nowe wysyłki są znakowane. Powiadomienia zdarzeniowe i wyzwalane przez API zasadnie nie mają harmonogramu i zawsze pojawiają się tutaj.",

  "Liczby nie zgadzają się z moim narzędziem ankietowym",
  "Mierzą różne rzeczy i pewna rozbieżność jest oczekiwana. Samply liczy powiadomienia i interakcje z nimi; twoje narzędzie liczy przesłane ankiety. Odpowiedzi częściowe, rozpoczęte na komputerze oraz zdublowane zgłoszenia rozjeżdżają obie wartości. Powiadomienia testowe są wyłączone z liczb i eksportu Samply, więc nie tłumaczą różnicy. Do własnej analizy wyeksportuj surowy dziennik zdarzeń ze strony Historia badania i policz bezpośrednio, czego potrzebujesz.",

  "5 · Nie wysłano żadnych powiadomień",
  "Sprawdź po kolei:",
  "**Czy badanie jest aktywne?** Nieaktywne badanie nic nie wysyła.",
  "**Czy ktoś dołączył?** Harmonogram bez odbiorców nie tworzy wysyłek.",
  "**Czy harmonogram celuje we właściwe osoby?** Jeśli ograniczono go do grupy, w której nikogo nie ma, albo do uczestników zapisanych w chwili tworzenia, podczas gdy twoja kohorta dołączyła później, kolejka pozostanie pusta.",
  "**Sprawdź strefę czasową.** Harmonogram w złej strefie odpala o złej godzinie lokalnej — często w środku nocy, co wygląda jak brak odpowiedzi, a nie jak błąd konfiguracji.",
  "**Zajrzyj do kolejki zaplanowanych.** Każdy harmonogram rozwija się w jeden wiersz na uczestnika i moment wysyłki. Jeśli kolejka jest pusta, harmonogram nigdy nic nie wytworzył, a przyczyna leży wyżej, nie w doręczaniu.",

  "6 · Co powiedzieć uczestnikom",
  "Większość problemów po stronie uczestnika rozwiązuje sam uczestnik, nie ty. Warto umieścić to w materiałach wprowadzających, zamiast wysyłać reaktywnie:",
  "Zezwól na powiadomienia, gdy aplikacja o to poprosi. Jeśli odmówiłeś, możesz je włączyć w ustawieniach telefonu.",
  "**Na Androidzie:** wyłącz optymalizację baterii dla Samply, bo telefon będzie opóźniał lub blokował zaproszenia. [dontkillmyapp.com](https://dontkillmyapp.com/) zawiera kroki dla twojego konkretnego telefonu.",
  "Na iPhonie: upewnij się, że Samply może doręczać natychmiast i nie jest wstrzymywane w zaplanowanym podsumowaniu ani wyciszone przez tryb skupienia.",
  "Jeśli przeinstalujesz aplikację albo zmienisz telefon, otwórz Samply i zaloguj się ponownie, aby urządzenie zostało zarejestrowane na nowo.",
  "Jeśli zaproszenia przestaną przychodzić, otwórz **Sprawdzenie powiadomień** w menu aplikacji. Pokaże dokładnie, który krok jest przerwany, i zaproponuje naprawę jednym dotknięciem.",

  "7 · Jak temu wszystkiemu zapobiec",
  "Uruchom **Sprawdzenie konfiguracji** na pulpicie badania i wyślij sobie powiadomienie testowe przed rekrutacją. Test przechodzi zwykłą drogą wysyłki i raportuje cztery rzeczy: że powiadomienie zostało wysłane, że link niesie identyfikator uczestnika, że został otwarty i że zgłoszono ukończenie. Badanie, które przejdzie wszystkie cztery, nie zawiedzie w żaden ze sposobów opisanych na tej stronie.",
  "Następnie wypełnij samodzielnie jedną pełną odpowiedź i **pobierz eksport**. Tylko tak potwierdzisz, że twoje narzędzie faktycznie zapisuje identyfikator, czego Samply ze swojej strony nie widzi. Zajmuje to pięć minut i jest najcenniejszą rzeczą, jaką możesz zrobić przed rekrutacją.",
  "Jeśli coś tutaj nie zgadza się z tym, co widzisz, albo napotkasz awarię, której ta strona nie opisuje, [napisz do nas](/docs/collaborate) — lista rośnie dzięki zgłoszeniom.",
]);
