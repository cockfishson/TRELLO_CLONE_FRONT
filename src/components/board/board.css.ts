import { style } from "@vanilla-extract/css";

export const board = style({
  display: "flex",
  flexWrap: "nowrap",
  gap: "16px",
  padding: "16px",
  backgroundColor: "rgba(10,10,10,0.1)",
  overflowX: "scroll",
});

export const addListButton = style({
  padding: "8px 16px",
  backgroundColor: "rgba(10,10,10,0.1)",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#656166",
  },
});
