import { useData } from "../contexts/DataContext";
import styled from "styled-components";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Container = styled.div`
  background-color: #fff;
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
  z-index: 10;
`;

const Option = styled.p`
  color: #000;
  cursor: pointer;
  color: ${(props) => props.theme.text};
`;

function ChangePageSizeFilter() {
  const { pageSize, setPageSize } = useData();
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setOptionsVisible(false);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  return (
    <Container>
      <div>
        <FilterTitle onClick={() => setOptionsVisible(!optionsVisible)}>
          <p>Change page size {`(${pageSize})`}</p>
          <MdOutlineKeyboardArrowDown />
        </FilterTitle>

        <div>
          {optionsVisible && (
            <Options>
              <Option onClick={() => handlePageSizeChange("8")}>8</Option>
              <Option onClick={() => handlePageSizeChange("16")}>16</Option>
              <Option onClick={() => handlePageSizeChange("24")}>24</Option>
              <Option onClick={() => handlePageSizeChange("32")}>32</Option>
              <Option onClick={() => handlePageSizeChange("64")}>64</Option>
            </Options>
          )}
        </div>
      </div>
    </Container>
  );
}

export default ChangePageSizeFilter;
