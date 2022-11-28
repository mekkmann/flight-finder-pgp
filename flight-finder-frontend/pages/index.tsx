import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";
import DisplayResults from "../components/DisplayResults";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Flight Finder PGP</title>
        <meta
          name="description"
          content="A postgradute project for </SALT> by Pontus Alexander Liljekvist"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <h1>Landing Page</h1>

        <SearchForm />
        <DisplayResults
          urlToFetch={"https://localhost:7283/flights/search"}
          roundTrip={false}
        />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
