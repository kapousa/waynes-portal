import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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
