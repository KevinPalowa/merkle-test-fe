import { BASE_URL } from "@/constant";
import axios from "axios";

const API = axios.create({ baseURL: BASE_URL });

export default API;
