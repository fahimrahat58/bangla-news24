import Banner from "./components/banner";
import Bd from "./components/bd";
import Health from "./components/health";
import India from "./components/india";
import Others from "./components/others";
import SelectedNewsSection from "./components/selected";
import Video from "./components/video";
import World from "./components/world";

export default function Home() {
  return (
    <>
      <Banner />
      <SelectedNewsSection />
      <Bd />
      <India />
      <World />
      <Health />
      <Video />
      <Others />
    </>
  );
}
