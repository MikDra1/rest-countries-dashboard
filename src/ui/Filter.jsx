import { useSearchParams } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import styled from "styled-components";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";

const Container = styled.div`
  padding: 1rem 2rem 1rem 1rem;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.background};
`;

const FilterTitle = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Options = styled.div`
  background-color: #fff;
  border: none;
  position: absolute;
  width: 100%;
  left: 0;
  top: calc(100% + 0.5rem);
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1rem 0 1rem 1rem;
  background-color: ${(props) => props.theme.background};
`;

const Option = styled.p`
  color: ${(props) => props.theme.text};

  cursor: pointer;
`;

function Filter() {
  const { filter, setFilter } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleFilterChange = (region) => {
    setFilter(region); // Update the selected filter
    setOptionsVisible(false); // Hide the options
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  return (
    <Container>
      <div>
        <FilterTitle onClick={() => setOptionsVisible(!optionsVisible)}>
          <p>{filter === "all" ? "Filter by Region" : filter}</p>
          <MdOutlineKeyboardArrowDown />
        </FilterTitle>

        <div>
          {optionsVisible && (
            <Options>
              <Option onClick={() => handleFilterChange("Africa")}>
                Africa
              </Option>
              <Option onClick={() => handleFilterChange("Americas")}>
                Americas
              </Option>
              <Option onClick={() => handleFilterChange("Asia")}>Asia</Option>
              <Option onClick={() => handleFilterChange("Europe")}>
                Europe
              </Option>
              <Option onClick={() => handleFilterChange("Oceania")}>
                Oceania
              </Option>
              {filter !== "all" ? (
                <Option onClick={() => handleFilterChange("all")}>
                  All Regions
                </Option>
              ) : null}
            </Options>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Filter;
