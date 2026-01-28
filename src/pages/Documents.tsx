import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, FolderOpen, AlertCircle, ChevronRight } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import DocumentCard from '@/components/DocumentCard';
import DocumentSkeleton from '@/components/DocumentSkeleton';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getDocuments, STRAPI_URL } from '@/lib/api';
import { cn } from '@/lib/utils';

const Documents = () => {
    const { t } = useTranslation();
    const { categorySlug } = useParams<{ categorySlug: string }>();
    const { isRTL, language } = useLanguage();
    const [isLoading, setIsLoading] = useState(true);
    const [documents, setDocuments] = useState<any[]>([]);
    const [subCategories, setSubCategories] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [categoryName, setCategoryName] = useState<string>('');

useEffect(() => {
    const fetchDocuments = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getDocuments(language, categorySlug);
            // Set only the articles/documents
            setDocuments(response.data || []);

            // Set the Header Name from the first document found
            if (response.data?.[0]?.attributes?.category?.data?.attributes) {
                const catAttrs = response.data[0].attributes.category.data.attributes;
                setCategoryName(language === 'ar' && catAttrs.nameAr ? catAttrs.nameAr : catAttrs.name);
            }
        } catch (err) {
            setError('Failed to load documents');
        } finally {
            setIsLoading(false);
        }
    };
    fetchDocuments();
}, [categorySlug, language]);

    const BackArrow = isRTL ? ArrowRight : ArrowLeft;

    const getFileUrl = (doc: any): string | undefined => {
        const data = doc?.attributes || doc;
        const fileData = data?.file?.data?.attributes || data?.file?.data || data?.file;
        if (!fileData?.url) return undefined;
        return fileData.url.startsWith('/') ? `${STRAPI_URL}${fileData.url}` : fileData.url;
    };

    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <Link to="/">
                        <Button variant="ghost" className={cn("gap-2 mb-4 text-muted-foreground", isRTL && "flex-row-reverse")}>
                            <BackArrow className="w-4 h-4" />
                            {t('documents.back')}
                        </Button>
                    </Link>
                    <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                        <FolderOpen className={cn("w-8 h-8 text-primary", isRTL && "scale-x-[-1]")} />
                        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">{categoryName}</h1>
                    </div>
                </motion.div>

                {isLoading && <DocumentSkeleton count={4} />}

                {/* SUB-FOLDERS SECTION */}
                {!isLoading && subCategories.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {subCategories.map((sub: any) => (
                            <Link key={sub.id} to={`/documents/${sub.attributes.slug}`} className="group p-4 bg-card rounded-xl border hover:border-primary transition-all flex items-center justify-between">
                                <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary"><FolderOpen className="w-5 h-5" /></div>
                                    <span className="font-medium">{language === 'ar' ? sub.attributes.nameAr : sub.attributes.name}</span>
                                </div>
                                <ChevronRight className={cn("w-4 h-4 text-muted-foreground group-hover:text-primary", isRTL && "rotate-180")} />
                            </Link>
                        ))}
                    </div>
                )}

                {/* DOCUMENTS SECTION */}
                {!isLoading && documents.length > 0 && (
                    <div className="space-y-4">
                        {documents.map((doc: any, index: number) => {
                            const data = doc.attributes || doc;
                            return (
                                <DocumentCard
                                    key={doc.id || index}
                                    title={(language === 'ar' ? data.titleAr : data.title) || 'Untitled'}
                                    description={(language === 'ar' ? data.descriptionAr : data.description) || ''}
                                    createdAt={data.createdAt}
                                    tags={data.tags || []}
                                    fileUrl={getFileUrl({ file: data.file })}
                                    fileUrlAr={getFileUrl({ file: data.fileAr })}
                                    index={index}
                                    relatedDocs={data.related_documents?.data || []}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default Documents;