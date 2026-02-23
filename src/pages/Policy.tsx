import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import FloatingContact from "@/components/FloatingContact";

const Policy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Quay lại trang chủ
        </Link>

        <h1 className="text-2xl font-bold text-foreground mb-8">Chính sách & Liên hệ</h1>

        {/* Shipping */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-3">🚚 Chính sách giao hàng</h2>
          <div className="bg-card border rounded-xl p-5 text-foreground space-y-2 text-sm">
            <p>• Giao hàng toàn quốc trong 1-3 ngày làm việc.</p>
            <p>• <strong>Miễn phí vận chuyển</strong> cho tất cả đơn hàng.</p>
            <p>• Đơn hàng được đóng gói cẩn thận, bảo đảm an toàn khi vận chuyển.</p>
            <p>• Hỗ trợ kiểm tra hàng trước khi thanh toán (COD).</p>
          </div>
        </section>

        {/* Returns */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-3">🔄 Chính sách đổi trả</h2>
          <div className="bg-card border rounded-xl p-5 text-foreground space-y-2 text-sm">
            <p>• Đổi trả miễn phí trong vòng <strong>7 ngày</strong> kể từ ngày nhận hàng.</p>
            <p>• Sản phẩm chưa qua sử dụng, còn nguyên tem nhãn.</p>
            <p>• Hoàn tiền 100% nếu sản phẩm bị lỗi do nhà sản xuất.</p>
            <p>• Liên hệ hotline để được hướng dẫn đổi trả.</p>
          </div>
        </section>

        {/* Privacy */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-3">🔒 Chính sách bảo mật</h2>
          <div className="bg-card border rounded-xl p-5 text-foreground space-y-2 text-sm">
            <p>• Thông tin cá nhân của bạn được bảo mật tuyệt đối.</p>
            <p>• Chúng tôi không chia sẻ dữ liệu khách hàng cho bên thứ ba.</p>
            <p>• Dữ liệu chỉ được sử dụng cho mục đích xử lý đơn hàng và hỗ trợ khách hàng.</p>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-3">📞 Liên hệ</h2>
          <div className="bg-card border rounded-xl p-5 space-y-3 text-sm">
            <p className="text-foreground"><strong>Hotline:</strong> 0901 234 567 (8h-21h hàng ngày)</p>
            <p className="text-foreground"><strong>Zalo:</strong> 0901 234 567</p>
            <p className="text-foreground"><strong>Facebook:</strong> fb.com/glowserum</p>
            <p className="text-foreground"><strong>Email:</strong> hotro@glowserum.vn</p>
          </div>
        </section>
      </div>
      <FloatingContact />
    </div>
  );
};

export default Policy;
