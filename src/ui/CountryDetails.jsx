import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { whereAlpha3 } from "iso-3166-1";
import styled from "styled-components";
import { useEffect } from "react";
import { useCountryRest } from "../contexts/CountryRestProvider";

/* eslint-disable react/prop-types */

const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
  type: "region",
});

function alpha3ToAlpha2(alpha3Code) {
  const entry = whereAlpha3(alpha3Code.toUpperCase());
  return entry ? entry.alpha2 : entry;
}

function renderingBorder(border) {
  try {
    const alpha2Code = alpha3ToAlpha2(border);
    if (!alpha2Code) return border; // Fallback to border if alpha2Code is invalid

    const regionName = regionNamesInEnglish.of(alpha2Code);
    return regionName || border; // Use region name if available, else fallback to border
  } catch (error) {
    console.error(`Error processing border ${border}:`, error);
    return border; // Fallback to border in case of any error
  }
}

const Wrapper = styled.div`
  padding-top: 3rem;
  background-color: ${(props) => props.theme.background};
  min-height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 80%;
  margin-inline: auto;
  align-items: center;
  padding-top: 5rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding-bottom: 5rem;
  }
`;

const Flag = styled.img`
  width: 80%;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.text};
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 500px) {
    display: grid;
    gap: 0.5rem;
  }
`;

const DataGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: ${(props) => props.theme.text};
`;

const FlexBorders = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4rem;
  gap: 0.5rem;
  justify-content: start;
  color: ${(props) => props.theme.text};

  @media (max-width: 500px) {
    display: grid;
    gap: 0.5rem;
  }
`;

const CountryButton = styled.button`
  background-color: ${(props) => props.theme.elements};
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  padding: 0.2rem 1rem;
  cursor: pointer;
  font-size: 0.85rem;
  color: ${(props) => props.theme.text};
`;

const Borders = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  flex-wrap: wrap;
`;

const BorderTitle = styled.h4``;

const ButtonBack = styled.button`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.elements};
  gap: 0.5rem;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border: 3px solid rgba(0, 0, 0, 0.1);
  margin-left: 10%;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  color: ${(props) => props.theme.text};
  cursor: pointer;
`;

function CountryDetails({ country }) {
  const navigate = useNavigate();
  const { isMobile } = useCountryRest();

  useEffect(() => {
    if (!isMobile) {
      document.documentElement.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.documentElement.style.overflow = "auto";
      window.scrollTo(0, 0);
    }
  }, [isMobile]);

  return (
    <Wrapper>
      <ButtonBack onClick={() => navigate(-1)}>
        <FaArrowLeftLong /> Back
      </ButtonBack>
      <Grid>
        <Flag src={country.flag} alt={`Flag of ${country.name}`} />
        <div>
          <Title>{country.name}</Title>

          <Flex>
            <DataGroup>
              <p>
                <strong>Native Name:</strong> {country.nativeName}
              </p>
              <p>
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {country.region || "No region"}
              </p>
              <p>
                <strong>Sub Region:</strong>{" "}
                {country.subregion || "No subregion"}
              </p>
              <p>
                <strong>Capital:</strong> {country.capital || "No capital"}
              </p>
            </DataGroup>
            <DataGroup>
              <p>
                <strong>Top Level Domain:</strong>{" "}
                {country.topLevelDomain.at(0) || "No domain"}
              </p>
              <p>
                <strong>Currencies:</strong>{" "}
                {country.currencies
                  .map((currency) => currency.name)
                  .join(", ") || "No currency"}
              </p>
              <p>
                <strong>Languages:</strong>{" "}
                {country.languages
                  .map((language) => language.name)
                  .join(", ") || "No language"}
              </p>
            </DataGroup>
          </Flex>

          <FlexBorders>
            <BorderTitle>Border Countries:</BorderTitle>
            <Borders>
              {country.borders
                ? country.borders.map((border) => (
                    <CountryButton
                      key={border}
                      onClick={() => navigate(`/dashboard/${border}`)}
                    >
                      {renderingBorder(border)}
                    </CountryButton>
                  ))
                : "No border countries"}
            </Borders>
          </FlexBorders>
        </div>
      </Grid>
    </Wrapper>
  );
}

export default CountryDetails;
