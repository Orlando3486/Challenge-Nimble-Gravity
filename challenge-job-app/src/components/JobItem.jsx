import { useState, useEffect } from "react";
import { applyToJob } from "../services/api";

const JobItem = ({ job, candidate }) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setSuccess(false);
  }, [repoUrl]);

  const handleSubmit = async () => {
    if (!candidate) {
      setError("You must load your email first.");
      return;
    }

    if (!repoUrl) {
      setError("Repository URL is required.");
      return;
    }

    if (!repoUrl.startsWith("https://github.com/")) {
      setError("Repository URL must start with https://github.com/");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const payload = {
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl: repoUrl,
      };

      const response = await applyToJob(payload);

      if (response.data?.ok) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply to job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>{job.title}</h3>

      {!candidate && (
        <p style={{ color: "gray", fontSize: "14px" }}>
          Load your email before applying.
        </p>
      )}

      <input
        type="text"
        placeholder="GitHub repository URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        className="input"
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !candidate}
        className="submit-button">
        {loading ? "Submitting..." : "Submit"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green" }}>Application sent successfully!</p>
      )}
    </div>
  );
};

export default JobItem;
