import { useState } from "react";
import Country from "./components/Country";

import data from "./data/countries.json";
import "./styles.css";

function sortAlpha() {
  const countries = data.countries;
  return countries.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
}

function sortAsc() {
  const countries = data.countries;
  return countries.sort(function (a, b) {
    return a.population - b.population;
  });
}

function sortDesc() {
  const countries = data.countries;
  return countries.sort(function (a, b) {
    return b.population - a.population;
  });
}

function sortRandom() {
  const countries = data.countries;
  for (var i = countries.length - 1; i > 0; i--) {
    // Generate random number
    var random = Math.floor(Math.random() * (i + 1));
    var temp = countries[i];
    countries[i] = countries[random];
    countries[random] = temp;
  }
  return countries;
}

function filter(list, option) {
  return list.filter(function (country) {
    if (option === "all") {
      return list;
    } else if (option === "1") {
      return country.population < 100000000;
    } else if (option === "100m") {
      return country.population >= 100000000;
    } else if (option === "200m") {
      return country.population >= 200000000;
    } else if (option === "500m") {
      return country.population >= 500000000;
    } else if (option === "1b") {
      return country.population >= 1000000000;
    } else {
      return country.continent.toLowerCase() === option; // evaluates to true or false
    }
  });
}

export default function App() {
  const [filterOption, setFilterOption] = useState("all");
  const [sortOption, setSortOption] = useState(">");

  function handleSort(e) {
    setSortOption(e.target.value);
  }

  function handleFilter(e) {
    setFilterOption(e.target.value);
  }

  function sort(option) {
    if (option === "alpha") {
      return sortAlpha();
    } else if (option === ">") {
      return sortDesc();
    } else if (option === "<") {
      return sortAsc();
    } else if (option === "shuffle") {
      return sortRandom();
    } else {
      return data.countries;
    }
  }

  const sortedCountries = sort(sortOption);

  const filteredCountries = filter(sortedCountries, filterOption);

  return (
    <div className="App">
      <h1>World's largest countries by population</h1>
      <div className="filters">
        <label>
          Sort by:
          <select value={sortOption} onChange={handleSort}>
            <option value=">">Population Desc</option>
            <option value="<">Population Asc</option>
            <option value="alpha">Alphabetically</option>
            <option value="shuffle">Shuffle</option>
          </select>
        </label>

        <label>
          Filters:
          <select value={filterOption} onChange={handleFilter}>
            <optgroup label="by continent">
              <option value="all">All</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="north america">North America</option>
              <option value="south america">South America</option>
            </optgroup>

            <optgroup label="by population size">
              <option value="1">less than 100M</option>
              <option value="100m">100M or more</option>
              <option value="200m">200M or more</option>
              <option value="500m">500M or more</option>
              <option value="1b">1B or more</option>
            </optgroup>
          </select>
        </label>
      </div>

      <div className="countries">
        {filteredCountries.map(function (country) {
          return <Country key={country.id} details={country} />;
        })}
      </div>
    </div>
  );
}
