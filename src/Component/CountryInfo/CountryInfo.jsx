import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../index";
import { ApiUrl } from "../../util/Api";

const CountryInfo = () => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { countryName } = useParams();

  const getCountryByName = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${ApiUrl}/name/${countryName}`);
      if (res.status === 404) {
        setIsLoading(false);
        return;
      }
      const data = await res.json();
      setCountry(data);
      setIsLoading(false);
      console.log(data);
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCountryByName();
  }, [countryName]);

  return (
    <section className="country-info">
      {isLoading && !error && <Loader />}
      {error && !isLoading && (
        <h4 className="error-message">
          <span>Check your Network. Please try again later.</span>
        </h4>
      )}
      <button>
        <Link to="/">Back</Link>
      </button>
      <>
        {country?.map((place, index) => (
          <section className="country-info-container">
            <div className="country-info-img">
              <img src={place.flags.png} alt={`${place.cca2}`} />
            </div>
            <section className="country-details">
              <div className="info-left">
                <h5>
                  Native Name:&nbsp;<span> {place.name.common}</span>
                </h5>
                <h5>
                  Population:&nbsp;<span> {place.population.toLocaleString()}</span>
                </h5>
                <h5>
                  Region:&nbsp;<span>{place.region}</span>
                </h5>
                <h5>
                  Sub Region:&nbsp;<span> {place.subregion}</span>
                </h5>
                <h3>Continent:&nbsp;{place.continents}</h3>
                <h3>
                  Language:&nbsp;
                  {place.languages && (
                    <span>{`'${Object.values(place.languages)[0]}'`}</span>
                  )}
                </h3>
              </div>
            </section>
          </section>
        ))}
      </>
    </section>
  );
};

export default CountryInfo;
