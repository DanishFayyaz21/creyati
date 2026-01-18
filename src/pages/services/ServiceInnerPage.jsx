import React from "react";
import { useParams } from "react-router-dom";
import { siteData } from "../../data";
import ContactUs from "../../components/ContactUs";
import ServiceNavigation from "../../components/services/ServiceNavigation";

const ServiceInnerPage = () => {
    const { slug } = useParams();
    const service = siteData.services.servicesDetail.list.find(
        (s) => s.slug === slug
    );
    console.log("service", service);
    if (!service) return <div>Service not found</div>;

    return (
        <>
            <section className="pt-40 pb-20 bg-black text-white">
                <div className="container mx-auto">
                    {/* Hero section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                                src={service.video}
                            />
                        </div>
                        <div className="grid grid-cols-1">
                            <div className="border-[0.5px] border-white px-10 md:px-14 py-8 md:py-14">
                                <h2 className="text-[22px] font-normal uppercase lg:text-3xl mb-5">
                                    {service.title}
                                </h2>
                                <p>{service.description}</p>
                            </div>
                            <div className="border-[0.5px] border-white px-10 md:px-14 py-8">
                                <h2 className="text-[22px] font-normal uppercase lg:text-3xl mb-5">
                                    WHAT TO EXPECT
                                </h2>
                                <ul className="list-disc font-urbanist list-inside space-y-3">
                                    {service.expectations.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Gallery */}
                    <div className="grid gap-3 pt-16">
                        {Array.from({
                            length: Math.ceil(
                                (window.innerWidth < 1024 && service?.mobileGallery?.length > 0
                                    ? service?.mobileGallery
                                    : service?.gallery
                                ).length / 5
                            )
                        }).map((_, groupIndex) => {
                            const startIndex = groupIndex * 5;
                            const groupMedia = (window?.innerWidth < 1024 && service?.mobileGallery?.length > 0
                                ? service?.mobileGallery
                                : service?.gallery
                            ).slice(startIndex, startIndex + 5);

                            return (
                                <div key={groupIndex} className="grid gap-3">
                                    {/* First row: 1 large media + 2 stacked media */}
                                    {groupMedia.length >= 1 && (
                                        <div className="grid grid-cols-12 gap-3">
                                            <div className="col-span-12 lg:col-span-5">
                                                {groupMedia[0].endsWith(".mp4") || groupMedia[0].endsWith(".webm") || groupMedia[0].endsWith(".MP4") ? (
                                                    <video
                                                        src={groupMedia[0]}
                                                        autoPlay
                                                        loop
                                                        muted
                                                        playsInline
                                                        className="rounded-lg lg:rounded-[25px] w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <img
                                                        src={groupMedia[0]}
                                                        alt={`media-${startIndex}`}
                                                        className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover object-top"
                                                    />
                                                )}
                                            </div>

                                            {groupMedia.length >= 2 && (
                                                <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-3">
                                                    {groupMedia.slice(1, 3).map((media, i) => (
                                                        media.endsWith(".mp4") || media.endsWith(".webm") || media.endsWith(".MP4") ? (
                                                            <video
                                                                key={i}
                                                                src={media}
                                                                autoPlay
                                                                loop
                                                                muted
                                                                playsInline
                                                                className="rounded-lg lg:rounded-[25px] w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <img
                                                                key={i}
                                                                src={media}
                                                                alt={`media-${startIndex + i + 1}`}
                                                                className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover object-top"
                                                            />
                                                        )
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Second row: 2 media side by side */}
                                    {groupMedia.length >= 4 && (
                                        <div className="grid grid-cols-12 gap-3">
                                            {groupMedia.slice(3, 5).map((media, i) => (
                                                <div key={i} className={`col-span-6 lg:col-span-${i === 0 ? 5 : 7}`}>
                                                    {media.endsWith(".mp4") || media.endsWith(".webm") || media.endsWith(".MP4") ? (
                                                        <video
                                                            src={media}
                                                            autoPlay
                                                            loop
                                                            muted
                                                            playsInline
                                                            className="rounded-lg lg:rounded-[25px] w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={media}
                                                            alt={`media-${startIndex + 3 + i}`}
                                                            className="rounded-lg lg:rounded-[25px] w-full h-full object-cover object-top"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Service Navigation */}
                    <ServiceNavigation currentSlug={slug} />
                </div>
            </section>
            <ContactUs />
        </>
    );
};

export default ServiceInnerPage;