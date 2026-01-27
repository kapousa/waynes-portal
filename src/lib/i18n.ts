import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
    en: {
        translation: {
            // Navigation
            "nav.dashboard": "Dashboard",
            "nav.documents": "Documents",
            "nav.forms": "Forms",
            "nav.search": "Search",
            "nav.settings": "Settings",
            "nav.logout": "Logout",
            "nav.report_deviation": "Product Deviation Reporting",

            // Login
            "login.title": "Welcome Back",
            "login.subtitle": "Sign in to access your franchise portal",
            "login.email": "Email Address",
            "login.password": "Password",
            "login.submit": "Sign In",
            "login.loading": "Signing in...",
            "login.error": "Invalid email or password",

            // Dashboard
            "dashboard.title": "Knowledge Portal",
            "dashboard.subtitle": "Access all your franchise resources",
            "dashboard.categories": "Document Categories",
            "dashboard.recent": "Recent Documents",
            "dashboard.welcome": "Welcome back",

            // Categories
            "category.branding": "Branding",
            "category.operations": "Operations",
            "category.recipes": "Recipes",
            "category.training": "Training",
            "category.marketing": "Marketing",
            "category.legal": "Legal",

            // Documents
            "documents.title": "Documents",
            "documents.download": "Download PDF",
            "documents.preview": "Preview",
            "documents.empty": "No documents found",
            "documents.back": "Back to Categories",

            // Search
            "search.placeholder": "Search documents...",
            "search.results": "Search Results",
            "search.noResults": "No results found",

            // Common
            "common.loading": "Loading...",
            "common.error": "Something went wrong",
            "common.retry": "Try Again",

            // Inside resources.en.translation
"deviation.title": "Product Deviation Reporting",
"deviation.subtitle": "This form is for reporting quality deviations for customer-unique products.",
            "deviation.product_label": "Which product does the discrepancy refer to?",
            "deviation.issue_label": "What is wrong with the product?",
            "deviation.batch_label": "Enter batch number/best before date",
            "deviation.file_label": "Attach picture of the deviation",
            "deviation.placeholder": "Answer*",
            "deviation.submit_button": "SEND REPLY",
            "deviation.success": "Report sent successfully!",
            "deviation.thanks_title": "Thank you!",
            "deviation.thanks_message": "Your deviation report has been received.",
            "deviation.send_another": "Send another report",


"forms.select_description": "Select a form below to submit a new entry.",
        },
    },
    ar: {
        translation: {
            // Navigation
            "nav.dashboard": "لوحة التحكم",
            "nav.documents": "المستندات",
            "nav.forms": "الاستمارات",
            "nav.search": "بحث",
            "nav.settings": "الإعدادات",
            "nav.logout": "تسجيل الخروج",
            "nav.report_deviation": "إبلاغ عن انحراف المنتج",


            // Login
            "login.title": "مرحباً بعودتك",
            "login.subtitle": "سجل الدخول للوصول إلى بوابة الامتياز",
            "login.email": "البريد الإلكتروني",
            "login.password": "كلمة المرور",
            "login.submit": "تسجيل الدخول",
            "login.loading": "جاري تسجيل الدخول...",
            "login.error": "البريد الإلكتروني أو كلمة المرور غير صحيحة",

            // Dashboard
            "dashboard.title": "بوابة المعرفة",
            "dashboard.subtitle": "الوصول إلى جميع موارد الامتياز الخاصة بك",
            "dashboard.categories": "فئات المستندات",
            "dashboard.recent": "المستندات الأخيرة",
            "dashboard.welcome": "مرحباً بعودتك",

            // Categories
            "category.branding": "العلامة التجارية",
            "category.operations": "العمليات",
            "category.recipes": "الوصفات",
            "category.training": "التدريب",
            "category.marketing": "التسويق",
            "category.legal": "القانونية",

            // Documents
            "documents.title": "المستندات",
            "documents.download": "تحميل PDF",
            "documents.preview": "معاينة",
            "documents.empty": "لم يتم العثور على مستندات",
            "documents.back": "العودة إلى الفئات",

            // Search
            "search.placeholder": "البحث في المستندات...",
            "search.results": "نتائج البحث",
            "search.noResults": "لم يتم العثور على نتائج",

            // Common
            "common.loading": "جاري التحميل...",
            "common.error": "حدث خطأ ما",
            "common.retry": "حاول مرة أخرى",

            // Inside resources.ar.translation
            "deviation.product_label": "ما هو المنتج الذي يشير إليه الاختلاف؟",
            "deviation.issue_label": "ما الخلل الموجود في المنتج؟",
            "deviation.batch_label": "أدخل رقم الدفعة/تاريخ انتهاء الصلاحية",
            "deviation.file_label": "أرفق صورة للاختلاف",
            "deviation.placeholder": "الإجابة*",
            "deviation.submit_button": "إرسال الرد",
            "deviation.success": "تم إرسال التقرير بنجاح!",
            "deviation.thanks_title": "شكراً لك!",
            "deviation.thanks_message": "لقد تم استلام تقرير الاختلاف الخاص بك.",
            "deviation.send_another": "إرسال تقرير آخر",
            "deviation.title": "تقرير انحراف المنتج",
"deviation.subtitle": "هذا النموذج مخصص للإبلاغ عن اختلافات الجودة للمنتجات الخاصة بالعملاء.",
            "forms.select_description": "اختر نموذجًا أدناه لتقديم طلب جديد.",
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
