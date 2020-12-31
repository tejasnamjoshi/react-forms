import React from "react";

import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a
            href="https://bitbucket.org/tejas-salucro/react-forms"
            target="_blank"
          >
            React Forms!
          </a>
        </h1>

        <div className={styles.grid}>
          <Link href="/react-hook-form">
            <div className={styles.card}>
              <h3>React Hook Form &rarr;</h3>
            </div>
          </Link>

          <Link href="/react-final-form">
            <div className={styles.card}>
              <h3>React Final Form &rarr;</h3>
            </div>
          </Link>

          <Link href="/formik">
            <div className={styles.card}>
              <h3>Formik &rarr;</h3>
            </div>
          </Link>

          <Link href="/redux-form">
            <div className={styles.card}>
              <h3>Redux Form &rarr;</h3>
            </div>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
