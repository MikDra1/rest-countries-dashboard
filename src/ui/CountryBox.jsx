import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Flag = styled.img`
  width: 100%;
  height: 12rem;
  object-fit: cover;
`;

const Country = styled.div`
  box-shadow: 1px 1px 30px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
  cursor: pointer;
`;

// "name": "United Kingdom of Great Britain and Northern Ireland",

const Content = styled.div`
  padding: 2rem 0.5rem 2rem 2rem;
  background-color: ${(props) => props.theme.background};
`;

const Title = styled.h2`
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.text};
`;

const Bold = styled.span`
  font-weight: bold;
`;

const Text = styled.p`
  color: ${(props) => props.theme.text};
`



/* eslint-disable react/prop-types */
function CountryBox({ data }) {
  const navigate = useNavigate();
  const { name, flags, population, region, capital, alpha3Code } = data;

  return (
    <Country onClick={() => navigate(`${alpha3Code}`)}>
      <Flag src={flags?.svg} alt={`${name} flag`} />
      <Content>
        <Title>{name}</Title>
        <Text>
          <Bold>Population:</Bold> <span>{population.toLocaleString()}</span>
        </Text>

        <Text>
          <Bold>Region:</Bold> <span>{region}</span>
        </Text>

        <Text>
          <Bold>Capital:</Bold> <span>{capital}</span>
        </Text>
      </Content>
    </Country>
  );
}

export default CountryBox;
