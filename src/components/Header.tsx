import { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn, LogOut, ShoppingBag, User, Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
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

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-foreground tracking-tight">
            Cashew Essence
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link
              to="/chinh-sach"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Chính sách
            </Link>

            {isLoggedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="inline-flex items-center gap-1.5 border border-border px-3 py-2 rounded-full text-sm font-medium hover:bg-muted transition-colors">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline max-w-[120px] truncate">{user.name}</span>
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

            <Link
              to="/dat-hang"
              className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <ShoppingBag className="w-4 h-4" />
              Mua ngay
            </Link>
          </nav>
        </div>
      </header>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
      <OrderHistoryDialog open={historyOpen} onOpenChange={setHistoryOpen} />
    </>
  );
};

export default Header;
