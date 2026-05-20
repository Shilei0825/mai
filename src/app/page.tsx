import { Hero } from "@/components/home/hero";
import { Offerings } from "@/components/home/offerings";
import { Benvenuti } from "@/components/home/benvenuti";
import { Regioni } from "@/components/home/regioni";
import { Upcoming } from "@/components/home/upcoming";
import { ChefTeaser } from "@/components/home/chef-teaser";
import { TheBasket } from "@/components/home/the-basket";
import { BrandMark } from "@/components/home/brand-mark";
import { Closer } from "@/components/home/closer";
import { getChefProfile, getUpcomingEvents } from "@/lib/data";

// Always render on request so the latest hero_clips / events from Supabase
// show immediately. Without this Next can statically prerender at build time
// and freeze whatever DB state existed then.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const [events, chef] = await Promise.all([
    getUpcomingEvents(3),
    getChefProfile(),
  ]);
  return (
    <>
      <Hero />
      <Offerings />
      <Benvenuti />
      <Regioni />
      <Upcoming events={events} />
      <ChefTeaser chef={chef} />
      <TheBasket />
      <BrandMark />
      <Closer />
    </>
  );
}
