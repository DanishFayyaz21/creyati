import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import LandingArea from "../components/work/LandingArea";
import PortfolioSection from "../components/work/PortfolioSection";
import ContactUs from "../components/ContactUs";

const StudioPage = () => {
  return (
    <main>
      <LandingArea />
      <PortfolioSection />
      <ContactUs />
    </main>
  );
};

export default StudioPage;
