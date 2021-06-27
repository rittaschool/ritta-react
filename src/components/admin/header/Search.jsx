import React, { Component } from "react";

export class Search extends Component {

  render() {
    return (
      <>
        <div className="search-element">
          <input
            className="form-control"
            type="search"
            placeholder="Haku"
            aria-label="Haku"
            data-width="250"
          />
          <button className="btn" type="submit">
            <i className="fas fa-search" />
          </button>
          <div className="search-backdrop" />
        </div>
      </>
    );
  }
}

export default Search;
