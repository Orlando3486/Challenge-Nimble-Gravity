import { useEffect, useState } from "react";
import { getJobs } from "./services/api";
import JobList from "./components/JobList";
import CandidateForm from "./components/CandidateForm";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await getJobs();
        setJobs(response.data);
      } catch (err) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <CandidateForm onCandidateLoaded={setCandidate} />

      {candidate && (
        <p>
          Candidate loaded: {candidate.firstName} {candidate.lastName}
        </p>
      )}

      <h1>Job Open Positions</h1>

      {loading && <p>Loading jobs...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && <JobList jobs={jobs} />}
    </div>
  );
}

export default App;
