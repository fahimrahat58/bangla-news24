import Banner from "./components/banner";
import Marquee from "./components/marquee";
import SelectedNewsSection from "./components/selected";

export default function Home() {
  return (
    <>
      <Marquee />
      <Banner />
      <SelectedNewsSection articles={[]} />
    </>
  );
}
