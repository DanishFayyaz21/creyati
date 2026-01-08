 import React from "react";
import ContactUs from "../components/ContactUs";
import ServicesBanner from "../components/services/ServicesBanner";
import ServicesDetail from "../components/services/ServicesDetail";
import Products from "../components/Products";

const ServicesPage = () => {
  return (
    <>
      <ServicesBanner />
      <ServicesDetail />
      {/* <Products /> */}
      <ContactUs />
    </>
  );
};

export default ServicesPage;
