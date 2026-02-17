import { useState } from "react";
import { getCandidateByEmail } from "../services/api";

const CandidateForm = ({ onCandidateLoaded }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await getCandidateByEmail(email);
      onCandidateLoaded(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch candidate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Loading..." : "Load Candidate"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CandidateForm;
