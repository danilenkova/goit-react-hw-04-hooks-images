import { useState } from "react";
import PropTypes from "prop-types";
import { StyledSearchBar, Form, Input, SearchButton } from "./SearchBar.styled";
import { NOT_ALERTS, myAlert } from "../service/alerts";
import { ImSearch } from "react-icons/im";

function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState("");
  const handleSearchQueryChange = (e) => {
    setQuery(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      return myAlert(NOT_ALERTS.EMPTY);
    }
    if (!query.match(/^[a-zA-Z,() ']*$/)) {
      return myAlert(NOT_ALERTS.NO_VALID);
    }
    onSubmit(query);
  };
  return (
    <StyledSearchBar>
      <Form onSubmit={handleSubmit}>
        <Input
          value={query}
          onChange={handleSearchQueryChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <SearchButton type="submit">
          <ImSearch />
        </SearchButton>
      </Form>
    </StyledSearchBar>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
