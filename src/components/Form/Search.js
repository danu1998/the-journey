import React from "react";

const Search = (props) => {
  const [query, handleSearch] = props;
  const handleChange = (e) => {
    handleSearch(e.target.value);
  };
  return (
    <div className="row g-0 mt-5">
      <form>
        <div className="col-md-11">
          <input
            type="text"
            placeholder="Search Your Journey"
            className="form-control border-0 p-3"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-1">
          <div className="btn p-3 btn-primary">Search</div>
        </div>
      </form>
    </div>
  );
};

export default Search;
