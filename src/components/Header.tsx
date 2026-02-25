import AuthDialog from "@/components/AuthDialog";
import OrderHistoryDialog from "@/components/OrderHistoryDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut, Menu, Package, Target, User, X, FileText } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-foreground tracking-tight" onClick={closeMobile}>
            Cashew Essence
          </Link>

          <nav className="flex items-center gap-5 text-sm">
            {/* Desktop links */}
            <Link
              to="/muc-tieu-phat-trien-ben-vung"
              className="text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
            >
              Mục Tiêu
            </Link>
            <Link
              to="/chinh-sach"
              className="text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
            >
              Chính sách
            </Link>

            {/* Desktop auth */}
            <div className="hidden sm:block">
              {isLoggedIn && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="inline-flex items-center gap-1.5 border border-border px-3 py-2 rounded-full text-sm font-medium hover:bg-muted transition-colors">
                      <User className="w-4 h-4" />
                      <span className="max-w-[120px] truncate">{user.name}</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setHistoryOpen(true)}>
                      <Package className="w-4 h-4 mr-2" />
                      Lịch sử đơn hàng
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="inline-flex items-center gap-1.5 border border-border px-3 py-2 rounded-full text-sm font-medium hover:bg-muted transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Đăng nhập
                </button>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="sm:hidden p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Mở menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="sm:hidden border-t bg-card px-4 py-3 flex flex-col gap-1">
            <Link
              to="/muc-tieu-phat-trien-ben-vung"
              onClick={closeMobile}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Target className="w-4 h-4" />
              Mục Tiêu
            </Link>
            <Link
              to="/chinh-sach"
              onClick={closeMobile}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <FileText className="w-4 h-4" />
              Chính sách
            </Link>

            <div className="border-t my-1" />

            {isLoggedIn && user ? (
              <>
                <div className="px-3 py-1.5 text-xs text-muted-foreground truncate">{user.email}</div>
                <button
                  onClick={() => { setHistoryOpen(true); closeMobile(); }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors w-full text-left"
                >
                  <Package className="w-4 h-4" />
                  Lịch sử đơn hàng
                </button>
                <button
                  onClick={() => { logout(); closeMobile(); }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-muted transition-colors w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </>
            ) : (
              <button
                onClick={() => { setAuthOpen(true); closeMobile(); }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors w-full text-left"
              >
                <LogIn className="w-4 h-4" />
                Đăng nhập
              </button>
            )}
          </div>
        )}
      </header>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
      <OrderHistoryDialog open={historyOpen} onOpenChange={setHistoryOpen} />
    </>
  );
};

export default Header;
