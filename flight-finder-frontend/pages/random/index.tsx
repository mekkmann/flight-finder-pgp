import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

import Navbar from "../../components/Navbar";
import DisplayRandom from "../../components/DIsplayRandom";

export default function Random() {
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
        <h1>Random Flights</h1>

        <DisplayRandom />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
