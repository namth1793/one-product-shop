import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { Package } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface Order {
  id: number;
  size: string;
  price: number;
  customer_name: string;
  phone: string;
  address: string;
  payment: string;
  status: string;
  created_at: string;
}

const statusLabel: Record<string, string> = {
  pending: "Chờ xử lý",
  confirmed: "Đã xác nhận",
  shipping: "Đang giao",
  delivered: "Đã giao",
  cancelled: "Đã hủy",
};

const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipping: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

interface OrderHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrderHistoryDialog = ({ open, onOpenChange }: OrderHistoryDialogProps) => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !token) return;
    setLoading(true);
    setError("");
    fetch(`${API_URL}/api/orders/my`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.orders) setOrders(data.orders);
        else setError("Không thể tải lịch sử đơn hàng");
      })
      .catch(() => setError("Lỗi kết nối server"))
      .finally(() => setLoading(false));
  }, [open, token]);

  const formatDate = (dt: string) =>
    new Date(dt).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Lịch sử đơn hàng
          </DialogTitle>
        </DialogHeader>

        {loading && (
          <div className="text-center py-8 text-muted-foreground">Đang tải...</div>
        )}

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Bạn chưa có đơn hàng nào</p>
          </div>
        )}

        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-card border rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">#{order.id} · {formatDate(order.created_at)}</span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    statusColor[order.status] || "bg-muted text-muted-foreground"
                  }`}
                >
                  {statusLabel[order.status] || order.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Cashew Essence {order.size}</p>
                  <p className="text-xs text-muted-foreground">{order.address}</p>
                </div>
                <p className="text-primary font-bold">{order.price.toLocaleString("vi-VN")}₫</p>
              </div>
              <div className="text-xs text-muted-foreground">
                {order.payment === "cod" ? "Thanh toán khi nhận hàng" : "Chuyển khoản ngân hàng"}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderHistoryDialog;
