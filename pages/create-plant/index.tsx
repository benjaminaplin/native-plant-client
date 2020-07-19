/** @jsx jsx */
import { useFormik } from "formik";
import Layout from "../../components/Layout";
import { css, jsx } from "@emotion/core";
import Router from "next/router";

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
    onSubmit: async (values) => {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
          botanical_name: "Croton alabamensis",
          friendly_name: "Alabama Croton",
          light_requirements: "part_shade_to_full_shade",
          growing_seasonality: "deciduous",
          plant_type: "shrub",
          plant_placement_order: "secondary",
        });

        fetch("http://localhost:3001/plants", {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        })
          .then((result) => {
            console.log(result);
            Router.push("/plants");
          })
          .catch((error) => console.log("error", error));
      } catch (error) {
        console.log("error :>> ", error);
      }
    },
  });

  return (
    <Layout>
      <form css={formContainer} onSubmit={formik.handleSubmit}>
        <label htmlFor="botanical_name">Botanical Name</label>
        <input
          css={formInput}
          id="botanical_name"
          name="botanical_name"
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
        <label htmlFor="light_requirements">Light Requirements</label>
        <select
          css={formInput}
          id="light_requirements"
          name="light_requirements"
          onChange={formik.handleChange}
          value={formik.values.light_requirements}
        >
          {[
            { value: "", text: "" },
            { value: "full_sun", text: "Full sun" },
            { value: "full_sun_to_part_shade", text: "Full sun to part shade" },
            { value: "part_shade", text: "Part shade" },
            {
              value: "part_shade_to_full_shade",
              text: "Part shade to full shade",
            },
            { value: "full_shade", text: "Full shade" },
          ].map((option: any) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
        <label htmlFor="plant_type">Plant Type</label>
        <select
          css={formInput}
          id="plant_type"
          name="plant_type"
          onChange={formik.handleChange}
          value={formik.values.plant_type}
        >
          {[
            { value: "", text: "" },
            { value: "shrub", text: "shrub" },
            { value: "tree", text: "tree" },
            { value: "groundCover", text: "ground cover" },
            {
              value: "vine",
              text: "vine",
            },
          ].map((option: any) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
        <label htmlFor="growing_seasonality">Growing Seasonality</label>
        <select
          css={formInput}
          id="growing_seasonality"
          name="growing_seasonality"
          onChange={formik.handleChange}
          value={formik.values.growing_seasonality}
        >
          {[
            { value: "", text: "" },
            { value: "perennial", text: "perennial" },
            { value: "annual", text: "annual" },
            { value: "biennial", text: "biennial" },
            {
              value: "deciduous",
              text: "deciduous",
            },
            {
              value: "evergreen",
              text: "evergreen",
            },
          ].map((option: any) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
        <label htmlFor="plant_placement_order">Plant Placement Order</label>
        <select
          css={formInput}
          id="plant_placement_order"
          name="plant_placement_order"
          onChange={formik.handleChange}
          value={formik.values.plant_placement_order}
        >
          {[
            { value: "", text: "" },
            { value: "primary", text: "primary" },
            { value: "secondary", text: "secondary" },
            { value: "tertiary", text: "tertiary" },
          ].map((option: any) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
};
export default PlantForm;
