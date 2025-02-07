import Image from "next/image";
import { NavBar } from "./components/NavBar";
import { Hero } from "./components/hero";

export default function Home() {
  return (
   <>
    <main className=" mx-auto px-4 sm:px-6  w-full">
   
    <NavBar/>
    <Hero/>
      
      </main>
   </>
  );
}
