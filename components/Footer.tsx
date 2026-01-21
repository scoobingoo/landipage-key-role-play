import React from "react";
import { MessageCircle, ShoppingBag, Shield } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img
                src="logo.png"
                alt="Logo"
                className="w-10 h-10 rounded-lg object-cover transform group-hover:rotate-12 transition-transform"
              />
              <span className="font-extrabold text-xl tracking-tighter text-white">
                KEY <span className="text-primary">ROLEPLAY</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Server Roleplay hàng đầu Việt Nam. Chúng tôi cam kết mang lại sân
              chơi công bằng, văn minh và ổn định nhất cho cộng đồng game thủ
              GTA V.
            </p>
            <div className="flex gap-4">
              <Shield
                className="text-gray-600 hover:text-primary transition-colors cursor-pointer"
                size={20}
              />
              <span className="text-xs text-gray-600 uppercase font-bold tracking-widest pt-0.5">
                Anti-Cheat Protected
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 border-l-4 border-primary pl-3">
              Liên kết
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>{" "}
                  Trang chủ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>{" "}
                  Webshop
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>{" "}
                  Quy định Server
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>{" "}
                  Tố cáo / Khiếu nại
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact/CTA */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 border-l-4 border-primary pl-3">
              Hỗ trợ
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Cần hỗ trợ? Liên hệ ngay với đội ngũ Staff qua Discord.
            </p>
            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white py-2 px-4 rounded transition-colors font-bold text-sm">
                <MessageCircle size={18} /> Tham gia Discord
              </button>
              <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primaryHover text-white py-2 px-4 rounded transition-colors font-bold text-sm">
                <ShoppingBag size={18} /> Nạp thẻ ngay
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-widest">
          <p>&copy; 2026 KEY ROLEPLAY CITY. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed By BDG Family</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
