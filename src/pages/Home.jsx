import HeroTopSongs from "../components/hero/HeroTopSongs";
import ThemeSpeedDial from "../components/ui/ThemeSpeedDial";

export default function Home() {
  return (
    <div className="relative">
      <HeroTopSongs limit={5}/>
      <ThemeSpeedDial />
    </div>

  )
}
