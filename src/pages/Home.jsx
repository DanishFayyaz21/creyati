import React from "react";
import Banner from "../components/Banner";
import About from "../components/About";
import Clients from "../components/Clients";
import Showcase from "../components/Showcase";
import ContactUs from "../components/ContactUs";
import Reviews from "../components/Reviews";
import AnimationSection from "../components/AnimationSection";
import Products from "../components/Products";

const Home = () => {
  return (
    <main>
      <Banner />
      <About />
      <AnimationSection />
      <Products />
      <Showcase />
      <Clients />
      {/* <Reviews /> */}
      <ContactUs />
    </main>
  );
};

export default Home;
