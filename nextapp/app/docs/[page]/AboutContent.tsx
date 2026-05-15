import type { Locale } from "@/lib/i18n";

const PROBLEMS = [
  {
    n: "01",
    title: "Platform fragmentation",
    body: "Building a native mobile app for a study meant writing it twice — once in Java for Android, once in Objective-C or Swift for iOS. Many research tools ended up supporting only one platform.",
  },
  {
    n: "02",
    title: "Restricted question types",
    body: "Proprietary platforms ship a fixed set of response formats. Researchers had to adapt their study designs to fit what the software offered, rather than the other way around.",
  },
  {
    n: "03",
    title: "High cost",
    body: "Licensing fees for some platforms ran to around $500 for 50 participants. This put repeated-measurement studies out of reach for teams without dedicated funding.",
  },
];

const PROBLEMS_DE = [
  {
    n: "01",
    title: "Plattformfragmentierung",
    body: "Die Entwicklung einer nativen mobilen App für eine Studie bedeutete, sie zweimal zu schreiben — einmal in Java für Android, einmal in Objective-C oder Swift für iOS. Viele Forschungstools unterstützten am Ende nur eine Plattform.",
  },
  {
    n: "02",
    title: "Eingeschränkte Fragetypen",
    body: "Proprietäre Plattformen liefern einen festen Satz an Antwortformaten. Forscher mussten ihre Studiendesigns anpassen, um das zu nutzen, was die Software bot, anstatt umgekehrt.",
  },
  {
    n: "03",
    title: "Hohe Kosten",
    body: "Lizenzgebühren für einige Plattformen beliefen sich auf etwa 500 $ für 50 Teilnehmer. Dies machte Studien mit wiederholten Messungen für Teams ohne dedizierte Förderung unerschwinglich.",
  },
];

const TIMELINE: {
  date: string;
  headline: string;
  items: string[];
  accent?: "coral" | "sage";
}[] = [
  {
    date: "2018",
    headline: "Origins",
    items: [
      "Samply began as a notification module inside Open Lab (open-lab.online), a platform for running online experiments, designed for researchers who needed to prompt participants by push notification.",
      "Aim: let any researcher schedule mobile notifications without writing native app code.",
    ],
    accent: "coral",
  },
  {
    date: "May 2020",
    headline: "First mobile app",
    items: [
      "First public version of the Samply Research mobile app released.",
      "Samply becomes supported by the iScience group at the University of Konstanz, where lead developer Yury Shevchenko is employed as a post-doctoral researcher.",
      "Website usability study conducted.",
      "First ESM studies on time-management and well-being run on the platform.",
    ],
    accent: "sage",
  },
  {
    date: "December 2020",
    headline: "Publication",
    items: [
      "Samply described in a peer-reviewed article in Behavior Research Methods (Shevchenko, Kuhlmann & Reips, 2021, BRM 53, 1710–1730).",
    ],
    accent: "coral",
  },
  {
    date: "May 2021",
    headline: "Geofencing",
    items: [
      "Geofencing feature added: notifications triggered automatically when a participant enters or leaves a defined location.",
      "Mobile app usability study.",
    ],
    accent: "sage",
  },
  {
    date: "December 2021",
    headline: "Platform maturity",
    items: [
      "Public and private study types introduced.",
      "Time zone support in notification scheduling.",
      "Expiration time for notification links.",
    ],
    accent: "sage",
  },
  {
    date: "November 2022",
    headline: "API, localization, and new features",
    items: [
      "Samply API released — researchers can now send notifications based on external custom events from their own systems.",
      "Mobile app translated into German, Dutch, Russian, and Chinese.",
      "Event-contingent sampling added.",
      "Reminders and completion registration.",
      "ESM studies on hybrid work, well-being, and a Corona daily survey conducted.",
    ],
    accent: "coral",
  },
  {
    date: "September 2023",
    headline: "Geofencing validation",
    items: [
      "Geofencing validation study completed and published (Shevchenko & Reips, 2024, BRM 56, 6411–6439).",
      "Empirical evidence on optimal radius, iOS vs Android sensitivity, and recommended dwell times.",
    ],
    accent: "sage",
  },
  {
    date: "April 2024",
    headline: "Schedule editing",
    items: [
      "Researchers can now edit notifications that are already scheduled — a long-requested capability.",
      "Evaluation of misinformation in news study conducted.",
    ],
    accent: "sage",
  },
  {
    date: "April 2026",
    headline: "Redesign",
    items: [
      "Full redesign of the researcher web dashboard — rebuilt for clarity, with a cleaner information architecture, improved schedule management, and a new documentation system.",
      "Samply Research mobile app redesigned with a focus on usability and a more welcoming participant experience.",
      "Goal: make Samply straightforward for researchers who are new to experience-sampling methods, while keeping the full power available to advanced users.",
    ],
    accent: "coral",
  },
];

const TIMELINE_DE: {
  date: string;
  headline: string;
  items: string[];
  accent?: "coral" | "sage";
}[] = [
  {
    date: "2018",
    headline: "Ursprünge",
    items: [
      "Samply begann als Benachrichtigungsmodul innerhalb von Open Lab (open-lab.online), einer Plattform zur Durchführung von Online-Experimenten, entwickelt für Forscher, die Teilnehmer per Push-Benachrichtigung auffordern mussten.",
      "Ziel: Jedem Forscher ermöglichen, mobile Benachrichtigungen zu planen, ohne nativen App-Code zu schreiben.",
    ],
    accent: "coral",
  },
  {
    date: "Mai 2020",
    headline: "Erste mobile App",
    items: [
      "Erste öffentliche Version der mobilen Samply Research-App veröffentlicht.",
      "Samply wird von der iScience-Gruppe an der University of Konstanz unterstützt, wo Hauptentwickler Yury Shevchenko als Post-Doktorand beschäftigt ist.",
      "Usability-Studie zur Website durchgeführt.",
      "Erste ESM-Studien zu Zeitmanagement und Wohlbefinden auf der Plattform durchgeführt.",
    ],
    accent: "sage",
  },
  {
    date: "Dezember 2020",
    headline: "Veröffentlichung",
    items: [
      "Samply in einem begutachteten Artikel in Behavior Research Methods beschrieben (Shevchenko, Kuhlmann & Reips, 2021, BRM 53, 1710–1730).",
    ],
    accent: "coral",
  },
  {
    date: "Mai 2021",
    headline: "Geofencing",
    items: [
      "Geofencing-Funktion hinzugefügt: Benachrichtigungen werden automatisch ausgelöst, wenn ein Teilnehmer einen definierten Standort betritt oder verlässt.",
      "Usability-Studie zur mobilen App.",
    ],
    accent: "sage",
  },
  {
    date: "Dezember 2021",
    headline: "Plattformreife",
    items: [
      "Öffentliche und private Studientypen eingeführt.",
      "Zeitzonen-Unterstützung bei der Benachrichtigungsplanung.",
      "Ablaufzeit für Benachrichtigungslinks.",
    ],
    accent: "sage",
  },
  {
    date: "November 2022",
    headline: "API, Lokalisierung und neue Funktionen",
    items: [
      "Samply API veröffentlicht — Forscher können nun Benachrichtigungen basierend auf externen benutzerdefinierten Ereignissen aus ihren eigenen Systemen senden.",
      "Mobile App ins Deutsche, Niederländische, Russische und Chinesische übersetzt.",
      "Ereignisbedingtes Sampling hinzugefügt.",
      "Erinnerungen und Abschlussregistrierung.",
      "ESM-Studien zu hybrider Arbeit, Wohlbefinden und eine tägliche Corona-Umfrage durchgeführt.",
    ],
    accent: "coral",
  },
  {
    date: "September 2023",
    headline: "Geofencing-Validierung",
    items: [
      "Geofencing-Validierungsstudie abgeschlossen und veröffentlicht (Shevchenko & Reips, 2024, BRM 56, 6411–6439).",
      "Empirische Belege zu optimalem Radius, iOS- vs. Android-Empfindlichkeit und empfohlenen Verweildauern.",
    ],
    accent: "sage",
  },
  {
    date: "April 2024",
    headline: "Zeitplanbearbeitung",
    items: [
      "Forscher können nun Benachrichtigungen bearbeiten, die bereits geplant sind — eine lang gewünschte Funktion.",
      "Bewertung von Fehlinformationen in einer Nachrichtenstudie durchgeführt.",
    ],
    accent: "sage",
  },
  {
    date: "April 2026",
    headline: "Neugestaltung",
    items: [
      "Vollständige Neugestaltung des Forscher-Web-Dashboards — neu aufgebaut für Klarheit, mit einer übersichtlicheren Informationsarchitektur, verbessertem Zeitplanmanagement und einem neuen Dokumentationssystem.",
      "Samply Research-App mit Fokus auf Benutzerfreundlichkeit und ein einladenderes Teilnehmererlebnis neu gestaltet.",
      "Ziel: Samply für Forscher, die neu in der experience-sampling-Methodik sind, unkompliziert zu machen und gleichzeitig die volle Leistungsfähigkeit für fortgeschrittene Nutzer bereitzustellen.",
    ],
    accent: "coral",
  },
];

const PROBLEMS_NL = [
  {
    n: "01",
    title: "Platformfragmentatie",
    body: "Het bouwen van een native mobiele app voor een studie betekende het twee keer schrijven — eenmaal in Java voor Android, eenmaal in Objective-C of Swift voor iOS. Veel onderzoekstools ondersteunden uiteindelijk slechts een platform.",
  },
  {
    n: "02",
    title: "Beperkte vraagtypen",
    body: "Propriëtaire platforms leveren een vaste set antwoordformaten. Onderzoekers moesten hun studieontwerpen aanpassen aan wat de software bood, in plaats van andersom.",
  },
  {
    n: "03",
    title: "Hoge kosten",
    body: "Licentiekosten voor sommige platforms liepen op tot circa $500 voor 50 deelnemers. Dit maakte herhaalde-meetstudies onbereikbaar voor teams zonder specifieke financiering.",
  },
];

const TIMELINE_NL: {
  date: string;
  headline: string;
  items: string[];
  accent?: "coral" | "sage";
}[] = [
  {
    date: "2018",
    headline: "Oorsprong",
    items: [
      "Samply begon als een meldingsmodule binnen Open Lab (open-lab.online), een platform voor het uitvoeren van online experimenten, ontworpen voor onderzoekers die deelnemers via pushmelding wilden aansporen.",
      "Doel: elke onderzoeker de mogelijkheid bieden om mobiele meldingen te plannen zonder native app-code te schrijven.",
    ],
    accent: "coral",
  },
  {
    date: "Mei 2020",
    headline: "Eerste mobiele app",
    items: [
      "Eerste publieke versie van de mobiele Samply Research-app uitgebracht.",
      "Samply wordt ondersteund door de iScience-groep aan de Universiteit van Konstanz, waar hoofdontwikkelaar Yury Shevchenko werkzaam is als postdoctoraal onderzoeker.",
      "Gebruiksvriendelijkheidsstudie van de website uitgevoerd.",
      "Eerste ESM-studies over tijdmanagement en welzijn uitgevoerd op het platform.",
    ],
    accent: "sage",
  },
  {
    date: "December 2020",
    headline: "Publicatie",
    items: [
      "Samply beschreven in een peer-reviewed artikel in Behavior Research Methods (Shevchenko, Kuhlmann & Reips, 2021, BRM 53, 1710-1730).",
    ],
    accent: "coral",
  },
  {
    date: "Mei 2021",
    headline: "Geofencing",
    items: [
      "Geofencingfunctie toegevoegd: meldingen worden automatisch geactiveerd wanneer een deelnemer een gedefinieerde locatie betreft of verlaat.",
      "Gebruiksvriendelijkheidsstudie van de mobiele app.",
    ],
    accent: "sage",
  },
  {
    date: "December 2021",
    headline: "Platformvolwassenheid",
    items: [
      "Openbare en privéstudie-typen geintroduceerd.",
      "Tijdzoneondersteuning in de meldingsplanning.",
      "Vervaltijd voor meldingskoppelingen.",
    ],
    accent: "sage",
  },
  {
    date: "November 2022",
    headline: "API, lokalisatie en nieuwe functies",
    items: [
      "Samply API uitgebracht — onderzoekers kunnen nu meldingen sturen op basis van externe aangepaste gebeurtenissen vanuit hun eigen systemen.",
      "Mobiele app vertaald naar het Duits, Nederlands, Russisch en Chinees.",
      "Gebeurteniscontingente sampling toegevoegd.",
      "Herinneringen en voltooiingsregistratie.",
      "ESM-studies over hybride werken, welzijn en een dagelijkse Corona-enquete uitgevoerd.",
    ],
    accent: "coral",
  },
  {
    date: "September 2023",
    headline: "Geofencingvalidatie",
    items: [
      "Geofencingvalidatiestudie afgerond en gepubliceerd (Shevchenko & Reips, 2024, BRM 56, 6411-6439).",
      "Empirisch bewijs over optimale straal, iOS versus Android-gevoeligheid en aanbevolen verblijftijden.",
    ],
    accent: "sage",
  },
  {
    date: "April 2024",
    headline: "Roosterbewerking",
    items: [
      "Onderzoekers kunnen nu meldingen bewerken die al zijn ingepland — een lang gevraagde mogelijkheid.",
      "Evaluatiestudie van desinformatie in nieuws uitgevoerd.",
    ],
    accent: "sage",
  },
  {
    date: "April 2026",
    headline: "Herontwerp",
    items: [
      "Volledig herontwerp van het onderzoeker-webdashboard — opnieuw opgebouwd voor duidelijkheid, met een overzichtelijkere informatiearchitectuur, verbeterd roosterbeheer en een nieuw documentatiesysteem.",
      "Samply Research-mobiele app herontworpen met focus op gebruiksvriendelijkheid en een meer uitnodigende deelnemerservaring.",
      "Doel: Samply eenvoudig maken voor onderzoekers die nieuw zijn in experience-samplingmethoden, terwijl de volledige kracht beschikbaar blijft voor gevorderde gebruikers.",
    ],
    accent: "coral",
  },
];

const PROBLEMS_RU = [
  {
    n: "01",
    title: "Фрагментация платформ",
    body: "Создание нативного мобильного приложения для исследования означало написать его дважды — один раз на Java для Android, один раз на Objective-C или Swift для iOS. Многие исследовательские инструменты в итоге поддерживали только одну платформу.",
  },
  {
    n: "02",
    title: "Ограниченные типы вопросов",
    body: "Проприетарные платформы поставляются с фиксированным набором форматов ответов. Исследователям приходилось адаптировать дизайн своих исследований под то, что предлагало программное обеспечение, а не наоборот.",
  },
  {
    n: "03",
    title: "Высокая стоимость",
    body: "Лицензионные сборы за некоторые платформы составляли около 500 долларов за 50 участников. Это делало исследования с повторными измерениями недоступными для команд без специального финансирования.",
  },
];

const TIMELINE_RU: {
  date: string;
  headline: string;
  items: string[];
  accent?: "coral" | "sage";
}[] = [
  {
    date: "2018",
    headline: "Происхождение",
    items: [
      "Samply начинался как модуль уведомлений внутри Open Lab (open-lab.online) — платформы для проведения онлайн-экспериментов, разработанной для исследователей, которым нужно было отправлять участникам push-уведомления.",
      "Цель: дать любому исследователю возможность планировать мобильные уведомления без написания нативного кода приложения.",
    ],
    accent: "coral",
  },
  {
    date: "Май 2020",
    headline: "Первое мобильное приложение",
    items: [
      "Выпущена первая публичная версия мобильного приложения Samply Research.",
      "Samply получает поддержку исследовательской группы iScience Университета Констанца, где ведущий разработчик Юрий Шевченко работает постдокторантом.",
      "Проведено исследование удобства использования сайта.",
      "На платформе проведены первые ESM-исследования по тайм-менеджменту и благополучию.",
    ],
    accent: "sage",
  },
  {
    date: "Декабрь 2020",
    headline: "Публикация",
    items: [
      "Samply описан в рецензируемой статье в Behavior Research Methods (Shevchenko, Kuhlmann & Reips, 2021, BRM 53, 1710–1730).",
    ],
    accent: "coral",
  },
  {
    date: "Май 2021",
    headline: "Геозоны",
    items: [
      "Добавлена функция геозон: уведомления запускаются автоматически, когда участник входит в заданную зону или покидает её.",
      "Исследование удобства использования мобильного приложения.",
    ],
    accent: "sage",
  },
  {
    date: "Декабрь 2021",
    headline: "Зрелость платформы",
    items: [
      "Введены публичные и частные типы исследований.",
      "Поддержка часовых поясов при планировании уведомлений.",
      "Время истечения для ссылок уведомлений.",
    ],
    accent: "sage",
  },
  {
    date: "Ноябрь 2022",
    headline: "API, локализация и новые функции",
    items: [
      "Выпущен Samply API — исследователи теперь могут отправлять уведомления на основе внешних пользовательских событий из своих систем.",
      "Мобильное приложение переведено на немецкий, нидерландский, русский и китайский языки.",
      "Добавлена событийно-обусловленная выборка.",
      "Напоминания и регистрация завершения.",
      "Проведены ESM-исследования по гибридной работе, благополучию и ежедневный опрос о COVID.",
    ],
    accent: "coral",
  },
  {
    date: "Сентябрь 2023",
    headline: "Валидация геозон",
    items: [
      "Завершено и опубликовано исследование валидации геозон (Shevchenko & Reips, 2024, BRM 56, 6411–6439).",
      "Эмпирические данные об оптимальном радиусе, чувствительности iOS и Android и рекомендуемом времени нахождения.",
    ],
    accent: "sage",
  },
  {
    date: "Апрель 2024",
    headline: "Редактирование расписаний",
    items: [
      "Исследователи теперь могут редактировать уже запланированные уведомления — давно ожидаемая возможность.",
      "Проведено исследование оценки дезинформации в новостях.",
    ],
    accent: "sage",
  },
  {
    date: "Апрель 2026",
    headline: "Редизайн",
    items: [
      "Полный редизайн исследовательской веб-панели — перестроена для ясности, с более чёткой информационной архитектурой, улучшенным управлением расписаниями и новой системой документации.",
      "Мобильное приложение Samply Research переработано с акцентом на удобство использования и более приветливый интерфейс для участников.",
      "Цель: сделать Samply понятным для исследователей, впервые знакомящихся с методом опыта выборки, сохранив при этом все возможности для опытных пользователей.",
    ],
    accent: "coral",
  },
];

const PROBLEMS_ZH = [
  {
    n: "01",
    title: "平台碎片化",
    body: "为研究构建原生移动应用意味着要写两次——一次用 Java 写 Android，一次用 Objective-C 或 Swift 写 iOS。许多研究工具最终只支持一个平台。",
  },
  {
    n: "02",
    title: "问题类型受限",
    body: "专有平台提供固定的回答格式集合。研究者不得不将研究设计适配软件提供的格式，而不是反过来。",
  },
  {
    n: "03",
    title: "高昂费用",
    body: "某些平台的许可费用约为 50 名参与者 500 美元。这使得重复测量研究对于没有专项经费的团队来说遥不可及。",
  },
];

const TIMELINE_ZH: {
  date: string;
  headline: string;
  items: string[];
  accent?: "coral" | "sage";
}[] = [
  {
    date: "2018",
    headline: "起源",
    items: [
      "Samply 最初作为 Open Lab（open-lab.online）的通知模块而诞生，Open Lab 是一个用于在线实验的平台，专为需要通过推送通知提示参与者的研究者设计。",
      "目标：让任何研究者无需编写原生应用代码即可安排移动通知。",
    ],
    accent: "coral",
  },
  {
    date: "2020年5月",
    headline: "第一款移动应用",
    items: [
      "Samply Research 移动应用首个公开版本发布。",
      "Samply 获得康斯坦茨大学 iScience 研究组的支持，首席开发者 Yury Shevchenko 在该校担任博士后研究员。",
      "开展了网站可用性研究。",
      "平台上开展了首批关于时间管理和幸福感的 ESM 研究。",
    ],
    accent: "sage",
  },
  {
    date: "2020年12月",
    headline: "发表文章",
    items: [
      "Samply 在《Behavior Research Methods》发表了同行评审文章（Shevchenko, Kuhlmann & Reips, 2021, BRM 53, 1710–1730）。",
    ],
    accent: "coral",
  },
  {
    date: "2021年5月",
    headline: "地理围栏",
    items: [
      "新增地理围栏功能：当参与者进入或离开指定位置时自动触发通知。",
      "开展了移动应用可用性研究。",
    ],
    accent: "sage",
  },
  {
    date: "2021年12月",
    headline: "平台成熟",
    items: [
      "引入公开和私密研究类型。",
      "通知计划支持时区。",
      "通知链接设置过期时间。",
    ],
    accent: "sage",
  },
  {
    date: "2022年11月",
    headline: "API、本地化与新功能",
    items: [
      "Samply API 发布——研究者现在可以根据来自自身系统的外部自定义事件发送通知。",
      "移动应用翻译为德语、荷兰语、俄语和中文。",
      "添加事件触发采样。",
      "提醒功能和完成注册。",
      "开展了关于混合办公、幸福感的 ESM 研究及每日新冠疫情问卷。",
    ],
    accent: "coral",
  },
  {
    date: "2023年9月",
    headline: "地理围栏验证",
    items: [
      "地理围栏验证研究完成并发表（Shevchenko & Reips, 2024, BRM 56, 6411–6439）。",
      "提供了关于最优半径、iOS 与 Android 灵敏度差异及推荐驻留时间的实证数据。",
    ],
    accent: "sage",
  },
  {
    date: "2024年4月",
    headline: "计划编辑",
    items: [
      "研究者现在可以编辑已计划的通知——这是一个长期以来被期待的功能。",
      "开展了新闻中错误信息评估研究。",
    ],
    accent: "sage",
  },
  {
    date: "2026年4月",
    headline: "全面重设计",
    items: [
      "研究者网页控制台全面重设计——以更清晰的信息架构、改进的计划管理和全新的文档系统重新构建。",
      "Samply Research 移动应用以可用性和更友好的参与者体验为重点进行重新设计。",
      "目标：让刚接触经验采样方法的研究者能够轻松上手 Samply，同时为高级用户保留全部功能。",
    ],
    accent: "coral",
  },
];

const PROBLEMS_KO = [
  {
    n: "01",
    title: "플랫폼 분열",
    body: "연구를 위한 네이티브 모바일 앱을 개발한다는 것은 두 번 작성해야 한다는 것을 의미했습니다 — Android용으로 Java로 한 번, iOS용으로 Objective-C 또는 Swift로 한 번. 많은 연구 도구들이 결국 하나의 플랫폼만 지원하게 되었습니다.",
  },
  {
    n: "02",
    title: "제한된 질문 유형",
    body: "독점 플랫폼은 고정된 응답 형식 세트를 제공합니다. 연구자들은 소프트웨어가 제공하는 것에 맞춰 연구 설계를 조정해야 했으며, 그 반대는 아니었습니다.",
  },
  {
    n: "03",
    title: "높은 비용",
    body: "일부 플랫폼의 라이선스 비용은 참여자 50명에 약 500달러에 달했습니다. 이로 인해 전용 연구비가 없는 팀에게는 반복 측정 연구가 현실적으로 불가능했습니다.",
  },
];

const TIMELINE_KO: {
  date: string;
  headline: string;
  items: string[];
  accent?: "coral" | "sage";
}[] = [
  {
    date: "2018",
    headline: "시작",
    items: [
      "Samply는 온라인 실험 플랫폼인 Open Lab(open-lab.online) 내의 알림 모듈로 시작되었으며, 푸시 알림으로 참여자에게 안내가 필요한 연구자들을 위해 설계되었습니다.",
      "목표: 네이티브 앱 코드를 작성하지 않고도 모든 연구자가 모바일 알림을 예약할 수 있도록 하는 것.",
    ],
    accent: "coral",
  },
  {
    date: "2020년 5월",
    headline: "첫 번째 모바일 앱",
    items: [
      "Samply Research 모바일 앱의 첫 번째 공개 버전이 출시되었습니다.",
      "Samply는 수석 개발자 Yury Shevchenko가 박사 후 연구원으로 재직 중인 콘스탄츠 대학교의 iScience 그룹의 지원을 받게 되었습니다.",
      "웹사이트 사용성 연구가 실시되었습니다.",
      "플랫폼에서 시간 관리와 웰빙에 관한 첫 번째 ESM 연구가 수행되었습니다.",
    ],
    accent: "sage",
  },
  {
    date: "2020년 12월",
    headline: "논문 발표",
    items: [
      "Samply가 Behavior Research Methods의 동료 심사 논문에 기술되었습니다 (Shevchenko, Kuhlmann & Reips, 2021, BRM 53, 1710–1730).",
    ],
    accent: "coral",
  },
  {
    date: "2021년 5월",
    headline: "지오펜싱",
    items: [
      "지오펜싱 기능이 추가되었습니다: 참여자가 지정된 위치에 진입하거나 이탈할 때 알림이 자동으로 트리거됩니다.",
      "모바일 앱 사용성 연구.",
    ],
    accent: "sage",
  },
  {
    date: "2021년 12월",
    headline: "플랫폼 성숙",
    items: [
      "공개 및 비공개 연구 유형이 도입되었습니다.",
      "알림 예약에서 시간대 지원.",
      "알림 링크의 만료 시간.",
    ],
    accent: "sage",
  },
  {
    date: "2022년 11월",
    headline: "API, 현지화 및 새로운 기능",
    items: [
      "Samply API가 출시되었습니다 — 연구자들이 이제 자체 시스템의 외부 맞춤 이벤트를 기반으로 알림을 전송할 수 있습니다.",
      "모바일 앱이 독일어, 네덜란드어, 러시아어, 중국어로 번역되었습니다.",
      "이벤트 조건부 샘플링이 추가되었습니다.",
      "알림 및 완료 등록.",
      "하이브리드 근무, 웰빙에 관한 ESM 연구 및 코로나 일일 설문조사가 수행되었습니다.",
    ],
    accent: "coral",
  },
  {
    date: "2023년 9월",
    headline: "지오펜싱 검증",
    items: [
      "지오펜싱 검증 연구가 완료되어 발표되었습니다 (Shevchenko & Reips, 2024, BRM 56, 6411–6439).",
      "최적 반경, iOS 대 Android 민감도, 권장 체류 시간에 관한 실증적 증거.",
    ],
    accent: "sage",
  },
  {
    date: "2024년 4월",
    headline: "일정 편집",
    items: [
      "연구자들이 이제 이미 예약된 알림을 편집할 수 있게 되었습니다 — 오랫동안 요청받아 온 기능.",
      "뉴스에서의 허위 정보 평가 연구가 수행되었습니다.",
    ],
    accent: "sage",
  },
  {
    date: "2026년 4월",
    headline: "재설계",
    items: [
      "연구자 웹 대시보드의 전면 재설계 — 더 명확한 정보 구조, 향상된 일정 관리, 새로운 문서 시스템으로 명확성을 위해 재구축되었습니다.",
      "Samply Research 모바일 앱이 사용성과 더 친근한 참여자 경험에 초점을 맞춰 재설계되었습니다.",
      "목표: 경험 표집 방법이 처음인 연구자들에게 Samply를 간단하게 만들면서도 고급 사용자들이 이용할 수 있는 모든 기능을 유지하는 것.",
    ],
    accent: "coral",
  },
];

const PROBLEMS_IT = [
  {
    n: "01",
    title: "Frammentazione delle piattaforme",
    body: "Sviluppare un'app mobile nativa per uno studio significava scriverla due volte — una in Java per Android, una in Objective-C o Swift per iOS. Molti strumenti di ricerca finivano per supportare una sola piattaforma.",
  },
  {
    n: "02",
    title: "Tipi di domande limitati",
    body: "Le piattaforme proprietarie forniscono un insieme fisso di formati di risposta. I ricercatori dovevano adattare il design dei loro studi a ciò che il software offriva, e non viceversa.",
  },
  {
    n: "03",
    title: "Costi elevati",
    body: "Le licenze per alcune piattaforme arrivavano a circa 500 dollari per 50 partecipanti. Questo rendeva gli studi a misurazioni ripetute inaccessibili ai gruppi privi di finanziamenti dedicati.",
  },
];

const TIMELINE_IT: {
  date: string;
  headline: string;
  items: string[];
  accent?: "coral" | "sage";
}[] = [
  {
    date: "2018",
    headline: "Origini",
    items: [
      "Samply nacque come modulo di notifiche all'interno di Open Lab (open-lab.online), una piattaforma per la conduzione di esperimenti online, progettata per i ricercatori che avevano bisogno di sollecitare i partecipanti tramite notifiche push.",
      "Obiettivo: consentire a qualsiasi ricercatore di pianificare notifiche mobile senza scrivere codice nativo per app.",
    ],
    accent: "coral",
  },
  {
    date: "Maggio 2020",
    headline: "Prima app mobile",
    items: [
      "Prima versione pubblica dell'app mobile Samply Research rilasciata.",
      "Samply riceve il supporto del gruppo iScience dell'Università di Costanza, dove il lead developer Yury Shevchenko è impiegato come ricercatore post-dottorale.",
      "Studio di usabilità del sito web condotto.",
      "Primi studi ESM su gestione del tempo e benessere condotti sulla piattaforma.",
    ],
    accent: "sage",
  },
  {
    date: "Dicembre 2020",
    headline: "Pubblicazione",
    items: [
      "Samply descritto in un articolo sottoposto a revisione paritaria in Behavior Research Methods (Shevchenko, Kuhlmann & Reips, 2021, BRM 53, 1710–1730).",
    ],
    accent: "coral",
  },
  {
    date: "Maggio 2021",
    headline: "Geofencing",
    items: [
      "Funzionalità di geofencing aggiunta: le notifiche vengono attivate automaticamente quando un partecipante entra o lascia una posizione definita.",
      "Studio di usabilità dell'app mobile.",
    ],
    accent: "sage",
  },
  {
    date: "Dicembre 2021",
    headline: "Maturità della piattaforma",
    items: [
      "Introdotti tipi di studio pubblici e privati.",
      "Supporto dei fusi orari nella pianificazione delle notifiche.",
      "Tempo di scadenza per i link delle notifiche.",
    ],
    accent: "sage",
  },
  {
    date: "Novembre 2022",
    headline: "API, localizzazione e nuove funzionalità",
    items: [
      "Samply API rilasciato — i ricercatori possono ora inviare notifiche basate su eventi personalizzati esterni dai propri sistemi.",
      "App mobile tradotta in tedesco, olandese, russo e cinese.",
      "Campionamento event-contingent aggiunto.",
      "Promemoria e registrazione del completamento.",
      "Studi ESM su lavoro ibrido, benessere e un sondaggio giornaliero sul COVID condotti.",
    ],
    accent: "coral",
  },
  {
    date: "Settembre 2023",
    headline: "Validazione del geofencing",
    items: [
      "Studio di validazione del geofencing completato e pubblicato (Shevchenko & Reips, 2024, BRM 56, 6411–6439).",
      "Evidenze empiriche sul raggio ottimale, sulla sensibilità iOS vs Android e sui tempi di permanenza raccomandati.",
    ],
    accent: "sage",
  },
  {
    date: "Aprile 2024",
    headline: "Modifica della pianificazione",
    items: [
      "I ricercatori possono ora modificare le notifiche già pianificate — una funzionalità a lungo richiesta.",
      "Studio sulla valutazione della disinformazione nelle notizie condotto.",
    ],
    accent: "sage",
  },
  {
    date: "Aprile 2026",
    headline: "Ridisegno",
    items: [
      "Ridisegno completo del pannello di controllo web per i ricercatori — ricostruito per maggiore chiarezza, con un'architettura delle informazioni più pulita, una gestione migliorata della pianificazione e un nuovo sistema di documentazione.",
      "App mobile Samply Research ridisegnata con attenzione all'usabilità e a un'esperienza partecipante più accogliente.",
      "Obiettivo: rendere Samply semplice per i ricercatori che si avvicinano per la prima volta ai metodi di experience sampling, mantenendo al contempo tutta la potenza disponibile per gli utenti avanzati.",
    ],
    accent: "coral",
  },
];

export default function AboutContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <AboutContentDe />;
  if (locale === "nl") return <AboutContentNl />;
  if (locale === "ru") return <AboutContentRu />;
  if (locale === "zh") return <AboutContentZh />;
  if (locale === "ko") return <AboutContentKo />;
  if (locale === "it") return <AboutContentIt />;
  if (locale === "fr") return <AboutContentFr />;
  if (locale === "es") return <AboutContentEs />;
  if (locale === "pt") return <AboutContentPt />;
  return <AboutContentEn />;
}

function AboutContentEn() {
  return (
    <>
      {/* ── Motivation ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Why Samply exists</h2>
      <p>
        Research methods such as experience sampling, daily diary studies, and ecological momentary
        assessment all share one requirement: participants must be prompted to respond at the right
        moment, repeatedly, on their own phones. Before Samply, setting that up meant confronting
        three recurring problems.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", margin: "2.4rem 0 3.6rem" }}>
        {PROBLEMS.map((p) => (
          <div
            key={p.n}
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "flex-start",
              background: "var(--surface)",
              border: "1px solid var(--ink-10)",
              borderRadius: "1rem",
              padding: "1.8rem 2rem",
            }}
          >
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              color: "var(--coral)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              flexShrink: 0,
              paddingTop: "0.2rem",
              width: "2.4rem",
            }}>
              {p.n}
            </span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
                {p.title}
              </div>
              <div style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.6 }}>
                {p.body}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p>
        Samply was built to remove all three barriers: one cross-platform app, no restrictions on
        survey format (you bring your own survey tool), and free to use.
      </p>

      {/* ── Timeline ────────────────────────────────────────────────────── */}
      <h2>Development timeline</h2>
      <p>
        Development started in 2018 as a module within{" "}
        <a href="https://research.open-lab.online/" target="_blank" rel="noopener noreferrer">Open Lab</a>,
        an online experiment platform. It grew into an independent project with its own mobile app,
        web dashboard, REST API, and an active research community.
      </p>

      <div style={{ margin: "2.8rem 0 4rem", position: "relative" }}>
        {/* Vertical rail */}
        <div style={{
          position: "absolute",
          left: "10.4rem",
          top: "0.6rem",
          bottom: "0.6rem",
          width: "2px",
          background: "var(--ink-10)",
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {TIMELINE.map((entry, i) => {
            const accentColor = entry.accent === "coral" ? "var(--coral)" : "var(--sage)";
            const accentBg = entry.accent === "coral" ? "var(--coral-soft)" : "var(--sage-soft)";
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0",
                  alignItems: "flex-start",
                  paddingBottom: i < TIMELINE.length - 1 ? "2.8rem" : 0,
                }}
              >
                {/* Date label */}
                <div style={{
                  width: "10.4rem",
                  flexShrink: 0,
                  paddingRight: "2rem",
                  paddingTop: "0.15rem",
                  textAlign: "right",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: accentColor,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}>
                    {entry.date}
                  </span>
                </div>

                {/* Dot */}
                <div style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  borderRadius: "50%",
                  background: accentColor,
                  flexShrink: 0,
                  marginTop: "0.2rem",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: `0 0 0 3px var(--paper), 0 0 0 5px ${accentColor}22`,
                }} />

                {/* Content */}
                <div style={{ flex: 1, paddingLeft: "2rem" }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    marginBottom: "0.8rem",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}>
                      {entry.headline}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                      color: accentColor,
                      background: accentBg,
                      padding: "0.15rem 0.6rem",
                      borderRadius: "0.4rem",
                      letterSpacing: "0.04em",
                    }}>
                      {entry.date}
                    </span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                    {entry.items.map((item, j) => (
                      <li key={j} style={{
                        fontSize: "1.3rem",
                        color: "var(--ink-60)",
                        lineHeight: 1.65,
                        marginBottom: j < entry.items.length - 1 ? "0.4rem" : 0,
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Open source ─────────────────────────────────────────────────── */}
      <h2>Open source and free</h2>
      <p>
        Since 2020, Samply has been supported by the{" "}
        <a href="https://iscience.uni-konstanz.de/en/" target="_blank" rel="noopener noreferrer">iScience group</a>{" "}
        at the University of Konstanz. The lead developer, Yury Shevchenko, is employed there as a
        post-doctoral researcher. The group's research focus on internet-based methods and
        experience-sampling directly shapes Samply's design and feature priorities.
      </p>
      <p>
        Samply is free to use and open source. The source code for the web dashboard is available on <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noopener noreferrer">GitHub</a>. Contributions, bug reports, and feature requests are welcome.
      </p>
      <p>
        If you use Samply in your research, please cite the original publication:
      </p>
      <div style={{ background: "var(--coral-soft)", borderLeft: "3px solid var(--coral)", borderRadius: "0 0.8rem 0.8rem 0", padding: "1.4rem 1.6rem", margin: "0.4rem 0 0" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--coral)", marginBottom: "0.7rem" }}>Publication</div>
        <p style={{ margin: "0 0 0.8rem", fontSize: "1.3rem", lineHeight: 1.6, color: "var(--ink)", fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href="https://doi.org/10.3758/s13428-020-01527-9" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--coral)", wordBreak: "break-all" }}>
          https://doi.org/10.3758/s13428-020-01527-9
        </a>
      </div>
    </>
  );
}

function AboutContentNl() {
  return (
    <>
      {/* ── Motivation ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Waarom Samply bestaat</h2>
      <p>
        Onderzoeksmethoden zoals experience sampling, dagboekstudies en ecologische
        momentopname hebben allemaal een gemeenschappelijke vereiste: deelnemers moeten
        op het juiste moment, herhaaldelijk, op hun eigen telefoons worden aangespoord om
        te reageren. Voordat Samply bestond, betekende dat het tegenkomen van drie
        terugkerende problemen.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", margin: "2.4rem 0 3.6rem" }}>
        {PROBLEMS_NL.map((p) => (
          <div
            key={p.n}
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "flex-start",
              background: "var(--surface)",
              border: "1px solid var(--ink-10)",
              borderRadius: "1rem",
              padding: "1.8rem 2rem",
            }}
          >
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              color: "var(--coral)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              flexShrink: 0,
              paddingTop: "0.2rem",
              width: "2.4rem",
            }}>
              {p.n}
            </span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
                {p.title}
              </div>
              <div style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.6 }}>
                {p.body}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p>
        Samply is gebouwd om alle drie de belemmeringen weg te nemen: een
        platformonafhankelijke app, geen beperkingen op het enquêteformaat (u brengt uw
        eigen enquêtetool mee), en gratis te gebruiken.
      </p>

      {/* ── Timeline ────────────────────────────────────────────────────── */}
      <h2>Ontwikkelingstijdlijn</h2>
      <p>
        De ontwikkeling begon in 2018 als module binnen{" "}
        <a href="https://research.open-lab.online/" target="_blank" rel="noopener noreferrer">Open Lab</a>,
        een platform voor online experimenten. Het groeide uit tot een zelfstandig project
        met een eigen mobiele app, webdashboard, REST-API en een actieve
        onderzoeksgemeenschap.
      </p>

      <div style={{ margin: "2.8rem 0 4rem", position: "relative" }}>
        {/* Vertical rail */}
        <div style={{
          position: "absolute",
          left: "10.4rem",
          top: "0.6rem",
          bottom: "0.6rem",
          width: "2px",
          background: "var(--ink-10)",
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {TIMELINE_NL.map((entry, i) => {
            const accentColor = entry.accent === "coral" ? "var(--coral)" : "var(--sage)";
            const accentBg = entry.accent === "coral" ? "var(--coral-soft)" : "var(--sage-soft)";
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0",
                  alignItems: "flex-start",
                  paddingBottom: i < TIMELINE_NL.length - 1 ? "2.8rem" : 0,
                }}
              >
                {/* Date label */}
                <div style={{
                  width: "10.4rem",
                  flexShrink: 0,
                  paddingRight: "2rem",
                  paddingTop: "0.15rem",
                  textAlign: "right",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: accentColor,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}>
                    {entry.date}
                  </span>
                </div>

                {/* Dot */}
                <div style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  borderRadius: "50%",
                  background: accentColor,
                  flexShrink: 0,
                  marginTop: "0.2rem",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: `0 0 0 3px var(--paper), 0 0 0 5px ${accentColor}22`,
                }} />

                {/* Content */}
                <div style={{ flex: 1, paddingLeft: "2rem" }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    marginBottom: "0.8rem",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}>
                      {entry.headline}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                      color: accentColor,
                      background: accentBg,
                      padding: "0.15rem 0.6rem",
                      borderRadius: "0.4rem",
                      letterSpacing: "0.04em",
                    }}>
                      {entry.date}
                    </span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                    {entry.items.map((item, j) => (
                      <li key={j} style={{
                        fontSize: "1.3rem",
                        color: "var(--ink-60)",
                        lineHeight: 1.65,
                        marginBottom: j < entry.items.length - 1 ? "0.4rem" : 0,
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Open source ─────────────────────────────────────────────────── */}
      <h2>Open source en gratis</h2>
      <p>
        Sinds 2020 wordt Samply ondersteund door de{" "}
        <a href="https://iscience.uni-konstanz.de/en/" target="_blank" rel="noopener noreferrer">iScience-groep</a>{" "}
        aan de Universiteit van Konstanz. De hoofdontwikkelaar, Yury Shevchenko, is daar
        werkzaam als postdoctoraal onderzoeker. De onderzoeksfocus van de groep op
        internetgebaseerde methoden en experience sampling bepaalt rechtstreeks het ontwerp
        en de functieprioriteiten van Samply.
      </p>
      <p>
        Samply is gratis te gebruiken en open source. De broncode voor het webdashboard is
        beschikbaar op{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noopener noreferrer">GitHub</a>.
        Bijdragen, bugrapporten en functieverzoeken zijn welkom.
      </p>
      <p>
        Als u Samply in uw onderzoek gebruikt, verzoeken wij u de originele publicatie te
        citeren:
      </p>
      <div style={{ background: "var(--coral-soft)", borderLeft: "3px solid var(--coral)", borderRadius: "0 0.8rem 0.8rem 0", padding: "1.4rem 1.6rem", margin: "0.4rem 0 0" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--coral)", marginBottom: "0.7rem" }}>Publicatie</div>
        <p style={{ margin: "0 0 0.8rem", fontSize: "1.3rem", lineHeight: 1.6, color: "var(--ink)", fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710-1730.
        </p>
        <a href="https://doi.org/10.3758/s13428-020-01527-9" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--coral)", wordBreak: "break-all" }}>
          https://doi.org/10.3758/s13428-020-01527-9
        </a>
      </div>
    </>
  );
}

function AboutContentDe() {
  return (
    <>
      {/* ── Motivation ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Warum es Samply gibt</h2>
      <p>
        Forschungsmethoden wie experience sampling, Tagebuchstudien und ökologische
        Momentbewertung haben alle eine gemeinsame Anforderung: Teilnehmer müssen zum
        richtigen Zeitpunkt, wiederholt, auf ihren eigenen Telefonen zur Antwort aufgefordert
        werden. Vor Samply bedeutete das, drei wiederkehrenden Problemen zu begegnen.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", margin: "2.4rem 0 3.6rem" }}>
        {PROBLEMS_DE.map((p) => (
          <div
            key={p.n}
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "flex-start",
              background: "var(--surface)",
              border: "1px solid var(--ink-10)",
              borderRadius: "1rem",
              padding: "1.8rem 2rem",
            }}
          >
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              color: "var(--coral)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              flexShrink: 0,
              paddingTop: "0.2rem",
              width: "2.4rem",
            }}>
              {p.n}
            </span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
                {p.title}
              </div>
              <div style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.6 }}>
                {p.body}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p>
        Samply wurde entwickelt, um alle drei Hindernisse zu beseitigen: eine
        plattformübergreifende App, keine Einschränkungen beim Umfrageformat (Sie bringen
        Ihr eigenes Umfrage-Tool mit) und kostenlos nutzbar.
      </p>

      {/* ── Timeline ────────────────────────────────────────────────────── */}
      <h2>Entwicklungszeitplan</h2>
      <p>
        Die Entwicklung begann 2018 als Modul innerhalb von{" "}
        <a href="https://research.open-lab.online/" target="_blank" rel="noopener noreferrer">Open Lab</a>,
        einer Online-Experimentplattform. Es wuchs zu einem eigenständigen Projekt mit einer
        eigenen mobilen App, einem Web-Dashboard, einer REST-API und einer aktiven
        Forschungsgemeinschaft.
      </p>

      <div style={{ margin: "2.8rem 0 4rem", position: "relative" }}>
        {/* Vertical rail */}
        <div style={{
          position: "absolute",
          left: "10.4rem",
          top: "0.6rem",
          bottom: "0.6rem",
          width: "2px",
          background: "var(--ink-10)",
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {TIMELINE_DE.map((entry, i) => {
            const accentColor = entry.accent === "coral" ? "var(--coral)" : "var(--sage)";
            const accentBg = entry.accent === "coral" ? "var(--coral-soft)" : "var(--sage-soft)";
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0",
                  alignItems: "flex-start",
                  paddingBottom: i < TIMELINE_DE.length - 1 ? "2.8rem" : 0,
                }}
              >
                {/* Date label */}
                <div style={{
                  width: "10.4rem",
                  flexShrink: 0,
                  paddingRight: "2rem",
                  paddingTop: "0.15rem",
                  textAlign: "right",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: accentColor,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}>
                    {entry.date}
                  </span>
                </div>

                {/* Dot */}
                <div style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  borderRadius: "50%",
                  background: accentColor,
                  flexShrink: 0,
                  marginTop: "0.2rem",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: `0 0 0 3px var(--paper), 0 0 0 5px ${accentColor}22`,
                }} />

                {/* Content */}
                <div style={{ flex: 1, paddingLeft: "2rem" }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    marginBottom: "0.8rem",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}>
                      {entry.headline}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                      color: accentColor,
                      background: accentBg,
                      padding: "0.15rem 0.6rem",
                      borderRadius: "0.4rem",
                      letterSpacing: "0.04em",
                    }}>
                      {entry.date}
                    </span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                    {entry.items.map((item, j) => (
                      <li key={j} style={{
                        fontSize: "1.3rem",
                        color: "var(--ink-60)",
                        lineHeight: 1.65,
                        marginBottom: j < entry.items.length - 1 ? "0.4rem" : 0,
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Open source ─────────────────────────────────────────────────── */}
      <h2>Open Source und kostenlos</h2>
      <p>
        Seit 2020 wird Samply von der{" "}
        <a href="https://iscience.uni-konstanz.de/en/" target="_blank" rel="noopener noreferrer">iScience-Gruppe</a>{" "}
        an der University of Konstanz unterstützt. Der Hauptentwickler, Yury Shevchenko,
        ist dort als Post-Doktorand beschäftigt. Der Forschungsschwerpunkt der Gruppe auf
        internetbasierte Methoden und experience sampling prägt direkt Samplys Design und
        Funktionsprioritäten.
      </p>
      <p>
        Samply ist kostenlos nutzbar und Open Source. Der Quellcode für das Web-Dashboard
        ist auf <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noopener noreferrer">GitHub</a> verfügbar. Beiträge, Fehlermeldungen und Funktionswünsche sind willkommen.
      </p>
      <p>
        Wenn Sie Samply in Ihrer Forschung verwenden, zitieren Sie bitte die
        Originalpublikation:
      </p>
      <div style={{ background: "var(--coral-soft)", borderLeft: "3px solid var(--coral)", borderRadius: "0 0.8rem 0.8rem 0", padding: "1.4rem 1.6rem", margin: "0.4rem 0 0" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--coral)", marginBottom: "0.7rem" }}>Publication</div>
        <p style={{ margin: "0 0 0.8rem", fontSize: "1.3rem", lineHeight: 1.6, color: "var(--ink)", fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href="https://doi.org/10.3758/s13428-020-01527-9" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--coral)", wordBreak: "break-all" }}>
          https://doi.org/10.3758/s13428-020-01527-9
        </a>
      </div>
    </>
  );
}

function AboutContentRu() {
  return (
    <>
      <h2 style={{ marginTop: 0 }}>Почему существует Samply</h2>
      <p>
        Такие методы исследования, как опыт выборки, дневниковые исследования и экологическая
        моментальная оценка, имеют одно общее требование: участников нужно побуждать отвечать в
        нужный момент, неоднократно, на их собственных телефонах. До появления Samply это означало
        столкновение с тремя повторяющимися проблемами.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", margin: "2.4rem 0 3.6rem" }}>
        {PROBLEMS_RU.map((p) => (
          <div
            key={p.n}
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "flex-start",
              background: "var(--surface)",
              border: "1px solid var(--ink-10)",
              borderRadius: "1rem",
              padding: "1.8rem 2rem",
            }}
          >
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              color: "var(--coral)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              flexShrink: 0,
              paddingTop: "0.2rem",
              width: "2.4rem",
            }}>
              {p.n}
            </span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
                {p.title}
              </div>
              <div style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.6 }}>
                {p.body}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p>
        Samply был создан, чтобы устранить все три барьера: одно кросс-платформенное приложение,
        никаких ограничений по формату анкеты (вы используете свой собственный инструмент), и
        бесплатное использование.
      </p>

      <h2>История разработки</h2>
      <p>
        Разработка началась в 2018 году как модуль внутри{" "}
        <a href="https://research.open-lab.online/" target="_blank" rel="noopener noreferrer">Open Lab</a>,
        платформы для онлайн-экспериментов. Проект вырос в самостоятельное приложение с собственным
        мобильным приложением, веб-панелью, REST API и активным исследовательским сообществом.
      </p>

      <div style={{ margin: "2.8rem 0 4rem", position: "relative" }}>
        <div style={{
          position: "absolute",
          left: "10.4rem",
          top: "0.6rem",
          bottom: "0.6rem",
          width: "2px",
          background: "var(--ink-10)",
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {TIMELINE_RU.map((entry, i) => {
            const accentColor = entry.accent === "coral" ? "var(--coral)" : "var(--sage)";
            const accentBg = entry.accent === "coral" ? "var(--coral-soft)" : "var(--sage-soft)";
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0",
                  alignItems: "flex-start",
                  paddingBottom: i < TIMELINE_RU.length - 1 ? "2.8rem" : 0,
                }}
              >
                <div style={{
                  width: "10.4rem",
                  flexShrink: 0,
                  paddingRight: "2rem",
                  paddingTop: "0.15rem",
                  textAlign: "right",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: accentColor,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}>
                    {entry.date}
                  </span>
                </div>

                <div style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  borderRadius: "50%",
                  background: accentColor,
                  flexShrink: 0,
                  marginTop: "0.2rem",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: `0 0 0 3px var(--paper), 0 0 0 5px ${accentColor}22`,
                }} />

                <div style={{ flex: 1, paddingLeft: "2rem" }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    marginBottom: "0.8rem",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}>
                      {entry.headline}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                      color: accentColor,
                      background: accentBg,
                      padding: "0.15rem 0.6rem",
                      borderRadius: "0.4rem",
                      letterSpacing: "0.04em",
                    }}>
                      {entry.date}
                    </span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                    {entry.items.map((item, j) => (
                      <li key={j} style={{
                        fontSize: "1.3rem",
                        color: "var(--ink-60)",
                        lineHeight: 1.65,
                        marginBottom: j < entry.items.length - 1 ? "0.4rem" : 0,
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <h2>Открытый исходный код и бесплатно</h2>
      <p>
        С 2020 года Samply поддерживается{" "}
        <a href="https://iscience.uni-konstanz.de/en/" target="_blank" rel="noopener noreferrer">исследовательской группой iScience</a>{" "}
        Университета Констанца. Ведущий разработчик, Юрий Шевченко, работает там постдокторантом.
        Исследовательский фокус группы на интернет-методах и опыте выборки напрямую определяет дизайн
        и приоритеты функций Samply.
      </p>
      <p>
        Samply бесплатен и имеет открытый исходный код. Исходный код веб-панели доступен на{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noopener noreferrer">GitHub</a>.
        Вклад в разработку, отчёты об ошибках и запросы функций приветствуются.
      </p>
      <p>
        Если вы используете Samply в своих исследованиях, пожалуйста, цитируйте оригинальную публикацию:
      </p>
      <div style={{ background: "var(--coral-soft)", borderLeft: "3px solid var(--coral)", borderRadius: "0 0.8rem 0.8rem 0", padding: "1.4rem 1.6rem", margin: "0.4rem 0 0" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--coral)", marginBottom: "0.7rem" }}>Публикация</div>
        <p style={{ margin: "0 0 0.8rem", fontSize: "1.3rem", lineHeight: 1.6, color: "var(--ink)", fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href="https://doi.org/10.3758/s13428-020-01527-9" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--coral)", wordBreak: "break-all" }}>
          https://doi.org/10.3758/s13428-020-01527-9
        </a>
      </div>
    </>
  );
}

function AboutContentZh() {
  return (
    <>
      <h2 style={{ marginTop: 0 }}>为什么会有 Samply</h2>
      <p>
        经验采样、每日日记研究和生态瞬间评估等研究方法都有一个共同的要求：需要在正确的时刻，反复地在参与者自己的手机上提示他们作出回应。在 Samply 出现之前，这意味着要面对三个反复出现的问题。
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", margin: "2.4rem 0 3.6rem" }}>
        {PROBLEMS_ZH.map((p) => (
          <div
            key={p.n}
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "flex-start",
              background: "var(--surface)",
              border: "1px solid var(--ink-10)",
              borderRadius: "1rem",
              padding: "1.8rem 2rem",
            }}
          >
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              color: "var(--coral)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              flexShrink: 0,
              paddingTop: "0.2rem",
              width: "2.4rem",
            }}>
              {p.n}
            </span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
                {p.title}
              </div>
              <div style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.6 }}>
                {p.body}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p>
        Samply 的建立是为了消除这三个障碍：一款跨平台应用、不限制问卷格式（你使用自己的问卷工具），以及免费使用。
      </p>

      <h2>开发历程</h2>
      <p>
        开发始于 2018 年，最初作为{" "}
        <a href="https://research.open-lab.online/" target="_blank" rel="noopener noreferrer">Open Lab</a>
        （一个在线实验平台）的模块。它成长为一个独立项目，拥有自己的移动应用、网页控制台、REST API 和活跃的研究社区。
      </p>

      <div style={{ margin: "2.8rem 0 4rem", position: "relative" }}>
        <div style={{
          position: "absolute",
          left: "10.4rem",
          top: "0.6rem",
          bottom: "0.6rem",
          width: "2px",
          background: "var(--ink-10)",
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {TIMELINE_ZH.map((entry, i) => {
            const accentColor = entry.accent === "coral" ? "var(--coral)" : "var(--sage)";
            const accentBg = entry.accent === "coral" ? "var(--coral-soft)" : "var(--sage-soft)";
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0",
                  alignItems: "flex-start",
                  paddingBottom: i < TIMELINE_ZH.length - 1 ? "2.8rem" : 0,
                }}
              >
                <div style={{
                  width: "10.4rem",
                  flexShrink: 0,
                  paddingRight: "2rem",
                  paddingTop: "0.15rem",
                  textAlign: "right",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: accentColor,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}>
                    {entry.date}
                  </span>
                </div>

                <div style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  borderRadius: "50%",
                  background: accentColor,
                  flexShrink: 0,
                  marginTop: "0.2rem",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: `0 0 0 3px var(--paper), 0 0 0 5px ${accentColor}22`,
                }} />

                <div style={{ flex: 1, paddingLeft: "2rem" }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    marginBottom: "0.8rem",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}>
                      {entry.headline}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                      color: accentColor,
                      background: accentBg,
                      padding: "0.15rem 0.6rem",
                      borderRadius: "0.4rem",
                      letterSpacing: "0.04em",
                    }}>
                      {entry.date}
                    </span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                    {entry.items.map((item, j) => (
                      <li key={j} style={{
                        fontSize: "1.3rem",
                        color: "var(--ink-60)",
                        lineHeight: 1.65,
                        marginBottom: j < entry.items.length - 1 ? "0.4rem" : 0,
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <h2>开源且免费</h2>
      <p>
        自 2020 年以来，Samply 获得了康斯坦茨大学{" "}
        <a href="https://iscience.uni-konstanz.de/en/" target="_blank" rel="noopener noreferrer">iScience 研究组</a>
        的支持。首席开发者 Yury Shevchenko 在该校担任博士后研究员。该研究组专注于基于互联网的方法和经验采样，直接影响着 Samply 的设计方向和功能优先级。
      </p>
      <p>
        Samply 免费使用，开源发布。网页控制台的源代码可在{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noopener noreferrer">GitHub</a>
        上获取。欢迎贡献代码、提交错误报告和功能建议。
      </p>
      <p>
        如果您在研究中使用了 Samply，请引用原始发表文章：
      </p>
      <div style={{ background: "var(--coral-soft)", borderLeft: "3px solid var(--coral)", borderRadius: "0 0.8rem 0.8rem 0", padding: "1.4rem 1.6rem", margin: "0.4rem 0 0" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--coral)", marginBottom: "0.7rem" }}>发表文章</div>
        <p style={{ margin: "0 0 0.8rem", fontSize: "1.3rem", lineHeight: 1.6, color: "var(--ink)", fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href="https://doi.org/10.3758/s13428-020-01527-9" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--coral)", wordBreak: "break-all" }}>
          https://doi.org/10.3758/s13428-020-01527-9
        </a>
      </div>
    </>
  );
}

function AboutContentKo() {
  return (
    <>
      {/* ── Motivation ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Samply가 존재하는 이유</h2>
      <p>
        경험 표집, 일일 일기 연구, 생태 순간 평가와 같은 연구 방법들은 모두 하나의 공통된
        요건을 가지고 있습니다: 참여자들이 적절한 순간에 반복적으로 자신의 휴대폰에서 응답하도록
        안내받아야 합니다. Samply가 등장하기 전에는 이를 위해 세 가지 반복적인 문제에 직면해야
        했습니다.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", margin: "2.4rem 0 3.6rem" }}>
        {PROBLEMS_KO.map((p) => (
          <div
            key={p.n}
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "flex-start",
              background: "var(--surface)",
              border: "1px solid var(--ink-10)",
              borderRadius: "1rem",
              padding: "1.8rem 2rem",
            }}
          >
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              color: "var(--coral)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              flexShrink: 0,
              paddingTop: "0.2rem",
              width: "2.4rem",
            }}>
              {p.n}
            </span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
                {p.title}
              </div>
              <div style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.6 }}>
                {p.body}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p>
        Samply는 이 세 가지 장벽을 모두 제거하기 위해 구축되었습니다: 하나의 크로스 플랫폼 앱,
        설문 형식에 대한 제한 없음(자체 설문 도구를 사용할 수 있음), 그리고 무료 사용.
      </p>

      {/* ── Timeline ────────────────────────────────────────────────────── */}
      <h2>개발 연혁</h2>
      <p>
        개발은 2018년 온라인 실험 플랫폼인{" "}
        <a href="https://research.open-lab.online/" target="_blank" rel="noopener noreferrer">Open Lab</a>
        의 모듈로 시작되었습니다. 이후 자체 모바일 앱, 웹 대시보드, REST API, 그리고 활발한
        연구 커뮤니티를 갖춘 독립 프로젝트로 성장했습니다.
      </p>

      <div style={{ margin: "2.8rem 0 4rem", position: "relative" }}>
        {/* Vertical rail */}
        <div style={{
          position: "absolute",
          left: "10.4rem",
          top: "0.6rem",
          bottom: "0.6rem",
          width: "2px",
          background: "var(--ink-10)",
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {TIMELINE_KO.map((entry, i) => {
            const accentColor = entry.accent === "coral" ? "var(--coral)" : "var(--sage)";
            const accentBg = entry.accent === "coral" ? "var(--coral-soft)" : "var(--sage-soft)";
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0",
                  alignItems: "flex-start",
                  paddingBottom: i < TIMELINE_KO.length - 1 ? "2.8rem" : 0,
                }}
              >
                {/* Date label */}
                <div style={{
                  width: "10.4rem",
                  flexShrink: 0,
                  paddingRight: "2rem",
                  paddingTop: "0.15rem",
                  textAlign: "right",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: accentColor,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}>
                    {entry.date}
                  </span>
                </div>

                {/* Dot */}
                <div style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  borderRadius: "50%",
                  background: accentColor,
                  flexShrink: 0,
                  marginTop: "0.2rem",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: `0 0 0 3px var(--paper), 0 0 0 5px ${accentColor}22`,
                }} />

                {/* Content */}
                <div style={{ flex: 1, paddingLeft: "2rem" }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    marginBottom: "0.8rem",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}>
                      {entry.headline}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                      color: accentColor,
                      background: accentBg,
                      padding: "0.15rem 0.6rem",
                      borderRadius: "0.4rem",
                      letterSpacing: "0.04em",
                    }}>
                      {entry.date}
                    </span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                    {entry.items.map((item, j) => (
                      <li key={j} style={{
                        fontSize: "1.3rem",
                        color: "var(--ink-60)",
                        lineHeight: 1.65,
                        marginBottom: j < entry.items.length - 1 ? "0.4rem" : 0,
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Open source ─────────────────────────────────────────────────── */}
      <h2>오픈 소스 및 무료</h2>
      <p>
        2020년부터 Samply는 콘스탄츠 대학교의{" "}
        <a href="https://iscience.uni-konstanz.de/en/" target="_blank" rel="noopener noreferrer">iScience 그룹</a>
        의 지원을 받고 있습니다. 수석 개발자 Yury Shevchenko는 그곳에서 박사 후 연구원으로
        재직 중입니다. 인터넷 기반 방법과 경험 표집에 초점을 맞춘 그룹의 연구는 Samply의 설계와
        기능 우선순위를 직접적으로 형성합니다.
      </p>
      <p>
        Samply는 무료로 사용할 수 있으며 오픈 소스입니다. 웹 대시보드의 소스 코드는{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noopener noreferrer">GitHub</a>
        에서 이용할 수 있습니다. 기여, 버그 보고, 기능 요청을 환영합니다.
      </p>
      <p>
        연구에서 Samply를 사용하셨다면 원본 논문을 인용해 주시기 바랍니다:
      </p>
      <div style={{ background: "var(--coral-soft)", borderLeft: "3px solid var(--coral)", borderRadius: "0 0.8rem 0.8rem 0", padding: "1.4rem 1.6rem", margin: "0.4rem 0 0" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--coral)", marginBottom: "0.7rem" }}>논문</div>
        <p style={{ margin: "0 0 0.8rem", fontSize: "1.3rem", lineHeight: 1.6, color: "var(--ink)", fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href="https://doi.org/10.3758/s13428-020-01527-9" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--coral)", wordBreak: "break-all" }}>
          https://doi.org/10.3758/s13428-020-01527-9
        </a>
      </div>
    </>
  );
}

function AboutContentIt() {
  return (
    <>
      {/* ── Motivation ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Perché esiste Samply</h2>
      <p>
        I metodi di ricerca come l&apos;experience sampling, gli studi di diario quotidiano e la
        valutazione ecologica del momento condividono tutti un requisito fondamentale: i partecipanti
        devono essere sollecitati a rispondere al momento giusto, ripetutamente, sui propri telefoni.
        Prima di Samply, configurare questo sistema significava affrontare tre problemi ricorrenti.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", margin: "2.4rem 0 3.6rem" }}>
        {PROBLEMS_IT.map((p) => (
          <div
            key={p.n}
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "flex-start",
              background: "var(--surface)",
              border: "1px solid var(--ink-10)",
              borderRadius: "1rem",
              padding: "1.8rem 2rem",
            }}
          >
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              color: "var(--coral)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              flexShrink: 0,
              paddingTop: "0.2rem",
              width: "2.4rem",
            }}>
              {p.n}
            </span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
                {p.title}
              </div>
              <div style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.6 }}>
                {p.body}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p>
        Samply è stato sviluppato per rimuovere tutti e tre gli ostacoli: un&apos;unica app
        multipiattaforma, nessuna restrizione sul formato del sondaggio (si utilizza il proprio
        strumento di indagine) e utilizzo gratuito.
      </p>

      {/* ── Timeline ────────────────────────────────────────────────────── */}
      <h2>Cronologia di sviluppo</h2>
      <p>
        Lo sviluppo è iniziato nel 2018 come modulo all&apos;interno di{" "}
        <a href="https://research.open-lab.online/" target="_blank" rel="noopener noreferrer">Open Lab</a>,
        una piattaforma per esperimenti online. È cresciuto fino a diventare un progetto indipendente
        con una propria app mobile, un pannello di controllo web, una REST API e una comunità di
        ricerca attiva.
      </p>

      <div style={{ margin: "2.8rem 0 4rem", position: "relative" }}>
        {/* Vertical rail */}
        <div style={{
          position: "absolute",
          left: "10.4rem",
          top: "0.6rem",
          bottom: "0.6rem",
          width: "2px",
          background: "var(--ink-10)",
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {TIMELINE_IT.map((entry, i) => {
            const accentColor = entry.accent === "coral" ? "var(--coral)" : "var(--sage)";
            const accentBg = entry.accent === "coral" ? "var(--coral-soft)" : "var(--sage-soft)";
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0",
                  alignItems: "flex-start",
                  paddingBottom: i < TIMELINE_IT.length - 1 ? "2.8rem" : 0,
                }}
              >
                {/* Date label */}
                <div style={{
                  width: "10.4rem",
                  flexShrink: 0,
                  paddingRight: "2rem",
                  paddingTop: "0.15rem",
                  textAlign: "right",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: accentColor,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}>
                    {entry.date}
                  </span>
                </div>

                {/* Dot */}
                <div style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  borderRadius: "50%",
                  background: accentColor,
                  flexShrink: 0,
                  marginTop: "0.2rem",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: `0 0 0 3px var(--paper), 0 0 0 5px ${accentColor}22`,
                }} />

                {/* Content */}
                <div style={{ flex: 1, paddingLeft: "2rem" }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    marginBottom: "0.8rem",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}>
                      {entry.headline}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                      color: accentColor,
                      background: accentBg,
                      padding: "0.15rem 0.6rem",
                      borderRadius: "0.4rem",
                      letterSpacing: "0.04em",
                    }}>
                      {entry.date}
                    </span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                    {entry.items.map((item, j) => (
                      <li key={j} style={{
                        fontSize: "1.3rem",
                        color: "var(--ink-60)",
                        lineHeight: 1.65,
                        marginBottom: j < entry.items.length - 1 ? "0.4rem" : 0,
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Open source ─────────────────────────────────────────────────── */}
      <h2>Open source e gratuito</h2>
      <p>
        Dal 2020, Samply è sostenuto dal{" "}
        <a href="https://iscience.uni-konstanz.de/en/" target="_blank" rel="noopener noreferrer">gruppo iScience</a>{" "}
        dell&apos;Università di Costanza. Il lead developer, Yury Shevchenko, vi è impiegato come
        ricercatore post-dottorale. Il focus di ricerca del gruppo sui metodi basati su Internet e
        sull&apos;experience sampling influenza direttamente il design e le priorità delle funzionalità
        di Samply.
      </p>
      <p>
        Samply è gratuito e open source. Il codice sorgente del pannello di controllo web è
        disponibile su{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noopener noreferrer">GitHub</a>.
        Contributi, segnalazioni di bug e richieste di funzionalità sono benvenuti.
      </p>
      <p>
        Se si utilizza Samply nella propria ricerca, si prega di citare la pubblicazione originale:
      </p>
      <div style={{ background: "var(--coral-soft)", borderLeft: "3px solid var(--coral)", borderRadius: "0 0.8rem 0.8rem 0", padding: "1.4rem 1.6rem", margin: "0.4rem 0 0" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--coral)", marginBottom: "0.7rem" }}>Pubblicazione</div>
        <p style={{ margin: "0 0 0.8rem", fontSize: "1.3rem", lineHeight: 1.6, color: "var(--ink)", fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href="https://doi.org/10.3758/s13428-020-01527-9" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--coral)", wordBreak: "break-all" }}>
          https://doi.org/10.3758/s13428-020-01527-9
        </a>
      </div>
    </>
  );
}

const PROBLEMS_FR = [
  {
    n: "01",
    title: "Fragmentation des plateformes",
    body: "Développer une application mobile native pour une étude signifiait l'écrire deux fois — une fois en Java pour Android, une fois en Objective-C ou Swift pour iOS. De nombreux outils de recherche ne finissaient par prendre en charge qu'une seule plateforme.",
  },
  {
    n: "02",
    title: "Types de questions limités",
    body: "Les plateformes propriétaires proposent un ensemble fixe de formats de réponse. Les chercheurs devaient adapter la conception de leurs études à ce que le logiciel offrait, et non l'inverse.",
  },
  {
    n: "03",
    title: "Coût élevé",
    body: "Les frais de licence de certaines plateformes atteignaient environ 500 $ pour 50 participants. Cela mettait les études à mesures répétées hors de portée des équipes sans financement dédié.",
  },
];

const TIMELINE_FR: {
  date: string;
  headline: string;
  items: string[];
  accent?: "coral" | "sage";
}[] = [
  {
    date: "2018",
    headline: "Origines",
    items: [
      "Samply a débuté comme module de notification au sein d'Open Lab (open-lab.online), une plateforme pour la conduite d'expériences en ligne, conçue pour les chercheurs ayant besoin d'inviter des participants par notification push.",
      "Objectif : permettre à n'importe quel chercheur de planifier des notifications mobiles sans écrire de code natif d'application.",
    ],
    accent: "coral",
  },
  {
    date: "Mai 2020",
    headline: "Première application mobile",
    items: [
      "Première version publique de l'application mobile Samply Research publiée.",
      "Samply est soutenu par le groupe iScience de l'Université de Constance, où le développeur principal Yury Shevchenko est employé comme chercheur post-doctoral.",
      "Étude d'utilisabilité du site web menée.",
      "Premières études ESM sur la gestion du temps et le bien-être conduites sur la plateforme.",
    ],
    accent: "sage",
  },
  {
    date: "Décembre 2020",
    headline: "Publication",
    items: [
      "Samply décrit dans un article évalué par les pairs dans Behavior Research Methods (Shevchenko, Kuhlmann & Reips, 2021, BRM 53, 1710–1730).",
    ],
    accent: "coral",
  },
  {
    date: "Mai 2021",
    headline: "Géofencing",
    items: [
      "Fonctionnalité de géofencing ajoutée : les notifications sont déclenchées automatiquement lorsqu'un participant entre dans un lieu défini ou en sort.",
      "Étude d'utilisabilité de l'application mobile.",
    ],
    accent: "sage",
  },
  {
    date: "Décembre 2021",
    headline: "Maturité de la plateforme",
    items: [
      "Types d'études publiques et privées introduits.",
      "Prise en charge des fuseaux horaires dans la planification des notifications.",
      "Délai d'expiration pour les liens de notification.",
    ],
    accent: "sage",
  },
  {
    date: "Novembre 2022",
    headline: "API, localisation et nouvelles fonctionnalités",
    items: [
      "API Samply publiée — les chercheurs peuvent désormais envoyer des notifications basées sur des événements personnalisés externes provenant de leurs propres systèmes.",
      "Application mobile traduite en allemand, néerlandais, russe et chinois.",
      "Échantillonnage conditionné par les événements ajouté.",
      "Rappels et enregistrement de la complétion.",
      "Études ESM sur le travail hybride, le bien-être et un sondage quotidien sur le COVID menées.",
    ],
    accent: "coral",
  },
  {
    date: "Septembre 2023",
    headline: "Validation du géofencing",
    items: [
      "Étude de validation du géofencing achevée et publiée (Shevchenko & Reips, 2024, BRM 56, 6411–6439).",
      "Preuves empiriques sur le rayon optimal, la sensibilité iOS vs Android et les temps de résidence recommandés.",
    ],
    accent: "sage",
  },
  {
    date: "Avril 2024",
    headline: "Modification des calendriers",
    items: [
      "Les chercheurs peuvent désormais modifier les notifications déjà planifiées — une fonctionnalité longtemps demandée.",
      "Étude sur l'évaluation de la désinformation dans les actualités menée.",
    ],
    accent: "sage",
  },
  {
    date: "Avril 2026",
    headline: "Refonte",
    items: [
      "Refonte complète du tableau de bord web des chercheurs — reconstruit pour plus de clarté, avec une architecture de l'information plus épurée, une meilleure gestion des calendriers et un nouveau système de documentation.",
      "Application mobile Samply Research repensée en mettant l'accent sur la facilité d'utilisation et une expérience participant plus accueillante.",
      "Objectif : rendre Samply simple pour les chercheurs qui découvrent les méthodes d'échantillonnage d'expérience, tout en conservant toute la puissance disponible pour les utilisateurs avancés.",
    ],
    accent: "coral",
  },
];

function AboutContentFr() {
  return (
    <>
      {/* ── Motivation ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Pourquoi Samply existe</h2>
      <p>
        Les méthodes de recherche telles que l&apos;échantillonnage d&apos;expérience, les
        études de journal quotidien et l&apos;évaluation momentanée écologique partagent
        toutes une même exigence : les participants doivent être invités à répondre au bon
        moment, de manière répétée, sur leur propre téléphone. Avant Samply, mettre cela
        en place impliquait de se heurter à trois problèmes récurrents.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", margin: "2.4rem 0 3.6rem" }}>
        {PROBLEMS_FR.map((p) => (
          <div
            key={p.n}
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "flex-start",
              background: "var(--surface)",
              border: "1px solid var(--ink-10)",
              borderRadius: "1rem",
              padding: "1.8rem 2rem",
            }}
          >
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              color: "var(--coral)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              flexShrink: 0,
              paddingTop: "0.2rem",
              width: "2.4rem",
            }}>
              {p.n}
            </span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
                {p.title}
              </div>
              <div style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.6 }}>
                {p.body}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p>
        Samply a été conçu pour supprimer ces trois obstacles : une application
        multiplateforme, aucune restriction sur le format du sondage (vous apportez votre
        propre outil de sondage) et gratuit à l&apos;utilisation.
      </p>

      {/* ── Chronologie ──────────────────────────────────────────────────── */}
      <h2>Chronologie de développement</h2>
      <p>
        Le développement a démarré en 2018 comme module au sein d&apos;{" "}
        <a href="https://research.open-lab.online/" target="_blank" rel="noopener noreferrer">Open Lab</a>,
        une plateforme d&apos;expériences en ligne. Il a évolué pour devenir un projet
        indépendant avec sa propre application mobile, son tableau de bord web, une REST
        API et une communauté de recherche active.
      </p>

      <div style={{ margin: "2.8rem 0 4rem", position: "relative" }}>
        {/* Vertical rail */}
        <div style={{
          position: "absolute",
          left: "10.4rem",
          top: "0.6rem",
          bottom: "0.6rem",
          width: "2px",
          background: "var(--ink-10)",
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {TIMELINE_FR.map((entry, i) => {
            const accentColor = entry.accent === "coral" ? "var(--coral)" : "var(--sage)";
            const accentBg = entry.accent === "coral" ? "var(--coral-soft)" : "var(--sage-soft)";
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0",
                  alignItems: "flex-start",
                  paddingBottom: i < TIMELINE_FR.length - 1 ? "2.8rem" : 0,
                }}
              >
                {/* Date label */}
                <div style={{
                  width: "10.4rem",
                  flexShrink: 0,
                  paddingRight: "2rem",
                  paddingTop: "0.15rem",
                  textAlign: "right",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: accentColor,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}>
                    {entry.date}
                  </span>
                </div>

                {/* Dot */}
                <div style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  borderRadius: "50%",
                  background: accentColor,
                  flexShrink: 0,
                  marginTop: "0.2rem",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: `0 0 0 3px var(--paper), 0 0 0 5px ${accentColor}22`,
                }} />

                {/* Content */}
                <div style={{ flex: 1, paddingLeft: "2rem" }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    marginBottom: "0.8rem",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}>
                      {entry.headline}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                      color: accentColor,
                      background: accentBg,
                      padding: "0.15rem 0.6rem",
                      borderRadius: "0.4rem",
                      letterSpacing: "0.04em",
                    }}>
                      {entry.date}
                    </span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                    {entry.items.map((item, j) => (
                      <li key={j} style={{
                        fontSize: "1.3rem",
                        color: "var(--ink-60)",
                        lineHeight: 1.65,
                        marginBottom: j < entry.items.length - 1 ? "0.4rem" : 0,
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Open source ─────────────────────────────────────────────────── */}
      <h2>Open source et gratuit</h2>
      <p>
        Depuis 2020, Samply est soutenu par le{" "}
        <a href="https://iscience.uni-konstanz.de/en/" target="_blank" rel="noopener noreferrer">groupe iScience</a>{" "}
        de l&apos;Université de Constance. Le développeur principal, Yury Shevchenko, y est
        employé comme chercheur post-doctoral. L&apos;orientation de recherche du groupe sur
        les méthodes basées sur Internet et l&apos;échantillonnage d&apos;expérience façonne
        directement la conception et les priorités des fonctionnalités de Samply.
      </p>
      <p>
        Samply est gratuit et open source. Le code source du tableau de bord web est disponible sur{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noopener noreferrer">GitHub</a>.
        Les contributions, rapports de bogues et demandes de fonctionnalités sont les bienvenus.
      </p>
      <p>
        Si vous utilisez Samply dans votre recherche, veuillez citer la publication originale :
      </p>
      <div style={{ background: "var(--coral-soft)", borderLeft: "3px solid var(--coral)", borderRadius: "0 0.8rem 0.8rem 0", padding: "1.4rem 1.6rem", margin: "0.4rem 0 0" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--coral)", marginBottom: "0.7rem" }}>Publication</div>
        <p style={{ margin: "0 0 0.8rem", fontSize: "1.3rem", lineHeight: 1.6, color: "var(--ink)", fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href="https://doi.org/10.3758/s13428-020-01527-9" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--coral)", wordBreak: "break-all" }}>
          https://doi.org/10.3758/s13428-020-01527-9
        </a>
      </div>
    </>
  );
}

const PROBLEMS_ES = [
  {
    n: "01",
    title: "Fragmentación de plataformas",
    body: "Desarrollar una aplicación móvil nativa para un estudio significaba escribirla dos veces — una en Java para Android, otra en Objective-C o Swift para iOS. Muchas herramientas de investigación acababan soportando únicamente una plataforma.",
  },
  {
    n: "02",
    title: "Tipos de preguntas limitados",
    body: "Las plataformas propietarias ofrecen un conjunto fijo de formatos de respuesta. Los investigadores tenían que adaptar el diseño de sus estudios a lo que el software ofrecía, y no al revés.",
  },
  {
    n: "03",
    title: "Coste elevado",
    body: "Las tarifas de licencia de algunas plataformas alcanzaban unos 500 $ por 50 participantes. Esto dejaba los estudios de medidas repetidas fuera del alcance de los equipos sin financiación dedicada.",
  },
];

const TIMELINE_ES: {
  date: string;
  headline: string;
  items: string[];
  accent?: "coral" | "sage";
}[] = [
  {
    date: "2018",
    headline: "Orígenes",
    items: [
      "Samply comenzó como un módulo de notificaciones dentro de Open Lab (open-lab.online), una plataforma para realizar experimentos en línea, diseñada para investigadores que necesitaban avisar a los participantes mediante notificaciones push.",
      "Objetivo: permitir a cualquier investigador programar notificaciones móviles sin escribir código nativo de aplicación.",
    ],
    accent: "coral",
  },
  {
    date: "Mayo 2020",
    headline: "Primera aplicación móvil",
    items: [
      "Primera versión pública de la aplicación móvil Samply Research publicada.",
      "Samply recibe el apoyo del grupo iScience de la Universidad de Constanza, donde el desarrollador principal Yury Shevchenko trabaja como investigador postdoctoral.",
      "Estudio de usabilidad del sitio web realizado.",
      "Primeros estudios ESM sobre gestión del tiempo y bienestar realizados en la plataforma.",
    ],
    accent: "sage",
  },
  {
    date: "Diciembre 2020",
    headline: "Publicación",
    items: [
      "Samply descrito en un artículo revisado por pares en Behavior Research Methods (Shevchenko, Kuhlmann & Reips, 2021, BRM 53, 1710–1730).",
    ],
    accent: "coral",
  },
  {
    date: "Mayo 2021",
    headline: "Geofencing",
    items: [
      "Función de geofencing añadida: las notificaciones se activan automáticamente cuando un participante entra en una ubicación definida o la abandona.",
      "Estudio de usabilidad de la aplicación móvil.",
    ],
    accent: "sage",
  },
  {
    date: "Diciembre 2021",
    headline: "Madurez de la plataforma",
    items: [
      "Tipos de estudios públicos y privados introducidos.",
      "Compatibilidad con zonas horarias en la programación de notificaciones.",
      "Tiempo de expiración para los enlaces de notificación.",
    ],
    accent: "sage",
  },
  {
    date: "Noviembre 2022",
    headline: "API, localización y nuevas funcionalidades",
    items: [
      "API de Samply publicada — los investigadores pueden ahora enviar notificaciones basadas en eventos personalizados externos procedentes de sus propios sistemas.",
      "Aplicación móvil traducida al alemán, neerlandés, ruso y chino.",
      "Muestreo contingente a eventos añadido.",
      "Recordatorios y registro de finalización.",
      "Estudios ESM sobre trabajo híbrido, bienestar y una encuesta diaria sobre el COVID realizados.",
    ],
    accent: "coral",
  },
  {
    date: "Septiembre 2023",
    headline: "Validación del geofencing",
    items: [
      "Estudio de validación del geofencing completado y publicado (Shevchenko & Reips, 2024, BRM 56, 6411–6439).",
      "Evidencia empírica sobre el radio óptimo, la sensibilidad de iOS frente a Android y los tiempos de permanencia recomendados.",
    ],
    accent: "sage",
  },
  {
    date: "Abril 2024",
    headline: "Edición del calendario",
    items: [
      "Los investigadores pueden ahora editar notificaciones ya programadas — una funcionalidad largamente solicitada.",
      "Estudio sobre la evaluación de desinformación en noticias realizado.",
    ],
    accent: "sage",
  },
  {
    date: "Abril 2026",
    headline: "Rediseño",
    items: [
      "Rediseño completo del panel web para investigadores — reconstruido para mayor claridad, con una arquitectura de la información más limpia, una gestión de calendarios mejorada y un nuevo sistema de documentación.",
      "Aplicación móvil Samply Research rediseñada con foco en la usabilidad y una experiencia de participante más acogedora.",
      "Objetivo: hacer Samply sencillo para los investigadores que se acercan por primera vez a los métodos de muestreo de experiencias, manteniendo al mismo tiempo toda la potencia disponible para los usuarios avanzados.",
    ],
    accent: "coral",
  },
];

function AboutContentEs() {
  return (
    <>
      {/* ── Motivación ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Por qué existe Samply</h2>
      <p>
        Los métodos de investigación como el muestreo de experiencias, los estudios de
        diario diario y la evaluación momentánea ecológica comparten un mismo requisito:
        los participantes deben ser invitados a responder en el momento adecuado, de
        forma repetida, en sus propios teléfonos. Antes de Samply, ponerlo en marcha
        implicaba enfrentarse a tres problemas recurrentes.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", margin: "2.4rem 0 3.6rem" }}>
        {PROBLEMS_ES.map((p) => (
          <div
            key={p.n}
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "flex-start",
              background: "var(--surface)",
              border: "1px solid var(--ink-10)",
              borderRadius: "1rem",
              padding: "1.8rem 2rem",
            }}
          >
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              color: "var(--coral)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              flexShrink: 0,
              paddingTop: "0.2rem",
              width: "2.4rem",
            }}>
              {p.n}
            </span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
                {p.title}
              </div>
              <div style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.6 }}>
                {p.body}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p>
        Samply fue creado para eliminar los tres obstáculos: una aplicación
        multiplataforma, sin restricciones sobre el formato de la encuesta (traes tu
        propia herramienta de encuesta) y de uso gratuito.
      </p>

      {/* ── Cronología ──────────────────────────────────────────────────── */}
      <h2>Cronología de desarrollo</h2>
      <p>
        El desarrollo comenzó en 2018 como módulo dentro de{" "}
        <a href="https://research.open-lab.online/" target="_blank" rel="noopener noreferrer">Open Lab</a>,
        una plataforma de experimentos en línea. Evolucionó hasta convertirse en un
        proyecto independiente con su propia aplicación móvil, panel web, REST API y
        una comunidad de investigación activa.
      </p>

      <div style={{ margin: "2.8rem 0 4rem", position: "relative" }}>
        {/* Vertical rail */}
        <div style={{
          position: "absolute",
          left: "10.4rem",
          top: "0.6rem",
          bottom: "0.6rem",
          width: "2px",
          background: "var(--ink-10)",
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {TIMELINE_ES.map((entry, i) => {
            const accentColor = entry.accent === "coral" ? "var(--coral)" : "var(--sage)";
            const accentBg = entry.accent === "coral" ? "var(--coral-soft)" : "var(--sage-soft)";
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0",
                  alignItems: "flex-start",
                  paddingBottom: i < TIMELINE_ES.length - 1 ? "2.8rem" : 0,
                }}
              >
                {/* Date label */}
                <div style={{
                  width: "10.4rem",
                  flexShrink: 0,
                  paddingRight: "2rem",
                  paddingTop: "0.15rem",
                  textAlign: "right",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: accentColor,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}>
                    {entry.date}
                  </span>
                </div>

                {/* Dot */}
                <div style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  borderRadius: "50%",
                  background: accentColor,
                  flexShrink: 0,
                  marginTop: "0.2rem",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: `0 0 0 3px var(--paper), 0 0 0 5px ${accentColor}22`,
                }} />

                {/* Content */}
                <div style={{ flex: 1, paddingLeft: "2rem" }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    marginBottom: "0.8rem",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}>
                      {entry.headline}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                      color: accentColor,
                      background: accentBg,
                      padding: "0.15rem 0.6rem",
                      borderRadius: "0.4rem",
                      letterSpacing: "0.04em",
                    }}>
                      {entry.date}
                    </span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                    {entry.items.map((item, j) => (
                      <li key={j} style={{
                        fontSize: "1.3rem",
                        color: "var(--ink-60)",
                        lineHeight: 1.65,
                        marginBottom: j < entry.items.length - 1 ? "0.4rem" : 0,
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Código abierto ──────────────────────────────────────────────── */}
      <h2>Código abierto y gratuito</h2>
      <p>
        Desde 2020, Samply cuenta con el apoyo del{" "}
        <a href="https://iscience.uni-konstanz.de/en/" target="_blank" rel="noopener noreferrer">grupo iScience</a>{" "}
        de la Universidad de Constanza. El desarrollador principal, Yury Shevchenko, está
        empleado allí como investigador postdoctoral. El enfoque de investigación del grupo
        en métodos basados en Internet y el muestreo de experiencias influye directamente
        en el diseño y las prioridades de funcionalidades de Samply.
      </p>
      <p>
        Samply es gratuito y de código abierto. El código fuente del panel web está disponible en{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noopener noreferrer">GitHub</a>.
        Las contribuciones, informes de errores y solicitudes de funcionalidades son bienvenidos.
      </p>
      <p>
        Si utilizas Samply en tu investigación, cita la publicación original:
      </p>
      <div style={{ background: "var(--coral-soft)", borderLeft: "3px solid var(--coral)", borderRadius: "0 0.8rem 0.8rem 0", padding: "1.4rem 1.6rem", margin: "0.4rem 0 0" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--coral)", marginBottom: "0.7rem" }}>Publicación</div>
        <p style={{ margin: "0 0 0.8rem", fontSize: "1.3rem", lineHeight: 1.6, color: "var(--ink)", fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href="https://doi.org/10.3758/s13428-020-01527-9" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--coral)", wordBreak: "break-all" }}>
          https://doi.org/10.3758/s13428-020-01527-9
        </a>
      </div>
    </>
  );
}

const PROBLEMS_PT = [
  {
    n: "01",
    title: "Fragmentação de plataformas",
    body: "Desenvolver um aplicativo móvel nativo para um estudo significava escrevê-lo duas vezes — uma em Java para Android, outra em Objective-C ou Swift para iOS. Muitas ferramentas de pesquisa acabavam suportando apenas uma plataforma.",
  },
  {
    n: "02",
    title: "Tipos de perguntas limitados",
    body: "As plataformas proprietárias oferecem um conjunto fixo de formatos de resposta. Os pesquisadores precisavam adaptar o design de seus estudos ao que o software oferecia, e não o contrário.",
  },
  {
    n: "03",
    title: "Custo elevado",
    body: "As taxas de licença de algumas plataformas chegavam a cerca de US$ 500 para 50 participantes. Isso colocava os estudos de medidas repetidas fora do alcance das equipes sem financiamento dedicado.",
  },
];

const TIMELINE_PT: {
  date: string;
  headline: string;
  items: string[];
  accent?: "coral" | "sage";
}[] = [
  {
    date: "2018",
    headline: "Origens",
    items: [
      "O Samply começou como um módulo de notificações dentro do Open Lab (open-lab.online), uma plataforma para realização de experimentos online, desenvolvida para pesquisadores que precisavam notificar participantes por meio de notificações push.",
      "Objetivo: permitir que qualquer pesquisador agende notificações móveis sem precisar escrever código nativo de aplicativo.",
    ],
    accent: "coral",
  },
  {
    date: "Maio 2020",
    headline: "Primeiro aplicativo móvel",
    items: [
      "Primeira versão pública do aplicativo móvel Samply Research lançada.",
      "O Samply passa a contar com o apoio do grupo iScience da Universidade de Konstanz, onde o desenvolvedor principal Yury Shevchenko atua como pesquisador de pós-doutorado.",
      "Estudo de usabilidade do site realizado.",
      "Primeiros estudos ESM sobre gestão do tempo e bem-estar realizados na plataforma.",
    ],
    accent: "sage",
  },
  {
    date: "Dezembro 2020",
    headline: "Publicação",
    items: [
      "Samply descrito em um artigo revisado por pares em Behavior Research Methods (Shevchenko, Kuhlmann & Reips, 2021, BRM 53, 1710–1730).",
    ],
    accent: "coral",
  },
  {
    date: "Maio 2021",
    headline: "Geofencing",
    items: [
      "Recurso de geofencing adicionado: notificações disparadas automaticamente quando um participante entra ou sai de um local definido.",
      "Estudo de usabilidade do aplicativo móvel.",
    ],
    accent: "sage",
  },
  {
    date: "Dezembro 2021",
    headline: "Maturidade da plataforma",
    items: [
      "Tipos de estudo públicos e privados introduzidos.",
      "Suporte a fusos horários no agendamento de notificações.",
      "Tempo de expiração para links de notificação.",
    ],
    accent: "sage",
  },
  {
    date: "Novembro 2022",
    headline: "API, localização e novos recursos",
    items: [
      "API do Samply lançada — os pesquisadores agora podem enviar notificações com base em eventos personalizados externos de seus próprios sistemas.",
      "Aplicativo móvel traduzido para alemão, holandês, russo e chinês.",
      "Amostragem contingente a eventos adicionada.",
      "Lembretes e registro de conclusão.",
      "Estudos ESM sobre trabalho híbrido, bem-estar e uma pesquisa diária sobre a COVID realizados.",
    ],
    accent: "coral",
  },
  {
    date: "Setembro 2023",
    headline: "Validação do geofencing",
    items: [
      "Estudo de validação do geofencing concluído e publicado (Shevchenko & Reips, 2024, BRM 56, 6411–6439).",
      "Evidências empíricas sobre o raio ideal, sensibilidade do iOS em relação ao Android e tempos de permanência recomendados.",
    ],
    accent: "sage",
  },
  {
    date: "Abril 2024",
    headline: "Edição do calendário",
    items: [
      "Os pesquisadores agora podem editar notificações já agendadas — um recurso muito solicitado.",
      "Estudo sobre avaliação de desinformação em notícias realizado.",
    ],
    accent: "sage",
  },
  {
    date: "Abril 2026",
    headline: "Redesign",
    items: [
      "Redesign completo do painel web para pesquisadores — reconstruído para maior clareza, com uma arquitetura de informação mais limpa, melhor gerenciamento de calendários e um novo sistema de documentação.",
      "Aplicativo móvel Samply Research redesenhado com foco em usabilidade e uma experiência mais acolhedora para os participantes.",
      "Objetivo: tornar o Samply simples para pesquisadores que estão conhecendo os métodos de amostragem de experiência pela primeira vez, mantendo toda a potência disponível para usuários avançados.",
    ],
    accent: "coral",
  },
];

function AboutContentPt() {
  return (
    <>
      {/* ── Motivação ───────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Por que o Samply existe</h2>
      <p>
        Métodos de pesquisa como amostragem de experiência, estudos de diário diário e
        avaliação momentânea ecológica compartilham um mesmo requisito: os participantes
        devem ser solicitados a responder no momento certo, repetidamente, em seus próprios
        telefones. Antes do Samply, colocar isso em prática significava enfrentar três
        problemas recorrentes.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", margin: "2.4rem 0 3.6rem" }}>
        {PROBLEMS_PT.map((p) => (
          <div
            key={p.n}
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "flex-start",
              background: "var(--surface)",
              border: "1px solid var(--ink-10)",
              borderRadius: "1rem",
              padding: "1.8rem 2rem",
            }}
          >
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              color: "var(--coral)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              flexShrink: 0,
              paddingTop: "0.2rem",
              width: "2.4rem",
            }}>
              {p.n}
            </span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
                {p.title}
              </div>
              <div style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.6 }}>
                {p.body}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p>
        O Samply foi criado para eliminar os três obstáculos: um aplicativo multiplataforma,
        sem restrições sobre o formato da pesquisa (você traz sua própria ferramenta de
        pesquisa) e de uso gratuito.
      </p>

      {/* ── Linha do tempo ──────────────────────────────────────────────── */}
      <h2>Linha do tempo de desenvolvimento</h2>
      <p>
        O desenvolvimento começou em 2018 como um módulo dentro do{" "}
        <a href="https://research.open-lab.online/" target="_blank" rel="noopener noreferrer">Open Lab</a>,
        uma plataforma de experimentos online. Cresceu até se tornar um projeto independente
        com seu próprio aplicativo móvel, painel web, REST API e uma comunidade de pesquisa ativa.
      </p>

      <div style={{ margin: "2.8rem 0 4rem", position: "relative" }}>
        {/* Vertical rail */}
        <div style={{
          position: "absolute",
          left: "10.4rem",
          top: "0.6rem",
          bottom: "0.6rem",
          width: "2px",
          background: "var(--ink-10)",
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {TIMELINE_PT.map((entry, i) => {
            const accentColor = entry.accent === "coral" ? "var(--coral)" : "var(--sage)";
            const accentBg = entry.accent === "coral" ? "var(--coral-soft)" : "var(--sage-soft)";
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0",
                  alignItems: "flex-start",
                  paddingBottom: i < TIMELINE_PT.length - 1 ? "2.8rem" : 0,
                }}
              >
                {/* Date label */}
                <div style={{
                  width: "10.4rem",
                  flexShrink: 0,
                  paddingRight: "2rem",
                  paddingTop: "0.15rem",
                  textAlign: "right",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: accentColor,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}>
                    {entry.date}
                  </span>
                </div>

                {/* Dot */}
                <div style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  borderRadius: "50%",
                  background: accentColor,
                  flexShrink: 0,
                  marginTop: "0.2rem",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: `0 0 0 3px var(--paper), 0 0 0 5px ${accentColor}22`,
                }} />

                {/* Content */}
                <div style={{ flex: 1, paddingLeft: "2rem" }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    marginBottom: "0.8rem",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}>
                      {entry.headline}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                      color: accentColor,
                      background: accentBg,
                      padding: "0.15rem 0.6rem",
                      borderRadius: "0.4rem",
                      letterSpacing: "0.04em",
                    }}>
                      {entry.date}
                    </span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                    {entry.items.map((item, j) => (
                      <li key={j} style={{
                        fontSize: "1.3rem",
                        color: "var(--ink-60)",
                        lineHeight: 1.65,
                        marginBottom: j < entry.items.length - 1 ? "0.4rem" : 0,
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Código aberto ───────────────────────────────────────────────── */}
      <h2>Código aberto e gratuito</h2>
      <p>
        Desde 2020, o Samply conta com o apoio do{" "}
        <a href="https://iscience.uni-konstanz.de/en/" target="_blank" rel="noopener noreferrer">grupo iScience</a>{" "}
        da Universidade de Konstanz. O desenvolvedor principal, Yury Shevchenko, trabalha lá
        como pesquisador de pós-doutorado. O foco de pesquisa do grupo em métodos baseados
        na internet e amostragem de experiência influencia diretamente o design e as
        prioridades de funcionalidades do Samply.
      </p>
      <p>
        O Samply é gratuito e de código aberto. O código-fonte do painel web está disponível no{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noopener noreferrer">GitHub</a>.
        Contribuições, relatórios de erros e solicitações de funcionalidades são bem-vindos.
      </p>
      <p>
        Se você usar o Samply em sua pesquisa, cite a publicação original:
      </p>
      <div style={{ background: "var(--coral-soft)", borderLeft: "3px solid var(--coral)", borderRadius: "0 0.8rem 0.8rem 0", padding: "1.4rem 1.6rem", margin: "0.4rem 0 0" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--coral)", marginBottom: "0.7rem" }}>Publicação</div>
        <p style={{ margin: "0 0 0.8rem", fontSize: "1.3rem", lineHeight: 1.6, color: "var(--ink)", fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href="https://doi.org/10.3758/s13428-020-01527-9" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--coral)", wordBreak: "break-all" }}>
          https://doi.org/10.3758/s13428-020-01527-9
        </a>
      </div>
    </>
  );
}
