const JobItem = ({ job }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}>
      <h3>{job.title}</h3>
    </div>
  );
};

export default JobItem;
