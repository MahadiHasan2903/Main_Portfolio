import ProjectComponent from "../../lib/components/Work/ProjectComponent";

const Projects = () => {
  return (
    <section className="min-h-screen pt-12">
      <div className="container mx-auto">
        <h2 className="mx-auto mb-8 text-center section-title xl:mb-16">
          My Projects
        </h2>
        <ProjectComponent />
      </div>
    </section>
  );
};

export default Projects;
