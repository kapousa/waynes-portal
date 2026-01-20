import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import LanguageToggle from '@/components/LanguageToggle';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const AppHeader = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isRTL } = useLanguage();

  const initials = user?.username?.substring(0, 2).toUpperCase() || 'WC';

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
      <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className={cn(
              "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
              isRTL ? "right-3" : "left-3"
            )} />
            <Input
              type="search"
              placeholder={t('search.placeholder')}
              className={cn(
                "h-10 bg-background border-border",
                isRTL ? "pr-10" : "pl-10"
              )}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
          <LanguageToggle />
          
          <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
            <Avatar className="h-9 w-9 bg-primary">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">{user?.username || 'User'}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
