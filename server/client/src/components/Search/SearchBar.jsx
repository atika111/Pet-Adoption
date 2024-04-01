import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./search.css";
import SearchResult from "./SearchResult";
import { getPets } from "../../api/pet";
import { useUser } from "../../context/UserContext";

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResult, setSearchResult] = useState({});
  const [error, setError] = useState('')

const {state, dispatch} = useUser()
  //   get the useHistory meth
  const navigate = useNavigate();

  // create the FormData of ur inputs

  const [formData, setFormData] = useState({
    searchType: "",
    searchTerm: "",
    height: "",
    weight: "",
    petType: "",
    name: "",
  });

  // get and set dynamically user input

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // handle user click button for search

  const handleClickSearch = async (e) => {
    let queryParams;
    try {
      setError('')
      setSearchResult({})
      dispatch({type: "SET_LOADING", isLoading: true})
      // create a new instance
      queryParams = new URLSearchParams(formData);

      console.log("queryParams: ", queryParams.toString());

      // set the query params
      setSearchParams(queryParams);

      const data = await getPets(queryParams) 
      console.log(data);
      setSearchResult(data);
    } catch (error) {
      console.error('Error searching pets:', error);
      setError('Failed to search pets');
      
    } finally {
      dispatch({type: "SET_LOADING", isLoading: false})
      // Clean up parameters
      queryParams.delete("searchType");
      queryParams.delete("searchTerm");
      queryParams.delete("height");
      queryParams.delete("weight");
      queryParams.delete("petType");
      queryParams.delete("name");

      // reset the formData state
      setFormData({
        // searchType: "",
        searchTerm: "",
        height: "",
        weight: "",
        petType: "",
        name: "",
      });
    }
  };

  return (
    <div>
      <div className="search">
        <h1>Search Page</h1>
        <label htmlFor="searchType">Search Type</label>
        <select
          name="searchType"
          id="searchType"
          value={formData.searchType}
          onChange={handleInputChange}
        >
          <option value="type">Choose type...</option>
          <option value="basic">Basic search</option>
          <option value="advance">Advance search</option>
        </select>
        {formData.searchType === "basic" && (
          <div className="search__input-container">
            {/* icon */}
            <input
              name="searchTerm"
              list="petList"
              onChange={handleInputChange}
              value={formData.searchTerm}
              type="text"
              placeholder="Type to search..."
            />
            <datalist id="petList">
              <option value="Dog" id="dog" name="dog" />
              <option value="cat" id="cat" name="cat" />
            </datalist>
          </div>
        )}

        {formData.searchType === "advance" && (
          <div className="search__advance">
            <form>
              <input
                name="height"
                onChange={handleInputChange}
                value={formData.height}
                type="number"
                placeholder="Height"
              />
              <input
                name="weight"
                onChange={handleInputChange}
                value={formData.weight}
                type="number"
                placeholder="Weight"
              />
              <input
                name="name"
                onChange={handleInputChange}
                value={formData.name}
                type="text"
                placeholder="Name"
              />
              <select
                onChange={handleInputChange}
                value={formData.petType}
                name="petType"
                id="petType"
              >
                <option value="dog">Dog</option>
                <option value="cut">Cut</option>
              </select>
            </form>
          </div>
        )}
        <button onClick={handleClickSearch}>{state.isLoading ? "Search..." : "Search"}</button>
        <p>{error}</p>
      </div>
      <SearchResult searchResult={searchResult} />
    </div>
  );
}

export default SearchBar;
