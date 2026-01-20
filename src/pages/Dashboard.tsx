import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Settings2, 
  UtensilsCrossed, 
  GraduationCap, 
  Megaphone, 
  Scale,
  Coffee
} from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import CategoryCard from '@/components/CategoryCard';
import CategorySkeleton from '@/components/CategorySkeleton';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

// Mock categories - In production, fetch from Strapi
const mockCategories = [
  {
    slug: 'branding',
    icon: Palette,
    titleEn: 'Branding',
    titleAr: 'العلامة التجارية',
    descriptionEn: 'Logo guidelines, color palettes, and brand identity standards',
    descriptionAr: 'إرشادات الشعار ولوحات الألوان ومعايير هوية العلامة التجارية',
    documentCount: 12
  },
  {
    slug: 'operations',
    icon: Settings2,
    titleEn: 'Operations',
    titleAr: 'العمليات',
    descriptionEn: 'Daily procedures, equipment manuals, and operational checklists',
    descriptionAr: 'الإجراءات اليومية وأدلة المعدات وقوائم التحقق التشغيلية',
    documentCount: 24
  },
  {
    slug: 'recipes',
    icon: UtensilsCrossed,
    titleEn: 'Recipes',
    titleAr: 'الوصفات',
    descriptionEn: 'Signature drinks, food recipes, and preparation guides',
    descriptionAr: 'المشروبات المميزة ووصفات الطعام وأدلة التحضير',
    documentCount: 45
  },
  {
    slug: 'training',
    icon: GraduationCap,
    titleEn: 'Training',
    titleAr: 'التدريب',
    descriptionEn: 'Staff training materials, onboarding guides, and certifications',
    descriptionAr: 'مواد تدريب الموظفين وأدلة الإعداد والشهادات',
    documentCount: 18
  },
  {
    slug: 'marketing',
    icon: Megaphone,
    titleEn: 'Marketing',
    titleAr: 'التسويق',
    descriptionEn: 'Campaign materials, social media templates, and promotional guides',
    descriptionAr: 'مواد الحملات وقوالب وسائل التواصل الاجتماعي وأدلة الترويج',
    documentCount: 31
  },
  {
    slug: 'legal',
    icon: Scale,
    titleEn: 'Legal',
    titleAr: 'القانونية',
    descriptionEn: 'Franchise agreements, compliance documents, and legal policies',
    descriptionAr: 'اتفاقيات الامتياز ووثائق الامتثال والسياسات القانونية',
    documentCount: 8
  },
];

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isRTL, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<typeof mockCategories>([]);

  // Simulate API fetch with loading state
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate network delay - replace with actual Strapi API call
    const timer = setTimeout(() => {
      setCategories(mockCategories);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [language]);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className={cn("flex items-center gap-3 mb-2", isRTL && "flex-row-reverse")}>
            <Coffee className={cn("w-8 h-8 text-primary", isRTL && "scale-x-[-1]")} />
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
              {t('dashboard.welcome')}, {user?.username || 'Partner'}
            </h1>
          </div>
          <p className={cn("text-muted-foreground", isRTL && "text-right")}>
            {t('dashboard.subtitle')}
          </p>
        </motion.div>

        {/* Categories Section */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={cn("text-lg font-semibold text-foreground mb-5", isRTL && "text-right")}
          >
            {t('dashboard.categories')}
          </motion.h2>

          {/* Loading State */}
          {isLoading && <CategorySkeleton count={6} />}

          {/* Categories Grid */}
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.slug}
                  title={language === 'ar' ? category.titleAr : category.titleEn}
                  description={language === 'ar' ? category.descriptionAr : category.descriptionEn}
                  icon={category.icon}
                  slug={category.slug}
                  documentCount={category.documentCount}
                  index={index}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
