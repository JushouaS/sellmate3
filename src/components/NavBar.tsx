import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCircle, Menu, X, Sun, Moon, LogOut, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface NavBarProps {
  userType?: "buyer" | "seller" | "middleman" | "admin";
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
}

export function NavBar({ userType, darkMode, setDarkMode }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showLoggedOutDialog, setShowLoggedOutDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getNavColorClass = () => {
    switch (userType) {
      case "buyer":
        return "bg-blue-50 border-blue-100";
      case "seller":
        return "bg-green-50 border-green-100";
      case "middleman":
        return "bg-purple-50 border-purple-100";
      case "admin":
        return "bg-red-50 border-red-100";
      default:
        return "bg-white border-gray-100";
    }
  };

  const isLoggedIn = userType !== undefined;
  const isAuthPage = location.pathname.includes("/login") || location.pathname.includes("/signup");

  if (isAuthPage) {
    return null;
  }

  const handleLogout = () => {
    setShowLogoutDialog(false);
    toast({ title: '✔ Logged out successfully' });
    navigate("/");
    setTimeout(() => setShowLoggedOutDialog(true), 100);
  };

  const handleBackToLogin = () => {
    setShowLoggedOutDialog(false);
    navigate("/login");
  };

  return (
    <nav className={`border-b ${getNavColorClass()} sticky top-0 z-50`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link
            to={isLoggedIn ? undefined : "/"}
            className="text-xl font-bold cursor-pointer"
            onClick={isLoggedIn ? (e) => { e.preventDefault(); setShowLogoutDialog(true); } : undefined}
          >
            <span className="text-blue-600 font-bold text-xl">SellMate</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation + Night mode toggle */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => setShowLogoutDialog(true)}>
                  Logout
                </Button>
                <Link to={userType ? `/profile/${userType}` : '/profile'}>
                  <Button size="sm" variant="ghost">
                    <UserCircle className="h-5 w-5" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button size="sm" variant="outline" className="ml-2">Login</Button>
                </Link>
              </>
            )}
            {/* Night mode toggle button */}
            {typeof darkMode !== 'undefined' && setDarkMode && (
              <button
                className="ml-2 z-50 bg-white/80 dark:bg-[#232b3a] border border-gray-200 dark:border-gray-700 rounded-full p-2 shadow hover:scale-110 transition-all"
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle night mode"
                type="button"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-700" />}
              </button>
            )}
          </div>
        </div>

        {/* Logout Confirmation Dialog */}
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogContent className="sm:max-w-md text-center" hideCloseButton>
            <div className="flex flex-col items-center gap-4 py-2">
              <LogOut className="h-12 w-12 text-black mx-auto" />
              <div className="font-bold text-lg mt-2">Oh no! You're leaving...<br />Are you sure?</div>
            </div>
            <DialogFooter className="flex flex-col gap-2 mt-4">
              <Button variant="destructive" className="w-full" onClick={() => setShowLogoutDialog(false)}>
                Nah, Just Kidding
              </Button>
              <Button variant="outline" className="w-full border-red-500 text-red-600 hover:bg-red-50" onClick={handleLogout}>
                Yes, Log Me Out
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Logged Out Confirmation Dialog */}
        <Dialog open={showLoggedOutDialog} onOpenChange={setShowLoggedOutDialog}>
          <DialogContent className="sm:max-w-md text-center" hideCloseButton>
            <div className="flex flex-col items-center gap-4 py-2">
              <ThumbsUp className="h-12 w-12 text-black mx-auto" />
              <div className="font-bold text-lg mt-2">You've successfully<br />Logged out.</div>
            </div>
            <DialogFooter className="flex flex-col gap-2 mt-4">
              <Button variant="destructive" className="w-full" onClick={handleBackToLogin}>
                Back to Login
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4 pb-2 space-y-2`}>
          {isLoggedIn ? (
            <>
              <Button variant="ghost" className="block px-2 py-1 w-full text-left" onClick={() => setShowLogoutDialog(true)}>
                Logout
              </Button>
              <Link to="/profile" className="block px-2 py-1 hover:bg-gray-100 rounded">
                Profile
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
