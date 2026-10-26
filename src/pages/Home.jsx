import HeroTopSongs from "../components/hero/HeroTopSongs";
import SpeedDialFAB from "../components/ui/SpeedDialFAB";

export default function Home() {
  return (
    <div className="relative">
      <HeroTopSongs limit={5}/>
      <SpeedDialFAB />
    </div>

  )
}
