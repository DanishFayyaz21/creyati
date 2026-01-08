import { useParams } from "react-router-dom";
import { siteData } from "../data";

export default function Media() {
  const { slug } = useParams();
  const project = siteData.portfolio.projects.find((p) => p.slug === slug);

  if (!project) {
    return <div className="text-white text-center py-20">Media not found</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen py-28">
      <div className="container">
        <div className="flex justify-center items-center mb-12">
          <img
            src={project.logo}
            alt={project.title}
            className="max-w-[220px] w-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {project.gallery.map((img, index) => (
            <div
              key={index}
              className="col-span-12 sm:col-span-6 lg:col-span-4"
            >
              <img
                src={img}
                alt={`media-${index}`}
                className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[350px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
