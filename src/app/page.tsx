import { Hero } from "@/components/home/hero";
import { Offerings } from "@/components/home/offerings";
import { Benvenuti } from "@/components/home/benvenuti";
import { Regioni } from "@/components/home/regioni";
import { Upcoming } from "@/components/home/upcoming";
import { ChefTeaser } from "@/components/home/chef-teaser";
import { TheBasket } from "@/components/home/the-basket";
import { Closer } from "@/components/home/closer";
import { getChefProfile, getUpcomingEvents } from "@/lib/data";

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
      <Closer />
    </>
  );
}
