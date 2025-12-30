import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const instance = axios.create({
  baseURL,
});

// TODO: 추후 interceptor 추가
