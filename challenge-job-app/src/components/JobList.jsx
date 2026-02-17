import JobItem from "./JobItem";

const JobList = ({ jobs, candidate }) => {
  if (!jobs.length) {
    return <p>No positions available.</p>;
  }

  return (
    <div>
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} candidate={candidate} />
      ))}
    </div>
  );
};

export default JobList;
