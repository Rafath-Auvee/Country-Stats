import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Layout from "./components/Layout/Layout";
import SearchInput from "./components/SearchInput/SearchInput";
import Countries from "./components/CountriesTable/CountriesTable";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ countries }) {
  console.log(countries);
  return (
    <>
      <Layout>
        <div className={styles.inputContainer}>
          <div className={styles.counts}>
            Found {countries.length} countries
          </div>
          <div className={styles.input}>
            <SearchInput
              placeholder="Filter by Name, Region or SubRegion"
              // onChange={onInputChange}
            />
          </div>
        </div>
        <Countries countries={countries}/>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
