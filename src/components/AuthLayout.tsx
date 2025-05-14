import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { BackButton } from "@/components/ui/back-button";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: ReactNode;
  title: ReactNode;
  subtitle?: string;
  showBackLink?: boolean;
  backLinkUrl?: string;
  backLinkText?: string;
  className?: string;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  showBackLink = true,
  backLinkUrl = "/",
  backLinkText,
  className,
}: AuthLayoutProps) {
  return (
    <div className={cn("min-h-screen flex flex-col", className)}>
      {/* Back button fixed at top left, outside header */}
      {showBackLink && (
        <div className="fixed top-6 left-6 z-50">
          <BackButton />
        </div>
      )}
      {/* Header with logo */}
      <header className="py-4 px-6 bg-white shadow-sm">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-blue-600 font-bold text-xl">SellMate</span>
          </Link>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in relative">
          {showBackLink && (
            <div className="absolute top-6 left-6 z-10">
              <BackButton />
            </div>
          )}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-3"></div>
          <div className="p-10 pt-16">
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-2 animate-fade-in">
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                {subtitle && <p className="text-base text-muted-foreground">{subtitle}</p>}
              </div>
              <div className="animate-fade-in">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-500 bg-white border-t">
        <div className="container mx-auto">
          <div className="mb-2">© {new Date().getFullYear()} Sellmate. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
            <Link to="/careers" className="hover:text-blue-600 transition-colors">Careers</Link>
            <Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link to="/security" className="hover:text-blue-600 transition-colors">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
