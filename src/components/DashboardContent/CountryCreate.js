import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import './CountryCreate.css'

const CountryCreate = () => {
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State for success alert
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false); // State for duplicate alert

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Country Name is required"),
    population: Yup.number().required("Popuation is required").positive("Population must be a positive number"),
  });

  const handleSubmit = async (values) => {
    const { name, population } = values;
    const CountryData = { name, population };

    // Check if the country already exists
    const response = await fetch("http://localhost:3000/country");
    const data = await response.json();
    const isDuplicate = data.some((country) => country.name.toLowerCase() === name.toLowerCase());

    if (isDuplicate) {
      setShowDuplicateAlert(true); // Show the duplicate alert
      setTimeout(() => setShowDuplicateAlert(false), 3000); // Hide the duplicate alert after 3 seconds
      return; // Don't proceed if it's a duplicate
    }

    fetch("http://localhost:3000/country", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(CountryData),
    })
      .then((res) => {
        setShowSuccessAlert(true); // Show the success alert
        setTimeout(() => {
          setShowSuccessAlert(false); // Hide the success alert after 3 seconds
          navigate("/dashboard");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6">
        <Formik
          initialValues={{
            id: "",
            name: "",
            population: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <form className="container" onSubmit={formik.handleSubmit}>
              <div className="card" style={{ textAlign: "left" }}>
                <div className="card-title">
                  <h2>Country Create</h2>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="createLabel" >ID</label>
                        <Field
                          type="text"
                          name="id"
                          className="form-control"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="createLabel">Country Name</label>
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
                        <label className="createLabel" >Population</label>
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
                          Country added successfully!
                        </div>
                      </div>
                    )}

                    {showDuplicateAlert && (
                      <div className="col-lg-12">
                        <div className="alert alert-danger" role="alert">
                          Duplicate country! Please enter a unique country name.
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
  );
};

export default CountryCreate;
