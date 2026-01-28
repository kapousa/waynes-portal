import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Calendar, ExternalLink, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface DocumentCardProps {
    title: string;
    description: string;
    fileUrl?: string;
    fileUrlAr?: string;
    fileName?: string;
    createdAt: string;
    tags?: string[];
    index?: number;
    relatedDocs?: any[]; // Prop received from Documents.tsx
}

const DocumentCard = ({
                          title,
                          description,
                          fileUrl,
                          fileUrlAr,
                          createdAt,
                          tags = [],
                          index = 0,
                          relatedDocs = [] // Destructured with default value
                      }: DocumentCardProps) => {
    const { isRTL, language } = useLanguage();
    const [isViewing, setIsViewing] = useState(false);

    // Local state to track the active PDF in the iframe
    const [activeUrl, setActiveUrl] = useState<string | undefined>(
        (language === 'ar' && fileUrlAr) ? fileUrlAr : fileUrl
    );

    // Sync activeUrl if the user changes the portal language while the viewer is open
    useEffect(() => {
        setActiveUrl((language === 'ar' && fileUrlAr) ? fileUrlAr : fileUrl);
    }, [language, fileUrl, fileUrlAr]);

    const handleOpenNewTab = () => {
        if (activeUrl) {
            window.open(activeUrl, '_blank', 'noopener,noreferrer');
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString(isRTL ? 'ar-AE' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group p-5 bg-card rounded-xl border border-border shadow-soft hover:shadow-medium transition-all duration-300"
            >
                <div className={cn("flex gap-4", isRTL && "flex-row-reverse")}>
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className={cn("w-6 h-6 text-primary", isRTL && "scale-x-[-1]")} />
                    </div>

                    <div className={cn("flex-1 min-w-0", isRTL && "text-right")}>
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {description}
                        </p>

                        <div className={cn("flex items-center justify-between pt-2 border-t border-border", isRTL && "flex-row-reverse")}>
                            <div className={cn("flex items-center gap-1.5 text-xs text-muted-foreground", isRTL && "flex-row-reverse")}>
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{formatDate(createdAt)}</span>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setIsViewing(true)}
                                    disabled={!activeUrl}
                                    className="h-8 gap-1.5"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span className="hidden sm:inline">
                                        {isRTL ? 'قراءة' : 'Read'}
                                    </span>
                                </Button>

                                <Button
                                    size="sm"
                                    onClick={handleOpenNewTab}
                                    disabled={!activeUrl}
                                    className="h-8 gap-1.5 bg-primary text-primary-foreground"
                                >
                                    <ExternalLink className={cn("w-4 h-4", isRTL && "scale-x-[-1]")} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {isViewing && activeUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col p-4 md:p-8"
                    >
                        <div className="flex justify-between items-center mb-4 bg-card p-4 rounded-t-xl border-b">
                            <h2 className="text-xl font-bold">{title}</h2>
                            <Button variant="ghost" size="icon" onClick={() => setIsViewing(false)}>
                                <X className="w-6 h-6" />
                            </Button>
                        </div>

                        {/* Layout container for PDF + Sidebar */}
                        <div className={cn(
                            "flex flex-col md:flex-row gap-4 h-full overflow-hidden",
                            isRTL && "md:flex-row-reverse"
                        )}>
                            {/* PDF VIEWER */}
                            <iframe
                                src={`${activeUrl}#view=FitH&toolbar=0`}
                                className="flex-1 rounded-xl border shadow-2xl bg-white"
                                title={title}
                            />

                            {/* RELATED ARTICLES SIDEBAR */}
                            {relatedDocs && relatedDocs.length > 0 && (
                                <div className="w-full md:w-72 bg-card p-5 rounded-xl border border-border shadow-lg overflow-y-auto shrink-0">
                                    <h4 className="font-bold mb-4 text-sm border-b pb-2 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-primary" />
                                        {isRTL ? 'وثائق ذات صلة' : 'Related Documents'}
                                    </h4>
                                    <div className="space-y-3">
                                        {relatedDocs.map((doc: any) => {
                                            const docData = doc.attributes;
                                            // Determine URLs for the related doc
                                            const relUrl = docData.file?.data?.attributes?.url;
                                            const relUrlAr = docData.fileAr?.data?.attributes?.url;
                                            const targetUrl = (language === 'ar' && relUrlAr) ? relUrlAr : relUrl;

                                            return (
                                                <button
                                                    key={doc.id}
                                                    disabled={!targetUrl}
                                                    onClick={() => targetUrl && setActiveUrl(targetUrl)}
                                                    className="text-xs text-left w-full p-3 hover:bg-primary/10 rounded-lg border border-transparent hover:border-primary/20 transition-all text-primary font-medium flex justify-between items-center group"
                                                >
                                                    <span className="truncate mr-2">
                                                        {language === 'ar' ? docData.titleAr : docData.title}
                                                    </span>
                                                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default DocumentCard;