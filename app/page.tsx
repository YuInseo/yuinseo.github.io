import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomeContent from "./HomeContent";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
      <Nav />
      <HomeContent />
      <Footer />
    </div>
  );
}
