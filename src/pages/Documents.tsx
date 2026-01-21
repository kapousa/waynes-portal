import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {motion} from 'framer-motion';
import {ArrowLeft, ArrowRight, FolderOpen, AlertCircle} from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import DocumentCard from '@/components/DocumentCard';
import DocumentSkeleton from '@/components/DocumentSkeleton';
import {Button} from '@/components/ui/button';
import {useLanguage} from '@/contexts/LanguageContext';
import {getDocuments, STRAPI_URL, type Document} from '@/lib/api';
import {cn} from '@/lib/utils';

const Documents = () => {
    const {t} = useTranslation();
    const {categorySlug} = useParams<{ categorySlug: string }>();
    const {isRTL, language} = useLanguage();
    const [isLoading, setIsLoading] = useState(true);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [categoryName, setCategoryName] = useState<string>('');

    useEffect(() => {
        const fetchDocuments = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await getDocuments(language, categorySlug);
                setDocuments(response.data || []);

                // Try to get category name from first document
                if (response.data?.[0]?.attributes?.category?.data?.attributes) {
                    const catAttrs = response.data[0].attributes.category.data.attributes;
                    setCategoryName(language === 'ar' && catAttrs.nameAr ? catAttrs.nameAr : catAttrs.name);
                } else if (categorySlug) {
                    // Fallback to slug formatted as title
                    setCategoryName(categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1));
                }
            } catch (err) {
                console.error('Failed to fetch documents:', err);
                setError(err instanceof Error ? err.message : 'Failed to load documents');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDocuments();
    }, [categorySlug, language]);

    // Use appropriate back arrow based on direction
    const BackArrow = isRTL ? ArrowRight : ArrowLeft;

    const getFileUrl = (doc: any): string | undefined => {
        // Use 'any' to allow searching both the root and the attributes for the file
        const data = doc?.attributes ? doc.attributes : doc;

        // Safely drill down into the file data path
        const fileData = data?.file?.data?.attributes || data?.file?.data || data?.file;

        if (!fileData?.url) return undefined;

        // Prepend URL if it's a relative path from Strapi
        if (fileData.url.startsWith('/')) {
            return `${STRAPI_URL}${fileData.url}`;
        }
        return fileData.url;
    };
    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    className="mb-8"
                >
                    <Link to="/">
                        <Button
                            variant="ghost"
                            className={cn("gap-2 mb-4 text-muted-foreground hover:text-foreground", isRTL && "flex-row-reverse")}
                        >
                            <BackArrow className="w-4 h-4"/>
                            {t('documents.back')}
                        </Button>
                    </Link>

                    <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                        <FolderOpen className={cn("w-8 h-8 text-primary", isRTL && "scale-x-[-1]")}/>
                        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
                            {categoryName || t('documents.title')}
                        </h1>
                    </div>
                </motion.div>

                {/* Loading State */}
                {isLoading && <DocumentSkeleton count={4}/>}

                {/* Error State */}
                {!isLoading && error && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="text-center py-16"
                    >
                        <AlertCircle className="w-16 h-16 text-destructive/50 mx-auto mb-4"/>
                        <p className="text-destructive mb-4">{error}</p>
                        <Button
                            onClick={() => window.location.reload()}
                            variant="outline"
                        >
                            {isRTL ? 'حاول مرة أخرى' : 'Try Again'}
                        </Button>
                    </motion.div>
                )}

                {/* Documents List */}
                {!isLoading && !error && documents.length > 0 && (
                    <div className="space-y-4">


                        {documents.map((doc: any, index: number) => {
                            // We use 'any' here to stop TypeScript from enforcing the old interface
                            const data = doc.attributes ? doc.attributes : doc;

                            if (!data) return null;

                            const title = language === 'ar' && data.titleAr ? data.titleAr : data.title;
                            const description = language === 'ar' && data.descriptionAr ? data.descriptionAr : data.description;

                            return (
                                <DocumentCard
                                    key={doc.id || index}
                                    title={title || 'Untitled'}
                                    description={description || ''}
                                    createdAt={data.createdAt}
                                    tags={data.tags || []}
                                    fileUrl={getFileUrl(doc)}
                                    index={index}
                                />
                            );
                        })}  </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && documents.length === 0 && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="text-center py-16"
                    >
                        <FolderOpen
                            className={cn("w-16 h-16 text-muted-foreground/50 mx-auto mb-4", isRTL && "scale-x-[-1]")}/>
                        <p className="text-muted-foreground">{t('documents.empty')}</p>
                    </motion.div>
                )}
            </div>
        </AppLayout>
    );
};

export default Documents;