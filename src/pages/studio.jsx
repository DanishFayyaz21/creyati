import React, { useState } from "react";

import ContactUs from "../components/ContactUs";
import FreeConsultation from "../components/FreeConsultation";
import LandscapeVideo from "../components/studio/studioLanding";
import StudioLandingArea from "../components/studio/StudioLandingArea";

const StudioPage = () => {
  return (
    <main>
      <StudioLandingArea />
      <LandscapeVideo/>
      <FreeConsultation />
      <ContactUs />
    </main>
  );
};

export default StudioPage;
