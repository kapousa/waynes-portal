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
  Coffee,
  FolderOpen,
  AlertCircle,
  LucideIcon
} from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import CategoryCard from '@/components/CategoryCard';
import CategorySkeleton from '@/components/CategorySkeleton';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCategories, STRAPI_URL, type Category } from '@/lib/api';
import { cn } from '@/lib/utils';

// Icon mapping for categories
const iconMap: Record<string, LucideIcon> = {
  branding: Palette,
  operations: Settings2,
  recipes: UtensilsCrossed,
  training: GraduationCap,
  marketing: Megaphone,
  legal: Scale,
  default: FolderOpen,
};

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isRTL, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await getCategories(language);
        setCategories(response.data || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [language]);

  const getIconForCategory = (slug: string): LucideIcon => {
    return iconMap[slug.toLowerCase()] || iconMap.default;
  };

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

          {/* Error State */}
          {!isLoading && error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <AlertCircle className="w-16 h-16 text-destructive/50 mx-auto mb-4" />
              <p className="text-destructive mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
              >
                {isRTL ? 'حاول مرة أخرى' : 'Try Again'}
              </Button>
            </motion.div>
          )}

          {/* Categories Grid */}
          {!isLoading && !error && categories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((category, index) => {
                const attrs = category.attributes;
                const title = language === 'ar' && attrs.nameAr ? attrs.nameAr : attrs.name;
                const description = language === 'ar' && attrs.descriptionAr ? attrs.descriptionAr : attrs.description;
                
                return (
                  <CategoryCard
                    key={category.id}
                    title={title}
                    description={description}
                    icon={getIconForCategory(attrs.slug)}
                    slug={attrs.slug}
                    documentCount={attrs.documentsCount || 0}
                    index={index}
                  />
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && categories.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FolderOpen className={cn("w-16 h-16 text-muted-foreground/50 mx-auto mb-4", isRTL && "scale-x-[-1]")} />
              <p className="text-muted-foreground">
                {isRTL ? 'لا توجد فئات متاحة' : 'No categories available'}
              </p>
            </motion.div>
          )}
        </section>
      </div>
    </AppLayout>
  );
};

export default Dashboard;