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
        setError(err.response?.data?.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="container">
      <h1>Job Application Portal</h1>
      <CandidateForm
        onCandidateLoaded={setCandidate}
        onCandidateCleared={() => setCandidate(null)}
      />

      {candidate && (
        <p style={{ color: "green", fontSize: "18px", textAlign: "center" }}>
          Candidate loaded: {candidate.firstName} {candidate.lastName}
        </p>
      )}

      <div className="container">
        <h2>Job Open Positions</h2>

        {loading && <p>Loading jobs...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && <JobList jobs={jobs} candidate={candidate} />}
      </div>
    </div>
  );
}

export default App;
