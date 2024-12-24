import styled from "styled-components";
import CountriesDisplay from "../ui/CountriesDisplay";
import Filter from "../ui/Filter";
import SearchBar from "../ui/SearchBar";
import ChangePageSize from "../ui/ChangePageSizeFilter";
import { useEffect } from "react";

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  max-width: 98rem;
  margin-inline: auto;
  padding-block: 3rem 1rem;

  @media (max-width: 1600px) {
    padding-inline: 6rem;
  }

  @media (max-width: 1200px) {
    display: grid;
    gap: 2rem;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 778px) {
    padding-inline: 2rem;
  }

  @media (max-width: 520px) {
    justify-content: normal;
  }
`;

const InnerFlex = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 520px) {
    display: grid;
  }
`;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.background};
`;

function Dashboard() {
  useEffect(() => {
    document.documentElement.style.overflow = "auto";
  }, []);

  return (
    <>
      <Wrapper>
        <Flex>
          <SearchBar />
          <InnerFlex>
            <ChangePageSize />
            <Filter />
          </InnerFlex>
        </Flex>
      </Wrapper>
      <CountriesDisplay />
    </>
  );
}

export default Dashboard;
