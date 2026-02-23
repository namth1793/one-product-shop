import { Link } from "react-router-dom";
import { Star, Shield, Truck, RotateCcw, CheckCircle } from "lucide-react";
import productImage from "@/assets/product-hero.jpg";
import Header from "@/components/Header";
import FloatingContact from "@/components/FloatingContact";

const benefits = [
  "Dưỡng ẩm sâu, phục hồi da tổn thương sau 7 ngày",
  "Chiết xuất tự nhiên 100%, an toàn cho mọi loại da",
  "Thẩm thấu nhanh, không gây nhờn rít",
  "Làm đều màu da, mờ thâm nám hiệu quả",
  "Đã được kiểm nghiệm lâm sàng bởi chuyên gia",
];

const reviews = [
  { name: "Nguyễn Thị Mai", rating: 5, text: "Da mình cải thiện rõ rệt sau 2 tuần sử dụng. Rất hài lòng!" },
  { name: "Trần Văn Hùng", rating: 5, text: "Mua cho vợ, vợ rất thích. Sản phẩm chính hãng, giao hàng nhanh." },
  { name: "Lê Phương Anh", rating: 4, text: "Serum thẩm thấu nhanh, da mềm mịn hơn. Sẽ mua lại!" },
  { name: "Phạm Đức Minh", rating: 5, text: "Giá hợp lý, chất lượng tuyệt vời. Đã giới thiệu cho bạn bè." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-4">
              ⭐ Bestseller #1
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
              Serum Dưỡng Da <br />
              <span className="text-primary">GlowSerum Premium</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Công thức đột phá giúp da sáng mịn, căng bóng chỉ sau 7 ngày sử dụng.
            </p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">399.000₫</span>
              <span className="text-lg text-muted-foreground line-through">599.000₫</span>
              <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
                -33%
              </span>
            </div>

            <Link
              to="/dat-hang"
              className="inline-block w-full md:w-auto text-center bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-bold hover:opacity-90 transition-opacity shadow-lg"
            >
              🛒 Mua ngay – Giao hàng miễn phí
            </Link>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img
              src={productImage}
              alt="GlowSerum Premium"
              className="w-72 md:w-96 rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-card py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            Tại sao chọn GlowSerum?
          </h2>
          <div className="max-w-xl mx-auto space-y-4">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                <p className="text-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center text-foreground mb-8">
          Khách hàng nói gì?
        </h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {reviews.map((r, i) => (
            <div key={i} className="bg-card border rounded-xl p-5">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground mb-2">"{r.text}"</p>
              <p className="text-sm text-muted-foreground font-medium">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-card border-t py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
            <div className="flex flex-col items-center gap-2">
              <Truck className="w-8 h-8 text-primary" />
              <p className="text-sm font-semibold text-foreground">Giao hàng nhanh</p>
              <p className="text-xs text-muted-foreground">Toàn quốc 1-3 ngày</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RotateCcw className="w-8 h-8 text-primary" />
              <p className="text-sm font-semibold text-foreground">Đổi trả dễ dàng</p>
              <p className="text-xs text-muted-foreground">Trong vòng 7 ngày</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              <p className="text-sm font-semibold text-foreground">Cam kết chính hãng</p>
              <p className="text-xs text-muted-foreground">100% authentic</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 GlowSerum. Mọi quyền được bảo lưu.</p>
          <Link to="/chinh-sach" className="underline hover:text-foreground mt-1 inline-block">
            Chính sách & Liên hệ
          </Link>
        </div>
      </footer>

      <FloatingContact />
    </div>
  );
};

export default Index;
