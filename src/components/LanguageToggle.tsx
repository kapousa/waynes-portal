import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2 bg-card hover:bg-accent border-border font-medium"
    >
      <Languages className="w-4 h-4" />
      <span>{language === 'en' ? 'العربية' : 'English'}</span>
    </Button>
  );
};

export default LanguageToggle;
