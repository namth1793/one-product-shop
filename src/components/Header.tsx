import { Link } from "react-router-dom";
import { Phone, ShoppingBag } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-foreground tracking-tight">
          GlowSerum
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/chinh-sach" className="text-muted-foreground hover:text-foreground transition-colors">
            Chính sách
          </Link>
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
  );
};

export default Header;
