const whatsappNumber = "972534307685";

const translations = {
  he: {
    dir: "rtl",
    lang: "he",
    title: "אוטוליד | אוטומציות שמחזירות לידים",
    description:
      "מערכות אוטומציה לעסקים קטנים: מענה מהיר ללידים, מעקב הצעות מחיר, תזכורות וואטסאפ ודשבורד מכירות פשוט.",
    brand: "אוטוליד",
    navService: "השירות",
    navDemo: "דמו",
    navPackages: "חבילות",
    navProcess: "תהליך",
    navContact: "דברו איתי",
    themeDark: "מצב לילה",
    themeLight: "מצב יום",
    headerAction: "אבחון חינם",
    appAction: "פתח אפליקציה",
    eyebrow: "אוטומציות לעסקים שמקבלים לידים",
    heroLine1: "מערכת חכמה",
    heroLine2: "שמחזירה לידים",
    heroLine3: "לעסקאות",
    heroCopy:
      "בנייה מהירה של מערכת שמסדרת פניות, שולחת מעקבים בוואטסאפ, מזכירה על הצעות מחיר פתוחות, ומראה לבעל העסק איפה כסף נופל בדרך.",
    heroApp: "פתח את האפליקציה",
    heroPrimary: "בדיקת התאמה",
    heroWhatsapp: "וואטסאפ",
    metric1Title: "7 ימים",
    metric1Text: "עד מערכת ראשונה",
    metric2Title: "24/7",
    metric2Text: "מעקב אחרי לידים",
    metric3Title: "בלי כאב ראש",
    metric3Text: "חיבור לכלים קיימים",
    audiences: ["שיפוצים", "מיזוג", "קליניקות", "תיווך", "קוסמטיקה", "חנויות אונליין"],
    serviceKicker: "מה מקבלים",
    serviceTitle: "מכונת מעקב פשוטה שמכניסה סדר למכירות",
    serviceCopy:
      "השירות נבנה סביב הפעילות שכבר קיימת בעסק: וואטסאפ, טפסים, גיליון לידים, יומן, הצעות מחיר וחשבוניות. במקום עוד תוכנה מסובכת, מקבלים תהליך שעובד.",
    features: [
      ["תגובה מהירה לליד", "הודעת פתיחה, שאלות סינון וקביעת שיחה בלי לחכות לזמן פנוי."],
      ["מעקב הצעות מחיר", "תזכורות אוטומטיות להצעות פתוחות כדי שלא ייעלמו באמצע הדרך."],
      ["תזכורות תשלום", "סגירת קצוות מול לקוחות קיימים, חשבוניות ותשלומים שלא נסגרו."],
      ["דשבורד מכירות", "תמונה יומית פשוטה: כמה נכנס, כמה חזרו אליהם, כמה נסגר."],
    ],
    demoKicker: "דמו מערכת",
    demoTitle: "כך נראה סדר אמיתי בעסק שמקבל לידים כל יום",
    demoCopy:
      "זה לא עוד אתר תדמית. זו מערכת עבודה פשוטה שהלקוח פותח בבוקר ורואה מה חדש, למי צריך לחזור, אילו הצעות פתוחות, ומה עומד להיסגר.",
    demoLogo: "AutoLead CRM",
    demoMenu: ["דשבורד", "כל הלידים", "מעקב טיפול", "אנליטיקה"],
    demoDashboardTitle: "דשבורד לידים",
    demoUpdated: "עודכן היום, 09:42",
    demoAudit: "בדיקת פוטנציאל",
    demoStats: [
      ["לידים חדשים", "8"],
      ["בטיפול", "5"],
      ["הצעות פתוחות", "12"],
      ["נסגרו החודש", "4"],
    ],
    demoLeadsTitle: "לידים אחרונים",
    demoSeeAll: "צפה בהכל",
    demoLeads: [
      ["ישראל ישראלי", "052-1234567", "נשלחה הצעה"],
      ["שרה כהן", "050-9876543", "ליד חדש"],
      ["משה אביב", "054-5554433", "ממתין למענה"],
    ],
    demoFollowTitle: "מעקב להיום",
    demoUrgentCount: "2 דחופים",
    demoFollow: [
      ["דוד לוי", "חזרה לגבי תיקון מזגן מיני מרכזי", "התקשר עכשיו"],
      ["רחל גבאי", "אישור הצעת מחיר להתקנה חדשה", "פרטים"],
    ],
    demoPipeline: [
      ["חדש", "8"],
      ["שיחה", "5"],
      ["הצעה", "12"],
      ["מעקב", "6"],
      ["נסגר", "4"],
    ],
    outcomeKicker: "התוצאה",
    outcomeTitle: "פחות פניות שמתפספסות, יותר עסקאות שמגיעות לשיחה",
    beforeTitle: "לפני",
    beforeText: "לידים מפוזרים בוואטסאפ, הצעות מחיר בלי מעקב, ובעל עסק שמנסה לזכור הכל.",
    afterTitle: "אחרי",
    afterText: "כל ליד נכנס לרשימה, מקבל תגובה, מקבל מעקב, ונמצא מול העיניים עד סגירה.",
    packagesKicker: "חבילות",
    packagesTitle: "מתחילים קטן, משפרים מהר",
    monthly: ["לחודש, ללא התקנה", "לחודש, ללא התקנה", "לחודש, ללא התקנה"],
    recommended: "מומלץ",
    packageItems: [
      ["טופס לידים וחיבור לגיליון", "הודעת וואטסאפ ראשונה", "מעקב סטטוסים בסיסי", "שיחת הדרכה אחת"],
      ["כל מה שב־Starter", "מעקב הצעות מחיר אוטומטי", "תזכורות פגישה ותשלום", "דשבורד מכירות יומי"],
      ["תהליכים לפי צוותים", "חיבור CRM וכלי חשבוניות", "דוחות מתקדמים", "שיפורים חודשיים קבועים"],
    ],
    processKicker: "איך זה עובד",
    processTitle: "תהליך קצר בלי בירוקרטיה",
    steps: [
      ["אבחון", "בודקים מאיפה מגיעים לידים ואיפה הם נתקעים."],
      ["בנייה", "מחברים טפסים, וואטסאפ, גיליון, יומן וכלי עבודה קיימים."],
      ["השקה", "מפעילים, בודקים, ומכוונים את ההודעות לפי תגובות אמיתיות."],
    ],
    contactKicker: "מתחילים",
    contactTitle: "רוצה שאבדוק איפה העסק מאבד לידים?",
    contactCopy:
      "מלא פרטים קצרים. ההודעה תיפתח לך מוכנה לשליחה בוואטסאפ עם כל הפרטים שצריך כדי להתחיל שיחה.",
    labels: ["שם מלא", "תחום העסק", "טלפון", "מה הכי דחוף לשפר?"],
    businessPlaceholder: "לדוגמה: מיזוג, קליניקה, תיווך",
    goalOptions: [
      "בחרו אפשרות",
      "תגובה מהירה ללידים",
      "מעקב אחרי הצעות מחיר",
      "תזכורות תשלום ופגישות",
      "דשבורד וניהול מכירות",
    ],
    formButton: "פתח הודעת וואטסאפ",
    formNote: "",
    footer: "אוטומציות לידים ומכירות לעסקים קטנים",
    whatsappDefault: "היי, אני רוצה לבדוק התאמה למערכת אוטומציה ללידים ומכירות.",
    whatsappIntro: "היי, אשמח לבדוק התאמה למערכת אוטומציה.",
    whatsappFields: ["שם", "תחום העסק", "טלפון", "מה דחוף לשפר"],
  },
  en: {
    dir: "ltr",
    lang: "en",
    title: "Autolead | Lead automation for small businesses",
    description:
      "Automation systems for small businesses: fast lead response, quote follow-up, WhatsApp reminders, and a simple sales dashboard.",
    brand: "Autolead",
    navService: "Service",
    navDemo: "Demo",
    navPackages: "Packages",
    navProcess: "Process",
    navContact: "Contact",
    themeDark: "Dark mode",
    themeLight: "Light mode",
    headerAction: "Free audit",
    appAction: "Open app",
    eyebrow: "Automation for businesses that receive leads",
    heroLine1: "Smart System",
    heroLine2: "That Brings Leads",
    heroLine3: "Back to Deals",
    heroCopy:
      "A fast setup that organizes inquiries, sends WhatsApp follow-ups, reminds customers about open quotes, and shows where money is being lost.",
    heroApp: "Open the App",
    heroPrimary: "Check Fit",
    heroWhatsapp: "WhatsApp",
    metric1Title: "7 days",
    metric1Text: "To first system",
    metric2Title: "24/7",
    metric2Text: "Lead follow-up",
    metric3Title: "No headache",
    metric3Text: "Connects to existing tools",
    audiences: ["Renovations", "HVAC", "Clinics", "Real estate", "Beauty", "Online stores"],
    serviceKicker: "What you get",
    serviceTitle: "A simple follow-up machine that brings order to sales",
    serviceCopy:
      "The service is built around the tools already used in the business: WhatsApp, forms, lead sheets, calendar, quotes, and invoices. Instead of another complicated app, you get a process that works.",
    features: [
      ["Fast lead response", "Opening message, filtering questions, and call scheduling without waiting for free time."],
      ["Quote follow-up", "Automatic reminders for open quotes so they do not disappear halfway."],
      ["Payment reminders", "Close loose ends with existing customers, invoices, and unpaid balances."],
      ["Sales dashboard", "A simple daily view: what came in, who was contacted, and what closed."],
    ],
    demoKicker: "System demo",
    demoTitle: "What real order looks like in a business that receives leads daily",
    demoCopy:
      "This is not just a marketing website. It is a simple work system the customer opens every morning to see what is new, who needs follow-up, which quotes are open, and what is close to closing.",
    demoLogo: "AutoLead CRM",
    demoMenu: ["Dashboard", "All leads", "Follow-up", "Analytics"],
    demoDashboardTitle: "Lead dashboard",
    demoUpdated: "Updated today, 09:42",
    demoAudit: "Potential check",
    demoStats: [
      ["New leads", "8"],
      ["In progress", "5"],
      ["Open quotes", "12"],
      ["Closed this month", "4"],
    ],
    demoLeadsTitle: "Recent leads",
    demoSeeAll: "View all",
    demoLeads: [
      ["Israel Israeli", "052-1234567", "Quote sent"],
      ["Sarah Cohen", "050-9876543", "New lead"],
      ["Moshe Aviv", "054-5554433", "Waiting for reply"],
    ],
    demoFollowTitle: "Today's follow-up",
    demoUrgentCount: "2 urgent",
    demoFollow: [
      ["David Levi", "Follow up about central AC repair", "Call now"],
      ["Rachel Gabai", "Approve quote for new installation", "Details"],
    ],
    demoPipeline: [
      ["New", "8"],
      ["Call", "5"],
      ["Quote", "12"],
      ["Follow-up", "6"],
      ["Closed", "4"],
    ],
    outcomeKicker: "Outcome",
    outcomeTitle: "Fewer missed inquiries, more deals reaching a real conversation",
    beforeTitle: "Before",
    beforeText: "Leads scattered across WhatsApp, quotes without follow-up, and a business owner trying to remember everything.",
    afterTitle: "After",
    afterText: "Every lead enters a list, gets a response, gets follow-up, and stays visible until closing.",
    packagesKicker: "Packages",
    packagesTitle: "Start small, improve fast",
    monthly: ["/ month, no setup", "/ month, no setup", "/ month, no setup"],
    recommended: "Recommended",
    packageItems: [
      ["Lead form and sheet connection", "First WhatsApp message", "Basic status tracking", "One training call"],
      ["Everything in Starter", "Automatic quote follow-up", "Meeting and payment reminders", "Daily sales dashboard"],
      ["Team-based workflows", "CRM and invoice tool connection", "Advanced reports", "Monthly improvements"],
    ],
    processKicker: "How it works",
    processTitle: "A short process without bureaucracy",
    steps: [
      ["Audit", "We check where leads come from and where they get stuck."],
      ["Build", "We connect forms, WhatsApp, sheets, calendar, and existing work tools."],
      ["Launch", "We activate, test, and tune messages based on real responses."],
    ],
    contactKicker: "Start",
    contactTitle: "Want me to check where your business loses leads?",
    contactCopy:
      "Fill in a few details. A ready WhatsApp message will open with everything needed to start the conversation.",
    labels: ["Full name", "Business field", "Phone", "What is most urgent to improve?"],
    businessPlaceholder: "Example: HVAC, clinic, real estate",
    goalOptions: [
      "Choose an option",
      "Fast lead response",
      "Quote follow-up",
      "Payment and meeting reminders",
      "Sales dashboard and management",
    ],
    formButton: "Open WhatsApp message",
    formNote: "",
    footer: "Lead and sales automation for small businesses",
    whatsappDefault: "Hi, I want to check fit for a lead and sales automation system.",
    whatsappIntro: "Hi, I would like to check fit for an automation system.",
    whatsappFields: ["Name", "Business field", "Phone", "Most urgent improvement"],
  },
  ru: {
    dir: "ltr",
    lang: "ru",
    title: "Autolead | Автоматизация лидов для малого бизнеса",
    description:
      "Системы автоматизации для малого бизнеса: быстрый ответ лидам, контроль коммерческих предложений, напоминания в WhatsApp и простой дашборд продаж.",
    brand: "Autolead",
    navService: "Услуга",
    navDemo: "Демо",
    navPackages: "Пакеты",
    navProcess: "Процесс",
    navContact: "Контакт",
    themeDark: "Темная тема",
    themeLight: "Светлая тема",
    headerAction: "Бесплатный аудит",
    appAction: "Открыть приложение",
    eyebrow: "Автоматизация для бизнесов, которые получают лиды",
    heroLine1: "Умная система",
    heroLine2: "которая возвращает",
    heroLine3: "лидов в сделки",
    heroCopy:
      "Быстрая настройка системы, которая упорядочивает заявки, отправляет напоминания в WhatsApp, следит за открытыми предложениями и показывает, где теряются деньги.",
    heroApp: "Открыть приложение",
    heroPrimary: "Проверить",
    heroWhatsapp: "WhatsApp",
    metric1Title: "7 дней",
    metric1Text: "До первой системы",
    metric2Title: "24/7",
    metric2Text: "Контроль лидов",
    metric3Title: "Без головной боли",
    metric3Text: "Подключение к вашим инструментам",
    audiences: ["Ремонт", "Кондиционеры", "Клиники", "Недвижимость", "Косметология", "Онлайн-магазины"],
    serviceKicker: "Что вы получаете",
    serviceTitle: "Простая система контроля, которая наводит порядок в продажах",
    serviceCopy:
      "Услуга строится вокруг того, чем бизнес уже пользуется: WhatsApp, формы, таблицы лидов, календарь, предложения и счета. Вместо еще одной сложной программы вы получаете рабочий процесс.",
    features: [
      ["Быстрый ответ лиду", "Первое сообщение, вопросы для отбора и назначение звонка без ожидания свободного времени."],
      ["Контроль предложений", "Автоматические напоминания по открытым предложениям, чтобы они не пропадали."],
      ["Напоминания об оплате", "Закрытие незавершенных вопросов с клиентами, счетами и оплатами."],
      ["Дашборд продаж", "Простая ежедневная картина: что пришло, кому ответили и что закрыто."],
    ],
    demoKicker: "Демо системы",
    demoTitle: "Так выглядит порядок в бизнесе, который каждый день получает лиды",
    demoCopy:
      "Это не просто сайт. Это рабочая система, которую клиент открывает утром и видит новые заявки, кому нужно вернуться, какие предложения открыты и что близко к закрытию.",
    demoLogo: "AutoLead CRM",
    demoMenu: ["Дашборд", "Все лиды", "Follow-up", "Аналитика"],
    demoDashboardTitle: "Дашборд лидов",
    demoUpdated: "Обновлено сегодня, 09:42",
    demoAudit: "Проверка потенциала",
    demoStats: [
      ["Новые лиды", "8"],
      ["В работе", "5"],
      ["Открытые предложения", "12"],
      ["Закрыто за месяц", "4"],
    ],
    demoLeadsTitle: "Последние лиды",
    demoSeeAll: "Смотреть все",
    demoLeads: [
      ["Исраэль Исраэли", "052-1234567", "Предложение отправлено"],
      ["Сара Коэн", "050-9876543", "Новый лид"],
      ["Моше Авив", "054-5554433", "Ждет ответа"],
    ],
    demoFollowTitle: "Follow-up на сегодня",
    demoUrgentCount: "2 срочно",
    demoFollow: [
      ["Давид Леви", "Вернуться по ремонту центрального кондиционера", "Позвонить"],
      ["Рахель Габай", "Подтвердить предложение на новую установку", "Детали"],
    ],
    demoPipeline: [
      ["Новый", "8"],
      ["Звонок", "5"],
      ["Предложение", "12"],
      ["Follow-up", "6"],
      ["Закрыто", "4"],
    ],
    outcomeKicker: "Результат",
    outcomeTitle: "Меньше пропущенных заявок, больше сделок доходят до разговора",
    beforeTitle: "До",
    beforeText: "Лиды разбросаны по WhatsApp, предложения без контроля, а владелец пытается все запомнить.",
    afterTitle: "После",
    afterText: "Каждый лид попадает в список, получает ответ, получает follow-up и остается на виду до закрытия.",
    packagesKicker: "Пакеты",
    packagesTitle: "Начинаем небольшими шагами, улучшаем быстро",
    monthly: ["/ месяц, без подключения", "/ месяц, без подключения", "/ месяц, без подключения"],
    recommended: "Рекомендуем",
    packageItems: [
      ["Форма лидов и подключение к таблице", "Первое сообщение в WhatsApp", "Базовый контроль статусов", "Один обучающий звонок"],
      ["Все из Starter", "Автоматический контроль предложений", "Напоминания о встречах и оплатах", "Ежедневный дашборд продаж"],
      ["Процессы по командам", "Подключение CRM и счетов", "Продвинутые отчеты", "Ежемесячные улучшения"],
    ],
    processKicker: "Как это работает",
    processTitle: "Короткий процесс без бюрократии",
    steps: [
      ["Аудит", "Проверяем, откуда приходят лиды и где они застревают."],
      ["Сборка", "Подключаем формы, WhatsApp, таблицы, календарь и текущие инструменты."],
      ["Запуск", "Включаем, тестируем и настраиваем сообщения по реальным ответам."],
    ],
    contactKicker: "Старт",
    contactTitle: "Хотите проверить, где бизнес теряет лиды?",
    contactCopy:
      "Заполните короткие данные. Откроется готовое сообщение в WhatsApp со всем, что нужно для начала разговора.",
    labels: ["Полное имя", "Сфера бизнеса", "Телефон", "Что важнее всего улучшить?"],
    businessPlaceholder: "Например: кондиционеры, клиника, недвижимость",
    goalOptions: [
      "Выберите вариант",
      "Быстрый ответ лидам",
      "Контроль коммерческих предложений",
      "Напоминания об оплатах и встречах",
      "Дашборд и управление продажами",
    ],
    formButton: "Открыть WhatsApp",
    formNote: "",
    footer: "Автоматизация лидов и продаж для малого бизнеса",
    whatsappDefault: "Здравствуйте, хочу проверить подходит ли система автоматизации лидов и продаж.",
    whatsappIntro: "Здравствуйте, хочу проверить подходит ли система автоматизации.",
    whatsappFields: ["Имя", "Сфера бизнеса", "Телефон", "Что важно улучшить"],
  },
};

const languageSelect = document.getElementById("languageSelect");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const themeText = themeToggle.querySelector(".theme-text");

let currentLanguage = localStorage.getItem("siteLanguage") || "he";
const savedTheme = localStorage.getItem("siteTheme");

const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
};

const setAllText = (selector, values) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    if (values[index] !== undefined) element.textContent = values[index];
  });
};

const applyLanguage = (language) => {
  const t = translations[language];
  currentLanguage = language;
  localStorage.setItem("siteLanguage", language);
  languageSelect.value = language;

  document.documentElement.lang = t.lang;
  document.documentElement.dir = t.dir;
  document.title = t.title;
  document.querySelector('meta[name="description"]').setAttribute("content", t.description);

  setText(".brand span", t.brand);
  setAllText(".nav a", [t.navService, t.navDemo, t.navPackages, t.navProcess, t.navContact]);
  setText(".header-action", t.headerAction);
  setText(".app-action", t.appAction);
  setText(".theme-text", document.body.classList.contains("dark-mode") ? t.themeLight : t.themeDark);
  themeToggle.setAttribute("aria-label", t.themeDark);

  setText(".eyebrow", t.eyebrow);

  // 3-line hero headline
  const heroLines = document.querySelectorAll(".hero-line");
  if (heroLines.length >= 3) {
    heroLines[0].textContent = t.heroLine1;
    heroLines[1].textContent = t.heroLine2;
    heroLines[2].textContent = t.heroLine3;
  }

  setText(".hero-copy", t.heroCopy);

  // Hero CTA buttons
  const primaryCta = document.querySelector(".hero-cta-primary span");
  if (primaryCta) primaryCta.textContent = t.heroApp;
  setText(".hero-cta-secondary", t.heroPrimary);
  const waCta = document.querySelector(".hero-cta-wa");
  if (waCta) {
    const waText = waCta.childNodes[waCta.childNodes.length - 1];
    if (waText && waText.nodeType === Node.TEXT_NODE) waText.textContent = t.heroWhatsapp;
  }

  setAllText(".hero-metrics dt", [t.metric1Title, t.metric2Title, t.metric3Title]);
  setAllText(".hero-metrics dd", [t.metric1Text, t.metric2Text, t.metric3Text]);
  setAllText(".trust-band span", t.audiences);

  setText("#service .section-kicker", t.serviceKicker);
  setText("#service h2", t.serviceTitle);
  setText("#service > div:first-child p:not(.section-kicker)", t.serviceCopy);
  document.querySelectorAll(".bento-card").forEach((card, index) => {
    const feature = t.features[index];
    if (!feature) return;
    card.querySelector("h3").textContent = feature[0];
    card.querySelector("p").textContent = feature[1];
  });

  setText("#demo .section-kicker", t.demoKicker);
  setText("#demo h2", t.demoTitle);
  setText("#demo .demo-heading p:not(.section-kicker)", t.demoCopy);
  setText(".dashboard-logo strong", t.demoLogo);
  setAllText(".dashboard-menu span", t.demoMenu);
  setText(".dashboard-topbar strong", t.demoDashboardTitle);
  setText(".dashboard-topbar span", t.demoUpdated);
  setText(".mini-action", t.demoAudit);
  document.querySelectorAll(".demo-stats article").forEach((card, index) => {
    const item = t.demoStats[index];
    if (!item) return;
    card.querySelector("p").textContent = item[0];
    card.querySelector("strong").textContent = item[1];
  });
  setText(".lead-table-card .card-title-row h3", t.demoLeadsTitle);
  setText(".lead-table-card .card-title-row span", t.demoSeeAll);
  document.querySelectorAll(".lead-row").forEach((row, index) => {
    const item = t.demoLeads[index];
    if (!item) return;
    row.querySelector("strong").textContent = item[0];
    row.querySelector("small").textContent = item[1];
    row.querySelector(".status").textContent = item[2];
  });
  setText(".follow-card .card-title-row h3", t.demoFollowTitle);
  setText(".follow-card .card-title-row span", t.demoUrgentCount);
  document.querySelectorAll(".follow-item").forEach((item, index) => {
    const follow = t.demoFollow[index];
    if (!follow) return;
    item.querySelector("strong").textContent = follow[0];
    item.querySelector("span").textContent = follow[1];
    item.querySelector("button").textContent = follow[2];
  });
  document.querySelectorAll(".pipeline-strip div").forEach((item, index) => {
    const stage = t.demoPipeline[index];
    if (!stage) return;
    item.querySelector("span").textContent = stage[0];
    item.querySelector("strong").textContent = stage[1];
  });

  setText(".outcomes .section-kicker", t.outcomeKicker);
  setText(".outcomes h2", t.outcomeTitle);
  const outcomeLabels = document.querySelectorAll(".outcome-label");
  if (outcomeLabels[0]) {
    const lbl0 = outcomeLabels[0];
    lbl0.lastChild.textContent && (lbl0.childNodes[lbl0.childNodes.length - 1].textContent = t.beforeTitle);
  }
  if (outcomeLabels[1]) {
    const lbl1 = outcomeLabels[1];
    lbl1.childNodes[lbl1.childNodes.length - 1].textContent = t.afterTitle;
  }
  const outcomeTexts = document.querySelectorAll(".outcome-card p");
  if (outcomeTexts[0]) outcomeTexts[0].textContent = t.beforeText;
  if (outcomeTexts[1]) outcomeTexts[1].textContent = t.afterText;

  setText("#packages .section-kicker", t.packagesKicker);
  setText("#packages h2", t.packagesTitle);
  setText(".badge", t.recommended);
  setAllText(".monthly", t.monthly);
  document.querySelectorAll(".price-card ul").forEach((list, listIndex) => {
    const items = t.packageItems[listIndex];
    if (!items) return;
    list.querySelectorAll("li").forEach((li, i) => {
      if (items[i] !== undefined) li.textContent = items[i];
    });
  });

  setText("#process .section-kicker", t.processKicker);
  setText("#process h2", t.processTitle);
  document.querySelectorAll(".steps li").forEach((step, index) => {
    const item = t.steps[index];
    if (!item) return;
    step.querySelector("h3").textContent = item[0];
    step.querySelector("p").textContent = item[1];
  });

  setText(".contact-copy .section-kicker", t.contactKicker);
  setText(".contact-copy h2", t.contactTitle);
  setText(".contact-copy p:not(.section-kicker)", t.contactCopy);
  document.querySelectorAll(".lead-form label").forEach((label, index) => {
    const child = label.querySelector("input, select");
    label.firstChild.textContent = `${t.labels[index]} `;
    if (child?.name === "business") child.placeholder = t.businessPlaceholder;
  });
  document.querySelectorAll(".lead-form select option").forEach((option, index) => {
    option.textContent = t.goalOptions[index];
  });
  setText(".form-button", t.formButton);
  setText(".form-note", t.formNote);
  const footerBrand = document.querySelector(".footer-brand strong");
  if (footerBrand) footerBrand.textContent = t.brand;
  const footerText = document.querySelector(".footer-brand span");
  if (footerText) footerText.textContent = t.footer;

  updateWhatsappLinks();
};

const updateThemeText = () => {
  const t = translations[currentLanguage];
  const isDark = document.body.classList.contains("dark-mode");
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeText.textContent = isDark ? t.themeLight : t.themeDark;
};

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("siteTheme", isDark ? "dark" : "light");
  updateThemeText();
});

languageSelect.addEventListener("change", (event) => {
  applyLanguage(event.target.value);
});

function updateWhatsappLinks() {
  const t = translations[currentLanguage];
  const defaultMessage = encodeURIComponent(t.whatsappDefault);
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.href = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;
  });
}

document.getElementById("leadForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const t = translations[currentLanguage];
  const formData = new FormData(event.currentTarget);
  const message = [
    t.whatsappIntro,
    "",
    `${t.whatsappFields[0]}: ${formData.get("name")}`,
    `${t.whatsappFields[1]}: ${formData.get("business")}`,
    `${t.whatsappFields[2]}: ${formData.get("phone")}`,
    `${t.whatsappFields[3]}: ${formData.get("goal")}`,
  ].join("\n");

  window.open(
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer"
  );
});

applyLanguage(currentLanguage);
updateThemeText();

// ─── Hero headline stagger reveal ──────────────────────────────
(function () {
  const lines = document.querySelectorAll(".hero-line");
  if (!lines.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    lines.forEach(l => l.classList.add("line-visible"));
    return;
  }
  requestAnimationFrame(() => {
    lines.forEach((line, i) => {
      setTimeout(() => line.classList.add("line-visible"), 120 + i * 160);
    });
  });
})();

// ─── Header compact on scroll ───────────────────────────────────
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

// ─── Scroll reveal ──────────────────────────────────────────────
(function () {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length || !window.IntersectionObserver) {
    targets.forEach(el => el.classList.add('revealed'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
  targets.forEach(el => io.observe(el));
})();

// ─── Counter animation for stat numbers ────────────────────────
(function () {
  if (!window.IntersectionObserver) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };

    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => io.observe(el));
})();

// ─── Hero lead-flow animation ───────────────────────────────────
(function () {
  const crm = document.getElementById('hvCrm');
  if (!crm) return;

  const show = id => document.getElementById(id)?.classList.add('hv-visible');
  const hide = id => document.getElementById(id)?.classList.remove('hv-visible');

  function setChip(text, cls) {
    const chip = document.getElementById('hvChip');
    if (!chip) return;
    chip.textContent = text;
    chip.className = 'hv-status-chip ' + cls;
    chip.classList.remove('hv-chip-pop');
    void chip.offsetWidth;
    chip.classList.add('hv-chip-pop');
  }

  function cycle() {
    ['hvWa', 'hvFlow', 'hvCrm', 'hvReminder', 'hvWin'].forEach(hide);
    setChip('חדש', 'hv-new');

    setTimeout(() => show('hvWa'),        500);
    setTimeout(() => show('hvFlow'),     1900);
    setTimeout(() => show('hvCrm'),      3200);
    setTimeout(() => setChip('בטיפול',      'hv-active'),   4600);
    setTimeout(() => setChip('נשלחה הצעה',  'hv-proposal'), 5900);
    setTimeout(() => show('hvReminder'),  6800);
    setTimeout(() => {
      setChip('נסגר ✓', 'hv-closed');
      show('hvWin');
    }, 8100);
    setTimeout(cycle, 12000);
  }

  setTimeout(cycle, 900);
})();

// ─── GSAP + Lenis + Custom Cursor (MotionSites-level motion) ───
(function () {

  // ── Lenis smooth scroll ──
  function initLenis() {
    if (typeof Lenis === 'undefined') return;
    const lenis = new Lenis({
      duration: 1.25,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  // ── Custom cursor ──
  function initCursor() {
    const dot  = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
    }, { passive: true });

    // Smooth ring follow
    (function animRing() {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    // Hover state on interactive elements
    const hoverEls = document.querySelectorAll('a, button, [class*="cta"], .bento-card, .price-card, .feature-card');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });
  }

  // ── GSAP animations ──
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    // Bento grid stagger
    gsap.from('.bento-card', {
      scrollTrigger: {
        trigger: '.bento-grid',
        start: 'top 80%',
        once: true,
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
    });

    // Pricing cards stagger
    gsap.from('.price-card', {
      scrollTrigger: {
        trigger: '.pricing-grid',
        start: 'top 80%',
        once: true,
      },
      opacity: 0,
      y: 50,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
    });

    // Process steps stagger
    gsap.from('.steps li', {
      scrollTrigger: {
        trigger: '.steps',
        start: 'top 80%',
        once: true,
      },
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.18,
      ease: 'power2.out',
    });

    // Outcomes section
    gsap.from('.outcome-stat', {
      scrollTrigger: {
        trigger: '.outcome-stats',
        start: 'top 80%',
        once: true,
      },
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.14,
      ease: 'power2.out',
    });

    gsap.from('.outcome-card', {
      scrollTrigger: {
        trigger: '.outcome-row',
        start: 'top 80%',
        once: true,
      },
      opacity: 0,
      x: (i) => i === 0 ? -40 : 40,
      duration: 0.9,
      stagger: 0.18,
      ease: 'power3.out',
    });

    // Dashboard section
    gsap.from('.dashboard-shell', {
      scrollTrigger: {
        trigger: '.dashboard-shell',
        start: 'top 80%',
        once: true,
      },
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
    });

    // Contact section
    gsap.from('.contact-section', {
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 85%',
        once: true,
      },
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
    });

    // Subtle hero parallax on scroll
    gsap.to('.hero-video', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: 80,
      ease: 'none',
    });

    gsap.to('.hero-inner', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: 50,
      ease: 'none',
    });
  }

  // ── Magnetic button effect ──
  function initMagnetic() {
    const btns = document.querySelectorAll('.hero-cta-primary, .hero-cta-secondary, .header-action');
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    btns.forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.25;
        const dy = (e.clientY - cy) * 0.25;
        btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.05)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ── Init all on load ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  function boot() {
    // Wait for deferred scripts to load
    window.addEventListener('load', () => {
      initLenis();
      initGSAP();
      initCursor();
      initMagnetic();
    });
  }

})();
