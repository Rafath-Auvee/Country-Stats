import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import Countries from "../components/CountriesTable/CountriesTable";

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
        <Countries countries={countries} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();

    // Filter out Israel from the list of countries
    const filteredCountries = countries.filter(
      (country) => country.name.common !== 'Israel'
    );

    // Sort countries by name in ascending order
    const sortedCountries = filteredCountries.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );

    return {
      props: {
        countries: sortedCountries,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        countries: null,
      },
    };
  }
}