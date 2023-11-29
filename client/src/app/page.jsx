import About from "../lib/components/About/About";
import Banner from "../lib/components/Contact/Banner";
import Hero from "../lib/components/Hero/Hero";
import Reviews from "../lib/components/Reviews/Reviews";
import Services from "../lib/components/Services/Services";
import Work from "../lib/components/Work/Work";
import React from "react";

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Work />
      <Reviews />
      <Banner />
    </main>
  );
};

export default Home;
