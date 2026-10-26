import HeroTopSongs from "../components/hero/HeroTopSongs";

export default function Home() {
  return (
    <div className="relative">
      <HeroTopSongs limit={5}/>
    </div>
  )
}
