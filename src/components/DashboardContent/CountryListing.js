import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button,Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CountryPagination from './CountryPagination';
import './CountryListing.css' // Import the CountryPagination component

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate(`/country/detail/${id}`);
  };
  const LoadEdit = (id) => {
    navigate(`/country/edit/${id}`);
  };
  const Removefunction = (id) => {
    if (window.confirm('Do you want to remove?')) {
      fetch(`http://localhost:3000/country/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          alert('Removed successfully.');
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  useEffect(() => {
    // Fetch data from JSON Server
    axios
      .get('http://localhost:3000/country')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Filter countries based on search query
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderTableRows = currentCountries.map((country) => (
    <tr key={country.id}>
      <td>{country.id}</td>
      <td>{country.name}</td>
      <td>{country.population}</td>
      <td>
        <a onClick={() => LoadEdit(country.id)} className="btn btn-success">
          Edit
        </a>
        <a onClick={() => Removefunction(country.id)} className="btn btn-danger">
          Remove
        </a>
        <a onClick={() => LoadDetail(country.id)} className="btn btn-primary">
          Details
        </a>
      </td>
    </tr>
  ));

  // Formik and Yup
  const initialValues = {
    searchQuery: '',
  };

  const validationSchema = Yup.object({
    searchQuery: Yup.string().trim(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (values.searchQuery.trim() === '') {
        // If the search input is empty, reset searchQuery
        setSearchQuery('');
      } else {
        setSearchQuery(values.searchQuery);
      }
      setCurrentPage(1);
    },
  });

  return (
    <div>
       <h1>Country List</h1>
      <div className="search-container">
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md={8}> {/* Use Bootstrap's grid system */}
              <Form.Group controlId="searchInput">
                <Form.Control
                  type="text"
                  placeholder="Search Country"
                  name="searchQuery"
                  value={formik.values.searchQuery}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.searchQuery && formik.errors.searchQuery}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.searchQuery}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}> {/* Use Bootstrap's grid system */}
              <Button type="submit" variant="primary" className="search-button">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      <div className="card-body">
        <div>
          <Link to="/country/create" className="btn btn-success" id='add'>
            Add New (+)
          </Link>
        </div>
        <Table className="table table-bordered">
          <thead className="bg-dark text-white">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Population</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderTableRows}</tbody>
        </Table>
      </div>

      {/* Include the CountryPagination component */}
      <div className="pagination-container">
        <CountryPagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredCountries.length / countriesPerPage)}
          onPageChange={paginate}
        />
      </div>
    </div>
  );
};

export default CountryList;