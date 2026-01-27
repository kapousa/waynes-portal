import AppLayout from "@/components/AppLayout";
import DeviationForm from "@/components/DeviationForm";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {cn} from "@/lib/utils.ts";
import {useLanguage} from "@/contexts/LanguageContext.tsx";

const ReportDeviation = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border rounded-xl shadow-sm overflow-hidden"
        >
          {/* Reuse the styling from your Documents page header */}
          <div className={cn(
            "p-6 border-b bg-slate-50/50", isRTL ? "text-right" : "text-left"
          )}>
            {/* This uses the translation keys we added above */}
            <h1 className="text-2xl font-bold text-slate-900">
              {t("deviation.title")}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {t("deviation.subtitle")}
            </p>
          </div>

          <div className="p-6 md:p-10">
            {/* THIS IS YOUR COMPONENT */}
            <DeviationForm />
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default ReportDeviation;