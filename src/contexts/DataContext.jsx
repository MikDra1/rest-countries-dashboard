/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const DataContext = createContext();

function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchValue, setSearchValue] = useState('')
  const [pageSize, setPageSize] = useState(8);

   

  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchData = async function () {
      try {
        setIsLoading(true);
        const response = await fetch("../../data.json");
        const data = await response.json();
        data.filter(country => country.region === 'Asia')
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, isLoading, filter, setFilter, searchValue, setSearchValue, pageSize, setPageSize }}>{children}</DataContext.Provider>
  );
}

function useData() {
  const context = useContext(DataContext);
  if (context === undefined)
    throw new Error("DataContext was used outside the DataProvider");
  return context;
}

export { DataProvider, useData };
