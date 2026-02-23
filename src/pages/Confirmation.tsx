import { Link } from "react-router-dom";
import { CheckCircle2, Phone } from "lucide-react";
import Header from "@/components/Header";

const Confirmation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16 max-w-md text-center">
        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Đặt hàng thành công!
          </h1>
          <p className="text-muted-foreground mb-6">
            Cảm ơn bạn đã tin tưởng GlowSerum. Chúng tôi sẽ liên hệ xác nhận đơn hàng trong thời gian sớm nhất.
          </p>

          <div className="bg-secondary rounded-xl p-4 text-left space-y-2 mb-6">
            <p className="text-sm text-foreground">
              📦 <strong>Thời gian giao hàng:</strong> 1-3 ngày làm việc
            </p>
            <p className="text-sm text-foreground">
              📞 <strong>Hotline hỗ trợ:</strong> 0901 234 567
            </p>
            <p className="text-sm text-foreground">
              💬 <strong>Zalo:</strong> 0901 234 567
            </p>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Nếu cần hỗ trợ, vui lòng liên hệ hotline hoặc nhắn tin qua Zalo.
          </p>

          <Link
            to="/"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
