import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import FloatingContact from "@/components/FloatingContact";
import { variations } from "@/pages/Index";
import { useAuth } from "@/contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const Order = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const selectedVariation = variations[0];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cod",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Tự điền tên & số điện thoại nếu đã đăng nhập
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name,
        phone: prev.phone || user.phone || "",
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          size: selectedVariation.id,
          price: selectedVariation.price,
          customer_name: form.name,
          phone: form.phone,
          address: form.address,
          payment: form.payment,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Không thể đặt hàng");

      navigate("/xac-nhan", {
        state: { order: { ...form, variation: selectedVariation.id, orderId: data.order.id } },
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Lỗi kết nối, vui lòng thử lại");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <h1 className="text-2xl font-bold text-foreground mb-6">Đặt hàng</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product summary */}
          <div className="bg-card border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">Cashew Essence – Pate Hạt Điều Chay</p>
                <p className="text-sm text-muted-foreground">{selectedVariation.label} · x1</p>
              </div>
              <p className="text-lg font-bold text-primary">
                {selectedVariation.price.toLocaleString("vi-VN")}₫
              </p>
            </div>
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
            <span className="text-2xl font-bold text-primary">
              {selectedVariation.price.toLocaleString("vi-VN")}₫
            </span>
          </div>

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl text-lg font-bold hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60"
          >
            {loading ? "Đang xử lý..." : "✅ Xác nhận đặt hàng"}
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
