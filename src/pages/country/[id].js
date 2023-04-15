import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Country.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

const Country = ({ country }) => {
  const router = useRouter();
  const { name } = router.query;
  console.log(country);

  const [borders, setBorders] = useState([]);

  const renderBorderCountryNames = (borderCountries) => {
    return borderCountries.map((borderCountryCode) => (
      <span key={borderCountryCode}>{borderCountryCode}</span>
    ));
  };

  return (
    <Layout title={country.name.common}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview_panel}>
            <img src={country.flags.png} alt={country.name}></img>

            <h1 className={styles.overview_name}>{country.name.common}</h1>
            <div className={styles.overview_region}>{country.region}</div>

            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {country.population}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>

              <div className={styles.overview_area}>
                <div className={styles.overview_value}>{country.area}</div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {country.capital}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Languages</div>
              <div className={styles.details_panel_value}>
                {Object.values(country.languages).map((language, index) => (
                  <span key={index}>{language}</span>
                ))}
                {/* {country.languages.map(({ name }) => name).join(", ")} */}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currencies</div>
              <div className={styles.details_panel_value}>
                {Object.values(country.currencies).map((currency, index) => (
                  <span key={index}>{currency.name}</span>
                ))}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native name</div>
              <div className={styles.details_panel_value}>
                {Object.values(country.name.nativeName).map(
                  (nativeName, index) => {
                    if (index === 0) {
                      const { official } = nativeName;
                      return <span key={index}>{official}</span>;
                    }
                  }
                )}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Gini</div>
              <div className={styles.details_panel_value}>
                {country.gini &&
                  Object.entries(country.gini)?.map(([year, value]) => (
                    <div key={year}>{value}%</div>
                  ))}
              </div>
            </div>

            <div className={styles.details_panel_borders}>
              <div className={styles.details_panel_borders_label}>
                Neighbouring Countries
              </div>

              <div className={styles.details_panel_borders_container}>
              {country?.borders.length > 0
      ? renderBorderCountryNames(country.borders)
      : "None"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`https://restcountries.com/v3.1/name/${params.id}`);
  const [country] = await res.json();

  return {
    props: {
      country,
    },
  };
};
