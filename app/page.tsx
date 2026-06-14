export const revalidate = 60;

import { getConfig } from "./lib/config";
import { getIntervenants } from "./lib/intervenants";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Constat } from "./components/Constat";
import { Benefices } from "./components/Benefices";
import { PourQui } from "./components/PourQui";
import { Intervenants } from "./components/Intervenants";
import { Programme } from "./components/Programme";
import { Formulaire } from "./components/Formulaire";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";

export default async function LandingPage() {
  const [config, intervenants] = await Promise.all([getConfig(), getIntervenants()]);

  return (
    <>
      <div className="page-bg" />
      <main className="relative z-10 min-h-screen">
        <Header date={config.date} />
        <Hero date={config.date} title={config.title} />
        <Constat />
        <Benefices />
        <PourQui />
        <Intervenants intervenants={intervenants} />
        <Programme />
        <Formulaire whatsappGroupLink={config.whatsappGroupLink} />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
