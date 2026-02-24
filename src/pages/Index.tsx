import productImage from "@/assets/product-hero.png";
import FloatingContact from "@/components/FloatingContact";
import Header from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Clock, Leaf, RotateCcw, Shield, Star, Thermometer, Truck, UtensilsCrossed } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const variations = [
  { id: "125g", label: "125g", price: 75000 },
];

const features = [
  "Hương vị béo ngậy tự nhiên từ hạt điều, thơm dịu, dễ ăn",
  "Giàu protein thực vật và chất béo tốt cho tim mạch",
  "Cung cấp năng lượng cần thiết cho cơ thể",
  "Sản phẩm thuần chay, không chứa thành phần động vật",
  "Khoảng 220–240 Kcal/125g, phù hợp cho chế độ ăn cân bằng",
];
const ingredients = "Hạt điều (60%), bơ hạt điều (15%), hành tây (10%), gia vị tự nhiên (muối biển, đường phèn, tiêu). Không chất bảo quản.";

const productInfo = [
  { label: "Tên sản phẩm", value: "Pate Hạt Điều Chay" },
  { label: "Thương hiệu", value: "CASHEW ESSENCE" },
  { label: "Khối lượng tịnh", value: "125g" },
  { label: "Ngày sản xuất", value: "In trên bao bì" },
  { label: "Hạn sử dụng", value: "18 tháng kể từ ngày sản xuất" },
  { label: "Xuất xứ", value: "Việt Nam" },
];
const commitments = [
  "Sản phẩm 100% nguyên liệu thực vật",
  "Không chứa chất bảo quản",
  "Đảm bảo an toàn vệ sinh thực phẩm",
  "Hương vị tự nhiên, tốt cho sức khỏe",
];

const reviews = [
  { name: "Nguyễn Thị Mai", rating: 5, text: "Sản phẩm rất thơm ngon, gia đình mình ai cũng thích. Sẽ mua lại!" },
  { name: "Trần Văn Hùng", rating: 5, text: "Chất lượng tuyệt vời, đóng gói cẩn thận. Giao hàng nhanh." },
  { name: "Lê Phương Anh", rating: 4, text: "Dùng kèm bánh mì rất ngon, vị béo tự nhiên. Recommend!" },
  { name: "Phạm Đức Minh", rating: 5, text: "Giá hợp lý, chất lượng cao. Đã giới thiệu cho bạn bè ăn chay." },
];

const Index = () => {
  const [selected] = useState(variations[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-4">
              🌿 Thực phẩm chay cao cấp
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
              Pate Hạt Điều Chay <br />
              <span className="text-primary">Cashew Essence</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Pate Hạt Điều Chay từ CASHEW ESSENCE được sản xuất hoàn toàn từ nguyên liệu tự nhiên, đặc biệt là hạt điều Việt Nam tuyển chọn. Không chứa thành phần động vật, không chất bảo quản độc hại.
            </p>
            <p className="text-muted-foreground mb-6">
              Lựa chọn lý tưởng cho người ăn chay, người theo lối sống lành mạnh và những ai yêu thích thực phẩm có nguồn gốc thực vật.
            </p>

            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-3xl font-bold text-primary">
                {(selected.price * qty).toLocaleString("vi-VN")}₫
              </span>
              {qty > 1 && (
                <span className="text-sm text-muted-foreground">
                  ({selected.price.toLocaleString("vi-VN")}₫ × {qty})
                </span>
              )}
            </div>

            {/* Số lượng */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-foreground">Số lượng:</span>
              <div className="flex items-center border rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg font-bold text-foreground hover:bg-muted transition-colors disabled:opacity-40"
                  disabled={qty <= 1}
                >
                  −
                </button>
                <span className="w-10 text-center font-semibold text-foreground select-none">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg font-bold text-foreground hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <Link
              to={`/dat-hang?size=${selected.id}&qty=${qty}`}
              className="inline-block w-full md:w-auto text-center bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-bold hover:opacity-90 transition-opacity shadow-lg"
            >
              🛒 Mua ngay – Giao hàng miễn phí
            </Link>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img
              src={productImage}
              alt="Cashew Essence – Tinh chất hạt điều"
              className="w-72 md:w-96 rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Đặc điểm sản phẩm */}
      <section className="bg-card py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            Đặc điểm Pate Hạt Điều Chay
          </h2>
          <div className="max-w-xl mx-auto space-y-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                <p className="text-foreground">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Thông tin chi tiết & Hướng dẫn */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            Thông tin chi tiết
          </h2>
          {/* Thông tin sản phẩm */}
          <div className="bg-card border rounded-xl overflow-hidden mb-6">
            {productInfo.map((item, i) => (
              <div key={i} className={`flex justify-between px-5 py-3 ${i % 2 === 0 ? "bg-muted/50" : ""}`}>
                <span className="text-muted-foreground font-medium">{item.label}</span>
                <span className="text-foreground font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
          {/* Accordion sections */}
          <Accordion type="multiple" className="space-y-2">
            <AccordionItem value="ingredients" className="bg-card border rounded-xl px-5">
              <AccordionTrigger className="text-foreground font-semibold">
                <span className="flex items-center gap-2"><Leaf className="w-4 h-4 text-primary" /> Thành phần nguyên liệu</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{ingredients}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="usage" className="bg-card border rounded-xl px-5">
              <AccordionTrigger className="text-foreground font-semibold">
                <span className="flex items-center gap-2"><UtensilsCrossed className="w-4 h-4 text-primary" /> Hướng dẫn sử dụng</span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Sử dụng trực tiếp sau khi mở nắp.</li>
                  <li>• Ngon hơn khi làm nóng, hấp hoặc nướng nhẹ.</li>
                  <li>• Dùng kèm với bánh mì, xôi, bánh bao, hoặc làm salad.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="storage" className="bg-card border rounded-xl px-5">
              <AccordionTrigger className="text-foreground font-semibold">
                <span className="flex items-center gap-2"><Thermometer className="w-4 h-4 text-primary" /> Hướng dẫn bảo quản</span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Bảo quản nơi khô ráo, thoáng mát dưới 30°C, tránh ánh nắng trực tiếp.</li>
                  <li>• Đậy kín nắp sau khi sử dụng và bảo quản trong ngăn mát tủ lạnh, sử dụng trong 5 ngày.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      {/* Cam kết */}
      <section className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            <Shield className="w-6 h-6 inline-block text-primary mr-2 -mt-1" />
            Cashew Essence cam kết
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {commitments.map((c, i) => (
              <div key={i} className="bg-card border rounded-xl p-4 text-center">
                <CheckCircle className="w-6 h-6 text-success mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Về Cashew Essence */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-foreground mb-10">
            Về Cashew Essence
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Mục tiêu</h3>
              <p className="text-sm text-muted-foreground">
                Cung cấp thực phẩm chay giàu dinh dưỡng, an toàn, có nguồn gốc thực vật, góp phần nâng cao sức khỏe cộng đồng.
              </p>
            </div>
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Giá trị cốt lõi</h3>
              <p className="text-sm text-muted-foreground">
                Tự nhiên – Dinh dưỡng – Bền vững – Trách nhiệm xã hội.
              </p>
            </div>
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Tầm nhìn</h3>
              <p className="text-sm text-muted-foreground">
                Trở thành thương hiệu thực phẩm chay từ hạt điều tiên phong tại Việt Nam, từng bước mở rộng ra thị trường khu vực.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-4">🌱 Giá trị mang lại</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" /> Người ăn chay, ăn kiêng, người theo lối sống xanh</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" /> Người tiêu dùng quan tâm đến sức khỏe</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" /> Nông dân trồng điều và lao động địa phương</li>
              </ul>
            </div>
            <div className="bg-card border rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-4">👥 Đối tượng khách hàng</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Người trẻ từ 18–35 tuổi, sinh viên, nhân viên văn phòng</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Người ăn chay trường hoặc ăn chay linh hoạt</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Người tiêu dùng ưu tiên sản phẩm có nguồn gốc thực vật</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SDGs Banner */}
      <section className="bg-card py-10 border-y">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                Cam kết bền vững
              </p>
              <h3 className="text-lg font-bold text-foreground mb-1">
                Cashew Essence & 17 Mục tiêu Phát triển Bền vững (SDGs)
              </h3>
              <p className="text-sm text-muted-foreground">
                Tìm hiểu cách chúng tôi đóng góp vào các mục tiêu của Liên Hợp Quốc thông qua từng sản phẩm.
              </p>
            </div>
            <Link
              to="/muc-tieu-phat-trien-ben-vung"
              className="shrink-0 border border-primary text-primary px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/5 transition-colors"
            >
              Xem chi tiết →
            </Link>
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
              <p className="text-xs text-muted-foreground">100% tự nhiên</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 Cashew Essence. Mọi quyền được bảo lưu.</p>
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
