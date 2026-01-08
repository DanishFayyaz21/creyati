import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WorkPage from "./pages/Work";
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";
import ContactPage from "./pages/Contact";
import PortfolioDetail from "./pages/PortfolioDetail";

// ✅ Import each static service page
import Videography from "./pages/services/Videography";
import Photography from "./pages/services/Photography";
import SocialMedia from "./pages/services/SocialMedia";
import Branding from "./pages/services/Branding";
import GraphicDesign from "./pages/services/GraphicDesign";
import Advertising from "./pages/services/Advertising";
import WebDevelopment from "./pages/services/WebDevelopment";
import ThreeD from "./pages/services/ThreeD";
import Strategy from "./pages/services/Strategy";
import Media from "./pages/Media";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/media/:slug" element={<Media />} />

      {/* ✅ Static service inner pages */}
      <Route path="/services/videography" element={<Videography />} />
      <Route path="/services/photography" element={<Photography />} />
      <Route path="/services/social-media" element={<SocialMedia />} />
      <Route path="/services/branding" element={<Branding />} />
      <Route path="/services/graphic-design" element={<GraphicDesign />} />
      <Route path="/services/advertising" element={<Advertising />} />
      <Route path="/services/web-development" element={<WebDevelopment />} />
      <Route path="/services/3d" element={<ThreeD />} />
      <Route path="/services/strategy" element={<Strategy />} />

      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default AppRoutes;
