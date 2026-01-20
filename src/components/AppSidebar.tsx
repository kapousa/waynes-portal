import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Search, 
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import waynesLogo from '@/assets/waynes-logo.png';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AppSidebar = ({ isOpen, onToggle }: AppSidebarProps) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: t('nav.dashboard') },
    { path: '/documents', icon: FileText, label: t('nav.documents') },
    { path: '/search', icon: Search, label: t('nav.search') },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Use correct chevron direction for collapse/expand
  const CollapseIcon = isRTL 
    ? (isOpen ? ChevronRight : ChevronLeft) 
    : (isOpen ? ChevronLeft : ChevronRight);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isOpen ? 280 : 80,
          x: 0 
        }}
        className={cn(
          "fixed top-0 h-screen bg-sidebar border-e border-sidebar-border z-50 flex flex-col transition-all duration-300",
          isRTL ? "right-0" : "left-0",
          "lg:relative",
          !isOpen && "max-lg:w-0 max-lg:border-0 max-lg:overflow-hidden"
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          {isOpen && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={waynesLogo}
              alt="Waynes Coffee"
              className="h-8 object-contain"
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-sidebar-foreground hover:bg-sidebar-accent shrink-0"
          >
            {isOpen ? (
              <X className="w-5 h-5 lg:hidden" />
            ) : null}
            <CollapseIcon className="w-5 h-5 hidden lg:block" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group",
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                  isRTL && "flex-row-reverse"
                )}
              >
                {/* Icons mirror in RTL */}
                <IconComponent className={cn(
                  "w-5 h-5 shrink-0 transition-transform",
                  !isActive(item.path) && "group-hover:scale-110",
                  isRTL && "scale-x-[-1]"
                )} />
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border space-y-1">
          <Button
            variant="ghost"
            onClick={logout}
            className={cn(
              "w-full justify-start gap-3 px-3 py-3 h-auto text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive",
              !isOpen && "justify-center",
              isRTL && "flex-row-reverse"
            )}
          >
            {/* Logout icon mirrors in RTL */}
            <LogOut className={cn("w-5 h-5 shrink-0", isRTL && "scale-x-[-1]")} />
            {isOpen && <span className="font-medium">{t('nav.logout')}</span>}
          </Button>
        </div>
      </motion.aside>

      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={onToggle}
        className={cn(
          "fixed top-4 z-50 lg:hidden bg-card shadow-medium",
          isRTL ? "right-4" : "left-4"
        )}
      >
        <Menu className="w-5 h-5" />
      </Button>
    </>
  );
};

export default AppSidebar;
