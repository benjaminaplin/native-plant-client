/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { css, jsx } from "@emotion/core";
import { lightRequirements } from "../../shared/constants/lightRequirements";

interface Plant {
  id: number;
  friendly_name: string;
  light_requirements: string;
  botanical_name: string;
  growing_seasonality: string;
  plant_type: string;
  plant_placement_order: string;
}

interface IProps {
  plants: Plant[];
}

const plantsContainerStyle = css({
  padding: "32px",
  backgroundColor: "hotpink",
  fontSize: "24px",
  borderRadius: "4px",
  "&:hover": {
    color: "cornflowerblue",
  },
});
const plantsRow = css({
  padding: "1rem",
  display: "flex",
  flexDirection: "row",
});
const plantsHeaderRow = css({
  background: "cornflowerblue",
  color: "lime",
  padding: "1rem",
  display: "flex",
  flexDirection: "row",
});
const plantsCell = css({
  padding: ".5rem",
  fontSize: ".75rem",
  width: "16%",
});

const PlantList: React.FC<IProps> = (props) => {
  console.log("props", props);
  return (
    <div>
      <div>Plants</div>
      <div css={plantsContainerStyle}>
        <div css={plantsHeaderRow}>
          <div css={plantsCell}>Friendly Name</div>
          <div css={plantsCell}>Botanical Name</div>
          <div css={plantsCell}>Light Requirements Name</div>
          <div css={plantsCell}>Growing Seasonality</div>
          <div css={plantsCell}>Plant Type</div>
          <div css={plantsCell}>Plant Placement Order</div>
        </div>
        {props.plants.map((plant) => (
          <div key={plant.id} css={plantsRow}>
            <div css={plantsCell}>{plant.friendly_name}</div>
            <div css={plantsCell}>{plant.botanical_name}</div>
            <div css={plantsCell}>
              {lightRequirements[plant.light_requirements]}
            </div>
            <div css={plantsCell}>{plant.growing_seasonality}</div>
            <div css={plantsCell}>{plant.plant_type}</div>
            <div css={plantsCell}>{plant.plant_placement_order}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("http://localhost:3001/plants");
  const plants = await res.json();
  console.log("plants :>> ", plants);
  // By returning { props: plants }, the Blog component
  // will receive `plants` as a prop at build time
  return {
    props: {
      plants,
    },
  };
}

export default PlantList;
