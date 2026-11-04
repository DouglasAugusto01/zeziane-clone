import { produtos } from "@/data/produtos";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { GrupoPromocoes } from "@/components/GrupoPromocoes";
import { TenisDestaque } from "@/components/TenisDestaque";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <GrupoPromocoes />
      <TenisDestaque produtos={produtos} />
      <Footer />
    </div>
  );
}
