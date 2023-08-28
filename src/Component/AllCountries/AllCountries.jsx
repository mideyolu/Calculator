import React, { useEffect, useState } from "react";
import { ApiUrl } from "../../util/Api";
import { SearchBar, Loader, FilterRegion } from "../index";
import { Link } from "react-router-dom";

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  const getAllCountries = async () => {
    try {
      const res = await fetch(`${ApiUrl}/all`);

      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  const getCountryByName = async (countryName) => {
    setIsLoading(true);
    setNotFound(false);
    try {
      const res = await fetch(`${ApiUrl}/name/${countryName}`);

      if (res.status === 404) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }
      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };
  const getCountryByRegion = async (regionName) => {
    setIsLoading(true);
    setNotFound(false);
    try {
      const res = await fetch(`${ApiUrl}/region/${regionName}`);

      if (res.status === 404) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }
      const data = await res.json();
      if (data.length === 0) {
        setNotFound(true);
      } else {
        setCountries(data);
      }

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <section className="country-wrapper">
      <section className="country-top">
        <div className="search">
          <SearchBar onSearch={getCountryByName} />
        </div>
        <div className="region">
          <FilterRegion onSelect={getCountryByRegion} />
        </div>
      </section>

      <section className="country-bottom">
        {isLoading && !error && <Loader />}
        {error && !isLoading && (
          <h4 className="error-message">
            <span>Check your Network. Please try again later.</span>
          </h4>
        )}
        {!isLoading && !error && (
          <>
            {notFound ? (
              <div className="not-found">
                <p>Not found.</p>
              </div>
            ) : countries.length === 0 ? (
              <p>No countries found.</p>
            ) : (
              countries.map((country, index) => (
                <Link
                  key={index}
                  className="link"
                  to={`/country/${country.name.common}`}
                >
                  <div className="countries-card">
                    <div className="country-img">
                      <img src={country.flags.png} alt={`${country.cca2}`} />
                    </div>
                    <div className="country-data">
                      <h3>Country: {country.name.common}</h3>
                      <h6>Population: {country.population}</h6>
                      <h6>Region: {country.region}</h6>
                      <h6>Capital: {country.capital}</h6>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </>
        )}
      </section>
    </section>
  );
};

export default AllCountries;
