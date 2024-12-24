// /* eslint-disable react/prop-types */

// import { createContext, useState, useEffect } from "react";

// // Create a Context for data
// export const DataContext = createContext();

// // Create a provider for managing state
// export const DataProvider = ({children}) => {
//   const [data, setData] = useState(null); // Store the fetched data
//   const [loading, setLoading] = useState(true); // Track loading state
//   const [error, setError] = useState(null); // Store any errors
//   const [searchQuery, setSearchQuery] = useState(""); // Search query state
//   const [filteredData, setFilteredData] = useState(null); // Store filtered data

//   // Fetch the data on initial load
//   const fetchData = async () => {
//     try {
//       const response = await fetch("../services/data.json"); // Your API endpoint
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const result = await response.json();
//       setData(result); // Store the fetched data
//       setFilteredData(result); // Initially, no filter is applied
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Search function
//   const searchData = (query) => {
//     setSearchQuery(query);
//     const filtered = data.filter((item) =>
//       item.name.toLowerCase().includes(query.toLowerCase())
//     ); // Example search logic
//     setFilteredData(filtered);
//   };

//   // Run fetchData when the component mounts
//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <DataContext.Provider
//       value={{ data: filteredData, loading, error, searchQuery, searchData }}
//     >
//      {children}
//     </DataContext.Provider>
//   );
// };

