import { useState } from "react";
import { getCandidateByEmail } from "../services/api";

const CandidateForm = ({ onCandidateLoaded, onCandidateCleared }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    onCandidateCleared();
  };

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
        onChange={handleEmailChange}
      />

      <button
        onClick={handleSearch}
        disabled={loading}
        className="submit-button">
        {loading ? "Loading..." : "Load Candidate"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CandidateForm;
