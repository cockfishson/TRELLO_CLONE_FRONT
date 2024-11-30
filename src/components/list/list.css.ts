import { style } from "@vanilla-extract/css";

export const list = style({
  width: "270px",
  minWidth: "270px",
  backgroundColor: "rgba(10,10,10,0.8)",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  padding: "10px 16px 10px 16px",
  display: "flex",
  flexDirection: "column",
  overflowY: "hidden", 
  height:"fit-content",
  maxHeight: "calc(100vh - 160px)",
});

export const cardContainer = style({
  overflowY: "auto", 
  height:"fit-content",
  paddingTop:"5px",
});

export const addCardButton = style({
  padding: "8px 16px",
  backgroundColor: "rgba(70,70,70,0.8)",
  color: "#9fadbc",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  width: "100%",
  ":hover": {
    backgroundColor: "#656166",
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
  cursor: "pointer",
  color:"#9fadbc",
  ":hover": {
    color: "#656166",
  },
  width: "20px",
  height: "30px",
  margin: "0px",
  padding: "0px",
});

export const buttonRow = style({
  display: "inline",
  alignItems: "center",
  width:"50px",
  justifyContent: "space-between",
});

export const listHeader = style({
  margin: "0",
  display:"flex",
  height:"50px",
  alignItems:"center",
  justifyContent:"space-between"
});

export const listTitle = style({
  display: "inline",
  textAlign: "left",
  color: "#9fadbc",
  fontSize: "14px",
  fontWeight:"600",
  width: "60%",
});
