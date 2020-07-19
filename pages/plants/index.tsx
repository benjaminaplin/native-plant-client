/** @jsx jsx */
import { useMemo } from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import Layout from "../../components/Layout";
import {
  plantsCell,
  plantsTable,
  plantsTableHeader,
  thColumn,
  tableBody,
} from "./styles/tableStyles";
import { lightRequirements } from "../../shared/constants/lightRequirements";
import {
  Cell,
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import {
  DefaultColumnFilter,
  GlobalFilter,
  SelectColumnFilter,
  SliderColumnFilter,
  NumberRangeColumnFilter,
  fuzzyTextFilterFn,
  filterGreaterThan,
} from "./helpers/filters";
import { Plant } from "./types/plantTableTypes";

const PlantTable = (props: { plants: [] }): any => {
  const columns = useMemo(
    () => [
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
            filter: "fuzzyText",
          },
        ],
      },
      {
        Header: "Attributes",
        columns: [
          {
            Header: "Light",
            accessor: (row) => lightRequirements[row.light_requirements],
            width: 50,
            minWidth: 50,
            align: "center",
            filter: SelectColumnFilter,
          },
          {
            Header: "Growing Seasonality",
            accessor: "growing_seasonality",
            width: 50,
            minWidth: 50,
            align: "center",
            filter: SelectColumnFilter,
          },
          {
            Header: "Plant Types",
            accessor: "plant_type",
            filter: SelectColumnFilter,
          },
          {
            Header: "Plant Placement Order",
            accessor: "plant_placement_order",
            filter: SelectColumnFilter,
          },
        ],
      },
    ],
    []
  );

  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: props.plants,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters,
    useGlobalFilter
  );

  return (
    <Layout>
      <table css={plantsTable} {...getTableProps()}>
        <thead css={plantsTableHeader}>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th css={thColumn} {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
                      }
                      <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={state.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                      />
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
                        <td css={plantsCell} {...cell.getCellProps()}>
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
