import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import './CountryEdit.css'

const CountryEdit = () => {
  const { countryId } = useParams();
  const navigate = useNavigate();

  // State for success alert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [countryData, setCountryData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/country/" + countryId)
      .then((res) => res.json())
      .then((response) => {
        setCountryData(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [countryId]);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Country Name is required"),
    population: Yup.number()
      .required("Population is required")
      .positive("Population must be a positive number"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const countryData = { id: countryId, ...values };

    // Check if the country name already exists except for the current country being edited
    const response = await fetch("http://localhost:3000/country");
    const data = await response.json();
    const isDuplicate = data.some(
      (country) =>
        country.name.toLowerCase() === values.name.toLowerCase() &&
        country.id !== countryId
    );

    if (isDuplicate) {
      alert("Duplicate country name! Please enter a unique country name.");
      setSubmitting(false);
      return;
    }

    fetch("http://localhost:3000/country/" + countryId, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(countryData),
    })
      .then((res) => {
        alert("Saved successfully.");
        setShowSuccessAlert(true); // Show the success alert
        setTimeout(() => {
          setShowSuccessAlert(false); // Hide the success alert after 3 seconds
          navigate("/dashboard");
        }, 3000);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          <div className="offset-lg-3 col-lg-6">
            <Formik
              initialValues={{
                name: countryData.name,
                population: countryData.population,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <form className="container" onSubmit={formik.handleSubmit}>
                  <div className="card" style={{ textAlign: "left" }}>
                    <div className="card-title">
                      <h2>Country Edit</h2>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="editLabel">ID</label>
                            <Field
                              type="text"
                              name="id"
                              className="form-control"
                              disabled
                              value={countryId}
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="editLabel">Country Name</label>
                            <Field
                              type="text"
                              name="name"
                              className="form-control"
                              placeholder="Country Name"
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="editLabel">Population</label>
                            <Field
                              type="number"
                              name="population"
                              className="form-control"
                              placeholder="Population"
                            />
                            <ErrorMessage
                              name="population"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group">
                            <button
                              className="btn btn-success"
                              type="submit"
                              disabled={formik.isSubmitting}
                              id="btn"
                            >
                              Save
                            </button>
                            <Link to="/dashboard" className="btn btn-danger"  id="btn">
                              Back
                            </Link>
                          </div>
                        </div>

                        {showSuccessAlert && (
                          <div className="col-lg-12">
                            <div className="alert alert-success" role="alert">
                              Record edited successfully!
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryEdit;
