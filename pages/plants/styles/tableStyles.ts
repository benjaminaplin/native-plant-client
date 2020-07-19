import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

export const plantsTable = css({
  borderCollapse: "collapse",
  fontSize: ".75rem",
  margin: "50px auto",
  borderRadius: "5px",
  boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
});

export const plantsTableHeader = css({
  borderRadius: "5px",
  background: "salmon",
});

export const thColumn = css({
  fontSize: "16px",
  fontWeight: 400,
  color: "#fff",
  textShadow: "(1px 1px 0px rgba(0,0,0,0.5))",
  textAlign: "left",
  padding: "20px",
  backgroundImage: "linear-gradient(#646f7f, #4a5564))",
  borderTop: "1px solid #858d99",
});

export const tableBody = styled.tbody`
  tr:nth-child(2n) {
    background:#f0f3f5;
  }
  tr:last-child td {
    border-bottom: none;
    &:first-child {
      border-bottom-left-radius(5px);
    }
    &:last-child {
      border-bottom-right-radius(5px);
    }
  }
`;

export const plantsCell = css({
  border: "1px solid cornflowerblue",
  fontWeight: 400,
  color: "#5f6062",
  fontSize: "13px",
  padding: ".5rem",
  borderBottom: "1px solid #e0e0e0",
});
