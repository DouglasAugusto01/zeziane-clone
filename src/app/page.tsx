import { produtos } from "@/data/produtos";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Diferenciais } from "@/components/Diferenciais";
import { TenisDestaque } from "@/components/TenisDestaque";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Diferenciais />
      <TenisDestaque produtos={produtos} />
    </div>
  );
}
