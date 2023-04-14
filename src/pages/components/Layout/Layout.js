import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Layout.module.css";
import Image from "next/image";
import logo from "public/globe.svg";
const Layout = ({ children, title = "World Stats" }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/globe.ico" />
      </Head>

      <header className={styles.header}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div className={styles.logo}>
            <Image
              src={logo}
              alt="Picture of the author"
              width={70}
              height={70}
            />
            <p>
              World <br /> Stats
            </p>
          </div>
        </Link>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>Rafath@rafath.vercel.app</footer>
    </div>
  );
};

export default Layout;
