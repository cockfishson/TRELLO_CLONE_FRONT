import { style } from "@vanilla-extract/css";

export const sidebarStyle = style({
  width: "250px",
  borderRight: "1px solid #ddd",
  height: "100vh",
  overflowY: "hidden",
  overflowX: "hidden",
  backgroundColor: "rgb(36, 29, 36)",
});

export const boardItemStyle = style({
  listStyleType: "none",
  padding: "0px 15px",
  margin: "0",
  cursor: "pointer",
  height: "30px",
  width: "90%",
  transition: "background-color 0.2s",
  color: "#9fadbc",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  ":hover": {
    backgroundColor: "#656166",
  },
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
});

export const boardList = style({
  margin: "0",
  padding: "0",
});

export const sidebarHeader = style({
  color: "#9fadbc",
  fontSize: "14px",
  margin: "0",
});

export const headerRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 15px",
  height: "40px",
  borderBottom: "1px solid #ddd",
});

export const addBoardButton = style({
  background: "transparent",
  border: "none",
  fontSize: "24px",
  color: "#9fadbc",
  cursor: "pointer",
  padding: "0",
  margin: "0",
  ":hover": {
    color: "white",
  },
});

export const activeBoard = style({
  backgroundColor: "#656166",
});

export const activityLog = style({
  marginTop: "20px",
  padding: "0 15px",
  height: "500px",
  overflowY: "auto",
  backgroundColor: "#2e2a2e",
  borderRadius: "4px",
});

export const activityLogList = style({
  listStyle: "none",
  margin: "0",
  padding: "0",
});

export const activityLogItem = style({
  padding: "10px",
  borderBottom: "1px solid #444",
  color: "#ccc",
  ":last-child": {
    borderBottom: "none",
  },
});

export const activityLogDate = style({
  fontSize: "12px",
  color: "#888",
});
