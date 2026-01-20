import { motion } from 'framer-motion';
import { FileText, Download, Calendar, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface DocumentCardProps {
  title: string;
  description: string;
  fileUrl?: string;
  fileName?: string;
  createdAt: string;
  tags?: string[];
  index?: number;
}

const DocumentCard = ({ 
  title, 
  description, 
  fileUrl, 
  fileName,
  createdAt, 
  tags = [],
  index = 0 
}: DocumentCardProps) => {
  const { isRTL } = useLanguage();

  const handleDownload = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group p-5 bg-card rounded-xl border border-border shadow-soft hover:shadow-medium transition-all duration-300"
    >
      <div className={cn("flex gap-4", isRTL && "flex-row-reverse")}>
        {/* Icon */}
        <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <FileText className="w-6 h-6 text-primary" />
        </div>

        {/* Content */}
        <div className={cn("flex-1 min-w-0", isRTL && "text-right")}>
          <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {description}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className={cn("flex flex-wrap gap-1.5 mb-3", isRTL && "justify-end")}>
              {tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-accent text-xs text-accent-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className={cn("flex items-center justify-between pt-2 border-t border-border", isRTL && "flex-row-reverse")}>
            <div className={cn("flex items-center gap-1.5 text-xs text-muted-foreground", isRTL && "flex-row-reverse")}>
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(createdAt)}</span>
            </div>

            <Button
              size="sm"
              onClick={handleDownload}
              disabled={!fileUrl}
              className="h-8 gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Download className={cn("w-4 h-4", isRTL && "flip-rtl")} />
              <span className="hidden sm:inline">
                {isRTL ? 'تحميل PDF' : 'Download PDF'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentCard;
