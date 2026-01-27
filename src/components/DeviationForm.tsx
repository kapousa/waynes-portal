import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { CheckCircle2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DeviationForm = () => {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    product_name: '',
    issue_description: '',
    batch_info: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append('data', JSON.stringify({
      ...formData,
      locale: language // Sends 'en', 'sv', or 'ar' based on your portal settings
    }));

    if (file) {
      data.append('files.picture_of_the_deviation', file);
    }

    try {
      const response = await fetch('https://waynes-portal-cms.onrender.com/api/deviation-reports', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success(t('deviation.success'));
      } else {
        toast.error(t('deviation.error'));
      }
    } catch (error) {
      toast.error(t('deviation.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isSuccess ? (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label className={isRTL ? "text-right block" : ""}>
              {t('deviation.product_label')} *
            </Label>
            <Input
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              placeholder={t('deviation.placeholder')}
              required
              className={isRTL ? "text-right" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label className={isRTL ? "text-right block" : ""}>
              {t('deviation.issue_label')} *
            </Label>
            <Textarea
              name="issue_description"
              value={formData.issue_description}
              onChange={handleChange}
              placeholder={t('deviation.placeholder')}
              required
              className={isRTL ? "text-right min-h-[100px]" : "min-h-[100px]"}
            />
          </div>

          <div className="space-y-2">
            <Label className={isRTL ? "text-right block" : ""}>
              {t('deviation.batch_label')} *
            </Label>
            <Input
              name="batch_info"
              value={formData.batch_info}
              onChange={handleChange}
              placeholder={t('deviation.placeholder')}
              required
              className={isRTL ? "text-right" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label className={isRTL ? "text-right block" : ""}>
              {t('deviation.file_label')}
            </Label>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="cursor-pointer"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
          >
            {isSubmitting ? t('common.sending') : t('deviation.submit_button')}
          </Button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-10"
        >
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">{t('deviation.thanks_title')}</h2>
          <p className="text-muted-foreground mb-6">{t('deviation.thanks_message')}</p>
          <Button onClick={() => setIsSuccess(false)} variant="outline">
            {t('deviation.send_another')}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeviationForm;