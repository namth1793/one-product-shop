import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import FloatingContact from "@/components/FloatingContact";

const Order = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cod",
  });

  const price = 399000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/xac-nhan", { state: { order: form } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <h1 className="text-2xl font-bold text-foreground mb-6">Đặt hàng</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product summary */}
          <div className="bg-card border rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">Cashew Essence</p>
              <p className="text-sm text-muted-foreground">x1</p>
            </div>
            <p className="text-lg font-bold text-primary">
              {price.toLocaleString("vi-VN")}₫
            </p>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Họ và tên <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nguyễn Văn A"
              className="w-full border rounded-lg px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Số điện thoại <span className="text-destructive">*</span>
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="0901 234 567"
              className="w-full border rounded-lg px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Địa chỉ nhận hàng <span className="text-destructive">*</span>
            </label>
            <textarea
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
              rows={3}
              className="w-full border rounded-lg px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {/* Payment */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phương thức thanh toán
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={form.payment === "cod"}
                  onChange={(e) => setForm({ ...form, payment: e.target.value })}
                  className="accent-primary"
                />
                <div>
                  <p className="font-medium text-foreground">Thanh toán khi nhận hàng (COD)</p>
                  <p className="text-xs text-muted-foreground">Trả tiền mặt cho shipper</p>
                </div>
              </label>
              <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={form.payment === "bank"}
                  onChange={(e) => setForm({ ...form, payment: e.target.value })}
                  className="accent-primary"
                />
                <div>
                  <p className="font-medium text-foreground">Chuyển khoản ngân hàng</p>
                  <p className="text-xs text-muted-foreground">Xác nhận qua tin nhắn</p>
                </div>
              </label>
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">Tổng cộng:</span>
            <span className="text-2xl font-bold text-primary">{price.toLocaleString("vi-VN")}₫</span>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl text-lg font-bold hover:opacity-90 transition-opacity shadow-lg"
          >
            ✅ Xác nhận đặt hàng
          </button>

          <p className="text-xs text-center text-muted-foreground">
            Miễn phí vận chuyển toàn quốc. Giao hàng trong 1-3 ngày.
          </p>
        </form>
      </div>
      <FloatingContact />
    </div>
  );
};

export default Order;
