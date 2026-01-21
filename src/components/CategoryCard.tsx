import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {LucideIcon, ChevronRight, ChevronLeft} from 'lucide-react';
import {useLanguage} from '@/contexts/LanguageContext';
import {cn} from '@/lib/utils';

interface CategoryCardProps {
    title: string;
    description: string;
    icon: LucideIcon; // Expects a component
    slug: string;
    documentCount?: number; // Ensure this matches what Dashboard passes
    index?: number;
}

const CategoryCard = ({title, description, icon: Icon, slug, documentCount = 0, index = 0}: CategoryCardProps) => {
    const {isRTL} = useLanguage();
    // Use appropriate arrow based on direction
    const ArrowIcon = isRTL ? ChevronLeft : ChevronRight;

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4, delay: index * 0.1}}
        >
            <Link
                to={`/documents/${slug}`}
                className="group block p-6 bg-card rounded-xl border border-border shadow-soft hover:shadow-medium transition-all duration-300 hover:border-primary/30"
            >
                <div className={cn("flex items-start gap-4", isRTL && "flex-row-reverse")}>
                    {/* Icon Container - icon mirrors in RTL */}
                    <div
                        className="shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className={cn("w-7 h-7 text-primary", isRTL && "scale-x-[-1]")}/>
                    </div>

                    {/* Content */}
                    <div className={cn("flex-1 min-w-0", isRTL && "text-right")}>
                        <div className={cn("flex items-center gap-2 mb-2", isRTL && "flex-row-reverse justify-end")}>
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                {title}
                            </h3>
                            {/* Arrow animates in the correct direction */}
                            <ArrowIcon className={cn(
                                "w-5 h-5 text-muted-foreground group-hover:text-primary transition-all",
                                isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
                            )}/>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {description}
                        </p>
                        <span
                            className="inline-flex items-center px-2.5 py-1 rounded-full bg-accent text-xs font-medium text-accent-foreground">
              {documentCount} {isRTL ? 'مستند' : 'documents'}
            </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default CategoryCard;
