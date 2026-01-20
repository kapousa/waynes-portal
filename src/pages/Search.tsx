import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search as SearchIcon, FileText } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import DocumentCard from '@/components/DocumentCard';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

// Mock all documents for search
const allDocuments = [
  {
    id: 1,
    title: 'Logo Usage Guidelines',
    titleAr: 'إرشادات استخدام الشعار',
    description: 'Complete guide to using the Waynes Coffee logo across different media and applications.',
    descriptionAr: 'دليل كامل لاستخدام شعار واينز كوفي عبر وسائل وتطبيقات مختلفة.',
    createdAt: '2024-01-15',
    tags: ['Logo', 'Guidelines', 'Brand']
  },
  {
    id: 2,
    title: 'Brand Color Palette',
    titleAr: 'لوحة ألوان العلامة التجارية',
    description: 'Official color codes and usage guidelines for print and digital media.',
    descriptionAr: 'رموز الألوان الرسمية وإرشادات الاستخدام للوسائط المطبوعة والرقمية.',
    createdAt: '2024-01-10',
    tags: ['Colors', 'Design', 'Brand']
  },
  {
    id: 4,
    title: 'Daily Opening Procedures',
    titleAr: 'إجراءات الافتتاح اليومية',
    description: 'Step-by-step guide for opening the store each day.',
    descriptionAr: 'دليل خطوة بخطوة لفتح المتجر كل يوم.',
    createdAt: '2024-02-01',
    tags: ['Operations', 'Daily']
  },
  {
    id: 6,
    title: 'Signature Coffee Recipes',
    titleAr: 'وصفات القهوة المميزة',
    description: 'All signature Waynes Coffee drink recipes with exact measurements.',
    descriptionAr: 'جميع وصفات مشروبات واينز كوفي المميزة مع القياسات الدقيقة.',
    createdAt: '2024-02-10',
    tags: ['Coffee', 'Recipes', 'Signature']
  },
  {
    id: 7,
    title: 'Barista Training Program',
    titleAr: 'برنامج تدريب الباريستا',
    description: 'Complete barista training curriculum and certification requirements.',
    descriptionAr: 'منهج تدريب الباريستا الكامل ومتطلبات الشهادات.',
    createdAt: '2024-01-20',
    tags: ['Training', 'Barista', 'Certification']
  },
];

const Search = () => {
  const { t } = useTranslation();
  const { isRTL, language } = useLanguage();
  const [query, setQuery] = useState('');

  const filteredDocuments = query.trim()
    ? allDocuments.filter((doc) => {
        const searchTerm = query.toLowerCase();
        const title = (language === 'ar' ? doc.titleAr : doc.title).toLowerCase();
        const description = (language === 'ar' ? doc.descriptionAr : doc.description).toLowerCase();
        const tags = doc.tags.join(' ').toLowerCase();
        return title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm);
      })
    : [];

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={cn("text-2xl md:text-3xl font-semibold text-foreground mb-6", isRTL && "text-right")}>
            {t('nav.search')}
          </h1>

          <div className="relative">
            <SearchIcon className={cn(
              "absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground",
              isRTL ? "right-4" : "left-4"
            )} />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search.placeholder')}
              className={cn(
                "h-14 text-lg bg-card border-border focus:border-primary shadow-soft",
                isRTL ? "pr-12" : "pl-12"
              )}
              autoFocus
            />
          </div>
        </motion.div>

        {/* Search Results */}
        {query.trim() && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className={cn("text-sm font-medium text-muted-foreground mb-4", isRTL && "text-right")}>
              {t('search.results')} ({filteredDocuments.length})
            </h2>

            {filteredDocuments.length > 0 ? (
              <div className="space-y-4">
                {filteredDocuments.map((doc, index) => (
                  <DocumentCard
                    key={doc.id}
                    title={language === 'ar' ? doc.titleAr : doc.title}
                    description={language === 'ar' ? doc.descriptionAr : doc.description}
                    createdAt={doc.createdAt}
                    tags={doc.tags}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <FileText className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">{t('search.noResults')}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Empty State */}
        {!query.trim() && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <SearchIcon className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">
              {isRTL ? 'ابدأ الكتابة للبحث في المستندات' : 'Start typing to search documents'}
            </p>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default Search;
