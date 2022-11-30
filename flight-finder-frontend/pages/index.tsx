import Head from "next/head";
import styles from "../styles/Home.module.css";

import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";
import DisplayOneWayResults from "../components/DisplayOneWayResults";
import React, { useState } from "react";

export default function Home() {
  const [urlToFetch, setUrlToFetch] = useState<string>("");
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
        <SearchForm setUrlFunc={setUrlToFetch} />
        <br />
        <hr style={{ width: "100%" }} />
        <br />
        <DisplayOneWayResults urlToFetch={urlToFetch} />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
