import { style } from "@vanilla-extract/css";

export const header = style({
  width:"100vw",
  height: "50px",
  backgroundColor: "#383338",
  display: "flex",
  position:"fixed",
  alignItems: "center",
  padding: "0 15px",
  color: "#9fadbc",
  borderBottom: "1px solid #444",
});

export const headerTitle = style({
  fontSize: "18px",
  fontWeight: "bold",
});

export const toggleButton = style({
  background: "transparent",
  position: "absolute",
  top: "5px",
  right: "32px",
  color: "#9fadbc",
  border:"none",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#444",
  },
});
