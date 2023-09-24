import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CountryDetails = () => {
  const { countryId } = useParams();

  const [countryData, countryDataChange] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/country/" + countryId)
      .then((res) => res.json())
      .then((response) => {
        countryDataChange(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [countryId]); // Include countryId in the dependency array

  return (
    <div>
      <div className="container">
        <div className="card row" style={{ textAlign: "left" }}>
          <div className="card-title">
            <h2>Country Details</h2>
          </div>
          <div className="card-body"></div>

          {countryData && (
            <div>
              <h2>
                The Country name is : <b>{countryData.name}</b> ({countryData.id})
              </h2>
              <h5>Population is : {countryData.population}</h5>
              <Link className="btn btn-danger" to="/dashboard" id="btn">
                Back to Listing
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
