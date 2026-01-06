import React from "react";
import { siteData } from "../../data";

const ContactBanner = () => {
  const { contactPageBanner } = siteData.contactPage;
  return (
    <section className="pt-40 pb-10 bg-black text-white">
      <h1 className="text-[9vw] w-[90%] mx-auto text-center uppercase">
        {contactPageBanner.title}
      </h1>
    </section>
  );
};

export default ContactBanner;
