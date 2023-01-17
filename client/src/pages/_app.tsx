import "../styles/globals.css";
import type { AppProps } from "next/app";
import Axios from "axios";
import {AuthProvider} from "../context/auth";
import Cookies from "js-cookie";

export default function App({ Component, pageProps }: AppProps) {
  const accessToken = Cookies.get("Authorization");
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  if(accessToken) Axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

  return <AuthProvider>
    <Component {...pageProps} />;
  </AuthProvider>
}
