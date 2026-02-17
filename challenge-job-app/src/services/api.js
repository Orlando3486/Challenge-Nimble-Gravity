import axios from "axios";

const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export const getCandidateByEmail = async (email) => {
  return axios.get(`${BASE_URL}/api/candidate/get-by-email`, {
    params: { email },
  });
};

export const getJobs = async () => {
  return axios.get(`${BASE_URL}/api/jobs/get-list`);
};

export const applyToJob = async (data) => {
  return axios.post(`${BASE_URL}/api/candidate/apply-to-job`, data);
};
