import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search as SearchIcon, FileText, AlertCircle, Loader2 } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import DocumentCard from '@/components/DocumentCard';
import DocumentSkeleton from '@/components/DocumentSkeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { searchDocuments, STRAPI_URL, type Document } from '@/lib/api';
import { cn } from '@/lib/utils';

const Search = () => {
  const { t } = useTranslation();
  const { isRTL, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced search
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setDocuments([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await searchDocuments(searchQuery, language);
      setDocuments(response.data || []);
    } catch (err) {
      console.error('Search failed:', err);
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  const getFileUrl = (doc: Document): string | undefined => {
    const fileData = doc.attributes.file?.data?.attributes;
    if (!fileData?.url) return undefined;
    
    if (fileData.url.startsWith('/')) {
      return `${STRAPI_URL}${fileData.url}`;
    }
    return fileData.url;
  };

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
            {isLoading && (
              <Loader2 className={cn(
                "absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground animate-spin",
                isRTL ? "left-4" : "right-4"
              )} />
            )}
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search.placeholder')}
              className={cn(
                "h-14 text-lg bg-card border-border focus:border-primary shadow-soft",
                isRTL ? "pr-12 pl-12" : "pl-12 pr-12"
              )}
              autoFocus
            />
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && hasSearched && <DocumentSkeleton count={3} />}

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
              onClick={() => performSearch(query)} 
              variant="outline"
            >
              {isRTL ? 'حاول مرة أخرى' : 'Try Again'}
            </Button>
          </motion.div>
        )}

        {/* Search Results */}
        {!isLoading && !error && hasSearched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className={cn("text-sm font-medium text-muted-foreground mb-4", isRTL && "text-right")}>
              {t('search.results')} ({documents.length})
            </h2>

            {documents.length > 0 ? (
              <div className="space-y-4">
                {documents.map((doc, index) => {
                  const attrs = doc.attributes;
                  const title = language === 'ar' && attrs.titleAr ? attrs.titleAr : attrs.title;
                  const description = language === 'ar' && attrs.descriptionAr ? attrs.descriptionAr : attrs.description;
                  
                  return (
                    <DocumentCard
                      key={doc.id}
                      title={title}
                      description={description}
                      createdAt={attrs.createdAt}
                      tags={attrs.tags || []}
                      fileUrl={getFileUrl(doc)}
                      index={index}
                    />
                  );
                })}
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
        {!hasSearched && (
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