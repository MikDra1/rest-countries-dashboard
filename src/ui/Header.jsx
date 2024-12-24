import { IoMoonOutline, IoMoonSharp } from "react-icons/io5";
import styled from "styled-components";
import { useCountryRest } from "../contexts/CountryRestProvider";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.elements};
  padding-inline: 10%;

  @media (max-width: 1600px) {
    padding-inline: 6rem;
  }

  @media (max-width: 778px) {
    padding-inline: 2rem;
  }

  @media (max-width: 319px) {
    display: grid;
    gap: 1rem;
  }
`;

const DarkModeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.text};

  @media (max-width: 500px) {
    font-size: 0.9rem;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${(props) => props.theme.text};

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const DarkMode = styled.p`
  font-weight: 600;
  font-size: 1rem;

  @media (max-width: 500px) {
    font-size: 0.9rem;
  }
`;

function Header() {
  const { theme, toggleTheme } = useCountryRest();

  return (
    <Container id="header">
      <Title>Where in the world?</Title>
      <DarkModeButton onClick={toggleTheme}>
        {theme === "light" ? <IoMoonOutline /> : <IoMoonSharp />}

        <DarkMode>Dark Mode</DarkMode>
      </DarkModeButton>
    </Container>
  );
}

export default Header;
