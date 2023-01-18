import "../styles/globals.css";
import type {AppProps} from "next/app";
import Axios from "axios";
import {AuthProvider} from "../context/auth";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import NavBar from "../components/NavBar";

export default function App({Component, pageProps}: AppProps) {
    const accessToken = Cookies.get("Authorization");
    Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
    if (accessToken)
        Axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

    const {pathname} = useRouter();
    const authRoutes = ["/register", "/login"];
    const isAuthRoute = authRoutes.includes(pathname);

    return (
        <AuthProvider>
            {!isAuthRoute && <NavBar/>}
            <div className={isAuthRoute ? "" : "pt-12 bg-gray-200 min-h-screen"}>
                <Component {...pageProps} />
            </div>
        </AuthProvider>
    );
}
