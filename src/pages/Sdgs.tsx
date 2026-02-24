import Header from "@/components/Header";
import FloatingContact from "@/components/FloatingContact";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const sdgs = [
  {
    num: 1, color: "#e5243b", icon: "👨‍👩‍👧‍👦",
    title: "Xóa nghèo",
    desc: "Hỗ trợ sinh kế bền vững cho nông dân trồng điều và lao động địa phương, tạo nguồn thu nhập ổn định.",
  },
  {
    num: 2, color: "#dda63a", icon: "🍲",
    title: "Không còn nạn đói",
    desc: "Cung cấp thực phẩm giàu dinh dưỡng, giá hợp lý từ nguồn nguyên liệu nông sản Việt Nam.",
  },
  {
    num: 3, color: "#4c9f38", icon: "💚",
    title: "Sức khỏe và có cuộc sống tốt",
    desc: "Sản phẩm thuần thực vật, không chất bảo quản, hỗ trợ chế độ ăn lành mạnh và phòng ngừa bệnh mãn tính.",
  },
  {
    num: 4, color: "#c5192d", icon: "📖",
    title: "Giáo dục có chất lượng",
    desc: "Nâng cao nhận thức cộng đồng về dinh dưỡng thực vật và lối sống bền vững thông qua truyền thông sản phẩm.",
  },
  {
    num: 5, color: "#ff3a21", icon: "⚧️",
    title: "Bình đẳng giới",
    desc: "Tạo cơ hội việc làm bình đẳng cho phụ nữ trong chuỗi sản xuất và phân phối sản phẩm.",
  },
  {
    num: 6, color: "#26bde2", icon: "💧",
    title: "Nước sạch và vệ sinh",
    desc: "Quy trình sản xuất tiết kiệm nước, tuân thủ nghiêm ngặt tiêu chuẩn vệ sinh an toàn thực phẩm.",
  },
  {
    num: 7, color: "#fcc30b", icon: "☀️",
    title: "Năng lượng sạch với giá thành hợp lý",
    desc: "Định hướng sử dụng năng lượng tái tạo trong sản xuất, giảm phát thải carbon trong toàn chuỗi cung ứng.",
  },
  {
    num: 8, color: "#a21942", icon: "📈",
    title: "Công việc tốt và tăng trưởng kinh tế",
    desc: "Tạo việc làm bền vững, thu nhập công bằng cho người lao động địa phương và nông dân thu mua hạt điều.",
  },
  {
    num: 9, color: "#fd6925", icon: "🏗️",
    title: "Công nghiệp, sáng tạo và phát triển hạ tầng",
    desc: "Ứng dụng công nghệ chế biến hiện đại, sáng tạo sản phẩm từ nguyên liệu nông sản Việt Nam.",
  },
  {
    num: 10, color: "#dd1367", icon: "⚖️",
    title: "Giảm bất bình đẳng",
    desc: "Định giá sản phẩm hợp lý để mọi người đều có thể tiếp cận thực phẩm chay dinh dưỡng cao.",
  },
  {
    num: 11, color: "#fd9d24", icon: "🏙️",
    title: "Các thành phố và cộng đồng bền vững",
    desc: "Đóng góp vào phong trào ăn chay đô thị, xây dựng cộng đồng tiêu dùng có trách nhiệm.",
  },
  {
    num: 12, color: "#bf8b2e", icon: "♻️",
    title: "Tiêu thụ và sản xuất có trách nhiệm",
    desc: "Bao bì thân thiện môi trường, không lãng phí nguyên liệu, sản xuất theo nhu cầu thực tế.",
  },
  {
    num: 13, color: "#3f7e44", icon: "🌍",
    title: "Hành động vì khí hậu",
    desc: "Thực phẩm từ thực vật tạo ra lượng khí thải CO₂ thấp hơn đáng kể so với sản phẩm từ động vật.",
  },
  {
    num: 14, color: "#0a97d9", icon: "🐠",
    title: "Tài nguyên và môi trường biển",
    desc: "Không sử dụng nguyên liệu từ đại dương, giảm áp lực khai thác thủy hải sản.",
  },
  {
    num: 15, color: "#56c02b", icon: "🌳",
    title: "Tài nguyên và môi trường trên đất liền",
    desc: "Hỗ trợ nghề trồng điều bền vững, bảo tồn đa dạng sinh học và chống thoái hóa đất.",
  },
  {
    num: 16, color: "#00689d", icon: "🕊️",
    title: "Hòa bình, công lý và các thể chế mạnh mẽ",
    desc: "Kinh doanh minh bạch, tuân thủ pháp luật, xây dựng niềm tin bền vững với khách hàng.",
  },
  {
    num: 17, color: "#19486a", icon: "🤝",
    title: "Quan hệ đối tác vì các mục tiêu",
    desc: "Kết nối nông dân, nhà sản xuất, người tiêu dùng và tổ chức xã hội cùng hướng tới phát triển bền vững.",
  },
];

// SDGs mà Cashew Essence đóng góp trực tiếp nhất
const highlightedNums = [2, 3, 8, 12, 13, 15];

const Sdgs = () => (
  <div className="min-h-screen bg-background">
    <Header />

    {/* Hero */}
    <section className="bg-primary/5 border-b py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
          Phát triển bền vững
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
          17 Mục tiêu Phát triển Bền vững
          <span className="block text-primary">của Liên Hợp Quốc (SDGs)</span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-2xl mx-auto">
          Cashew Essence cam kết xây dựng mô hình kinh doanh có trách nhiệm, đóng góp thiết thực vào
          17 Mục tiêu Phát triển Bền vững (Sustainable Development Goals) mà Liên Hợp Quốc đặt ra
          cho năm 2030.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/dat-hang"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Mua sản phẩm
          </Link>
          <a
            href="https://sdgs.un.org/goals"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border border-border px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-muted transition-colors text-foreground"
          >
            Tìm hiểu thêm về SDGs
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>

    {/* Nổi bật */}
    <section className="container mx-auto px-4 py-10 max-w-4xl">
      <h2 className="text-lg font-bold text-foreground mb-1">
        Cashew Essence đóng góp trực tiếp vào 6 mục tiêu
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Thông qua hoạt động sản xuất và kinh doanh hàng ngày, chúng tôi tạo ra tác động tích cực rõ ràng nhất vào các mục tiêu sau:
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4">
        {sdgs
          .filter((g) => highlightedNums.includes(g.num))
          .map((g) => (
            <a
              key={g.num}
              href={`#sdg-${g.num}`}
              style={{ backgroundColor: g.color }}
              className="rounded-xl p-3 flex flex-col items-start gap-1 text-white hover:opacity-90 transition-opacity"
            >
              <span className="text-xs font-bold opacity-90 leading-none">{g.num}</span>
              <span className="text-2xl leading-none">{g.icon}</span>
              <p className="text-[11px] font-semibold leading-tight mt-1">{g.title}</p>
            </a>
          ))}
      </div>
    </section>

    {/* Tất cả 17 SDGs */}
    <section className="bg-muted/30 py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-xl font-bold text-foreground mb-8 text-center">
          Tất cả 17 Mục tiêu — Cách chúng tôi đóng góp
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {sdgs.map((g) => (
            <div
              id={`sdg-${g.num}`}
              key={g.num}
              className="bg-card border rounded-xl overflow-hidden flex"
            >
              {/* Color badge */}
              <div
                style={{ backgroundColor: g.color }}
                className="w-20 shrink-0 flex flex-col items-center justify-center gap-1 p-3 text-white"
              >
                <span className="text-xl font-black leading-none">{g.num}</span>
                <span className="text-2xl leading-none">{g.icon}</span>
              </div>
              {/* Content */}
              <div className="p-4">
                <p
                  className="text-sm font-bold mb-1"
                  style={{ color: g.color }}
                >
                  {g.title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="container mx-auto px-4 py-14 text-center max-w-xl">
      <p className="text-2xl font-bold text-foreground mb-3">
        Mỗi hộp Cashew Essence — một hành động vì tương lai
      </p>
      <p className="text-muted-foreground mb-6 text-sm">
        Chọn sản phẩm từ Cashew Essence là bạn đang góp phần xây dựng một thế giới lành mạnh, công bằng và bền vững hơn.
      </p>
      <Link
        to="/dat-hang"
        className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-xl text-base font-bold hover:opacity-90 transition-opacity shadow-lg"
      >
        🛒 Mua ngay – Giao hàng miễn phí
      </Link>
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

export default Sdgs;
