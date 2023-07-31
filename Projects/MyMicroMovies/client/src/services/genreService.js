import http from "./httpService";
import { apiUrl, apiMicronaut } from "../config.json";

export function getGenres() {
  return http.get(apiMicronaut + "/genres");

}
