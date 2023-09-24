import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CountrySearch = ({ onSearch }) => {
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
      onSearch(values.searchQuery);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
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
      <Button type="submit" variant="primary">
        Search
      </Button>
    </Form>
  );
};

export default CountrySearch;
