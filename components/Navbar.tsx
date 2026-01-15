import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Home,
  Newspaper,
  Phone,
  Volume2,
  VolumeX,
  Volume1,
} from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Logic Nhạc & Volume
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4); // Mặc định 40%
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Xử lý bật/tắt nhạc
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = volume; // Đảm bảo volume đúng khi bắt đầu phát
        audioRef.current
          .play()
          .catch((e) => console.log("Trình duyệt chặn autoplay:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Xử lý thay đổi volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const navLinks = [
    { name: "Trang chủ", icon: Home, href: "#" },
    { name: "Webshop", icon: ShoppingCart, href: "#" },
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
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
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
                className="flex items-center text-sm font-semibold text-gray-300 hover:text-primary transition-colors uppercase tracking-wide relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded text-sm font-bold transition-colors border border-white/20">
              CONNECT
            </button>
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
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-bold text-white hover:text-primary uppercase flex items-center gap-3"
            >
              <link.icon size={24} className="text-primary" />
              {link.name}
            </a>
          ))}
        </div>
      </nav>

      {/* --- PHẦN NHẠC NỀN & VOLUME CONTROL --- */}
      {/* Đưa phần này ra khỏi thẻ <nav> để tránh bị ảnh hưởng bởi style của nav khi scroll */}
      <audio ref={audioRef} loop>
        <source src="/keyroleplay_music.mp3" type="audio/mpeg" />
      </audio>

      <div className="fixed bottom-6 left-6 z-[60] flex items-center gap-3 group">
        {/* Nút Bật/Tắt */}
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

        {/* Thanh điều chỉnh Volume (Chỉ hiện khi Hover vào cả cụm) */}
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
