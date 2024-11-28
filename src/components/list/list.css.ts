import { style } from "@vanilla-extract/css";

export const list = style({
  width: "300px",
  backgroundColor: "rgba(10,10,10,0.8)",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  padding: "16px",
});

export const cards = style({
  marginTop: "16px",
});

export const addCardButton = style({
  padding: "8px 16px",
  backgroundColor: "rgba(70,70,70,0.8)",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  width: "100%",
  ":hover": {
    backgroundColor: "#218838",
  },
});

export const saveButton = style({
  backgroundColor: "#4caf50",
  border: "none",
  borderRadius: "4px",
  padding: "8px 16px",
  color: "#fff",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  ":hover": {
    backgroundColor: "#45a049",
  },
});

export const cancelButton = style({
  backgroundColor: "#9e9e9e",
  border: "none",
  borderRadius: "4px",
  padding: "8px 16px",
  color: "#fff",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  ":hover": {
    backgroundColor: "#757575",
  },
});

export const modalButtons = style({
  justifyContent: "space-between",
  display: "flex",
  width: "80%",
});

export const boardButtonStyle = style({
  background: "transparent",
  border: "none",
  fontSize: "20px",
  color: "white",
  cursor: "pointer",
  ":hover": {
    color: "656166",
  },
  width: "20px",
  height: "30px",
  margin: "0px",
  padding: "0px",
});

export const buttonRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const listHeader = style({
  color: "#9fadbc",
  fontSize: "20px",
  margin: "0",
});
