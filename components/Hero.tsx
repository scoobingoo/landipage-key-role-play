import React from "react";
import Button from "./Button";
import { Gamepad2, FileText, ChevronDown } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="LOGO_FINAL_PNG.gif"
          alt="KEY ROLEPLAY CITY Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-black/70 to-black/60"></div>

        {/* Animated grid overlay effect */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]  opacity-20"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
        <div className="mb-6 animate-fade-in-down">
          <span className="bg-primary/20 text-primary border border-primary/50 rounded-full px-4 py-1 text-sm font-bold uppercase tracking-widest backdrop-blur-sm">
            Server Season 1.0
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tighter uppercase italic drop-shadow-2xl">
          <span className="block text-primary drop-shadow-[0_0_10px_rgba(255,87,34,0.8)]">
            KEY ROLEPLAY
          </span>
        </h1>

        <p className="text-gray-300 text-lg md:text-2xl mb-10 max-w-2xl font-light leading-relaxed">
          Chào mừng đến với thành phố của những giấc mơ. Trải nghiệm Roleplay
          đỉnh cao, cộng đồng văn minh và tính năng độc đáo nhất Việt Nam.
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
          <Button
            href="https://discord.gg/a6w9ZPJVPj"
            size="lg"
            icon={Gamepad2}
          >
            THAM GIA DISCORD NGAY
          </Button>
          <Button
            href="https://forms.google.com"
            variant="outline"
            size="lg"
            icon={FileText}
          >
            ĐĂNG KÝ WHITELIST
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-400">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;
