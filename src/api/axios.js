import axios from "axios";

export default axios.create({
  baseURL:
    "https://delta-company-organization.eu-central-1.elasticbeanstalk.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
