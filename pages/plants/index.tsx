/** @jsx jsx */
import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import Layout from "../../components/Layout";

import {
  Cell,
  CellProps,
  FilterProps,
  HeaderGroup,
  HeaderProps,
  Hooks,
  Meta,
  Row,
  TableInstance,
  TableOptions,
  useColumnOrder,
  useExpanded,
  useFilters,
  useFlexLayout,
  useGroupBy,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";

const columns = [
  {
    Header: "Name",
    columns: [
      {
        Header: "Friendly Name",
        accessor: "friendly_name",
      },
      {
        Header: "Botanical Name",
        accessor: "botanical_name",
      },
    ],
  },
  {
    Header: "Attributes",
    columns: [
      {
        Header: "Light",
        accessor: "light_requirements",
        width: 50,
        minWidth: 50,
        align: "right",
      },
      {
        Header: "Growing Seasonality",
        accessor: "growing_seasonality",
        width: 50,
        minWidth: 50,
        align: "right",
      },
      {
        Header: "Plant Types",
        accessor: "plant_type",
      },
      {
        Header: "Plant Placement Order",
        accessor: "plant_placement_order",
      },
    ],
  },
];
const plantsCellStyle = css({
  border: "1px solid cornflowerblue",
  // padding: ".5rem",
  // fontSize: ".75rem",
  // width: "16%",
});
const PlantTable = (props: { plants: [] }): any => {
  const tableInstance = useTable({ columns, data: props.plants });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;
  return (
    <Layout>
      <table {...getTableProps()}>
        <thead
          style={{
            background: "salmon",
          }}
        >
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td css={plantsCellStyle} {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </Layout>
  );
};

export default PlantTable;
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
