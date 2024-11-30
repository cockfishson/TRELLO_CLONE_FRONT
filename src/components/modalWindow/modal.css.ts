import { style } from "@vanilla-extract/css";

export const modalOverlayStyle = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "none",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  selectors: {
    '&[data-open="true"]': {
      display: "flex",
    },
  },
});

export const modalContainerStyle = style({
  backgroundColor: "rgba(10,10,10,0.8)",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  width: "400px",
  maxWidth: "90%",
  padding: "20px",
  position: "relative",
  color: "#333",
});

export const modalHeaderStyle = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #ddd",
  paddingBottom: "10px",
  marginBottom: "20px",
  color: "#9fadbc",
});

export const modalContentStyle = style({
  overflowY: "auto",
  maxHeight: "70vh",
  color: "#333",
});

export const closeButtonStyle = style({
  background: "transparent",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
  color: "#333",
  ":hover": {
    color: "#555",
  },
});
