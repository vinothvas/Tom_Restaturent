import About from "@/sections/About";
import Banner from "@/sections/Banner";
import SpecialMenu from "@/sections/SpecialMenu";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <About />
      <SpecialMenu />
    </div>
  );
}
