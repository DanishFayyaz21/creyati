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

                    {/* Gallery (hidden for 3d, graphic-design, branding) */}
                    {!["3d", "graphic-design", "branding"].includes(service.slug) && (
                        <div className="grid gap-3 pt-16">
                            {Array.from({
                                length: Math.ceil(
                                    (window.innerWidth < 1024 && service?.mobileGallery?.length > 0
                                        ? service?.mobileGallery
                                        : service?.gallery
                                    ).length / (service.slug === "web-development" ? 3 : 5)
                                )
                            }).map((_, groupIndex) => {
                                const isWebDev = service.slug === "web-development";
                                const itemsPerRow = isWebDev ? 3 : 5;
                                const startIndex = groupIndex * itemsPerRow;
                                const groupMedia = (window?.innerWidth < 1024 && service?.mobileGallery?.length > 0
                                    ? service?.mobileGallery
                                    : service?.gallery
                                ).slice(startIndex, startIndex + itemsPerRow);

                                // Get links for web-development service
                                const links = isWebDev 
                                    ? (window?.innerWidth < 1024 && service?.moblinks?.length > 0
                                        ? service?.moblinks
                                        : service?.desktoplinks || [])
                                    : [];

                                const ImageWrapper = ({ children, index }) => {
                                    if (isWebDev && links[index]) {
                                        return (
                                            <a href={links[index]} target="_blank" rel="noopener noreferrer" className="block h-full">
                                                {children}
                                            </a>
                                        );
                                    }
                                    return children;
                                };
                                
                                const imageClass = isWebDev 
                                    ? "rounded-lg lg:rounded-[25px] w-full h-full object-contain bg-black p-4"
                                    : "rounded-lg lg:rounded-[25px] w-full h-full object-cover object-top";

                                // Special layout for web-development on desktop
                                if (isWebDev && window.innerWidth >= 1024) {
                                    return (
                                        <div key={groupIndex} className="grid gap-3">
                                            {/* 3 images in a row for web-development */}
                                            {groupMedia.length >= 1 && (
                                                <div className="grid grid-cols-3 gap-3">
                                                    {groupMedia.map((media, i) => (
                                                        (media.endsWith(".mp4") || media.endsWith(".webm") || media.endsWith(".MP4")) ? (
                                                            <div key={i} className="col-span-1">
                                                                <video
                                                                    src={media}
                                                                    autoPlay
                                                                    loop
                                                                    muted
                                                                    playsInline
                                                                    className="rounded-lg lg:rounded-[25px] w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <ImageWrapper key={i} index={startIndex + i}>
                                                                <img
                                                                    src={media}
                                                                    alt={`media-${startIndex + i}`}
                                                                    className={`${imageClass} h-[300px]`}
                                                                />
                                                            </ImageWrapper>
                                                        )
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                // Default layout for other services and mobile
                                return (
                                    <div key={groupIndex} className="grid gap-3">
                                        {/* First row: 1 large media + 2 stacked media, but if any is video, render as full row in grid */}
                                        {groupMedia.length >= 1 && (
                                            groupMedia.slice(0, 3).some(media => media.endsWith(".mp4") || media.endsWith(".webm") || media.endsWith(".MP4")) ? (
                                                <div className="grid grid-cols-12 gap-3">
                                                    {groupMedia.slice(0, 3).map((media, i) => (
                                                        (media.endsWith(".mp4") || media.endsWith(".webm") || media.endsWith(".MP4")) ? (
                                                            <div key={i} className="col-span-12 mb-3">
                                                                <video
                                                                    src={media}
                                                                    autoPlay
                                                                    loop
                                                                    muted
                                                                    playsInline
                                                                    className="rounded-lg lg:rounded-[25px] w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        ) : null
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-12 gap-3">
                                                    <div className="col-span-12 lg:col-span-5">
                                                        <ImageWrapper index={startIndex}>
                                                            <img
                                                                src={groupMedia[0]}
                                                                alt={`media-${startIndex}`}
                                                                className={`${imageClass} max-h-[576px]`}
                                                            />
                                                        </ImageWrapper>
                                                    </div>
                                                    {groupMedia.length >= 2 && (
                                                        <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-3">
                                                            {groupMedia.slice(1, 3).map((media, i) => (
                                                                <ImageWrapper key={i} index={startIndex + i + 1}>
                                                                    <img
                                                                        src={media}
                                                                        alt={`media-${startIndex + i + 1}`}
                                                                        className={`${imageClass} max-h-[576px]`}
                                                                    />
                                                                </ImageWrapper>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        )}

                                        {/* Second row: 2 media side by side, but if any is video, render as full row in grid */}
                                        {groupMedia.length >= 4 && (
                                            groupMedia.slice(3, 5).some(media => media.endsWith(".mp4") || media.endsWith(".webm") || media.endsWith(".MP4")) ? (
                                                <div className="grid grid-cols-12 gap-3">
                                                    {groupMedia.slice(3, 5).map((media, i) => (
                                                        (media.endsWith(".mp4") || media.endsWith(".webm") || media.endsWith(".MP4")) ? (
                                                            <div key={i} className="col-span-12 mb-3">
                                                                <video
                                                                    src={media}
                                                                    autoPlay
                                                                    loop
                                                                    muted
                                                                    playsInline
                                                                    className="rounded-lg lg:rounded-[25px] w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        ) : null
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-12 gap-3">
                                                    {groupMedia.slice(3, 5).map((media, i) => (
                                                        <div key={i} className={`col-span-6 lg:col-span-${i === 0 ? 5 : 7}`}>
                                                            <ImageWrapper index={startIndex + 3 + i}>
                                                                <img
                                                                    src={media}
                                                                    alt={`media-${startIndex + 3 + i}`}
                                                                    className={imageClass}
                                                                />
                                                            </ImageWrapper>
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Service Navigation */}
                    <ServiceNavigation currentSlug={slug} />
                </div>
            </section>
            <ContactUs />
        </>
    );
};

export default ServiceInnerPage;