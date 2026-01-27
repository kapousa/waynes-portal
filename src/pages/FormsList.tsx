import AppLayout from "@/components/AppLayout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileEdit, ChevronRight, ChevronLeft, ClipboardList } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const FormsList = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const forms = [
    {
      id: "product-deviation",
      title: "nav.report_deviation", // Using the key we defined
      description: "deviation.subtitle", // Using the key we defined
      path: "/report-deviation",
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className={cn("mb-8", isRTL ? "text-right" : "text-left")}>
          <h1 className={cn("text-3xl font-bold flex items-center gap-2", isRTL && "flex-row-reverse")}>
            <ClipboardList className="w-8 h-8 text-blue-600" />
            {t("nav.forms")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("forms.select_description")}
          </p>
        </div>

        <div className="grid gap-4">
          {forms.map((form) => (
            <motion.div
              key={form.id}
              whileHover={{ x: isRTL ? -5 : 5 }}
              className="bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <Link to={form.path} className={cn("flex items-center justify-between group", isRTL && "flex-row-reverse")}>
                <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
                  <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <FileEdit className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <h2 className="text-lg font-semibold">{t(form.title)}</h2>
                    <p className="text-sm text-muted-foreground">{t(form.description)}</p>
                  </div>
                </div>
                {isRTL ? (
                   <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-blue-600" />
                ) : (
                   <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-600" />
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default FormsList;