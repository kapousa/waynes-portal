import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { CheckCircle2, Send } from "lucide-react";
import { motion } from "framer-motion";
import { STRAPI_URL } from "@/lib/api.ts";
import { cn } from "@/lib/utils"; // Fixed: Added missing cn import

const DeviationForm = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
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

  const token = localStorage.getItem('waynes_token');

  try {
    let uploadedImageId = null;

    // STEP 1: Upload the file alone to the general upload endpoint
    if (file) {
      const fileFormData = new FormData();
      fileFormData.append('files', file);

      const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: fileFormData,
      });

      if (!uploadRes.ok) throw new Error("File upload failed");

      const uploadData = await uploadRes.json();
      uploadedImageId = uploadData[0].id; // Get the ID for Cloudinary/Strapi
    }

    // STEP 2: Create the entry with a standard JSON body
    const finalPayload = {
      data: {
        product_name: formData.product_name,
        issue_description: formData.issue_description,
        batch_info: formData.batch_info,
        // Link the media field to the ID we just got
        picture_of_the_deviation: uploadedImageId
      }
    };

    const response = await fetch(`${STRAPI_URL}/api/deviation-reports`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Clean JSON, no multipart boundary issues
      },
      body: JSON.stringify(finalPayload),
    });

    const result = await response.json();

    if (response.ok) {
      setIsSuccess(true);
      toast.success(t('deviation.success'));
    } else {
      console.error('Entry Creation Error:', result.error);
      toast.error(result.error?.message || "Validation Error");
    }
  } catch (error) {
    console.error('Process Error:', error);
    toast.error("Failed to submit report");
  } finally {
    setIsSubmitting(false);
  }
};

return (
    <div className={isRTL ? "rtl text-right" : "ltr text-left"}>
      {!isSuccess ? (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="product_name">{t('deviation.product_label')}</Label>
            <Input
              id="product_name"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              placeholder={t('deviation.placeholder_name')}
              required
              className={cn(isRTL && "text-right")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issue_description">{t('deviation.description_label')}</Label>
            <Textarea
              id="issue_description"
              name="issue_description"
              value={formData.issue_description}
              onChange={handleChange}
              placeholder={t('deviation.placeholder_desc')}
              required
              className={cn("min-h-[120px]", isRTL && "text-right")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="batch_info">{t('deviation.batch_label')}</Label>
            <Input
              id="batch_info"
              name="batch_info"
              value={formData.batch_info}
              onChange={handleChange}
              placeholder={t('deviation.placeholder_batch')}
              required
              className={cn(isRTL && "text-right")}
            />
          </div>

          <div className="space-y-2">
            <Label>{t('deviation.file_label')}</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="cursor-pointer"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4 animate-pulse" /> {t('common.sending')}
              </span>
            ) : t('deviation.submit_button')}
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
            {t('common.back')}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default DeviationForm;