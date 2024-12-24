import { useSearchParams } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import CountryBox from "./CountryBox";
import Pagination from "./Pagination";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.background};
  min-height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  max-width: 98rem;
  margin-inline: auto;
  gap: 5rem;
  padding-block: 3rem 6rem;
  align-items: start;

  @media (max-width: 1600px) {
    grid-template-columns: 1fr 1fr 1fr;
    padding-inline: 6rem;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 778px) {
    grid-template-columns: 1fr;
    padding-inline: 2rem;
  }

  @media (max-width: 500px) {
    padding-block: 3rem 8rem;
  }
`;

const Error = styled.p`
  color: ${(props) => props.theme.text};
  font-size: 3.5rem;
  width: 100%;
  font-weight: bold;
  padding-block: 3rem;
  max-width: 98rem;
  margin-inline: auto;
  color: #cc0202;

  @media (max-width: 1600px) {
    padding-inline: 6rem;
  }

  @media (max-width: 1200px) {
    text-align: center;
  }

  @media (max-width: 778px) {
    font-size: 2rem;
  }

  @media (max-width: 500px) {
    padding-inline: 2rem
  }
`;

function CountriesDisplay() {
  const { data, filter, searchValue, pageSize } = useData();

  const [countries, setCountries] = useState(data); // All countries
  const [error, setError] = useState(null); // Error state
  const [searchParams] = useSearchParams(); // Get current search params

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page")); // Get current page from URL

  const startIndex = (currentPage - 1) * pageSize; // Start index for slicing
  const endIndex = startIndex + pageSize; // End index for slicing
  const currentCountries =
    filter === "all"
      ? countries
          .filter((country) =>
            country.name.startsWith(
              searchValue.slice(0, 1).toUpperCase() +
                searchValue.slice(1).toLowerCase()
            )
          )
          .slice(startIndex, endIndex)
      : countries
          .filter((country) =>
            country.name.startsWith(
              searchValue.slice(0, 1).toUpperCase() +
                searchValue.slice(1).toLowerCase()
            )
          )
          .filter((country) => country.region === filter)
          .slice(startIndex, endIndex); // Countries for the current page

  if (error) return <p>{error}</p>;

  return (
    <Wrapper>
      {currentCountries.length > 0 ? (
        <Grid>
          {filter === "all"
            ? currentCountries.map((country) => (
                <CountryBox key={country.name} data={country} />
              ))
            : currentCountries
                .filter((country) => country.region === filter)
                .map((country) => (
                  <CountryBox key={country.name} data={country} />
                ))}
        </Grid>
      ) : (
        <Error>No countries found 😥</Error>
      )}

      {/* Integrate Pagination */}
      {currentCountries.length > 0 ? (
        filter === "all" ? (
          <Pagination
            count={
              countries.filter((country) =>
                country.name.startsWith(
                  searchValue.slice(0, 1).toUpperCase() +
                    searchValue.slice(1).toLowerCase()
                )
              ).length
            }
          />
        ) : (
          <Pagination
            count={
              countries
                .filter((country) =>
                  country.name.startsWith(
                    searchValue.slice(0, 1).toUpperCase() +
                      searchValue.slice(1).toLowerCase()
                  )
                )
                .filter((country) => country.region === filter).length
            }
          />
        )
      ) : null}
    </Wrapper>
  );
}

export default CountriesDisplay;
