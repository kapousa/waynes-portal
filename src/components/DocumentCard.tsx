import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {FileText, Calendar, ExternalLink, Eye, X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useLanguage} from '@/contexts/LanguageContext';
import {cn} from '@/lib/utils';

interface DocumentCardProps {
    title: string;
    description: string;
    fileUrl?: string;     // The English PDF field
    fileUrlAr?: string;   // The new Arabic PDF field
    fileName?: string;
    createdAt: string;
    tags?: string[];
    index?: number;
}

const DocumentCard = ({
                          title,
                          description,
                          fileUrl,
                          fileUrlAr, // CTO FIX: Added this prop to receive the Arabic file
                          createdAt,
                          tags = [],
                          index = 0
                      }: DocumentCardProps) => {
    const {isRTL, language} = useLanguage(); // language will be 'en' or 'ar'
    const [isViewing, setIsViewing] = useState(false);

    // CTO FIX: Automatically pick the correct file based on the portal language
    // If the user is in Arabic mode AND fileUrlAr exists, use it. Otherwise, use fileUrl.
    const activeFileUrl = (language === 'ar' && fileUrlAr) ? fileUrlAr : fileUrl;

    const handleOpenNewTab = () => {
        if (activeFileUrl) {
            window.open(activeFileUrl, '_blank', 'noopener,noreferrer');
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
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4, delay: index * 0.08}}
                className="group p-5 bg-card rounded-xl border border-border shadow-soft hover:shadow-medium transition-all duration-300"
            >
                <div className={cn("flex gap-4", isRTL && "flex-row-reverse")}>
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className={cn("w-6 h-6 text-primary", isRTL && "scale-x-[-1]")}/>
                    </div>

                    <div className={cn("flex-1 min-w-0", isRTL && "text-right")}>
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {description}
                        </p>

                        {/* Footer Actions */}
                        <div
                            className={cn("flex items-center justify-between pt-2 border-t border-border", isRTL && "flex-row-reverse")}>
                            <div
                                className={cn("flex items-center gap-1.5 text-xs text-muted-foreground", isRTL && "flex-row-reverse")}>
                                <Calendar className="w-3.5 h-3.5"/>
                                <span>{formatDate(createdAt)}</span>
                            </div>

                            <div className="flex gap-2">
                                {/* READ & SCROLL BUTTON */}
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setIsViewing(true)}
                                    disabled={!activeFileUrl} // Disabled if neither file is available
                                    className="h-8 gap-1.5"
                                >
                                    <Eye className="w-4 h-4"/>
                                    <span className="hidden sm:inline">
                    {isRTL ? 'قراءة' : 'Read'}
                  </span>
                                </Button>

                                {/* OPEN IN NEW TAB BUTTON */}
                                <Button
                                    size="sm"
                                    onClick={handleOpenNewTab}
                                    disabled={!activeFileUrl}
                                    className="h-8 gap-1.5 bg-primary text-primary-foreground"
                                >
                                    <ExternalLink className={cn("w-4 h-4", isRTL && "scale-x-[-1]")}/>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* FULL SCREEN PDF READER OVERLAY */}
            <AnimatePresence>
                {isViewing && activeFileUrl && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col p-4 md:p-8"
                    >
                        <div className="flex justify-between items-center mb-4 bg-card p-4 rounded-t-xl border-b">
                            <h2 className="text-xl font-bold">{title}</h2>
                            <Button variant="ghost" size="icon" onClick={() => setIsViewing(false)}>
                                <X className="w-6 h-6"/>
                            </Button>
                        </div>


                        <iframe
                            src={`${activeFileUrl}#view=FitH&toolbar=0`}
                            className="w-full h-full rounded-b-xl border shadow-2xl bg-white"
                            title={title}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default DocumentCard;