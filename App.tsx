import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SocialBar from "./components/SocialBar";
import NewsGrid from "./components/NewsGrid";
import Footer from "./components/Footer";
import NewsDetail from "./components/NewsDetail";
import { newsData } from "./data/newsData";

const App: React.FC = () => {
  const [selectedNewsId, setSelectedNewsId] = useState<number | null>(null);

  const handleNewsClick = (id: number) => {
    setSelectedNewsId(id);
  };

  const handleBackToHome = () => {
    setSelectedNewsId(null);
  };

  const selectedNewsItem =
    selectedNewsId !== null
      ? newsData.find((item) => item.id === selectedNewsId)
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-dark text-white overflow-x-hidden">
      <Navbar onNavigateHome={handleBackToHome} />

      <main className="flex-grow">
        {selectedNewsItem ? (
          <NewsDetail item={selectedNewsItem} onBack={handleBackToHome} />
        ) : (
          <>
            <Hero />
            <SocialBar />
            <NewsGrid onNewsClick={handleNewsClick} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
