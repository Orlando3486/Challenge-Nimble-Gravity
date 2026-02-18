import axios from "axios";

const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

const ENDPOINTS = {
  GET_CANDIDATE: "/api/candidate/get-by-email",
  GET_JOBS: "/api/jobs/get-list",
  APPLY: "/api/candidate/apply-to-job",
};

export const getCandidateByEmail = async (email) => {
  return axios.get(`${BASE_URL}${ENDPOINTS.GET_CANDIDATE}`, {
    params: { email },
  });
};

export const getJobs = async () => {
  return axios.get(`${BASE_URL}${ENDPOINTS.GET_JOBS}`);
};

export const applyToJob = async (data) => {
  return axios.post(`${BASE_URL}${ENDPOINTS.APPLY}`, data);
};
