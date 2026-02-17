import JobItem from "./JobItem";

const JobList = ({ jobs }) => {
  if (!jobs.length) {
    return <p>No positions available.</p>;
  }

  return (
    <div>
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
