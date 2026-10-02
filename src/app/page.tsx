import Banner from "./components/banner";
import Bd from "./components/bd";
import Health from "./components/health";
import India from "./components/india";
import Marquee from "./components/marquee";
import Others from "./components/others";
import SelectedNewsSection from "./components/selected";
import Video from "./components/video";
import World from "./components/world";

export default function Home() {
  return (
    <>
      <Marquee />
      <Banner />
      <SelectedNewsSection />
      <Bd/>
      <India/>
      <World/>
      <Health/>
      <Video/>
      <Others/>
    </>
  );
}
