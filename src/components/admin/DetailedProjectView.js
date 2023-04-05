import React from "react";

const DetailedProjectView = ({ project }) => {
  console.log("project in detailed view", project);
  return (
    <div className="p-3 shadow container mt-4 rounded">
      <h2 className="text-center mt-4 display-6 text-primary">Detailed view</h2>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 container mx-auto mt-4 ">
        <p>Project ID : {project.project_id}</p>
        <p>Project Name : {project.project_name}</p>
        <p>Client : {project.client}</p>
        <p>Client Account Manager : {project.client_account_manager}</p>
        <p>Status of Project : {project.status_of_project}</p>
        <p>
          Start Date : {project.start_date && project.start_date.split("T")[0]}
        </p>
       
        <p>
          Overall Project Fitness Indicator :{" "}
          {project.overall_project_fitness_indicator}
        </p>
        <p>Domain : {project.Domain}</p>
        <p>Type Of Project : {project.type_of_project}</p>
        <p>GdoHead : {project.GdoHeadEmail}</p>
      </div>
    </div>
  );
};

export default DetailedProjectView;