import { style } from "@vanilla-extract/css";

export const board = style({
  display: "flex",
  flexWrap: "nowrap",
  gap: "16px",
  padding: "16px",
  backgroundColor: "rgba(10,10,10,0.1)",
  overflowX: "auto",
  overflowY: "hidden",
  height: "calc(100vh - 83px)",
  width: "100%",
  whiteSpace: "nowrap",
});


export const addListButton = style({
  padding: "8px 16px",
  backgroundColor: "rgba(10,10,10,0.1)",
  color: "#9fadbc",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  height:"40px",
  width:"272px",
  minWidth:"272px",
  marginRight: "30px",
  ":hover": {
    backgroundColor: "#656166",
  },
});
