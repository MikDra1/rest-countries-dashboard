import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { useData } from "../contexts/DataContext";
import CountryDetails from "./CountryDetails";


const CountryLoadingDetails = () => {
  const { data } = useData();
  const { alpha3Code } = useParams(); // Get alpha3Code from URL
  const [countriesMap, setCountriesMap] = useState(null); // Map for efficient lookups
  const [country, setCountry] = useState(null); // Current country
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const map = new Map(
          data.map((country) => [country.alpha3Code, country])
        );
        setCountriesMap(map);
        setCountry(map.get(alpha3Code)); // Lookup country by alpha3Code
      } catch (err) {
        setError(`Failed to load country data. ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (!countriesMap) {
      loadCountries();
    } else {
      setCountry(countriesMap.get(alpha3Code)); // Lookup if map is already loaded
    }
  }, [alpha3Code, countriesMap, data]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
  if (!country) return <p>Country not found.</p>;

  return <CountryDetails country={country} />;
};

export default CountryLoadingDetails;
