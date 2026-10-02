import { fromStrings } from "./content.ts";

/**
 * Polish participant FAQ.
 *
 * Strings are in reading order; see `fromStrings` for the exact sequence.
 * Inline markup, link targets and code spans must match English exactly — only
 * link labels are translated. App UI labels in **bold** match the app's own
 * Polish strings. lib/faq.test.ts enforces the structure.
 */
export default fromStrings([
  "Ta strona jest dla osób biorących udział w badaniu, które korzysta z aplikacji **Samply Research**. Samply to narzędzie, które dostarcza powiadomienia w ramach badania. Samo badanie — jego pytania, harmonogram, ewentualne wynagrodzenie i Twoje odpowiedzi — prowadzi badacz, zwykle z uczelni. Wiedząc, kogo z nich zapytać, otrzymasz odpowiedź znacznie szybciej.",

  "Kogo zapytać?",
  "Badacza, który prowadzi Twoje badanie",
  "Ile powiadomień otrzymujesz, kiedy i przez jak długi czas",
  "Pytania w ankiecie, niedziałające linki do ankiet lub błędy w ankiecie",
  "Wynagrodzenie, punkty zaliczeniowe, vouchery lub inna forma rekompensaty",
  "Czy pominięte powiadomienie lub spóźniona odpowiedź nadal się liczy",
  "Wycofanie Twoich odpowiedzi lub sposób ich wykorzystania",
  "Wszystko, co dotyczy opisu badania lub formularza zgody",
  "Wsparcie Samply",
  "Aplikacja się zawiesza lub nie chce się otworzyć",
  "Nie możesz się zarejestrować, zalogować ani zresetować hasła",
  "Twoje konto Samply lub jego usunięcie",
  "Nie dociera żadne powiadomienie, nawet po wykonaniu kroków opisanych na tej stronie",
  "Problemy z tą stroną internetową",
  "Wsparcie Samply nie widzi Twoich odpowiedzi, nie ustala harmonogramu badania i nie może wypłacić wynagrodzenia ani przyznać punktów. W tych sprawach może pomóc tylko badacz — pisanie najpierw do Samply jedynie opóźnia odpowiedź.",

  "Kontakt z badaczem",
  "Jak skontaktować się z badaczem prowadzącym moje badanie?",
  "Otwórz aplikację Samply Research, dotknij badania na ekranie głównym i przewiń w dół do sekcji **Odpowiedzialny badacz**. Dotknij adresu e-mail: aplikacja pocztowa otworzy wiadomość do badacza, w której temacie będą już nazwa badania i Twój Samply ID, dzięki czemu badacz od razu Cię znajdzie.",
  "Otrzymane zaproszenie, opis badania i formularz zgody zwykle również zawierają dane kontaktowe.",
  "Badanie nie pokazuje danych kontaktowych. Co teraz?",
  "Sprawdź zaproszenie, przez które trafiłeś(-aś) do badania — e-mail, stronę zajęć, plakat lub ulotkę — oraz formularz zgody. Badacze powinni podać kontakt w co najmniej jednym z tych miejsc. Jeśli nadal nie możesz go znaleźć, napisz do wsparcia Samply, podając nazwę badania dokładnie tak, jak wyświetla się w aplikacji, a pomożemy Ci skontaktować się z badaczem.",
  "Co powinienem (powinnam) zawrzeć w wiadomości?",
  "Nazwę badania, tak jak wyświetla się w aplikacji.",
  "Twój **Samply ID**. Badacze widzą ten identyfikator, a nie Twoje imię i nazwisko czy adres e-mail, więc bez niego nie znajdą Twoich danych.",
  "Co się stało i mniej więcej kiedy — na przykład datę i godzinę powiadomienia, które nie dotarło.",
  "W przypadku problemów z powiadomieniami: model telefonu i to, czy działa na Androidzie, czy na iOS.",
  "Czym jest mój Samply ID i gdzie go znajdę?",
  "Twój Samply ID to losowy kod, który aplikacja tworzy dla Ciebie. Badacze widzą ten kod zamiast Twojego imienia i nazwiska czy adresu e-mail, dzięki czemu Twoje odpowiedzi pozostają pseudonimowe. Znajdziesz go w aplikacji w **Więcej → Ustawienia**, a na tej stronie po [zalogowaniu się jako uczestnik](/participant/login).",
  "Niektóre badania nadają też **Kod uczestnika**, widoczny na ekranie badania w aplikacji. Jeśli go masz, również podaj go, pisząc do badacza.",

  "Powiadomienia",
  "Nie otrzymuję powiadomień",
  "W aplikacji otwórz **Więcej → Sprawdzenie powiadomień**. Ta funkcja sprawdza każdy etap, przez który przechodzi powiadomienie, pokazuje, który z nich nie działa, i proponuje rozwiązanie. Najczęstsze przyczyny to:",
  "Powiadomienia Samply są wyłączone w ustawieniach telefonu.",
  "**Na Androidzie:** optymalizacja baterii usypia aplikację. Wyłącz ją dla Samply — [dontkillmyapp.com](https://dontkillmyapp.com/) pokazuje kroki dla Twojego modelu telefonu.",
  "**Na iPhonie:** tryb skupienia lub zaplanowane podsumowanie wstrzymuje powiadomienia. Zezwól Samply na natychmiastowe dostarczanie powiadomień.",
  "Zainstalowano aplikację ponownie lub zmieniono telefon. Zaloguj się ponownie, a następnie dotknij **Zarejestruj to urządzenie ponownie** w Sprawdzeniu powiadomień.",
  "Jeśli Sprawdzenie powiadomień pokazuje, że wszystko jest w porządku, a powiadomienia nadal nie docierają, skontaktuj się z badaczem. Badanie może być wstrzymane lub zakończone albo po prostu nie ma w tej chwili zaplanowanych żadnych wysyłek.",
  "Powiadomienia przychodzą o złej porze",
  "Jeśli podróżowałeś(-aś) lub strefa czasowa telefonu się zmieniła, otwórz **Więcej → Ustawienia** i sprawdź **Strefa czasowa**. Jeśli zapisana i rzeczywista strefa czasowa się różnią, dotknij **Zapisz aktualną strefę czasową**.",
  "Jeśli strefa czasowa jest prawidłowa, pora wysyłki jest częścią projektu badania — wiele badań celowo wysyła powiadomienia w losowych momentach dnia. Zapytaj badacza. Preferowany przedział czasowy, który możesz podać w Ustawieniach, jest wyłącznie informacją dla badaczy; sam w sobie nie blokuje powiadomień.",
  "Dostaję za dużo powiadomień lub chcę, żeby przestały przychodzić",
  "O tym, jak często otrzymujesz powiadomienia, decyduje badacz, a nie Samply, więc zapytaj go, czy Twój harmonogram można zmienić. Aby zatrzymać wszystkie powiadomienia z badania, [opuść badanie](/docs/faq#leave). Wyłączenie powiadomień w ustawieniach telefonu również je zatrzymuje, ale wtedy badanie odnotuje, że nie odpowiadasz.",
  "Przegapiłem(-am) powiadomienie. Czy nadal mogę odpowiedzieć?",
  "Każde otrzymane powiadomienie jest widoczne na karcie **Historia** w aplikacji i stamtąd możesz otworzyć ankietę. W wielu badaniach linki po pewnym czasie wygasają, ponieważ odpowiedzi udzielone znacznie później są mniej przydatne dla badania. Jeśli widzisz komunikat **Link wygasł**, badacz zamknął ten przedział czasowy. To, czy pominięte powiadomienie wpływa na Twoje wynagrodzenie lub punkty, zależy od badacza.",

  "Ankiety i odpowiedzi",
  "Link do ankiety się nie otwiera lub pokazuje błąd",
  "Ankiety są udostępniane przez narzędzie ankietowe badacza — na przykład Qualtrics, SoSci Survey lub LimeSurvey — a nie przez Samply. Spróbuj ponownie przy stabilnym połączeniu z internetem. Jeśli sama strona ankiety pokazuje błąd lub informuje, że ankieta jest zamknięta, skontaktuj się z badaczem: tylko on może to naprawić. Zrzut ekranu będzie pomocny.",
  "Ukończyłem(-am) ankietę, ale aplikacja nie pokazuje jej jako ukończonej",
  "Samply dowiaduje się o ukończeniu ankiety tylko wtedy, gdy na końcu ankieta przekierowuje Cię z powrotem do aplikacji, a nie każde badanie jest tak skonfigurowane. Twoje odpowiedzi nie przepadły — są zapisane w narzędziu ankietowym badacza. Jeśli zależy od tego Twoje wynagrodzenie, podaj badaczowi datę i godzinę, kiedy odpowiadałeś(-aś).",
  "Popełniłem(-am) błąd w odpowiedziach",
  "Twoje odpowiedzi trafiają bezpośrednio do narzędzia ankietowego badacza, a Samply nie może ich zobaczyć ani zmienić. Napisz do badacza, podając datę i godzinę ankiety oraz to, co chcesz poprawić.",

  "Dołączanie do badania i jego opuszczanie",
  "Jak dołączyć do badania?",
  "W aplikacji dotknij **Znajdź badanie** i zeskanuj kod QR badania albo wpisz 8-znakowy kod badania z zaproszenia. Możesz też otworzyć link z zaproszeniem na telefonie. Niektóre badania są też wymienione w sekcji **Publiczne badania**.",
  "Aplikacja informuje, że nie znaleziono badania dla mojego kodu",
  "Sprawdź, czy w kodzie nie ma literówek — ma on 8 znaków. Jeśli jest poprawny, badanie mogło zostać zamknięte lub jeszcze się nie rozpoczęło. Badacz powie Ci, która z tych sytuacji ma miejsce.",
  "Jak opuścić badanie?",
  "Otwórz badanie w aplikacji, przewiń na sam dół i dotknij **Opuść badanie**. Aplikacja poprosi o potwierdzenie, ponieważ tej operacji nie można cofnąć. Powiadomienia z tego badania przestają przychodzić od razu.",
  "Opuszczenie badania zatrzymuje nowe powiadomienia, ale nie usuwa odpowiedzi, których już udzieliłeś(-aś) — przechowuje je badacz. Jeśli chcesz je wycofać, napisz do badacza i podaj swój Samply ID.",
  "Kiedy otrzymam wynagrodzenie lub punkty zaliczeniowe?",
  "Rekompensatę ustala i wypłaca badacz, a nie Samply. Samply nie obsługuje płatności dla uczestników i nie widzi, czy otrzymałeś(-aś) zapłatę. Zapytaj badacza i podaj swój Samply ID.",

  "Twoje konto i Twoje dane",
  "Nie pamiętam hasła",
  "Na ekranie logowania dotknij **Nie pamiętasz hasła?** i wpisz swój adres e-mail. Otrzymasz link do ustawienia nowego hasła. Jeśli nie dotrze w ciągu kilku minut, sprawdź folder spamu; jeśli i tam go nie ma, skontaktuj się ze wsparciem Samply.",
  "Jak zmienić adres e-mail?",
  "W aplikacji otwórz **Więcej → Ustawienia** i zmień adres e-mail w sekcji **Informacje o koncie**. Następnie wyloguj się i zaloguj ponownie, aby zmiana zaczęła obowiązywać.",
  "Co badacz może o mnie zobaczyć?",
  "Badacze widzą Twój Samply ID — nie Twoje imię i nazwisko, adres e-mail ani numer telefonu. Widzą, kiedy wysłano Ci powiadomienia i czy je otworzyłeś(-aś), a Twoje odpowiedzi otrzymują przez własne narzędzie ankietowe. Jeśli badanie używa Twojej lokalizacji do wyzwalania powiadomień, lokalizacja pozostaje na Twoim telefonie i nie jest udostępniana badaczom.",
  "Jeśli piszesz do badacza e-mailem, oczywiście zobaczy on Twój adres e-mail. [Polityka prywatności](/docs/policy) szczegółowo wyjaśnia, co przechowuje Samply.",
  "Jak usunąć konto i swoje dane?",
  "W aplikacji otwórz **Więcej → Ustawienia**, dotknij **Usuń moje konto** i potwierdź hasłem. Spowoduje to usunięcie Twojego konta Samply, wypisanie Cię ze wszystkich badań i usunięcie danych, które Samply o Tobie przechowuje. Tej operacji nie można cofnąć.",
  "Usunięcie konta Samply nie usuwa odpowiedzi zapisanych w narzędziu ankietowym badacza — Samply nie ma do nich dostępu. Jeśli chcesz, aby one również zostały usunięte, napisz do każdego badacza, podając swój Samply ID, **zanim** usuniesz konto. Potem identyfikator nie będzie już widoczny w aplikacji.",
  "Czy mogę otrzymać kopię swoich danych?",
  "Tak. [Zaloguj się jako uczestnik](/participant/login) na tej stronie i wybierz **Pobierz moje dane**, aby otrzymać kopię wszystkiego, co Samply o Tobie przechowuje. Po kopię swoich odpowiedzi z ankiet zwróć się do badacza.",

  "Kontakt ze wsparciem Samply",
  "Jak skontaktować się ze wsparciem Samply?",
  "Napisz na adres [yury.shevchenko@uni.kn](mailto:yury.shevchenko@uni.kn) lub otwórz w aplikacji **Więcej → Kontakt**. Podaj model telefonu, wersję Androida lub iOS oraz wersję aplikacji widoczną w **Więcej → O aplikacji**. Odpowiedź zajmuje zwykle jeden do dwóch dni roboczych.",
  "Samply prowadzi niewielki zespół z Uniwersytetu w Konstancji. Nie możemy odpowiadać na pytania dotyczące konkretnego badania, a przekazywanie ich dalej tylko opóźnia odpowiedź — dlatego prosimy kierować je do badacza.",
]);
