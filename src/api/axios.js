import axios from "axios";

export default axios.create({
  baseURL: "http://company-organization.eu-central-1.elasticbeanstalk.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
