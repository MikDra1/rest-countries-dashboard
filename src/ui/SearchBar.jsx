import { GoSearch } from "react-icons/go";
import styled from "styled-components";
import { useData } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const Container = styled.div`
  display: flex;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 0.75rem 0.75rem 0.75rem 1.5rem;
  width: 25%;
  border-radius: 0.3rem;

  &:focus {
    outline: 10px black solid;
  }

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const Input = styled.input`
  border: none;
  width: 100%;
  background-color: ${(props) => props.theme.background};
  caret-color:  ${(props) => props.theme.text}; /* This is the color of the cursor */
  color: ${(props) => props.theme.text};




  &:focus-visible {
    border: none;
    outline: none;
  }

  &::placeholder {
    color: ${(props) => props.theme.text};
  }
`;

const SearchIcon = styled(GoSearch)`
  margin-right: 0.75rem;
  color: ${(props) => props.theme.text};
`;

function SearchBar() {
  const { searchValue, setSearchValue } = useData();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  function handleSearchValue(e) {
    navigate("/");
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input
    }
  }, []); // The empty dependency array ensures this runs only once on mount

  return (
    <Container>
      <SearchIcon />
      <Input
        ref={inputRef}
        type="text"
        value={searchValue}
        onChange={(e) => handleSearchValue(e)}
        placeholder="Search for a country..."
      />
    </Container>
  );
}

export default SearchBar;
