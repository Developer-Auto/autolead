const ADMIN_EMAIL = window.AUTOLEAD_FIREBASE_CONFIG?.adminEmail || "tokerdanny53@gmail.com";
const ADMIN_PASSWORD = atob("ZGVuaTEzMTI3OQ==");
const STORAGE_KEY = "autolead_v1_state";
const REMEMBER_KEY = "autolead_remember_until";
const ADMIN_AUTH_KEY = "autolead_admin_auth_until";
const app = document.getElementById("app");
const toastHost = document.getElementById("toastHost");

const statusLabels = ["חדש", "בטיפול", "הצעה נשלחה", "ממתין", "נסגר", "אבוד"];

const STATUS_MIGRATION = {
  "חזרנו אליו": "בטיפול", "נקבעה שיחה": "בטיפול",
  "נשלחה הצעת מחיר": "הצעה נשלחה", "ממתין לתשובה": "ממתין", "מעקב": "בטיפול"
};

const STATUS_CLS = {
  "חדש": "s-new", "בטיפול": "s-progress", "הצעה נשלחה": "s-quote",
  "ממתין": "s-waiting", "נסגר": "s-closed", "אבוד": "s-lost"
};

const STATUS_COLORS = {
  "חדש": "var(--s-new)", "בטיפול": "var(--s-progress)", "הצעה נשלחה": "var(--s-quote)",
  "ממתין": "var(--s-waiting)", "נסגר": "var(--s-closed)", "אבוד": "var(--s-lost)"
};

const PRIORITY_CLS = {
  "רגיל": "priority-normal", "חשוב": "priority-important", "דחוף": "priority-urgent"
};

// Internal (stored) Hebrew values → translated display per language
const STATUS_TR = {
  "חדש":         { he: "חדש",           en: "New",           ru: "Новый" },
  "בטיפול":      { he: "בטיפול",        en: "In Progress",   ru: "В работе" },
  "הצעה נשלחה": { he: "הצעה נשלחה",   en: "Quote Sent",    ru: "Предложение отправлено" },
  "ממתין":       { he: "ממתין",         en: "Waiting",       ru: "Ожидание" },
  "נסגר":        { he: "נסגר",          en: "Closed",        ru: "Закрыто" },
  "אבוד":        { he: "אבוד",          en: "Lost",          ru: "Потерян" }
};

const PRIORITY_TR = {
  "רגיל": { he: "רגיל", en: "Normal",    ru: "Обычный" },
  "חשוב": { he: "חשוב", en: "Important", ru: "Важный" },
  "דחוף": { he: "דחוף", en: "Urgent",    ru: "Срочный" }
};

const SOURCE_TR = {
  "וואטסאפ":  { he: "וואטסאפ",  en: "WhatsApp",    ru: "WhatsApp" },
  "טלפון":    { he: "טלפון",    en: "Phone",        ru: "Телефон" },
  "אתר":      { he: "אתר",      en: "Website",      ru: "Сайт" },
  "פייסבוק":  { he: "פייסבוק",  en: "Facebook",     ru: "Facebook" },
  "אינסטגרם": { he: "אינסטגרם", en: "Instagram",    ru: "Instagram" },
  "המלצה":    { he: "המלצה",    en: "Referral",     ru: "Рекомендация" },
  "אחר":      { he: "אחר",      en: "Other",        ru: "Другое" }
};

const sources   = Object.keys(SOURCE_TR);
const priorities = ["רגיל", "חשוב", "דחוף"];

const whatsappTemplates = {
  "חדש":           (l) => `היי ${l.customerName}, קיבלנו את פנייתך בנושא ${l.serviceRequested || "השירות שלנו"}. ניצור איתך קשר בהקדם!`,
  "בטיפול":        (l) => `היי ${l.customerName}, כבר בטיפול בפנייתך. יש משהו נוסף שנוכל לעזור?`,
  "הצעה נשלחה":   (l) => `היי ${l.customerName}, שלחנו לך הצעת מחיר${l.quoteAmount ? ` על סך ₪${Number(l.quoteAmount).toLocaleString("he-IL")}` : ""}. מה דעתך?`,
  "ממתין":         (l) => `היי ${l.customerName}, רק בודקים אם קיבלת את ההצעה שלנו. נשמח לשמוע ממך!`,
  "נסגר":          (l) => `היי ${l.customerName}, תודה שבחרת בנו! נשמח לשרת אותך שוב 😊`,
  "אבוד":          (l) => `היי ${l.customerName}, נשמח לעמוד לרשותך בעתיד. תמיד ברוך השב!`
};

// ─── FULL i18n ────────────────────────────────────────────────────────────────
const i18n = {
  he: {
    dashboard:"ראשי", leads:"לידים", add:"הוסף", follow:"מעקב",
    settings:"הגדרות", admin:"ניהול",
    greetingMorning:"בוקר טוב", greetingNoon:"צהריים טובים",
    greetingEvening:"ערב טוב", greetingNight:"לילה טוב",
    dashSubtitle:"הנה מה שקורה היום בעסק שלך",
    statNewLeads:"לידים חדשים", statFollowups:"מעקב להיום",
    statOpenQuotes:"הצעות פתוחות", statRevenue:"הכנסה החודש",
    statNewHelper:"ממתינים לטיפול", statFollowHelper1:"ליד אחד",
    statFollowHelper2:"כולל איחורים", statQuoteHelper:"כדאי לחזור אליהם",
    statRateHelper:"אחוז סגירה", needsAction:"מה דורש טיפול עכשיו",
    tasksChip:"משימות",
    leadsSubtitle:"כל הפניות של העסק במקום אחד",
    searchPlaceholder:"חפש שם, טלפון, עיר...",
    filterAll:"הכל", filterFollow:"לטיפול",
    followTitle:"משימות מעקב",
    followSubtitle:"מי שצריך שיחה, הודעה או החלטה",
    overdueGroup:"איחור", todayGroup:"להיום",
    callBtn:"שיחה", whatsappBtn:"וואטסאפ", statusBtn:"סטטוס",
    leadDetailTitle:"פרטי ליד", updateBtn:"עדכן",
    customerInfo:"פרטי לקוח", commercial:"מסחרי",
    notesSection:"הערות", timeline:"ציר זמן",
    phoneField:"טלפון", cityField:"עיר", sourceField:"מקור",
    addedDate:"נוסף בתאריך", serviceField:"מה הלקוח צריך",
    quoteField:"סכום הצעה", nextFollowField:"מעקב הבא",
    addLeadTitle:"ליד חדש",
    customerNameField:"שם לקוח *", phoneFieldLabel:"מספר טלפון *",
    cityFieldLabel:"עיר", sourceFieldLabel:"מקור פנייה",
    priorityFieldLabel:"עדיפות", serviceFieldLabel:"מה הלקוח צריך?",
    nextFollowLabel:"תאריך מעקב ראשון", firstNoteLabel:"הערה ראשונית",
    saveLead:"שמור ליד", cancel:"ביטול",
    updateStatusTitle:"עדכון סטטוס", newStatusField:"סטטוס חדש",
    quoteSumField:"סכום הצעה / סגירה (₪)",
    nextFollowDateField:"תאריך מעקב הבא", callNoteField:"מה קרה בשיחה?",
    settingsTitle:"הגדרות", settingsText:"שפה, תזכורות והתקנת האפליקציה",
    reminders:"תזכורות מעקב",
    remindersText:"כאשר האפליקציה פתוחה, נזכיר לך לחזור ללידים במרווח שבחרת.",
    reminderEvery:"כל כמה זמן להזכיר?",
    reminder30:"כל חצי שעה", reminder60:"כל שעה", reminder120:"כל שעתיים",
    language:"שפה", languageText:"בחירת שפת הממשק.",
    install:"התקנה בטלפון",
    installText:"באנדרואיד לחץ התקן. באייפון: Share ואז Add to Home Screen.",
    installButton:"התקן את AutoLead",
    account:"פרטי חשבון", active:"מנוי פעיל",
    joinedDate:"הצטרף", signOut:"יציאה מהחשבון",
    reminderToast:"תזכורת: בדוק אם יש לידים שצריך לחזור אליהם.",
    reminderSaved:"הגדרות התזכורת נשמרו", languageSaved:"השפה נשמרה",
    adminTitle:"ניהול AutoLead",
    adminSubtitle:"בקשות גישה, מנויים ותמיכה בלקוחות",
    statPending:"ממתינים לאישור", statActive:"מנויים פעילים",
    statPendingHelper:"בקשות חדשות", statActiveHelper:"לקוחות משלמים",
    totalRevenue:"סה\"כ הכנסות (כל הלקוחות)",
    activateBtn:"הפעל", deactivateBtn:"השבת",
    supportBtn:"תמיכה", removeBtn:"הסר", leadsCount:"לידים",
    leadAdded:"הליד נוסף בהצלחה ✓", statusUpdated:"הסטטוס עודכן",
    subscriptionActivated:"המנוי הופעל ✓",
    subscriptionDeactivated:"המנוי הושבת",
    supportModeToast:"מצב תמיכה — צפייה כמנהל", userRemoved:"המשתמש הוסר",
    emptyDashTitle:"אין משימות דחופות",
    emptyDashBody:"כשיהיו לידים למעקב הם יופיעו כאן.",
    emptyDashCta:"הוסף ליד ראשון",
    emptyLeadsTitle:"אין לידים", emptyLeadsBody:"הוסף ליד ראשון דרך כפתור הפלוס.",
    emptyLeadsCta:"הוסף ליד",
    emptyFollowTitle:"כל הכבוד! אין משימות להיום",
    emptyFollowBody:"לחץ + כדי להוסיף ליד ולהגדיר תאריך מעקב.",
    emptySearchTitle:"לא נמצאו לידים", emptySearchBody:"נסה לשנות את החיפוש.",
    emptyAdminTitle:"אין משתמשים",
    emptyAdminBody:"כאשר לקוחות יתחברו עם Google הם יופיעו כאן.",
    lockedTitle:"המנוי שלך עדיין לא פעיל",
    lockedBody:"בקשת הגישה שלך התקבלה בהצלחה. לאחר שהמנהל יאשר את המנוי שלך תקבל גישה מלאה.",
    step1Title:"נרשמת בהצלחה", step1Body:"הפרטים שלך נשמרו במערכת AutoLead.",
    step2Title:"ממתין לאישור מנהל",
    step2Body:"המנהל יאשר את הגישה שלך בהקדם האפשרי.",
    step3Title:"גישה מלאה למערכת",
    step3Body:"תוכל להוסיף לידים, לנהל מעקב ולשלוח הצעות מחיר.",
    contactAdmin:"יצירת קשר עם המנהל", logout:"יציאה",
    loginDesc:"אפליקציית ניהול לידים לעסקים קטנים: מעקב, וואטסאפ, הצעות מחיר ומנויים במקום אחד.",
    adminLoginCard:"כניסה כמנהל",
    adminLoginDesc:"ניהול מנויים, בקשות גישה ותמיכה בלקוחות",
    businessLoginCard:"כניסה כבעל עסק",
    businessLoginDesc:"ניהול לידים, מעקבים, הצעות ולקוחות",
    emailField:"אימייל", adminPasswordField:"סיסמת מנהל",
    displayNameField:"שם מלא",
    displayNamePlaceholder:"השם שיופיע באפליקציה",
    businessNameField:"שם העסק",
    businessNamePlaceholder:"לדוגמה: כהן מיזוג",
    rememberMe:"זכור אותי לשבוע הקרוב",
    loginBtn:"כניסה / בקשת גישה", adminLoginBtn:"כניסה לניהול",
    demoBtn:"כניסה לדמו",
    loginNote:"לאחר הלחיצה ייפתח חלון Google לאימות מאובטח.",
    installSheetTitle:"התקנת AutoLead",
    androidInstallTitle:"אנדרואיד (Chrome)",
    androidInstallDesc:"פתח את תפריט הדפדפן (⋮) ← לחץ הוסף למסך הבית או Install app.",
    iosInstallTitle:"iPhone / iPad (Safari)",
    iosInstallDesc:"לחץ על כפתור השיתוף 📤 ← Add to Home Screen.",
    understood:"הבנתי",
    supportBanner:"מצב תמיכה — צפייה כמנהל",
    supportViewing:"אתה צופה בחשבון של", backToAdmin:"חזרה לניהול",
    noCity:"ללא עיר", unknownBusiness:"עסק ללא שם",
    activityCreated:"הליד נוסף למערכת",
    confirmRemoveUser:"להסיר את {name} ואת כל הלידים שלו?",
    pendingStatus:"ממתין לאישור",
    callNoteActivity:"עבר מ-\"{from}\" ל-\"{to}\"",
    // Notifications
    notifSectionTitle:"התראות ותזכורות",
    notifSectionText:"הגדרות התראות דחיפה, תזכורות מעקב ושפת הממשק",
    notifPermTitle:"התראות בטלפון",
    notifPermText:"קבל התראות ישירות לטלפון גם כשהאפליקציה ברקע.",
    notifPermBtn:"הפעל התראות",
    notifPermGranted:"התראות פעילות ✓",
    notifPermDefault:"לא הופעל",
    notifPermDenied:"חסום — שנה בהגדרות הדפדפן",
    notifPermUnsupported:"הדפדפן אינו תומך",
    notifTestBtn:"שלח תזכורת לדוגמה",
    autoRemindersTitle:"תזכורות מעקב אוטומטיות",
    autoRemindersText:"AutoLead יזכיר לך כשמגיע זמן לחזור ללידים.",
    reminderIntervalLabel:"בדוק לידים כל",
    dailyMorningTitle:"תזכורת בוקר",
    dailyMorningText:"סיכום משימות כשפותחים את האפליקציה בין 7:00–11:00.",
    followUpTime:"שעת מעקב",
    reminderBeforeLabel:"הזכר לי",
    reminderBefore15:"15 דקות לפני",
    reminderBefore30:"30 דקות לפני",
    reminderBefore60:"שעה לפני",
    reminderBefore120:"שעתיים לפני",
    reminderSet:"תזכורת נקבעה ✓",
    adminNewRequest:"בקשת גישה חדשה ממתינה",
    notifReminderBody:"תזכורת: יש לך מעקב עם {name} בשעה {time}",
    notifOverdueBody:"{name} ממתין לטיפול — מועד המעקב עבר",
    notifMorningBody:"בוקר טוב! יש לך {count} משימות מעקב היום",
    notifSaved:"הגדרות ההתראות נשמרו",
    atTime:"בשעה",
  },
  en: {
    dashboard:"Home", leads:"Leads", add:"Add", follow:"Follow-up",
    settings:"Settings", admin:"Admin",
    greetingMorning:"Good morning", greetingNoon:"Good afternoon",
    greetingEvening:"Good evening", greetingNight:"Good night",
    dashSubtitle:"Here's what's happening in your business today",
    statNewLeads:"New Leads", statFollowups:"Follow-ups Today",
    statOpenQuotes:"Open Quotes", statRevenue:"Revenue This Month",
    statNewHelper:"Waiting for action", statFollowHelper1:"One lead",
    statFollowHelper2:"Including overdue", statQuoteHelper:"Worth following up",
    statRateHelper:"Close rate", needsAction:"What needs attention now",
    tasksChip:"tasks",
    leadsSubtitle:"All your business inquiries in one place",
    searchPlaceholder:"Search name, phone, city...",
    filterAll:"All", filterFollow:"Follow-up",
    followTitle:"Follow-up Tasks",
    followSubtitle:"Who needs a call, message or decision",
    overdueGroup:"Overdue", todayGroup:"Today",
    callBtn:"Call", whatsappBtn:"WhatsApp", statusBtn:"Status",
    leadDetailTitle:"Lead Details", updateBtn:"Update",
    customerInfo:"Customer Info", commercial:"Commercial",
    notesSection:"Notes", timeline:"Timeline",
    phoneField:"Phone", cityField:"City", sourceField:"Source",
    addedDate:"Added on", serviceField:"What the client needs",
    quoteField:"Quote Amount", nextFollowField:"Next Follow-up",
    addLeadTitle:"New Lead",
    customerNameField:"Customer Name *", phoneFieldLabel:"Phone Number *",
    cityFieldLabel:"City", sourceFieldLabel:"Lead Source",
    priorityFieldLabel:"Priority", serviceFieldLabel:"What does the client need?",
    nextFollowLabel:"First Follow-up Date", firstNoteLabel:"Initial Note",
    saveLead:"Save Lead", cancel:"Cancel",
    updateStatusTitle:"Update Status", newStatusField:"New Status",
    quoteSumField:"Quote / Deal Amount (₪)",
    nextFollowDateField:"Next Follow-up Date", callNoteField:"What happened in the call?",
    settingsTitle:"Settings", settingsText:"Language, reminders and app installation",
    reminders:"Follow-up Reminders",
    remindersText:"When the app is open, AutoLead will remind you to follow up with leads.",
    reminderEvery:"Reminder frequency",
    reminder30:"Every 30 minutes", reminder60:"Every hour", reminder120:"Every 2 hours",
    language:"Language", languageText:"Choose the interface language.",
    install:"Install on Phone",
    installText:"On Android tap Install. On iPhone: Share → Add to Home Screen.",
    installButton:"Install AutoLead",
    account:"Account Details", active:"Subscription Active",
    joinedDate:"Joined", signOut:"Sign Out",
    reminderToast:"Reminder: check if any leads need follow-up.",
    reminderSaved:"Reminder settings saved", languageSaved:"Language saved",
    adminTitle:"AutoLead Admin",
    adminSubtitle:"Access requests, subscriptions and customer support",
    statPending:"Pending Approval", statActive:"Active Subscriptions",
    statPendingHelper:"New requests", statActiveHelper:"Paying customers",
    totalRevenue:"Total Revenue (all customers)",
    activateBtn:"Activate", deactivateBtn:"Deactivate",
    supportBtn:"Support", removeBtn:"Remove", leadsCount:"leads",
    leadAdded:"Lead added successfully ✓", statusUpdated:"Status updated",
    subscriptionActivated:"Subscription activated ✓",
    subscriptionDeactivated:"Subscription deactivated",
    supportModeToast:"Support Mode — Viewing as Admin", userRemoved:"User removed",
    emptyDashTitle:"No urgent tasks",
    emptyDashBody:"When there are leads to follow up on, they'll appear here.",
    emptyDashCta:"Add First Lead",
    emptyLeadsTitle:"No leads yet",
    emptyLeadsBody:"Add your first lead using the + button.",
    emptyLeadsCta:"Add Lead",
    emptyFollowTitle:"All caught up! No tasks today",
    emptyFollowBody:"Tap + to add a lead and set a follow-up date.",
    emptySearchTitle:"No leads found", emptySearchBody:"Try a different search.",
    emptyAdminTitle:"No users",
    emptyAdminBody:"When customers sign in with Google they'll appear here.",
    lockedTitle:"Your subscription is not yet active",
    lockedBody:"Your access request has been received. Once the admin approves your subscription you'll get full access.",
    step1Title:"Successfully registered", step1Body:"Your details have been saved in AutoLead.",
    step2Title:"Waiting for admin approval",
    step2Body:"The admin will approve your access as soon as possible.",
    step3Title:"Full system access",
    step3Body:"You'll be able to add leads, track follow-ups and send quotes.",
    contactAdmin:"Contact Admin", logout:"Sign Out",
    loginDesc:"Lead management app for small businesses: follow-ups, WhatsApp, quotes and subscriptions in one place.",
    adminLoginCard:"Admin Login",
    adminLoginDesc:"Manage subscriptions, access requests and customer support",
    businessLoginCard:"Business Login",
    businessLoginDesc:"Manage leads, follow-ups, quotes and customers",
    emailField:"Email", adminPasswordField:"Admin Password",
    displayNameField:"Full Name",
    displayNamePlaceholder:"Your name as it appears in the app",
    businessNameField:"Business Name",
    businessNamePlaceholder:"e.g. Smith HVAC",
    rememberMe:"Remember me for a week",
    loginBtn:"Sign In / Request Access", adminLoginBtn:"Admin Sign In",
    demoBtn:"Demo Login",
    loginNote:"Clicking will open a secure Google sign-in window.",
    installSheetTitle:"Install AutoLead",
    androidInstallTitle:"Android (Chrome)",
    androidInstallDesc:"Open the browser menu (⋮) → tap Add to Home Screen or Install app.",
    iosInstallTitle:"iPhone / iPad (Safari)",
    iosInstallDesc:"Tap the Share button 📤 → Add to Home Screen.",
    understood:"Got it",
    supportBanner:"Support Mode — Viewing as Admin",
    supportViewing:"You are viewing the account of", backToAdmin:"Back to Admin",
    noCity:"No city", unknownBusiness:"Unnamed business",
    activityCreated:"Lead added to the system",
    confirmRemoveUser:"Remove {name} and all their leads?",
    pendingStatus:"Pending approval",
    callNoteActivity:"Changed from \"{from}\" to \"{to}\"",
    // Notifications
    notifSectionTitle:"Notifications & Reminders",
    notifSectionText:"Push notifications, follow-up reminders and interface language",
    notifPermTitle:"Phone Notifications",
    notifPermText:"Get notifications directly on your phone, even when the app is in the background.",
    notifPermBtn:"Enable Notifications",
    notifPermGranted:"Notifications Active ✓",
    notifPermDefault:"Not enabled",
    notifPermDenied:"Blocked — change in browser settings",
    notifPermUnsupported:"Not supported by browser",
    notifTestBtn:"Send test reminder",
    autoRemindersTitle:"Automatic Follow-up Reminders",
    autoRemindersText:"AutoLead will remind you when it's time to follow up with leads.",
    reminderIntervalLabel:"Check leads every",
    dailyMorningTitle:"Morning Reminder",
    dailyMorningText:"Task summary when you open the app between 7:00–11:00.",
    followUpTime:"Follow-up Time",
    reminderBeforeLabel:"Remind me",
    reminderBefore15:"15 minutes before",
    reminderBefore30:"30 minutes before",
    reminderBefore60:"1 hour before",
    reminderBefore120:"2 hours before",
    reminderSet:"Reminder set ✓",
    adminNewRequest:"New access request pending",
    notifReminderBody:"Reminder: follow-up with {name} at {time}",
    notifOverdueBody:"{name} is waiting — follow-up date has passed",
    notifMorningBody:"Good morning! You have {count} follow-up tasks today",
    notifSaved:"Notification settings saved",
    atTime:"at",
  },
  ru: {
    dashboard:"Главная", leads:"Лиды", add:"Добавить", follow:"Контроль",
    settings:"Настройки", admin:"Админ",
    greetingMorning:"Доброе утро", greetingNoon:"Добрый день",
    greetingEvening:"Добрый вечер", greetingNight:"Доброй ночи",
    dashSubtitle:"Вот что происходит в вашем бизнесе сегодня",
    statNewLeads:"Новые лиды", statFollowups:"Контроль сегодня",
    statOpenQuotes:"Открытые предложения", statRevenue:"Доход за месяц",
    statNewHelper:"Ожидают обработки", statFollowHelper1:"Один лид",
    statFollowHelper2:"Включая просроченные", statQuoteHelper:"Стоит перезвонить",
    statRateHelper:"Конверсия", needsAction:"Что требует внимания сейчас",
    tasksChip:"задачи",
    leadsSubtitle:"Все обращения вашего бизнеса в одном месте",
    searchPlaceholder:"Поиск по имени, телефону, городу...",
    filterAll:"Все", filterFollow:"В работе",
    followTitle:"Задачи по контролю",
    followSubtitle:"Кому нужен звонок, сообщение или решение",
    overdueGroup:"Просрочено", todayGroup:"Сегодня",
    callBtn:"Позвонить", whatsappBtn:"WhatsApp", statusBtn:"Статус",
    leadDetailTitle:"Данные лида", updateBtn:"Обновить",
    customerInfo:"Данные клиента", commercial:"Коммерческое",
    notesSection:"Заметки", timeline:"История",
    phoneField:"Телефон", cityField:"Город", sourceField:"Источник",
    addedDate:"Добавлен", serviceField:"Что нужно клиенту",
    quoteField:"Сумма предложения", nextFollowField:"Следующий контроль",
    addLeadTitle:"Новый лид",
    customerNameField:"Имя клиента *", phoneFieldLabel:"Номер телефона *",
    cityFieldLabel:"Город", sourceFieldLabel:"Источник лида",
    priorityFieldLabel:"Приоритет", serviceFieldLabel:"Что нужно клиенту?",
    nextFollowLabel:"Дата первого контроля", firstNoteLabel:"Начальная заметка",
    saveLead:"Сохранить лид", cancel:"Отмена",
    updateStatusTitle:"Обновление статуса", newStatusField:"Новый статус",
    quoteSumField:"Сумма предложения / сделки (₪)",
    nextFollowDateField:"Дата следующего контроля",
    callNoteField:"Что произошло на звонке?",
    settingsTitle:"Настройки", settingsText:"Язык, напоминания и установка приложения",
    reminders:"Напоминания",
    remindersText:"Когда приложение открыто, AutoLead напомнит вернуться к лидам.",
    reminderEvery:"Как часто напоминать?",
    reminder30:"Каждые 30 минут", reminder60:"Каждый час", reminder120:"Каждые 2 часа",
    language:"Язык", languageText:"Выберите язык интерфейса.",
    install:"Установить на телефон",
    installText:"Android: нажмите Install. iPhone: Share → Add to Home Screen.",
    installButton:"Установить AutoLead",
    account:"Данные аккаунта", active:"Подписка активна",
    joinedDate:"Присоединился", signOut:"Выйти",
    reminderToast:"Напоминание: проверьте, кому нужно вернуться.",
    reminderSaved:"Настройки напоминаний сохранены", languageSaved:"Язык сохранен",
    adminTitle:"Управление AutoLead",
    adminSubtitle:"Запросы доступа, подписки и поддержка клиентов",
    statPending:"Ожидают одобрения", statActive:"Активные подписки",
    statPendingHelper:"Новые запросы", statActiveHelper:"Платящие клиенты",
    totalRevenue:"Общий доход (все клиенты)",
    activateBtn:"Активировать", deactivateBtn:"Отключить",
    supportBtn:"Поддержка", removeBtn:"Удалить", leadsCount:"лидов",
    leadAdded:"Лид успешно добавлен ✓", statusUpdated:"Статус обновлён",
    subscriptionActivated:"Подписка активирована ✓",
    subscriptionDeactivated:"Подписка отключена",
    supportModeToast:"Режим поддержки — просмотр как администратор",
    userRemoved:"Пользователь удалён",
    emptyDashTitle:"Нет срочных задач",
    emptyDashBody:"Когда появятся лиды для контроля, они отобразятся здесь.",
    emptyDashCta:"Добавить первый лид",
    emptyLeadsTitle:"Нет лидов",
    emptyLeadsBody:"Добавьте первый лид через кнопку +.",
    emptyLeadsCta:"Добавить лид",
    emptyFollowTitle:"Отлично! Нет задач на сегодня",
    emptyFollowBody:"Нажмите + чтобы добавить лид и установить дату контроля.",
    emptySearchTitle:"Лиды не найдены", emptySearchBody:"Попробуйте изменить поиск.",
    emptyAdminTitle:"Нет пользователей",
    emptyAdminBody:"Когда клиенты войдут через Google, они появятся здесь.",
    lockedTitle:"Ваша подписка ещё не активна",
    lockedBody:"Ваш запрос на доступ получен. После одобрения администратором вы получите полный доступ.",
    step1Title:"Успешно зарегистрированы",
    step1Body:"Ваши данные сохранены в AutoLead.",
    step2Title:"Ожидание одобрения администратора",
    step2Body:"Администратор одобрит доступ в ближайшее время.",
    step3Title:"Полный доступ к системе",
    step3Body:"Вы сможете добавлять лиды, вести контроль и отправлять предложения.",
    contactAdmin:"Связаться с администратором", logout:"Выйти",
    loginDesc:"Приложение для управления лидами для малого бизнеса: контроль, WhatsApp, предложения и подписки в одном месте.",
    adminLoginCard:"Вход администратора",
    adminLoginDesc:"Управление подписками, запросами доступа и поддержкой",
    businessLoginCard:"Вход для бизнеса",
    businessLoginDesc:"Управление лидами, контроль, предложения и клиенты",
    emailField:"Email", adminPasswordField:"Пароль администратора",
    displayNameField:"Полное имя",
    displayNamePlaceholder:"Ваше имя в приложении",
    businessNameField:"Название бизнеса",
    businessNamePlaceholder:"Например: ООО Климат",
    rememberMe:"Запомнить меня на неделю",
    loginBtn:"Войти / Запросить доступ", adminLoginBtn:"Войти как администратор",
    demoBtn:"Демо вход",
    loginNote:"После нажатия откроется окно безопасного входа через Google.",
    installSheetTitle:"Установить AutoLead",
    androidInstallTitle:"Android (Chrome)",
    androidInstallDesc:"Откройте меню браузера (⋮) → нажмите Добавить на главный экран или Install app.",
    iosInstallTitle:"iPhone / iPad (Safari)",
    iosInstallDesc:"Нажмите кнопку Поделиться 📤 → Add to Home Screen.",
    understood:"Понятно",
    supportBanner:"Режим поддержки — просмотр как администратор",
    supportViewing:"Вы просматриваете аккаунт", backToAdmin:"Назад к управлению",
    noCity:"Без города", unknownBusiness:"Бизнес без названия",
    activityCreated:"Лид добавлен в систему",
    confirmRemoveUser:"Удалить {name} и все их лиды?",
    pendingStatus:"Ожидает одобрения",
    callNoteActivity:"Изменён с \"{from}\" на \"{to}\"",
    // Notifications
    notifSectionTitle:"Уведомления и напоминания",
    notifSectionText:"Push-уведомления, напоминания о контроле и язык интерфейса",
    notifPermTitle:"Уведомления на телефон",
    notifPermText:"Получайте уведомления прямо на телефон, даже когда приложение в фоне.",
    notifPermBtn:"Включить уведомления",
    notifPermGranted:"Уведомления активны ✓",
    notifPermDefault:"Не включено",
    notifPermDenied:"Заблокировано — измените в настройках браузера",
    notifPermUnsupported:"Браузер не поддерживает",
    notifTestBtn:"Тестовое напоминание",
    autoRemindersTitle:"Автоматические напоминания",
    autoRemindersText:"AutoLead напомнит, когда придёт время связаться с лидами.",
    reminderIntervalLabel:"Проверять лиды каждые",
    dailyMorningTitle:"Утреннее напоминание",
    dailyMorningText:"Сводка задач при открытии приложения между 7:00–11:00.",
    followUpTime:"Время контроля",
    reminderBeforeLabel:"Напомнить за",
    reminderBefore15:"15 минут",
    reminderBefore30:"30 минут",
    reminderBefore60:"1 час",
    reminderBefore120:"2 часа",
    reminderSet:"Напоминание установлено ✓",
    adminNewRequest:"Новый запрос доступа ожидает",
    notifReminderBody:"Напоминание: контроль с {name} в {time}",
    notifOverdueBody:"{name} ждёт обработки — срок контроля прошёл",
    notifMorningBody:"Доброе утро! У вас {count} задач по контролю сегодня",
    notifSaved:"Настройки уведомлений сохранены",
    atTime:"в",
  }
};

// ─── GLOBALS ──────────────────────────────────────────────────────────────────
let state = {};
let currentUserId = null;
let activeView = "dashboard";
let activeLeadId = null;
let activeFilter = "all";
let deferredInstallPrompt = null;
let selectedLoginRole = "business";
let cloud = null;
let cloudReady = null;
let cloudUnsubscribers = [];
let reminderTimer = null;
let reminderCheckTimer = null;
let lastPendingCount = -1;

// ─── ICONS ────────────────────────────────────────────────────────────────────
function ic(name, size = 20) {
  const paths = {
    home:     `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
    users:    `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
    plus:     `<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`,
    clock:    `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
    gear:     `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
    shield:   `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    phone:    `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>`,
    sun:      `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`,
    moon:     `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`,
    download: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`,
    close:    `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`,
    search:   `<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`,
    edit:     `<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>`,
    map:      `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`,
    calendar: `<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`,
    tag:      `<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>`,
    check:    `<polyline points="20 6 9 17 4 12"/>`,
    note:     `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>`,
    user:     `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
    bell:     `<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>`,
    globe:    `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
    trending: `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>`,
    activity: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`,
    alert:    `<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
    support:  `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`,
    trash:    `<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>`,
  };
  const p = paths[name] || "";
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
}

function icWA(size = 18) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`;
}

// ─── NOTIFICATION ENGINE ─────────────────────────────────────────────────────

function notifPermStatus() {
  if (!("Notification" in window)) return "unsupported";
  return Notification.permission; // "granted" | "denied" | "default"
}

async function requestNotifPerm() {
  if (!("Notification" in window)) return "unsupported";
  try {
    const result = await Notification.requestPermission();
    updateUserSettings({ notificationsEnabled: result === "granted" });
    toast(result === "granted" ? t("notifPermGranted") : t("notifPermDenied"));
    if (result === "granted") subscribeOneSignal();
    return result;
  } catch (e) {
    console.error("Notification permission failed", e);
    return "error";
  }
}

function subscribeOneSignal() {
  if (!window.OneSignal?.User?.PushSubscription) return;
  OneSignal.User.PushSubscription.optIn().catch(() => {});
}

async function showNotification(title, body, tag = "autolead") {
  if (notifPermStatus() !== "granted") { toast(body); return; }
  const opts = {
    body, icon: "./assets/icon.svg", badge: "./assets/icon.svg",
    tag, renotify: true, data: { url: "./" }
  };
  try {
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.ready;
      await reg.showNotification(title, opts);
    } else {
      new Notification(title, opts);
    }
  } catch (_) {
    try { new Notification(title, { body, icon: "./assets/icon.svg" }); } catch (__) { toast(body); }
  }
}

function checkLeadReminders() {
  const user = currentUser();
  if (!user || user.subscriptionStatus !== "active") return;
  if (isAdmin(user) && !state.supportAdminId) return;

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const STORE_KEY = "al_notified_v2";
  let notified;
  try { notified = new Set(JSON.parse(sessionStorage.getItem(STORE_KEY) || "[]")); }
  catch (_) { notified = new Set(); }

  userLeads(user.uid).forEach((lead) => {
    if (["נסגר", "אבוד"].includes(lead.status)) return;
    const name = lead.customerName;

    // ── Per-lead time-based reminder ─────────────────────────────────────────
    if (lead.nextFollowUpDate && lead.nextFollowUpTime) {
      const followUpDT = new Date(`${lead.nextFollowUpDate}T${lead.nextFollowUpTime}:00`);
      const minsBefore = Number(lead.reminderBefore || 30);
      const reminderAt = new Date(followUpDT.getTime() - minsBefore * 60_000);
      const key = `rem-${lead.id}-${lead.nextFollowUpDate}-${lead.nextFollowUpTime}`;
      if (now >= reminderAt && now < followUpDT && !notified.has(key)) {
        notified.add(key);
        const body = t("notifReminderBody").replace("{name}", name).replace("{time}", lead.nextFollowUpTime);
        showNotification("AutoLead", body, key);
      }
    }

    // ── Overdue (once per day per lead) ──────────────────────────────────────
    if (lead.nextFollowUpDate && lead.nextFollowUpDate < todayStr) {
      const key = `overdue-${lead.id}-${todayStr}`;
      if (!notified.has(key)) {
        notified.add(key);
        const body = t("notifOverdueBody").replace("{name}", name);
        showNotification("AutoLead", body, key);
      }
    }
  });

  try { sessionStorage.setItem(STORE_KEY, JSON.stringify([...notified].slice(-200))); } catch (_) {}
}

function checkMorningReminder() {
  const user = currentUser();
  if (!user?.settings?.dailyMorningReminder || user.subscriptionStatus !== "active") return;
  const now = new Date();
  const hour = now.getHours();
  if (hour < 7 || hour >= 12) return;
  const dayKey = `al_morning_${now.toISOString().slice(0, 10)}`;
  if (localStorage.getItem(dayKey)) return;
  localStorage.setItem(dayKey, "1");
  const today = now.toISOString().slice(0, 10);
  const leads = userLeads(user.uid);
  const count = leads.filter((l) =>
    !["נסגר", "אבוד"].includes(l.status) &&
    (l.nextFollowUpDate === today || (l.nextFollowUpDate && l.nextFollowUpDate < today))
  ).length;
  if (count > 0) {
    const body = t("notifMorningBody").replace("{count}", count);
    showNotification("AutoLead", body, "morning-summary");
  }
}

function adminBadgeCount() {
  return (state.users || []).filter((u) => u.role !== "admin" && u.subscriptionStatus === "pending").length;
}

// ─── TRANSLATION HELPERS ──────────────────────────────────────────────────────
function currentLang() {
  return currentUser()?.settings?.language || state?.language || "he";
}

function t(key) {
  const lang = currentLang();
  return i18n[lang]?.[key] ?? i18n.he[key] ?? key;
}

function tStatus(hebrewVal) {
  return STATUS_TR[hebrewVal]?.[currentLang()] ?? hebrewVal;
}

function tPriority(hebrewVal) {
  return PRIORITY_TR[hebrewVal]?.[currentLang()] ?? hebrewVal;
}

function tSource(hebrewVal) {
  return SOURCE_TR[hebrewVal]?.[currentLang()] ?? hebrewVal;
}

function applyLanguage() {
  const lang = currentLang();
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
}

// ─── STATE ────────────────────────────────────────────────────────────────────
function migrateState(data) {
  if (!data?.leads) return data;
  data.leads = data.leads.map((l) => ({
    ...l, status: STATUS_MIGRATION[l.status] ?? l.status
  }));
  return data;
}

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return migrateState(JSON.parse(stored));
  const admin = {
    uid: crypto.randomUUID(), email: ADMIN_EMAIL, displayName: "Danny Admin",
    firstName: "דני", businessName: "AutoLead", role: "admin",
    subscriptionStatus: "active", createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString()
  };
  const demoUser = {
    uid: crypto.randomUUID(), email: "demo-business@autolead.app",
    displayName: "אסי כהן", firstName: "אסי", businessName: "כהן מיזוג",
    role: "business", subscriptionStatus: "active",
    createdAt: new Date().toISOString(), lastLoginAt: new Date().toISOString(),
    activatedAt: new Date().toISOString()
  };
  const initial = {
    sessionUserId: null, users: [admin, demoUser],
    leads: seedLeads(demoUser.uid), activities: [], adminLogs: []
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function validRememberSession() {
  return Number(localStorage.getItem(REMEMBER_KEY) || 0) > Date.now();
}
function validAdminSession() {
  return Number(localStorage.getItem(ADMIN_AUTH_KEY) || 0) > Date.now();
}

function saveState() {
  const user = state.users.find((u) => u.uid === currentUserId);
  const canRemember = validRememberSession() && (!user || user.role !== "admin" || validAdminSession());
  state.sessionUserId = canRemember ? currentUserId : null;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ─── FIREBASE ─────────────────────────────────────────────────────────────────
async function initCloud() {
  const cfg = window.AUTOLEAD_FIREBASE_CONFIG;
  if (!cfg?.enabled) return null;
  if (cloudReady) return cloudReady;
  cloudReady = Promise.all([
    import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"),
    import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js")
  ]).then(async ([appSdk, authSdk, dbSdk]) => {
    const firebaseApp = appSdk.initializeApp(cfg.firebaseConfig);
    const auth = authSdk.getAuth(firebaseApp);
    await authSdk.setPersistence(auth, authSdk.browserLocalPersistence);
    const db = dbSdk.getFirestore(firebaseApp);
    cloud = { cfg, auth, db, authSdk, dbSdk };
    return cloud;
  }).catch((err) => {
    console.error("Firebase init failed", err);
    toast("לא הצלחתי להתחבר ל-Firebase. בודקים אינטרנט.");
    return null;
  });
  return cloudReady;
}

function stopCloudSync() {
  cloudUnsubscribers.forEach((u) => { try { u(); } catch (e) { console.warn(e); } });
  cloudUnsubscribers = [];
}

async function cloudLogin(formData) {
  const api = await initCloud();
  if (!api) return null;
  const provider = new api.authSdk.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const result = await api.authSdk.signInWithPopup(api.auth, provider);
  const authUser = result.user;
  const email = authUser.email.toLowerCase();
  const typedName = formData.get("displayName")?.trim();
  const typedBusiness = formData.get("businessName")?.trim();
  const role = selectedLoginRole === "admin" && email === ADMIN_EMAIL.toLowerCase() ? "admin" : "business";
  if (selectedLoginRole === "admin" && email !== ADMIN_EMAIL.toLowerCase()) {
    await api.authSdk.signOut(api.auth);
    toast("רק חשבון המנהל יכול להיכנס למסך ניהול");
    return null;
  }
  const userRef = api.dbSdk.doc(api.db, "users", authUser.uid);
  const userSnap = await api.dbSdk.getDoc(userRef);
  const existing = userSnap.exists() ? userSnap.data() : {};
  const displayName = typedName || existing.displayName || authUser.displayName || email.split("@")[0];
  const user = {
    uid: authUser.uid, email, displayName,
    firstName: existing.firstName || displayName.split(" ")[0],
    businessName: typedBusiness || existing.businessName || "עסק חדש",
    role, subscriptionStatus: role === "admin" ? "active" : existing.subscriptionStatus || "pending",
    settings: existing.settings || {},
    createdAt: existing.createdAt || new Date().toISOString(),
    lastLoginAt: new Date().toISOString()
  };
  await api.dbSdk.setDoc(userRef, user, { merge: true });
  upsertLocalUser(user);
  currentUserId = user.uid;
  subscribeCloudData(user);
  return user;
}

function upsertLocalUser(user) {
  const idx = state.users.findIndex((u) => u.uid === user.uid || u.email?.toLowerCase() === user.email?.toLowerCase());
  if (idx >= 0) state.users[idx] = { ...state.users[idx], ...user };
  else state.users.push(user);
}

function subscribeCloudData(user) {
  if (!cloud) return;
  stopCloudSync();
  const { db, dbSdk } = cloud;
  if (user.role === "admin") {
    cloudUnsubscribers.push(dbSdk.onSnapshot(dbSdk.collection(db, "users"), (snap) => {
      const cu = snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
      state.users = [...cu, ...state.users.filter((u) => u.role === "admin" && !cu.some((c) => c.uid === u.uid))];
      saveState(); render();
    }));
    cloudUnsubscribers.push(dbSdk.onSnapshot(dbSdk.collection(db, "leads"), (snap) => {
      state.leads = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      saveState(); render();
    }));
    return;
  }
  cloudUnsubscribers.push(dbSdk.onSnapshot(dbSdk.doc(db, "users", user.uid), (snap) => {
    if (!snap.exists()) return;
    upsertLocalUser({ uid: snap.id, ...snap.data() });
    saveState(); render();
  }));
  cloudUnsubscribers.push(dbSdk.onSnapshot(
    dbSdk.query(dbSdk.collection(db, "leads"), dbSdk.where("ownerUid", "==", user.uid)),
    (snap) => {
      const others = state.leads.filter((l) => l.ownerUid !== user.uid);
      state.leads = [...others, ...snap.docs.map((d) => ({ id: d.id, ...d.data() }))];
      saveState(); render();
    }
  ));
}

async function cloudSetUser(user) {
  const api = await initCloud();
  if (!api) return;
  await api.dbSdk.setDoc(api.dbSdk.doc(api.db, "users", user.uid), user, { merge: true });
}
async function cloudDeleteUser(uid) {
  const api = await initCloud();
  if (!api) return;
  const batch = api.dbSdk.writeBatch(api.db);
  batch.delete(api.dbSdk.doc(api.db, "users", uid));
  state.leads.filter((l) => l.ownerUid === uid).forEach((l) => batch.delete(api.dbSdk.doc(api.db, "leads", l.id)));
  await batch.commit();
}
async function cloudSetLead(lead) {
  const api = await initCloud();
  if (!api) return;
  await api.dbSdk.setDoc(api.dbSdk.doc(api.db, "leads", lead.id), lead, { merge: true });
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function currentUser()  { return state.users?.find((u) => u.uid === currentUserId) || null; }
function currentAdmin() { return state.users?.find((u) => u.uid === state.supportAdminId) || null; }

function userLeads(uid = currentUserId) {
  return (state.leads || []).filter((l) => l.ownerUid === uid)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

function isAdmin(user = currentUser()) {
  const direct = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() || user?.role === "admin";
  return direct || Boolean(currentAdmin());
}

function needsFollowUp(lead) {
  if (!lead.nextFollowUpDate || ["נסגר", "אבוד"].includes(lead.status)) return false;
  return lead.nextFollowUpDate <= new Date().toISOString().slice(0, 10);
}

function greeting(user) {
  const h = new Date().getHours();
  if (h >= 5  && h < 12) return t("greetingMorning");
  if (h >= 12 && h < 17) return t("greetingNoon");
  if (h >= 17 && h < 22) return t("greetingEvening");
  return t("greetingNight");
}

function firstName(user) { return user.firstName || user.displayName?.split(" ")[0] || ""; }
function initials(name = "A") { return (name || "A").trim().slice(0, 2).toUpperCase(); }

function statusText(s) {
  if (s === "active")   return t("statActive").split(" ")[0] || "פעיל";
  if (s === "pending")  return t("pendingStatus");
  return currentLang() === "ru" ? "Неактивна" : currentLang() === "en" ? "Inactive" : "לא פעיל";
}

function statusPillCls(status) { return STATUS_CLS[status] || "s-new"; }

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("he-IL", { day: "2-digit", month: "2-digit" }).format(new Date(value + "T12:00:00"));
}
function formatDateTime(iso) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("he-IL", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

function cleanPhone(p) { return String(p || "").replace(/[^\d+]/g, ""); }
function escapeHtml(v) {
  return String(v ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;")
    .replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}
function toast(msg, action) {
  const node = document.createElement("div");
  node.className = "toast";
  if (action) {
    node.innerHTML = `<span>${escapeHtml(msg)}</span><button class="toast-undo-btn">${action.label}</button>`;
    node.querySelector(".toast-undo-btn").addEventListener("click", () => {
      action.fn();
      node.remove();
    });
    setTimeout(() => node.remove(), 5000);
  } else {
    node.textContent = msg;
    setTimeout(() => node.remove(), 3000);
  }
  toastHost.appendChild(node);
}
function waLink(lead) {
  const fn = whatsappTemplates[lead.status] || whatsappTemplates["חדש"];
  return `https://wa.me/972${lead.phone.replace(/^0/, "")}?text=${encodeURIComponent(fn(lead))}`;
}

function seedLeads(ownerUid) {
  const now = new Date();
  const tmr = new Date(now); tmr.setDate(now.getDate() + 1);
  const yest = new Date(now); yest.setDate(now.getDate() - 1);
  return [
    { id: crypto.randomUUID(), ownerUid, customerName: "רחל גבאי", phone: "0509876543",
      city: "חולון", source: "וואטסאפ", serviceRequested: "התקנת מזגן חדש",
      status: "הצעה נשלחה", priority: "חשוב", quoteAmount: 4200,
      nextFollowUpDate: tmr.toISOString().slice(0, 10), notes: "ביקשה לבדוק מול בעלה.",
      createdAt: now.toISOString(), updatedAt: now.toISOString() },
    { id: crypto.randomUUID(), ownerUid, customerName: "דוד לוי", phone: "0521234567",
      city: "בת ים", source: "טלפון", serviceRequested: "תיקון מזגן מיני מרכזי",
      status: "בטיפול", priority: "דחוף", quoteAmount: 0,
      nextFollowUpDate: yest.toISOString().slice(0, 10), notes: "לא ענה לשיחה הראשונה.",
      createdAt: now.toISOString(), updatedAt: now.toISOString() }
  ];
}

function calculateStats(leads) {
  const now = new Date(); const month = now.getMonth(); const year = now.getFullYear();
  const closedMonth = leads.filter((l) => l.status === "נסגר" && (() => {
    const d = new Date(l.closedAt || l.updatedAt);
    return d.getMonth() === month && d.getFullYear() === year;
  })());
  const lostCount = leads.filter((l) => l.status === "אבוד").length;
  const decided = closedMonth.length + lostCount;
  return {
    newLeads:   leads.filter((l) => l.status === "חדש").length,
    followUps:  leads.filter((l) => needsFollowUp(l)).length,
    openQuotes: leads.filter((l) => l.status === "הצעה נשלחה").length,
    closed:     closedMonth.length,
    revenue:    closedMonth.reduce((s, l) => s + (Number(l.quoteAmount) || 0), 0),
    closeRate:  decided ? Math.round((closedMonth.length / decided) * 100) : null
  };
}

function pipelineBar(leads) {
  if (!leads.length) return `<div class="pipeline-bar"><div class="pipeline-segment" style="background:var(--line);flex:1"></div></div>`;
  const counts = {};
  statusLabels.forEach((s) => (counts[s] = 0));
  leads.forEach((l) => { if (l.status in counts) counts[l.status]++; });
  const segs = statusLabels.filter((s) => counts[s] > 0)
    .map((s) => `<div class="pipeline-segment" style="background:${STATUS_COLORS[s]};flex:${counts[s]}"></div>`).join("");
  return `<div class="pipeline-bar">${segs}</div>`;
}

function exportLeadsCSV(leads) {
  if (!leads.length) { toast("אין לידים לייצוא"); return; }
  const headers = ["שם לקוח","טלפון","עיר","מקור","סטטוס","עדיפות","סכום הצעה","תאריך מעקב","הערות","תאריך הוספה"];
  const rows = leads.map(l => [
    l.customerName, l.phone, l.city || "",
    SOURCE_TR[l.source]?.he || l.source || "",
    STATUS_TR[l.status]?.he || l.status || "",
    PRIORITY_TR[l.priority]?.he || l.priority || "",
    l.quoteAmount || "",
    l.nextFollowUpDate || "",
    (l.notes || "").replace(/\n/g, " | "),
    l.createdAt ? l.createdAt.slice(0,10) : ""
  ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(","));

  const csv = "﻿" + [headers.join(","), ...rows].join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `autolead-לידים-${new Date().toISOString().slice(0,10)}.csv`;
  a.click(); URL.revokeObjectURL(url);
  toast("הקובץ הורד ✓");
}

function filterLeads(leads, filter) {
  if (filter === "all")    return leads;
  if (filter === "follow") return leads.filter((l) => needsFollowUp(l));
  return leads.filter((l) => l.status === filter);
}

function addActivity(leadId, type, text) {
  if (!state.activities) state.activities = [];
  state.activities.push({ id: crypto.randomUUID(), leadId, ownerUid: currentUserId, type, text, createdAt: new Date().toISOString() });
}
function leadActivities(leadId) {
  return (state.activities || []).filter((a) => a.leadId === leadId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// ─── RENDER ───────────────────────────────────────────────────────────────────
function render() {
  applyTheme();
  applyLanguage();
  const user = currentUser();
  if (!user) return renderLogin();
  if (user.role === "admin" && !validAdminSession()) {
    currentUserId = null; state.supportAdminId = null; state.sessionUserId = null;
    localStorage.removeItem(REMEMBER_KEY); saveState();
    selectedLoginRole = "admin"; return renderLogin();
  }
  if (!isAdmin(user) && user.subscriptionStatus !== "active") return renderLocked(user);

  // Admin: alert when new pending users appear via real-time sync
  if (isAdmin(user) && !state.supportAdminId) {
    const pending = adminBadgeCount();
    if (lastPendingCount >= 0 && pending > lastPendingCount) {
      const body = t("adminNewRequest") + ` (${pending})`;
      toast(body);
      showNotification("AutoLead", body, "admin-new-request");
    }
    lastPendingCount = pending;
  }

  renderApp(user);
}

function renderSplash() {
  applyTheme();
  app.innerHTML = `<main class="splash"><div class="splash-inner"><div class="splash-logo">AL</div><div class="splash-spinner"></div></div></main>`;
}

function renderLogin() {
  app.innerHTML = `
    <main class="hero-login">
      <section class="login-card">
        <div class="brand-badge">AL</div>
        <h1>AutoLead</h1>
        <p>${t("loginDesc")}</p>
        <div class="role-choice">
          <button class="role-card ${selectedLoginRole==="admin"?"active":""}" data-action="select-login-role" data-role="admin">
            <strong>${t("adminLoginCard")}</strong><span>${t("adminLoginDesc")}</span>
          </button>
          <button class="role-card ${selectedLoginRole==="business"?"active":""}" data-action="select-login-role" data-role="business">
            <strong>${t("businessLoginCard")}</strong><span>${t("businessLoginDesc")}</span>
          </button>
        </div>
        <form class="login-actions" id="loginForm">
          <div class="field"><label>${t("emailField")}</label><input name="email" type="email" autocomplete="email" placeholder="example@gmail.com" required /></div>
          ${selectedLoginRole==="admin" ? `<div class="field"><label>${t("adminPasswordField")}</label><input name="adminPassword" type="password" autocomplete="current-password" placeholder="••••••" required /></div>` : ""}
          <div class="field"><label>${t("displayNameField")}</label><input name="displayName" autocomplete="name" placeholder="${t("displayNamePlaceholder")}" /></div>
          <div class="field"><label>${t("businessNameField")}</label><input name="businessName" placeholder="${t("businessNamePlaceholder")}" /></div>
          <label class="remember-row"><input name="rememberMe" type="checkbox" checked /><span>${t("rememberMe")}</span></label>
          <button class="primary-button" type="submit" style="width:100%">${selectedLoginRole==="admin" ? t("adminLoginBtn") : t("loginBtn")}</button>
        </form>
        ${window.AUTOLEAD_FIREBASE_CONFIG?.enabled ? "" : `<button class="secondary-button" style="width:100%;margin-top:8px" data-action="login-demo">${t("demoBtn")}</button>`}
        <p class="meta-text" style="margin-top:12px;text-align:center">${t("loginNote")}</p>
      </section>
    </main>`;
}

function renderLocked(user) {
  app.innerHTML = `
    <main class="screen">
      ${topbar(user)}
      <section class="notice-card" style="margin-top:24px">
        <span class="status-pill status-pending">${t("pendingStatus")}</span>
        <h2>${greeting(user)}, ${firstName(user)}</h2>
        <p>${t("lockedBody")}</p>
        <div class="onboarding-steps">
          <div class="onboarding-step"><span class="step-num">1</span><div class="step-body"><strong>${t("step1Title")}</strong><p>${t("step1Body")}</p></div></div>
          <div class="onboarding-step"><span class="step-num">2</span><div class="step-body"><strong>${t("step2Title")}</strong><p>${t("step2Body")}</p></div></div>
          <div class="onboarding-step"><span class="step-num">3</span><div class="step-body"><strong>${t("step3Title")}</strong><p>${t("step3Body")}</p></div></div>
        </div>
        <button class="primary-button" style="width:100%" data-action="whatsapp-admin">${icWA(16)} ${t("contactAdmin")}</button>
        <button class="secondary-button" style="width:100%" data-action="logout">${t("logout")}</button>
      </section>
    </main>`;
}

function renderApp(user) {
  const content = isAdmin(user) && activeView === "admin" ? adminView() : businessView(user);
  app.innerHTML = `
    <main class="screen">
      ${topbar(user)}
      ${state.supportAdminId ? `
        <section class="notice-card" style="margin-bottom:14px">
          <span class="status-pill status-pending">${t("supportBanner")}</span>
          <p>${t("supportViewing")} <strong>${escapeHtml(user.displayName)}</strong>.</p>
          <button class="secondary-button" data-action="exit-support">${t("backToAdmin")}</button>
        </section>` : ""}
      ${content}
      ${bottomNav(user)}
    </main>`;
}

// ─── TOPBAR & NAV ─────────────────────────────────────────────────────────────
function topbar(user) {
  return `
    <header class="topbar">
      <div class="brand"><span class="brand-badge">AL</span><span>AutoLead</span></div>
      <div class="top-actions">
        <button class="icon-button" data-action="toggle-theme">${state.theme==="dark" ? ic("sun",17) : ic("moon",17)}</button>
        <button class="icon-button" data-action="install">${ic("download",17)}</button>
        <button class="avatar" data-action="logout" title="${t("signOut")}">${initials(user.displayName)}</button>
      </div>
    </header>`;
}

function bottomNav(user) {
  const adminMode = isAdmin(user);
  const items = [
    ["dashboard", ic("home",22),  t("dashboard")],
    ["leads",     ic("users",22), t("leads")],
    ["add",       ic("plus",24),  t("add")],
    ["follow",    ic("clock",22), t("follow")],
    [adminMode?"admin":"settings", adminMode?ic("shield",22):ic("gear",22), adminMode?t("admin"):t("settings")]
  ];
  return `
    <nav class="bottom-nav">
      ${items.map(([view, iconHtml, label]) => {
        if (view === "add") return `<button class="nav-item nav-add" data-action="open-add"><span class="add-circle">${iconHtml}</span><span>${label}</span></button>`;
        let badge = "";
        if (view === "admin" && adminBadgeCount() > 0) {
          badge = `<span class="nav-badge">${adminBadgeCount()}</span>`;
        } else if (view === "leads") {
          const newCount = userLeads(user.uid).filter(l => l.status === "חדש").length;
          if (newCount > 0) badge = `<span class="nav-badge nav-badge-blue">${newCount}</span>`;
        } else if (view === "follow") {
          const today = new Date().toISOString().slice(0,10);
          const urgentCount = userLeads(user.uid).filter(l => needsFollowUp(l) && l.nextFollowUpDate <= today).length;
          if (urgentCount > 0) badge = `<span class="nav-badge nav-badge-orange">${urgentCount}</span>`;
        }
        return `<button class="nav-item ${activeView===view?"active":""}" data-view="${view}"><span class="nav-icon-wrap">${iconHtml}${badge}</span><span>${label}</span></button>`;
      }).join("")}
    </nav>`;
}

// ─── VIEWS ────────────────────────────────────────────────────────────────────
function businessView(user) {
  if (activeView==="leads")    return leadsView(user);
  if (activeView==="follow")   return followView(user);
  if (activeView==="settings") return settingsView(user);
  if (activeView==="admin")    return adminView();
  return dashboardView(user);
}

function dashboardView(user) {
  const leads = userLeads(user.uid);
  const stats = calculateStats(leads);
  const urgent = leads.filter((l) => needsFollowUp(l));
  return `
    <section class="section-title">
      <h1>${greeting(user)}, ${firstName(user)} 👋</h1>
      <p>${t("dashSubtitle")}</p>
    </section>
    <section class="stats-grid">
      <article class="stat-card">
        <div class="stat-icon-wrap" style="background:#eff6ff;color:#3b82f6">${ic("users",18)}</div>
        <p>${t("statNewLeads")}</p><strong>${stats.newLeads}</strong>
        <small>${t("statNewHelper")}</small>
      </article>
      <article class="stat-card">
        <div class="stat-icon-wrap" style="background:#fffbeb;color:#d97706">${ic("clock",18)}</div>
        <p>${t("statFollowups")}</p><strong>${stats.followUps}</strong>
        <small>${stats.followUps===1 ? t("statFollowHelper1") : t("statFollowHelper2")}</small>
      </article>
      <article class="stat-card">
        <div class="stat-icon-wrap" style="background:#f5f3ff;color:#7c3aed">${ic("note",18)}</div>
        <p>${t("statOpenQuotes")}</p><strong>${stats.openQuotes}</strong>
        <small>${t("statQuoteHelper")}</small>
      </article>
      <article class="stat-card">
        <div class="stat-icon-wrap" style="background:#f0fdf4;color:#16a34a">${ic("trending",18)}</div>
        <p>${t("statRevenue")}</p>
        <strong>${stats.revenue ? "₪"+stats.revenue.toLocaleString("he-IL") : "—"}</strong>
        <small>${stats.closeRate!==null ? `${t("statRateHelper")} ${stats.closeRate}%` : `${stats.closed} ${t("leadsCount") || ""}`}</small>
      </article>
    </section>
    ${pipelineBar(leads)}
    <section class="card">
      <div class="card-heading">
        <h2>${t("needsAction")}</h2>
        ${urgent.length ? `<span class="chip" style="color:var(--s-waiting)">${urgent.length} ${t("tasksChip")}</span>` : ""}
      </div>
      <div class="needs-list">
        ${urgent.length
          ? urgent.slice(0,5).map((l) => leadCard(l,true)).join("")
          : emptyState(ic("check",26), t("emptyDashTitle"), t("emptyDashBody"), t("emptyDashCta"))}
      </div>
    </section>`;
}

function leadsView(user) {
  const leads = userLeads(user.uid);
  const filters = [["all", t("filterAll")], ...statusLabels.map((s) => [s, tStatus(s)]), ["follow", t("filterFollow")]];
  const filtered = filterLeads(leads, activeFilter);
  return `
    <section class="section-title">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
        <h1 style="margin:0">${t("leads")}</h1>
        <button class="icon-button" data-action="export-leads" title="ייצוא לאקסל" aria-label="ייצוא לידים לאקסל">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        </button>
      </div>
      <p>${t("leadsSubtitle")}</p>
    </section>
    <div class="search-row">
      <input id="leadSearch" type="search" placeholder="${t("searchPlaceholder")}" />
      <button class="icon-button">${ic("search",18)}</button>
    </div>
    <div class="filter-row">
      ${filters.map(([f,label]) => `<button class="filter-chip ${activeFilter===f?"active":""}" data-action="set-filter" data-filter="${f}">${label}</button>`).join("")}
    </div>
    <section class="lead-list" id="leadList">
      ${filtered.length ? filtered.map((l) => leadCard(l)).join("") : emptyState(ic("users",26), t("emptyLeadsTitle"), t("emptyLeadsBody"), t("emptyLeadsCta"))}
    </section>`;
}

function followView(user) {
  const today = new Date().toISOString().slice(0,10);
  const leads  = userLeads(user.uid).filter((l) => needsFollowUp(l));
  const overdue   = leads.filter((l) => l.nextFollowUpDate < today);
  const todayLeads = leads.filter((l) => l.nextFollowUpDate === today);
  return `
    <section class="section-title"><h1>${t("followTitle")}</h1><p>${t("followSubtitle")}</p></section>
    ${overdue.length ? `<div class="follow-group-label urgency-overdue"><span class="urgency-dot"></span>${t("overdueGroup")} (${overdue.length})</div><section class="lead-list">${overdue.map((l) => leadCard(l,true)).join("")}</section>` : ""}
    ${todayLeads.length ? `<div class="follow-group-label urgency-today"><span class="urgency-dot"></span>${t("todayGroup")} (${todayLeads.length})</div><section class="lead-list">${todayLeads.map((l) => leadCard(l,true)).join("")}</section>` : ""}
    ${!leads.length ? emptyState(ic("check",28), t("emptyFollowTitle"), t("emptyFollowBody"), "") : ""}`;
}

function formatReminderInterval(minutes) {
  const lang = state.language || "he";
  const m = Number(minutes);
  const h = m / 60;
  const isWhole = Number.isInteger(h);

  if (lang === "he") {
    if (m === 30)  return "כל חצי שעה";
    if (m === 60)  return "כל שעה";
    if (m === 90)  return "כל שעה וחצי";
    if (m === 120) return "כל שעתיים";
    if (isWhole)   return `כל ${h} שעות`;
    return `כל ${h} שעות`;
  }
  if (lang === "ru") {
    if (m === 30)  return "Каждые 30 мин";
    if (m === 60)  return "Каждый час";
    if (m < 60)    return `Каждые ${m} мин`;
    if (isWhole)   return h === 1 ? "Каждый час" : `Каждые ${h} ${h < 5 ? "часа" : "часов"}`;
    return `Каждые ${h} часа`;
  }
  // en
  if (m < 60)    return `Every ${m} min`;
  if (m === 60)  return "Every 1 hour";
  if (isWhole)   return `Every ${h} hours`;
  return `Every ${h} hours`;
}

function reminderIntervalOptions(selected) {
  const sel = String(selected || "60");
  let html = "";
  for (let m = 30; m <= 1440; m += 30) {
    html += `<option value="${m}"${sel === String(m) ? " selected" : ""}>${formatReminderInterval(m)}</option>`;
  }
  return html;
}

function settingsView(user) {
  const s = user.settings || {};
  const remindersEnabled = s.remindersEnabled ?? false;
  const reminderInterval = s.reminderInterval || "60";
  const dailyMorning     = s.dailyMorningReminder ?? false;
  const language = s.language || state.language || "he";
  const joinDate = user.createdAt ? formatDate(user.createdAt.slice(0, 10)) : "";
  const perm = notifPermStatus();
  const permBadge = {
    granted:     `<span class="notif-badge notif-granted">${t("notifPermGranted")}</span>`,
    denied:      `<span class="notif-badge notif-denied">${t("notifPermDenied")}</span>`,
    default:     `<span class="notif-badge notif-default">${t("notifPermDefault")}</span>`,
    unsupported: `<span class="notif-badge notif-muted">${t("notifPermUnsupported")}</span>`,
  }[perm] || "";

  return `
    <section class="section-title"><h1>${t("settingsTitle")}</h1><p>${t("notifSectionText")}</p></section>
    <section class="settings-list">

      <article class="setting-row">
        <div class="setting-title">
          <div style="display:flex;align-items:center;gap:8px">${ic("bell",18)}<strong>${t("notifSectionTitle")}</strong></div>
          ${permBadge}
        </div>
        <p class="meta-text" style="margin:0">${t("notifPermText")}</p>
        ${perm === "granted"
          ? `<button class="secondary-button" style="width:100%" data-action="test-notif">${ic("bell",15)} ${t("notifTestBtn")}</button>`
          : perm === "denied"
          ? `<div style="padding:10px 12px;background:var(--s-lost-bg);border-radius:12px;font-size:0.85rem;color:var(--s-lost)">${t("notifPermDenied")}</div>`
          : perm === "unsupported"
          ? `<div style="padding:10px 12px;background:var(--surface-2);border-radius:12px;font-size:0.85rem;color:var(--muted)">${t("notifPermUnsupported")}</div>`
          : `<button class="primary-button" style="width:100%" data-action="request-notif-permission">${ic("bell",16)} ${t("notifPermBtn")}</button>`}
        <hr style="border:0;border-top:1px solid var(--line);margin:2px 0">
        <div class="setting-title">
          <div><strong>${t("autoRemindersTitle")}</strong><p class="meta-text">${t("autoRemindersText")}</p></div>
          <label class="toggle"><input type="checkbox" data-action="toggle-reminders" ${remindersEnabled ? "checked" : ""} /><span></span></label>
        </div>
        ${remindersEnabled ? `
        <div class="field">
          <label>${t("reminderIntervalLabel")}</label>
          <select data-action="change-reminder-interval">
            ${reminderIntervalOptions(reminderInterval)}
          </select>
        </div>` : ""}
        <hr style="border:0;border-top:1px solid var(--line);margin:2px 0">
        <div class="setting-title">
          <div><strong>${t("dailyMorningTitle")}</strong><p class="meta-text">${t("dailyMorningText")}</p></div>
          <label class="toggle"><input type="checkbox" data-action="toggle-daily-morning" ${dailyMorning ? "checked" : ""} /><span></span></label>
        </div>
      </article>

      <article class="setting-row">
        <div class="setting-title">
          <div style="display:flex;align-items:center;gap:8px">${ic("globe",18)}<strong>${t("language")}</strong></div>
        </div>
        <div class="field">
          <select data-action="change-language">
            <option value="he" ${language === "he" ? "selected" : ""}>🇮🇱 עברית</option>
            <option value="en" ${language === "en" ? "selected" : ""}>🇺🇸 English</option>
            <option value="ru" ${language === "ru" ? "selected" : ""}>🇷🇺 Русский</option>
          </select>
        </div>
      </article>

      <section class="card install-card">
        <h2>${t("install")}</h2>
        <p class="meta-text">${t("installText")}</p>
        <button class="primary-button" style="width:100%" data-action="install">${ic("download",16)} ${t("installButton")}</button>
      </section>

      <section class="card" style="display:grid;gap:10px">
        <div style="display:flex;align-items:center;gap:12px">
          <div class="brand-badge" style="width:44px;height:44px;border-radius:14px;font-size:1.1rem">${initials(user.displayName)}</div>
          <div>
            <strong style="display:block">${escapeHtml(user.displayName)}</strong>
            <p class="meta-text" style="margin:0">${escapeHtml(user.email)}</p>
            ${user.businessName ? `<p class="meta-text" style="margin:0">${escapeHtml(user.businessName)}</p>` : ""}
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <span class="status-pill status-active">${t("active")}</span>
          ${joinDate ? `<span class="chip">${t("joinedDate")} ${joinDate}</span>` : ""}
        </div>
        <button class="secondary-button" style="width:100%" data-action="logout">${t("signOut")}</button>
      </section>
    </section>`;
}

function adminView() {
  const biz = state.users.filter((u) => u.role !== "admin");
  const pending = biz.filter((u) => u.subscriptionStatus === "pending").length;
  const active  = biz.filter((u) => u.subscriptionStatus === "active").length;
  const totalRev = biz.reduce((sum, u) => sum + userLeads(u.uid).filter((l) => l.status==="נסגר").reduce((s,l) => s+(Number(l.quoteAmount)||0), 0), 0);
  return `
    <section class="section-title"><h1>${t("adminTitle")}</h1><p>${t("adminSubtitle")}</p></section>
    <section class="stats-grid">
      <article class="stat-card">
        <div class="stat-icon-wrap" style="background:#fffbeb;color:#d97706">${ic("bell",18)}</div>
        <p>${t("statPending")}</p><strong>${pending}</strong><small>${t("statPendingHelper")}</small>
      </article>
      <article class="stat-card">
        <div class="stat-icon-wrap" style="background:#f0fdf4;color:#16a34a">${ic("users",18)}</div>
        <p>${t("statActive")}</p><strong>${active}</strong><small>${t("statActiveHelper")}</small>
      </article>
    </section>
    ${totalRev>0 ? `<div class="card" style="margin-bottom:14px;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px"><div><p class="meta-text" style="margin:0">${t("totalRevenue")}</p><strong style="font-size:1.4rem">₪${totalRev.toLocaleString("he-IL")}</strong></div><div style="color:var(--s-closed)">${ic("trending",24)}</div></div>` : ""}
    <section class="admin-list">
      ${biz.length ? biz.map(adminUserCard).join("") : emptyState(ic("users",26), t("emptyAdminTitle"), t("emptyAdminBody"), "")}
    </section>`;
}

function adminUserCard(user) {
  const count   = userLeads(user.uid).length;
  const revenue = userLeads(user.uid).filter((l) => l.status==="נסגר").reduce((s,l) => s+(Number(l.quoteAmount)||0), 0);
  return `
    <article class="admin-user-card">
      <div class="admin-user-top">
        <div class="admin-avatar">${initials(user.displayName)}</div>
        <div class="admin-user-info">
          <strong>${escapeHtml(user.displayName)}</strong>
          <p class="meta-text" style="margin:0">${escapeHtml(user.email)}</p>
          <p class="meta-text" style="margin:0">${escapeHtml(user.businessName||t("unknownBusiness"))} · ${count} ${t("leadsCount")}${revenue ? ` · ₪${revenue.toLocaleString("he-IL")}` : ""}</p>
        </div>
        <span class="status-pill status-${user.subscriptionStatus}">${statusText(user.subscriptionStatus)}</span>
      </div>
      <div class="admin-user-actions">
        <button class="activate"   data-action="activate-user"   data-user-id="${user.uid}">${ic("check",14)} ${t("activateBtn")}</button>
        <button class="deactivate" data-action="deactivate-user" data-user-id="${user.uid}">${ic("alert",14)} ${t("deactivateBtn")}</button>
        <button                    data-action="support-user"    data-user-id="${user.uid}">${ic("support",14)} ${t("supportBtn")}</button>
        <button class="remove"     data-action="remove-user"     data-user-id="${user.uid}">${ic("trash",14)} ${t("removeBtn")}</button>
      </div>
    </article>`;
}

function leadCard(lead, compact = false) {
  const cls  = statusPillCls(lead.status);
  const pcls = PRIORITY_CLS[lead.priority] || "priority-normal";
  return `
    <article class="lead-card ${pcls}" data-lead-id="${lead.id}">
      <div class="lead-top">
        <div class="lead-main">
          <strong>${escapeHtml(lead.customerName)}</strong>
          <small>${escapeHtml(lead.phone)}${lead.city ? ` · ${escapeHtml(lead.city)}` : ""}</small>
        </div>
        <span class="status-pill ${cls}">${tStatus(lead.status)}</span>
      </div>
      <div class="lead-meta">
        ${lead.priority!=="רגיל" ? `<span class="chip" style="color:${lead.priority==="דחוף"?"var(--s-lost)":"var(--primary)"}">${tPriority(lead.priority)}</span>` : ""}
        <span class="chip">${ic("tag",12)} ${tSource(lead.source)}</span>
        ${lead.quoteAmount ? `<span class="chip">₪${Number(lead.quoteAmount).toLocaleString("he-IL")}</span>` : ""}
        ${lead.nextFollowUpDate ? `<span class="chip">${ic("calendar",12)} ${formatDate(lead.nextFollowUpDate)}</span>` : ""}
      </div>
      ${!compact && lead.serviceRequested ? `<p class="meta-text" style="margin:0;font-size:0.84rem">${escapeHtml(lead.serviceRequested)}</p>` : ""}
      <div class="lead-actions">
        <button class="call"      data-action="call-lead"      data-lead-id="${lead.id}">${ic("phone",14)} ${t("callBtn")}</button>
        <button class="whatsapp"  data-action="whatsapp-lead"  data-lead-id="${lead.id}">${icWA(14)} ${t("whatsappBtn")}</button>
        <button                   data-action="open-status"    data-lead-id="${lead.id}">${ic("edit",14)} ${t("statusBtn")}</button>
      </div>
    </article>`;
}

function emptyState(iconHtml, title, body, cta) {
  return `
    <div class="empty-state">
      <div class="empty-state-icon">${iconHtml}</div>
      <strong>${title}</strong><p>${body}</p>
      ${cta ? `<button class="primary-button" data-action="open-add">${cta}</button>` : ""}
    </div>`;
}

// ─── SHEETS ───────────────────────────────────────────────────────────────────
function openSheet(html) {
  closeSheet();
  const w = document.createElement("div");
  w.className = "sheet-backdrop";
  w.innerHTML = `<section class="sheet">${html}</section>`;
  document.body.appendChild(w);
}
function closeSheet() { document.querySelector(".sheet-backdrop")?.remove(); }

function openAddLeadSheet() {
  const srcOptions = sources.map((s) => `<option value="${s}">${tSource(s)}</option>`).join("");
  const priButtons = priorities.map((p,i) => `<button type="button" class="${i===0?"active":""}" data-priority="${p}">${tPriority(p)}</button>`).join("");
  openSheet(`
    <div class="sheet-header"><h2>${t("addLeadTitle")}</h2><button class="icon-button" data-action="close-sheet">${ic("close",16)}</button></div>
    <form class="sheet-form" id="addLeadForm">
      <div class="field"><label>${t("customerNameField")}</label><input name="customerName" required placeholder="${t("displayNamePlaceholder")}" /></div>
      <div class="field"><label>${t("phoneFieldLabel")}</label><input name="phone" required inputmode="tel" placeholder="050-0000000" /></div>
      <div class="field"><label>${t("cityFieldLabel")}</label><input name="city" /></div>
      <div class="field"><label>${t("sourceFieldLabel")}</label><select name="source">${srcOptions}</select></div>
      <div class="field-group"><span>${t("priorityFieldLabel")}</span><div class="segmented">${priButtons}</div><input type="hidden" name="priority" value="רגיל" /></div>
      <div class="field"><label>${t("serviceFieldLabel")}</label><textarea name="serviceRequested"></textarea></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="field"><label>${t("nextFollowLabel")}</label><input name="nextFollowUpDate" type="date" /></div>
        <div class="field"><label>${t("followUpTime")}</label><input name="nextFollowUpTime" type="time" value="09:00" /></div>
      </div>
      <div class="field">
        <label>${t("reminderBeforeLabel")}</label>
        <select name="reminderBefore">
          <option value="15">${t("reminderBefore15")}</option>
          <option value="30" selected>${t("reminderBefore30")}</option>
          <option value="60">${t("reminderBefore60")}</option>
          <option value="120">${t("reminderBefore120")}</option>
        </select>
      </div>
      <div class="field"><label>${t("firstNoteLabel")}</label><textarea name="notes"></textarea></div>
      <div class="sheet-actions">
        <button type="button" class="secondary-button" data-action="close-sheet">${t("cancel")}</button>
        <button class="primary-button" type="submit">${t("saveLead")}</button>
      </div>
    </form>`);
}

function openStatusSheet(leadId) {
  activeLeadId = leadId;
  const lead = state.leads.find((l) => l.id === leadId);
  if (!lead) return;
  const statusOptions = statusLabels.map((s) => `<option value="${s}" ${s===lead.status?"selected":""}>${tStatus(s)}</option>`).join("");
  openSheet(`
    <div class="sheet-header"><h2>${t("updateStatusTitle")}</h2><button class="icon-button" data-action="close-sheet">${ic("close",16)}</button></div>
    <form class="sheet-form" id="statusForm">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;background:var(--surface-2);border:1px solid var(--line);border-radius:12px">
        <div><strong style="font-size:1rem">${escapeHtml(lead.customerName)}</strong><p class="meta-text" style="margin:0">${escapeHtml(lead.phone)}</p></div>
        <span class="status-pill ${statusPillCls(lead.status)}">${tStatus(lead.status)}</span>
      </div>
      <div class="field"><label>${t("newStatusField")}</label><select name="status">${statusOptions}</select></div>
      <div class="field"><label>${t("quoteSumField")}</label><input name="quoteAmount" inputmode="numeric" value="${lead.quoteAmount||""}" placeholder="0" /></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="field"><label>${t("nextFollowDateField")}</label><input name="nextFollowUpDate" type="date" value="${lead.nextFollowUpDate||""}" /></div>
        <div class="field"><label>${t("followUpTime")}</label><input name="nextFollowUpTime" type="time" value="${lead.nextFollowUpTime||""}" /></div>
      </div>
      <div class="field">
        <label>${t("reminderBeforeLabel")}</label>
        <select name="reminderBefore">
          <option value="15" ${lead.reminderBefore==="15"?"selected":""}>${t("reminderBefore15")}</option>
          <option value="30" ${!lead.reminderBefore||lead.reminderBefore==="30"?"selected":""}>${t("reminderBefore30")}</option>
          <option value="60" ${lead.reminderBefore==="60"?"selected":""}>${t("reminderBefore60")}</option>
          <option value="120"${lead.reminderBefore==="120"?"selected":""}>${t("reminderBefore120")}</option>
        </select>
      </div>
      <div class="field"><label>${t("callNoteField")}</label><textarea name="note"></textarea></div>
      <div class="sheet-actions">
        <button type="button" class="secondary-button" data-action="close-sheet">${t("cancel")}</button>
        <button class="primary-button" type="submit">${t("updateBtn")}</button>
      </div>
    </form>`);
}

function openLeadDetailSheet(leadId) {
  const lead = state.leads.find((l) => l.id === leadId);
  if (!lead) return;
  const acts = leadActivities(leadId);
  const timelineHtml = acts.length
    ? acts.map((a) => `<div class="timeline-item"><div class="timeline-track"><div class="timeline-dot">${ic("activity",11)}</div><div class="timeline-line"></div></div><div class="timeline-content"><div class="timeline-text">${escapeHtml(a.text)}</div><div class="timeline-time">${formatDateTime(a.createdAt)}</div></div></div>`).join("")
    : `<div class="timeline-item"><div class="timeline-track"><div class="timeline-dot">${ic("check",11)}</div><div class="timeline-line"></div></div><div class="timeline-content"><div class="timeline-text">${t("activityCreated")}</div><div class="timeline-time">${formatDateTime(lead.createdAt)}</div></div></div>`;
  openSheet(`
    <div class="sheet-header"><h2>${t("leadDetailTitle")}</h2><button class="icon-button" data-action="close-sheet">${ic("close",16)}</button></div>
    <div class="lead-detail-header">
      <h3 class="lead-detail-name">${escapeHtml(lead.customerName)}</h3>
      <div class="lead-detail-meta">
        <span class="status-pill ${statusPillCls(lead.status)}">${tStatus(lead.status)}</span>
        ${lead.priority!=="רגיל" ? `<span class="chip" style="color:${lead.priority==="דחוף"?"var(--s-lost)":"var(--primary)"}">${tPriority(lead.priority)}</span>` : ""}
      </div>
    </div>
    <div class="lead-detail-actions">
      <button class="call" data-action="call-lead" data-lead-id="${lead.id}" style="color:var(--primary);background:var(--blue-soft);border-color:rgba(37,99,235,0.2)">${ic("phone",16)} ${t("callBtn")}</button>
      <button class="whatsapp" data-action="whatsapp-lead" data-lead-id="${lead.id}" style="color:#15803d;background:#f0fdf4;border-color:rgba(22,163,74,0.2)">${icWA(16)} ${t("whatsappBtn")}</button>
      <button data-action="open-status" data-lead-id="${lead.id}" style="background:var(--surface-2);border:1px solid var(--line)">${ic("edit",16)} ${t("updateBtn")}</button>
    </div>
    <div class="detail-section">
      <div class="detail-section-label">${ic("user",13)} ${t("customerInfo")}</div>
      <div class="detail-info-grid">
        <div class="detail-info-item"><span class="detail-info-label">${t("phoneField")}</span><span class="detail-info-value">${escapeHtml(lead.phone)}</span></div>
        ${lead.city ? `<div class="detail-info-item"><span class="detail-info-label">${t("cityField")}</span><span class="detail-info-value">${escapeHtml(lead.city)}</span></div>` : ""}
        <div class="detail-info-item"><span class="detail-info-label">${t("sourceField")}</span><span class="detail-info-value">${tSource(lead.source||"")}</span></div>
        <div class="detail-info-item"><span class="detail-info-label">${t("addedDate")}</span><span class="detail-info-value">${formatDate(lead.createdAt?.slice(0,10))}</span></div>
        ${lead.serviceRequested ? `<div class="detail-info-item full"><span class="detail-info-label">${t("serviceField")}</span><span class="detail-info-value">${escapeHtml(lead.serviceRequested)}</span></div>` : ""}
      </div>
    </div>
    ${lead.quoteAmount||lead.nextFollowUpDate ? `
    <div class="detail-section">
      <div class="detail-section-label">${ic("trending",13)} ${t("commercial")}</div>
      <div class="detail-info-grid">
        ${lead.quoteAmount ? `<div class="detail-info-item"><span class="detail-info-label">${t("quoteField")}</span><span class="detail-info-value" style="color:var(--s-closed)">₪${Number(lead.quoteAmount).toLocaleString("he-IL")}</span></div>` : ""}
        ${lead.nextFollowUpDate ? `
        <div class="detail-info-item">
          <span class="detail-info-label">${t("nextFollowField")}</span>
          <span class="detail-info-value">${formatDate(lead.nextFollowUpDate)}${lead.nextFollowUpTime ? ` ${t("atTime")} ${lead.nextFollowUpTime}` : ""}</span>
        </div>
        ${lead.nextFollowUpTime ? `
        <div class="detail-info-item">
          <span class="detail-info-label">${t("reminderBeforeLabel")}</span>
          <span class="detail-info-value">${t("reminderBefore" + (lead.reminderBefore || "30"))}</span>
        </div>` : ""}` : ""}
      </div>
    </div>` : ""}
    ${lead.notes ? `<div class="detail-section"><div class="detail-section-label">${ic("note",13)} ${t("notesSection")}</div><div class="detail-note-full">${escapeHtml(lead.notes)}</div></div>` : ""}
    <div class="detail-section"><div class="detail-section-label">${ic("activity",13)} ${t("timeline")}</div><div class="timeline">${timelineHtml}</div></div>`);
}

// ─── ACTIONS ──────────────────────────────────────────────────────────────────
function addLead(form) {
  const data = new FormData(form);
  const now = new Date().toISOString();
  const lead = {
    id: crypto.randomUUID(), ownerUid: currentUserId,
    customerName: data.get("customerName").trim(),
    phone: cleanPhone(data.get("phone")),
    city: data.get("city").trim(), source: data.get("source"),
    serviceRequested: data.get("serviceRequested").trim(),
    status: "חדש", priority: data.get("priority") || "רגיל",
    quoteAmount: 0,
    nextFollowUpDate: data.get("nextFollowUpDate"),
    nextFollowUpTime: data.get("nextFollowUpTime") || "",
    reminderBefore:   data.get("reminderBefore")   || "30",
    notes: data.get("notes").trim(), createdAt: now, updatedAt: now
  };
  state.leads.push(lead);
  addActivity(lead.id, "created", t("activityCreated"));
  saveState();
  cloudSetLead(lead).catch((e) => console.error(e));
  closeSheet(); activeView = "leads"; render();
  toast(t("leadAdded"));
}

function updateLeadStatus(form) {
  const lead = state.leads.find((l) => l.id === activeLeadId);
  const data = new FormData(form);
  if (!lead) return;

  // Snapshot for undo
  const snapshot = { ...lead };

  const oldStatus = lead.status;
  lead.status = data.get("status");
  lead.quoteAmount = Number(data.get("quoteAmount")) || 0;
  lead.nextFollowUpDate = data.get("nextFollowUpDate");
  lead.nextFollowUpTime = data.get("nextFollowUpTime") || lead.nextFollowUpTime || "";
  lead.reminderBefore   = data.get("reminderBefore")   || lead.reminderBefore   || "30";
  const note = data.get("note").trim();
  if (note) lead.notes = lead.notes ? `${lead.notes}\n${note}` : note;
  if (lead.status === "נסגר" && oldStatus !== "נסגר") lead.closedAt = new Date().toISOString();
  lead.updatedAt = new Date().toISOString();
  const actText = oldStatus !== lead.status
    ? `${tStatus(oldStatus)} → ${tStatus(lead.status)}${note ? ` — ${note}` : ""}`
    : note || t("statusUpdated");
  addActivity(lead.id, "status_changed", actText);
  saveState();
  cloudSetLead(lead).catch((e) => console.error(e));
  closeSheet(); render();

  // Undo action when status actually changed
  if (oldStatus !== lead.status) {
    toast(t("statusUpdated"), {
      label: "בטל",
      fn: () => {
        Object.assign(lead, snapshot);
        state.activities = (state.activities || []).filter(a => a.text !== actText || a.leadId !== lead.id);
        saveState();
        cloudSetLead(lead).catch(() => {});
        render();
      }
    });
  } else {
    toast(t("statusUpdated"));
  }
}

function login(type) {
  state.supportAdminId = null;
  localStorage.setItem(REMEMBER_KEY, String(Date.now() + 7*24*60*60*1000));
  if (type==="admin")   currentUserId = state.users.find((u) => u.email===ADMIN_EMAIL)?.uid;
  if (type==="demo")    currentUserId = state.users.find((u) => u.email==="demo-business@autolead.app")?.uid;
  if (type==="pending") {
    const u = { uid: crypto.randomUUID(), email: `new-${Date.now()}@example.com`, displayName: "לקוח חדש", firstName: "לקוח", businessName: "עסק חדש", role: "business", subscriptionStatus: "pending", createdAt: new Date().toISOString(), lastLoginAt: new Date().toISOString() };
    state.users.push(u); currentUserId = u.uid;
  }
  if (type==="admin") { localStorage.setItem(ADMIN_AUTH_KEY, String(Date.now()+7*24*60*60*1000)); activeView="admin"; }
  else activeView="dashboard";
  saveState(); setupReminders(); render();
}

async function loginWithEmail(form) {
  const data = new FormData(form);
  const email = data.get("email").trim().toLowerCase();
  if (selectedLoginRole==="admin" && email!==ADMIN_EMAIL.toLowerCase()) { toast("פרטי מנהל לא תקינים"); return; }
  if (selectedLoginRole==="admin" && data.get("adminPassword")!==ADMIN_PASSWORD) { toast("סיסמת מנהל לא תקינה"); return; }
  if (window.AUTOLEAD_FIREBASE_CONFIG?.enabled) {
    try {
      toast("פותח כניסה מאובטחת עם Google...");
      const user = await cloudLogin(data);
      if (!user) return;
      const rm = data.get("rememberMe")==="on";
      if (rm) localStorage.setItem(REMEMBER_KEY, String(Date.now()+7*24*60*60*1000)); else localStorage.removeItem(REMEMBER_KEY);
      if (user.role==="admin") localStorage.setItem(ADMIN_AUTH_KEY, String(Date.now()+7*24*60*60*1000)); else localStorage.removeItem(ADMIN_AUTH_KEY);
      activeView = user.role==="admin" ? "admin" : "dashboard";
      saveState(); setupReminders(); render();
      toast(user.role==="admin" ? "נכנסת כמנהל ✓" : "הבקשה שלך נשלחה למנהל");
    } catch(e) { console.error(e); toast("הכניסה עם Google לא הושלמה. נסה שוב."); }
    return;
  }
  const displayName = data.get("displayName").trim() || email.split("@")[0];
  const businessName = data.get("businessName").trim() || "עסק חדש";
  const rm = data.get("rememberMe")==="on";
  let user = state.users.find((u) => u.email.toLowerCase()===email);
  if (!user) {
    user = { uid: crypto.randomUUID(), email, displayName, firstName: displayName.split(" ")[0], businessName, role: email===ADMIN_EMAIL.toLowerCase()?"admin":"business", subscriptionStatus: email===ADMIN_EMAIL.toLowerCase()?"active":"pending", createdAt: new Date().toISOString(), lastLoginAt: new Date().toISOString() };
    state.users.push(user);
  } else {
    user.displayName = user.displayName||displayName; user.firstName = user.firstName||displayName.split(" ")[0];
    user.businessName = user.businessName||businessName; user.lastLoginAt = new Date().toISOString();
  }
  currentUserId = user.uid; activeView = user.role==="admin"?"admin":"dashboard";
  if (rm) localStorage.setItem(REMEMBER_KEY, String(Date.now()+7*24*60*60*1000)); else localStorage.removeItem(REMEMBER_KEY);
  if (user.role==="admin") localStorage.setItem(ADMIN_AUTH_KEY, String(Date.now()+7*24*60*60*1000)); else localStorage.removeItem(ADMIN_AUTH_KEY);
  saveState(); setupReminders(); render();
}

function activateUser(uid) {
  const user = state.users.find((u) => u.uid===uid); if (!user) return;
  user.subscriptionStatus="active"; user.activatedAt=new Date().toISOString();
  logAdmin("activate_subscription",uid); saveState();
  cloudSetUser(user).catch((e)=>console.error(e)); render(); toast(t("subscriptionActivated"));
}
function deactivateUser(uid) {
  const user = state.users.find((u) => u.uid===uid); if (!user) return;
  user.subscriptionStatus="inactive"; user.deactivatedAt=new Date().toISOString();
  logAdmin("deactivate_subscription",uid); saveState();
  cloudSetUser(user).catch((e)=>console.error(e)); render(); toast(t("subscriptionDeactivated"));
}
function supportUser(uid) {
  const admin = state.users.find((u) => u.email?.toLowerCase()===ADMIN_EMAIL.toLowerCase());
  state.supportAdminId = admin?.uid||currentUserId;
  logAdmin("view_user_account",uid); currentUserId=uid; saveState(); activeView="dashboard"; render();
  toast(t("supportModeToast"));
}
function removeUser(uid) {
  const user = state.users.find((u) => u.uid===uid); if (!user) return;
  const msg = t("confirmRemoveUser").replace("{name}", user.displayName);
  if (!confirm(msg)) return;
  logAdmin("remove_user",uid);
  state.users      = state.users.filter((u) => u.uid!==uid);
  state.leads      = state.leads.filter((l) => l.ownerUid!==uid);
  state.activities = (state.activities||[]).filter((a) => a.ownerUid!==uid);
  saveState(); cloudDeleteUser(uid).catch((e)=>console.error(e)); render(); toast(t("userRemoved"));
}
function exitSupport() {
  currentUserId=state.supportAdminId; state.supportAdminId=null; activeView="admin"; saveState(); render();
}
function logAdmin(action, targetUid) {
  const target = state.users.find((u) => u.uid===targetUid);
  if (!state.adminLogs) state.adminLogs=[];
  state.adminLogs.push({ id:crypto.randomUUID(), adminEmail:ADMIN_EMAIL, targetUid, targetEmail:target?.email||"", action, timestamp:new Date().toISOString() });
}
function logout() {
  stopCloudSync();
  if (cloud?.auth) cloud.authSdk.signOut(cloud.auth).catch(()=>{});
  currentUserId=null; state.supportAdminId=null;
  localStorage.removeItem(REMEMBER_KEY); localStorage.removeItem(ADMIN_AUTH_KEY);
  clearInterval(reminderTimer);    reminderTimer = null;
  clearInterval(reminderCheckTimer); reminderCheckTimer = null;
  lastPendingCount = -1;
  activeView = "dashboard"; saveState(); render();
}
function applyTheme() { document.body.classList.toggle("dark-mode", state.theme==="dark"); }
function toggleTheme() { state.theme = state.theme==="dark"?"light":"dark"; saveState(); render(); }
function updateUserSettings(patch) {
  const user = currentUser(); if (!user) return;
  user.settings = {...(user.settings||{}), ...patch};
  if (patch.language) state.language = patch.language;
  saveState(); cloudSetUser(user).catch((e)=>console.error(e)); setupReminders(); render();
}
function setupReminders() {
  clearInterval(reminderTimer);    reminderTimer = null;
  clearInterval(reminderCheckTimer); reminderCheckTimer = null;
  const user = currentUser();
  if (!user || user.subscriptionStatus !== "active") return;
  // Always run per-lead time checker every 30s
  reminderCheckTimer = setInterval(checkLeadReminders, 30_000);
  checkLeadReminders();
  if (!user.settings?.remindersEnabled) return;
  const minutes = Number(user.settings.reminderInterval || 60);
  reminderTimer = setInterval(() => {
    const count = userLeads(user.uid).filter((l) => needsFollowUp(l)).length;
    if (count > 0) toast(`${t("reminderToast")} (${count})`);
  }, minutes * 60_000);
}
function handleInstall() {
  if (deferredInstallPrompt) { deferredInstallPrompt.prompt(); return; }
  openSheet(`
    <div class="sheet-header"><h2>${t("installSheetTitle")}</h2><button class="icon-button" data-action="close-sheet">${ic("close",16)}</button></div>
    <div class="sheet-form">
      <div style="display:grid;gap:14px">
        <div style="padding:14px;background:var(--surface-2);border:1px solid var(--line);border-radius:14px">
          <strong style="display:block;margin-bottom:6px">${t("androidInstallTitle")}</strong>
          <p class="meta-text" style="margin:0">${t("androidInstallDesc")}</p>
        </div>
        <div style="padding:14px;background:var(--surface-2);border:1px solid var(--line);border-radius:14px">
          <strong style="display:block;margin-bottom:6px">${t("iosInstallTitle")}</strong>
          <p class="meta-text" style="margin:0">${t("iosInstallDesc")}</p>
        </div>
      </div>
      <button class="primary-button" style="width:100%" data-action="close-sheet">${t("understood")}</button>
    </div>`);
}

// ─── BOOTSTRAP ────────────────────────────────────────────────────────────────
async function bootstrap() {
  state = loadState();
  renderSplash();
  if (window.AUTOLEAD_FIREBASE_CONFIG?.enabled) {
    const api = await initCloud();
    if (api) {
      const authUser = await new Promise((resolve) => {
        const unsub = api.authSdk.onAuthStateChanged(api.auth, (u) => { unsub(); resolve(u); });
      });
      if (authUser && validRememberSession()) {
        const snap = await api.dbSdk.getDoc(api.dbSdk.doc(api.db, "users", authUser.uid));
        if (snap.exists()) {
          const user = { uid: snap.id, ...snap.data() };
          upsertLocalUser(user); currentUserId=user.uid; subscribeCloudData(user);
        }
      } else if (currentUserId) {
        currentUserId=null; state.supportAdminId=null; state.sessionUserId=null; saveState();
      }
    }
  } else if (state.sessionUserId && validRememberSession()) {
    currentUserId = state.sessionUserId;
  }
  render(); setupReminders(); checkMorningReminder();
}

// ─── EVENTS ───────────────────────────────────────────────────────────────────
document.addEventListener("click", (e) => {
  if (!e.target.closest("button, a")) {
    const card = e.target.closest(".lead-card[data-lead-id]");
    if (card) { openLeadDetailSheet(card.dataset.leadId); return; }
  }
  const target = e.target.closest("button, a");
  if (!target) return;
  const action = target.dataset.action;
  const view   = target.dataset.view;
  if (view) { activeView=view; render(); return; }
  if (action==="login-admin")        login("admin");
  if (action==="login-demo")         login("demo");
  if (action==="login-pending")      login("pending");
  if (action==="select-login-role")  { selectedLoginRole=target.dataset.role; render(); }
  if (action==="logout")             logout();
  if (action==="exit-support")       exitSupport();
  if (action==="toggle-theme")       toggleTheme();
  if (action==="open-add")           openAddLeadSheet();
  if (action==="close-sheet")        closeSheet();
  if (action==="open-status") { e.stopPropagation(); const id=target.dataset.leadId||activeLeadId; closeSheet(); openStatusSheet(id); }
  if (action==="call-lead")    { e.stopPropagation(); const l=state.leads.find((x) => x.id===target.dataset.leadId); if(l) window.location.href=`tel:${l.phone}`; }
  if (action==="whatsapp-lead"){ e.stopPropagation(); const l=state.leads.find((x) => x.id===target.dataset.leadId); if(l) window.open(waLink(l),"_blank"); }
  if (action==="set-filter")   { activeFilter=target.dataset.filter; render(); }
  if (action==="go-admin")    { activeView="admin";    render(); }
  if (action==="go-settings") { activeView="settings"; render(); }
  if (action==="activate-user")   activateUser(target.dataset.userId);
  if (action==="deactivate-user") deactivateUser(target.dataset.userId);
  if (action==="support-user")    supportUser(target.dataset.userId);
  if (action==="remove-user")     removeUser(target.dataset.userId);
  if (action==="install")         handleInstall();
  if (action==="export-leads") { const user=currentUser(); if(user) exportLeadsCSV(userLeads(user.uid)); }
  if (action==="request-notif-permission") requestNotifPerm();
  if (action==="test-notif") {
    const user = currentUser();
    const name = user?.firstName || user?.displayName?.split(" ")[0] || "שלך";
    showNotification("AutoLead", `היי ${name} — זוהי תזכורת לדוגמה מ-AutoLead 👋`, "test-notif");
  }
  if (action==="whatsapp-admin")  window.open(`https://wa.me/972534307685?text=${encodeURIComponent("היי, אשמח להפעיל את המנוי שלי ב-AutoLead.")}`, "_blank");
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("sheet-backdrop")) closeSheet();
});

document.addEventListener("change", (e) => {
  const action = e.target.dataset.action;
  if (action==="toggle-reminders")        { updateUserSettings({remindersEnabled:e.target.checked}); toast(t("reminderSaved")); }
  if (action==="toggle-daily-morning")   { updateUserSettings({dailyMorningReminder:e.target.checked}); toast(t("notifSaved")); }
  if (action==="change-reminder-interval"){ updateUserSettings({reminderInterval:e.target.value}); toast(t("reminderSaved")); }
  if (action==="change-language")         { updateUserSettings({language:e.target.value}); toast(i18n[e.target.value]?.languageSaved || i18n.he.languageSaved); }
});

document.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.id==="loginForm")   loginWithEmail(e.target);
  if (e.target.id==="addLeadForm") addLead(e.target);
  if (e.target.id==="statusForm")  updateLeadStatus(e.target);
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-priority]");
  if (!btn) return;
  const form = btn.closest("form"); if (!form) return;
  form.querySelectorAll("[data-priority]").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  form.querySelector('input[name="priority"]').value = btn.dataset.priority;
});

document.addEventListener("input", (e) => {
  if (e.target.id!=="leadSearch") return;
  const q = e.target.value.trim().toLowerCase();
  const list = document.getElementById("leadList"); if (!list) return;
  const leads = userLeads().filter((l) =>
    [l.customerName, l.phone, l.city, l.source, l.serviceRequested].join(" ").toLowerCase().includes(q)
  );
  list.innerHTML = leads.length
    ? leads.map((l) => leadCard(l)).join("")
    : emptyState(ic("search",26), t("emptySearchTitle"), t("emptySearchBody"), "");
});

window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferredInstallPrompt=e; });

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => { navigator.serviceWorker.register("./sw.js").catch(()=>{}); });
}

// ─── OneSignal push notifications ──────────────────────────────────────────────
window.OneSignalDeferred = window.OneSignalDeferred || [];
OneSignalDeferred.push(async function(OneSignal) {
  const appId = window.AUTOLEAD_FIREBASE_CONFIG?.oneSignalAppId;
  if (!appId) return;
  await OneSignal.init({
    appId,
    serviceWorkerPath: "./sw.js",
    serviceWorkerParam: { scope: "./" },
    notifyButton: { enable: false },
    autoSubscribeOnPermissionGranted: true,
  });
});

bootstrap();
