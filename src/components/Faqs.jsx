import React, { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";

const faqData = [
  {
    question: "Branding & Design",
    answer:
      "Branding that cuts through the noise. We help build your brand identities that look sharp, feel right, and tell your story.",
  },
  {
    question: "Creative Direction",
    answer:
      "We turn raw ideas into creative gold. Guiding every visual, word, and mood to align with your brand’s vision and voice.",
  },
  {
    question: "Media Production",
    answer:
      "We produce high-quality visuals that bring your brand to life — from scroll-stopping content to clean photography and everything in between. Thoughtfully crafted, professionally delivered.",
  },
  {
    question: "Integrated Media Production",
    answer:
      "End-to-end media production tailored for impact. From pre-production planning and scripting to full-scale shoots and post, we manage every layer of media production with precision. Whether it’s a national campaign or multi-platform brand rollout — we deliver seamless execution across video, photography, digital, and branded content.",
  },
];

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const bgTextRef = useRef(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (bgTextRef.current) {
      gsap.to(bgTextRef.current, {
        x: "-100%",
        repeat: -1,
        duration: 20,
        ease: "linear",
      });
    }
  }, []);

  return (
    <section className="pt-20 pb-20 xl:pb-40 relative overflow-hidden">
      {/* Moving Background Text */}
      {/* <div
        ref={bgTextRef}
        className="absolute left-0 top-[20px] text-[250px] font-bold opacity-15 whitespace-nowrap pointer-events-none"
        style={{
          // transform: "rotateZ(-30deg)",
        }}
      >
        CAPABILITIES • CAPABILITIES • CAPABILITIES • CAPABILITIES •
      </div> */}

      <div className="container relative z-10">
        <div className="mb-20 text-center">
          <h2 className="heading2 text-fill-black">CAPABILITIES</h2>
          <span className="border-line bg-black my-5"></span>
          <p className="para max-w-[800px] mx-auto w-full text-fill-black">
            Our capabilities encompass visual communication through design,
            motion contents, and stills to help brands and businesses connect,
            influence, and thrive in a rapidly changing and complex world.
          </p>
        </div>

        <div className="max-w-[700px] w-full mx-auto space-y-5">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-black py-5 px-5 md:px-10 rounded-xl cursor-pointer transition-all"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h5 className="heading5 text-fill-white mb-0 w-[calc(100%-50px)]">{faq.question}</h5>
                <ChevronDownIcon
                  className={`w-6 h-6 ml-5 text-white transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === index ? "max-h-40 mt-5" : "max-h-0"
                }`}
              >
                <p className="para2 text-fill-white">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
