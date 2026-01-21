import React, { useState } from "react";
import FreeConsultation from "../components/FreeConsultation";
import LandscapeVideo from "../components/studio/studioLanding";
import StudioLandingArea from "../components/studio/StudioLandingArea";
import StudioMapSection from "../components/studio/StudioMapSection";

const StudioPage = () => {
  return (
    <main>
      <StudioLandingArea />
      
      <StudioMapSection />
    </main>
  );
};

export default StudioPage;
