import { useParams } from "react-router-dom";
import { siteData } from "../data";

export default function Media() {
  const { slug } = useParams();
  const project = siteData.portfolio.projects.find((p) => p.slug === slug);

  if (!project) {
    return <div className="text-white text-center py-20">Media not found</div>;
  }

  const gallery = project.gallery || [];

  return (
    <div className="bg-black text-white min-h-screen py-28">
      <div className="container">
        {/* Logo */}
        <div className="flex justify-center items-center mb-12">
          <img
            src={project.logo}
            alt={project.title}
            className="max-w-[220px] w-full"
          />
        </div>

        {/* Gallery Layout */}
        <div className="grid gap-3">
          {/* Row 1 */}
          {gallery.length >= 3 && (
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 lg:col-span-5">
                <img
                  src={gallery[0]}
                  alt="media-0"
                  className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover"
                />
              </div>

              <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-3">
                <img
                  src={gallery[1]}
                  alt="media-1"
                  className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover"
                />
                <img
                  src={gallery[2]}
                  alt="media-2"
                  className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover"
                />
              </div>
            </div>
          )}

          {/* Row 2 */}
          {gallery.length >= 5 && (
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-6 lg:col-span-5">
                <img
                  src={gallery[3]}
                  alt="media-3"
                  className="rounded-lg lg:rounded-[25px] w-full h-full object-cover"
                />
              </div>
              <div className="col-span-6 lg:col-span-7">
                <img
                  src={gallery[4]}
                  alt="media-4"
                  className="rounded-lg lg:rounded-[25px] w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Remaining Images (Auto Grid) */}
          {gallery.length > 5 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {gallery.slice(5).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`media-${index + 5}`}
                  className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[350px] object-cover"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
