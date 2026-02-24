import { MessageCircle, Phone } from "lucide-react";

const FloatingContact = () => {
  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3">
      <a
        href="tel:0393801795"
        className="w-12 h-12 rounded-full bg-success text-success-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Gọi ngay"
      >
        <Phone className="w-5 h-5" />
      </a>
      <a
        href="https://zalo.me/0393801795"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat Zalo"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
};

export default FloatingContact;
