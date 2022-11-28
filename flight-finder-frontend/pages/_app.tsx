import "../styles/globals.css";
import "../styles/Navbar.css";
import "../styles/SearchForm.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
