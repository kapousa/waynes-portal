import AppLayout from "@/components/AppLayout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileEdit, ChevronRight, ClipboardList } from "lucide-react";
import { useTranslation } from "react-i18next";

const forms = [
  {
    id: "product-deviation",
    title: "Product Deviation Reporting",
    description: "Report quality issues for customer-unique products.",
    path: "/report-deviation",
  },
  // You can add more forms here later
];

const FormsList = () => {
  const { t } = useTranslation();

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ClipboardList className="w-8 h-8 text-blue-600" />
            {t("Available Forms")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("Select a form below to submit a new entry.")}
          </p>
        </div>

        <div className="grid gap-4">
          {forms.map((form) => (
            <motion.div
              key={form.id}
              whileHover={{ x: 5 }}
              className="bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <Link to={form.path} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <FileEdit className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{t(form.title)}</h2>
                    <p className="text-sm text-muted-foreground">{t(form.description)}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-600" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default FormsList;