import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import FloatingContact from "@/components/FloatingContact";
import { variations } from "@/pages/Index";
import { useAuth } from "@/contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// VietQR: tạo URL QR ngân hàng động
const BANK_ID = import.meta.env.VITE_BANK_ID || "";
const BANK_ACCOUNT = import.meta.env.VITE_BANK_ACCOUNT || "";
const BANK_NAME = import.meta.env.VITE_BANK_NAME || "";

function getBankQrUrl(amount: number, orderInfo: string) {
  if (!BANK_ID || !BANK_ACCOUNT) return "";
  const info = encodeURIComponent(orderInfo);
  const name = encodeURIComponent(BANK_NAME);
  return `https://img.vietqr.io/image/${BANK_ID}-${BANK_ACCOUNT}-qr_only.jpg?amount=${amount}&addInfo=${info}&accountName=${name}`;
}

// Kiểm tra file momo-qr.png có tồn tại không, fallback về placeholder
const MOMO_QR_SRC = "/momo-qr.png";
const MOMO_QR_FALLBACK = "/momo-qr-placeholder.svg";

// Component hiển thị QR sau khi chọn phương thức chuyển khoản
const QrPanel = ({ payment, amount, orderName }: { payment: string; amount: number; orderName: string }) => {
  const [momoSrc, setMomoSrc] = useState(MOMO_QR_SRC);

  if (payment === "bank") {
    const qrUrl = getBankQrUrl(amount, `Thanh toan ${orderName}`);
    return (
      <div className="border rounded-xl bg-card p-4 space-y-3">
        <p className="text-sm font-semibold text-foreground">Quét QR để chuyển khoản</p>
        {qrUrl ? (
          <>
            <div className="flex justify-center">
              <img
                src={qrUrl}
                alt="QR chuyển khoản ngân hàng"
                className="w-48 h-48 rounded-lg border object-contain bg-white"
              />
            </div>
            <div className="text-xs text-muted-foreground space-y-1 bg-muted/50 rounded-lg p-3">
              <p><span className="font-medium text-foreground">Ngân hàng:</span> {BANK_ID}</p>
              <p><span className="font-medium text-foreground">Số tài khoản:</span> {BANK_ACCOUNT}</p>
              <p><span className="font-medium text-foreground">Chủ TK:</span> {BANK_NAME}</p>
              <p><span className="font-medium text-foreground">Số tiền:</span> <span className="text-primary font-bold">{amount.toLocaleString("vi-VN")}₫</span></p>
              <p><span className="font-medium text-foreground">Nội dung:</span> Thanh toan {orderName}</p>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Vui lòng chuyển khoản trước khi xác nhận. Chúng tôi sẽ liên hệ xác nhận qua tin nhắn.
            </p>
          </>
        ) : (
          <p className="text-xs text-destructive">
            Chưa cấu hình thông tin ngân hàng. Vui lòng liên hệ hotline để thanh toán.
          </p>
        )}
      </div>
    );
  }

  if (payment === "momo") {
    return (
      <div className="border rounded-xl bg-card p-4 space-y-3">
        <p className="text-sm font-semibold text-foreground">Quét QR MoMo để thanh toán</p>
        <div className="flex justify-center">
          <img
            src={momoSrc}
            alt="QR MoMo"
            className="w-48 h-48 rounded-lg border object-contain bg-white"
            onError={() => setMomoSrc(MOMO_QR_FALLBACK)}
          />
        </div>
        <div className="text-xs text-muted-foreground space-y-1 bg-muted/50 rounded-lg p-3">
          <p><span className="font-medium text-foreground">Số tiền:</span> <span className="text-primary font-bold">{amount.toLocaleString("vi-VN")}₫</span></p>
          <p><span className="font-medium text-foreground">Nội dung:</span> Thanh toan Cashew Essence</p>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Chụp màn hình xác nhận chuyển tiền và gửi qua Zalo để xác nhận đơn.
        </p>
      </div>
    );
  }

  return null;
};

const Order = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, token } = useAuth();

  const selectedVariation = variations[0];
  const [qty, setQty] = useState(() => {
    const q = parseInt(searchParams.get("qty") || "1");
    return isNaN(q) || q < 1 ? 1 : Math.min(q, 99);
  });

  const total = selectedVariation.price * qty;

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
          quantity: qty,
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
          <div className="bg-card border rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">Cashew Essence – Pate Hạt Điều Chay</p>
                <p className="text-sm text-muted-foreground">{selectedVariation.label} · {selectedVariation.price.toLocaleString("vi-VN")}₫/hộp</p>
              </div>
              <p className="text-lg font-bold text-primary">
                {total.toLocaleString("vi-VN")}₫
              </p>
            </div>
            {/* Chọn số lượng */}
            <div className="flex items-center justify-between pt-1 border-t">
              <span className="text-sm text-muted-foreground">Số lượng</span>
              <div className="flex items-center border rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  className="w-9 h-9 flex items-center justify-center text-lg font-bold text-foreground hover:bg-muted transition-colors disabled:opacity-40"
                >
                  −
                </button>
                <span className="w-9 text-center font-semibold text-foreground select-none">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  className="w-9 h-9 flex items-center justify-center text-lg font-bold text-foreground hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
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
                <div className="flex items-center gap-2">
                  <div>
                    <p className="font-medium text-foreground">Chuyển khoản ngân hàng</p>
                    <p className="text-xs text-muted-foreground">Quét mã QR · xác nhận qua Zalo</p>
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <input
                  type="radio"
                  name="payment"
                  value="momo"
                  checked={form.payment === "momo"}
                  onChange={(e) => setForm({ ...form, payment: e.target.value })}
                  className="accent-primary"
                />
                <div>
                  <p className="font-medium text-foreground">
                    <span className="inline-block w-4 h-4 rounded-full bg-[#ae2070] mr-1.5 align-middle" />
                    Ví MoMo
                  </p>
                  <p className="text-xs text-muted-foreground">Quét mã QR MoMo · xác nhận qua Zalo</p>
                </div>
              </label>
            </div>
          </div>

          {/* QR Panel — hiện khi chọn bank hoặc momo */}
          {(form.payment === "bank" || form.payment === "momo") && (
            <QrPanel
              payment={form.payment}
              amount={total}
              orderName={`Cashew Essence 125g x${qty}`}
            />
          )}

          {/* Total */}
          <div className="border-t pt-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">
              Tổng cộng{qty > 1 ? ` (×${qty})` : ""}:
            </span>
            <span className="text-2xl font-bold text-primary">
              {total.toLocaleString("vi-VN")}₫
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
