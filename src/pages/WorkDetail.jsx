import React from "react";
import { useParams, Link } from "react-router-dom";
import { items } from "../components/work/StaggeredGrid"; // import your data source
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const WorkDetail = () => {
  const { id } = useParams();
  const work = items.find((item) => item.id === parseInt(id));

  if (!work) {
    return <div className="text-center py-20">Work not found!</div>;
  }

  return (
    <section className="py-20 xl:py-40 bg-gray-100">
      <div className="container mx-auto">
        <Link to="/work" className="text-lg font-medium leading-normal text-black flex items-center max-w-fit underline">
         <ArrowLeftIcon className="w-6 h-6 inline-block mr-2" />
          Back to Work
        </Link>
        <div className="mt-6 grid md:grid-cols-2 gap-10">
          <img
            src={work.img}
            alt={work.title}
            className="w-full h-auto aspect-[3/2.5] object-cover object-top rounded-lg shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold mb-4">{work.title}</h1>
            <p className="text-gray-700 text-lg">{work.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkDetail;
