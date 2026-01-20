import React, { useState } from "react";
import FreeConsultation from "../components/FreeConsultation";
import LandscapeVideo from "../components/studio/studioLanding";
import StudioLandingArea from "../components/studio/StudioLandingArea";

const StudioPage = () => {
  return (
    <main>
      <StudioLandingArea />
      <FreeConsultation />
       <LandscapeVideo/>
    </main>
  );
};

export default StudioPage;
