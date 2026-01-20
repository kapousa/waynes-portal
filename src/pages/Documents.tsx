import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, FolderOpen } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import DocumentCard from '@/components/DocumentCard';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

// Mock documents - In production, fetch from Strapi
const mockDocuments = {
  branding: [
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
      id: 3,
      title: 'Typography Standards',
      titleAr: 'معايير الطباعة',
      description: 'Font families, sizes, and hierarchy guidelines for all brand communications.',
      descriptionAr: 'عائلات الخطوط وأحجامها وإرشادات التسلسل الهرمي لجميع اتصالات العلامة التجارية.',
      createdAt: '2024-01-08',
      tags: ['Typography', 'Fonts']
    },
  ],
  operations: [
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
      id: 5,
      title: 'Equipment Maintenance Manual',
      titleAr: 'دليل صيانة المعدات',
      description: 'Maintenance schedules and procedures for all coffee equipment.',
      descriptionAr: 'جداول الصيانة والإجراءات لجميع معدات القهوة.',
      createdAt: '2024-01-28',
      tags: ['Equipment', 'Maintenance']
    },
  ],
  recipes: [
    {
      id: 6,
      title: 'Signature Coffee Recipes',
      titleAr: 'وصفات القهوة المميزة',
      description: 'All signature Waynes Coffee drink recipes with exact measurements.',
      descriptionAr: 'جميع وصفات مشروبات واينز كوفي المميزة مع القياسات الدقيقة.',
      createdAt: '2024-02-10',
      tags: ['Coffee', 'Recipes', 'Signature']
    },
  ],
  training: [
    {
      id: 7,
      title: 'Barista Training Program',
      titleAr: 'برنامج تدريب الباريستا',
      description: 'Complete barista training curriculum and certification requirements.',
      descriptionAr: 'منهج تدريب الباريستا الكامل ومتطلبات الشهادات.',
      createdAt: '2024-01-20',
      tags: ['Training', 'Barista', 'Certification']
    },
  ],
  marketing: [
    {
      id: 8,
      title: 'Social Media Guidelines',
      titleAr: 'إرشادات وسائل التواصل الاجتماعي',
      description: 'Best practices and templates for social media marketing.',
      descriptionAr: 'أفضل الممارسات والقوالب لتسويق وسائل التواصل الاجتماعي.',
      createdAt: '2024-02-05',
      tags: ['Social Media', 'Marketing']
    },
  ],
  legal: [
    {
      id: 9,
      title: 'Franchise Agreement Template',
      titleAr: 'قالب اتفاقية الامتياز',
      description: 'Standard franchise agreement and terms for UAE operations.',
      descriptionAr: 'اتفاقية الامتياز القياسية والشروط لعمليات الإمارات.',
      createdAt: '2024-01-05',
      tags: ['Legal', 'Agreement', 'UAE']
    },
  ],
};

const categoryNames: Record<string, { en: string; ar: string }> = {
  branding: { en: 'Branding', ar: 'العلامة التجارية' },
  operations: { en: 'Operations', ar: 'العمليات' },
  recipes: { en: 'Recipes', ar: 'الوصفات' },
  training: { en: 'Training', ar: 'التدريب' },
  marketing: { en: 'Marketing', ar: 'التسويق' },
  legal: { en: 'Legal', ar: 'القانونية' },
};

const Documents = () => {
  const { t } = useTranslation();
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { isRTL, language } = useLanguage();

  const documents = categorySlug ? mockDocuments[categorySlug as keyof typeof mockDocuments] || [] : [];
  const categoryName = categorySlug 
    ? (language === 'ar' ? categoryNames[categorySlug]?.ar : categoryNames[categorySlug]?.en) 
    : t('documents.title');

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/">
            <Button
              variant="ghost"
              className={cn("gap-2 mb-4 text-muted-foreground hover:text-foreground", isRTL && "flex-row-reverse")}
            >
              <BackArrow className="w-4 h-4" />
              {t('documents.back')}
            </Button>
          </Link>

          <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
            <FolderOpen className="w-8 h-8 text-primary" />
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
              {categoryName}
            </h1>
          </div>
        </motion.div>

        {/* Documents List */}
        {documents.length > 0 ? (
          <div className="space-y-4">
            {documents.map((doc, index) => (
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <FolderOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">{t('documents.empty')}</p>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default Documents;
