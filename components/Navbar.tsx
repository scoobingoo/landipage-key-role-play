import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Home,
  Newspaper,
  Phone,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Volume2,
  VolumeX,
  Volume1,
} from "lucide-react";
import { User as UserType } from "../App"; // Import Type User từ App

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onNavigateAdmin: () => void;
  onOpenAuth: () => void; // Hàm mở form đăng nhập
  user: UserType | null;   // Dữ liệu người dùng
  onLogout: () => void;    // Hàm đăng xuất
}

const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  onNavigateShop,
  onNavigateAdmin,
  onOpenAuth,
  user,
  onLogout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false); // State cho dropdown user

  // --- LOGIC NHẠC & VOLUME (GIỮ NGUYÊN TỪ FILE CŨ) ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = volume;
        audioRef.current
          .play()
          .catch((e) => console.log("Trình duyệt chặn autoplay:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  // ----------------------------------------------------

  // --- LOGIC ĐIỀU HƯỚNG ---
  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === "shop") {
      onNavigateShop();
    } else if (href === "home") {
      onNavigateHome();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href === "admin") {
      onNavigateAdmin();
    } else if (href.startsWith("#")) {
      onNavigateHome();
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const navLinks = [
    { name: "Trang chủ", icon: Home, href: "home" },
    { name: "Webshop", icon: ShoppingCart, href: "shop" },
    { name: "Tin tức", icon: Newspaper, href: "#news" },
    { name: "Liên hệ", icon: Phone, href: "#" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo - GIỮ NGUYÊN THƯƠNG HIỆU CŨ */}
          <a
            href="#"
            onClick={(e) => handleLinkClick("home", e)}
            className="flex items-center gap-2 group"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 rounded-lg object-cover transform group-hover:rotate-12 transition-transform"
            />
            <span className="font-extrabold text-xl md:text-2xl tracking-tighter uppercase italic">
              KEY <span className="text-primary">ROLEPLAY</span> CITY
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(link.href, e)}
                className="flex items-center text-sm font-semibold text-gray-300 hover:text-primary transition-colors uppercase tracking-wide relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {/* PHẦN USER / LOGIN (MỚI) */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 pl-2 pr-4 py-1.5 rounded-full transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold uppercase">
                    {user.username.charAt(0)}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-bold text-white leading-none">
                      {user.username}
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
                      {user.role}
                    </p>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-gray-500 transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
                    {user.role === "admin" && (
                      <button
                        onClick={() => {
                          onNavigateAdmin();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-all text-left"
                      >
                        <Settings size={16} /> Quản trị hệ thống
                      </button>
                    )}
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-all text-left border-t border-white/5">
                      <User size={16} /> Hồ sơ cá nhân
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-all text-left border-t border-white/5"
                    >
                      <LogOut size={16} /> Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-primary hover:bg-primaryHover text-white px-6 py-2.5 rounded font-black text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(255,87,34,0.3)] transition-all hover:-translate-y-0.5"
              >
                ĐĂNG NHẬP
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ top: "0", height: "100vh" }}
        >
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-white p-2"
          >
            <X size={32} />
          </button>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(link.href, e)}
              className="text-2xl font-bold text-white hover:text-primary uppercase flex items-center gap-3"
            >
              <link.icon size={24} className="text-primary" />
              {link.name}
            </a>
          ))}

          {/* Mobile User Options */}
          {user ? (
            <div className="flex flex-col gap-4 items-center border-t border-white/10 pt-8 w-full">
              <span className="text-gray-400 uppercase text-sm tracking-widest">
                Xin chào, {user.username}
              </span>
              {user.role === "admin" && (
                <button
                  onClick={(e) => handleLinkClick("admin", e)}
                  className="text-xl font-bold text-white hover:text-primary uppercase flex items-center gap-3"
                >
                  <Settings size={20} /> Quản trị
                </button>
              )}
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-xl font-bold text-red-500 hover:text-red-400 uppercase flex items-center gap-3"
              >
                <LogOut size={20} /> Đăng xuất
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="text-2xl font-bold text-primary hover:text-white uppercase flex items-center gap-3 mt-4"
            >
              <User size={24} /> Đăng nhập
            </button>
          )}
        </div>
      </nav>

      {/* --- PHẦN NHẠC NỀN & VOLUME CONTROL (GIỮ NGUYÊN) --- */}
      <audio ref={audioRef} loop>
        <source src="/keyroleplay_music.mp3" type="audio/mpeg" />
      </audio>

      <div className="fixed bottom-6 left-6 z-[60] flex items-center gap-3 group">
        <button
          onClick={toggleMusic}
          className={`flex items-center justify-center w-12 h-12 rounded-full border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 ${
            isPlaying
              ? "bg-primary text-white hover:scale-110"
              : "bg-black/60 text-gray-400 hover:text-white"
          }`}
        >
          {isPlaying ? (
            volume > 0.5 ? (
              <Volume2 size={24} className="animate-pulse" />
            ) : (
              <Volume1 size={24} className="animate-pulse" />
            )
          ) : (
            <VolumeX size={24} />
          )}
        </button>

        <div className="bg-black/80 backdrop-blur rounded-full px-4 py-2 border border-white/10 opacity-0 -translate-x-4 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 transition-all duration-500 ease-out flex items-center shadow-xl">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primaryHover"
          />
          <span className="ml-2 text-xs font-bold text-white w-8">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
    </>
  );
};

export default Navbar;