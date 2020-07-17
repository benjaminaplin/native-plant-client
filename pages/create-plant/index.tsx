/** @jsx jsx */
import React from "react";
import { useFormik } from "formik";
import Layout from "../../components/Layout";
import { css, jsx } from "@emotion/core";

const formContainer = css({
  width: "70%",
});
const formInput = css({
  width: "100%",
});
const PlantForm = () => {
  const formik = useFormik({
    initialValues: {
      botanical_name: "",
      friendly_name: "",
      plant_type: "",
      light_requirements: "",
      growing_seasonality: "",
      plant_placement_order: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Layout>
      <form css={formContainer} onSubmit={formik.handleSubmit}>
        <label htmlFor=" botanical_name">Botanical Name</label>
        <input
          css={formInput}
          id=" botanical_name"
          name=" botanical_name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.botanical_name}
        />
        <label htmlFor="friendly_name">Friendly Name</label>
        <input
          css={formInput}
          id="friendly_name"
          name="friendly_name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.friendly_name}
        />
        <label htmlFor="plant_type">Plant Type</label>
        <input
          css={formInput}
          id="plant_type"
          name="plant_type"
          type="plant_type"
          onChange={formik.handleChange}
          value={formik.values.plant_type}
        />
        <label htmlFor="light_requirements">Light Requirements</label>
        <input
          css={formInput}
          id="light_requirements"
          name="light_requirements"
          type="light_requirements"
          onChange={formik.handleChange}
          value={formik.values.light_requirements}
        />
        <label htmlFor="growing_seasonality">Growing Seasonality</label>
        <input
          css={formInput}
          id="growing_seasonality"
          name="growing_seasonality"
          type="growing_seasonality"
          onChange={formik.handleChange}
          value={formik.values.growing_seasonality}
        />
        <label htmlFor="plant_placement_order">Plant Placement Order</label>
        <input
          css={formInput}
          id="plant_placement_order"
          name="plant_placement_order"
          type="plant_placement_order"
          onChange={formik.handleChange}
          value={formik.values.plant_placement_order}
        />
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
};
export default PlantForm;
