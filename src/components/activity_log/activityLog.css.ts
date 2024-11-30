import { style } from "@vanilla-extract/css";

export const activityLogContainer = style({
  position: "absolute",
  right: "0",
  top: "50px",
  width: "330px",
  height: "100%",
  backgroundColor: "#2e2a2e",
  borderLeft: "1px solid #444",
  overflowY: "hidden",
  display: "flex",
  flexDirection: "column",
});

export const activityLogHeader = style({
  padding: "10px 15px",
  backgroundColor: "#383338",
  color: "#ccc",
  fontSize: "16px",
  fontWeight: "bold",
  borderBottom: "1px solid #444",
});

export const loadingText = style({
  color: "#ccc",
  textAlign: "left",
  marginTop: "20px",
});

export const activityLogList = style({
  listStyle: "none",
  margin: "0",
  flex: "1",
  overflowY: "auto",
  padding: "0px 0px 50px 0px",
});

export const activityLogItem = style({
  padding: "10px",
  borderBottom: "1px solid #444",
  color: "#ccc",
  textAlign: "left",
  ":last-child": {
    borderBottom: "none",
  },
});

export const activityLogDate = style({
  fontSize: "12px",
  color: "#9fadbc",
  display: "block",
  margin: "0",
});

export const actionDetails = style({
  fontSize: "12px",
  color: "#9fadbc",
  margin: "0",
  display: "inline",
  width: "100%",
  lineHeight: "1",
});

export const userNameLine = style({
  fontSize: "12px",
  color: "#9fadbc",
  margin: "0",
  display: "inline",
  padding: "0px 8px 0px 0px",
});

export const pfp = style({
  width: "30px",
  height: "auto",
  borderRadius: "90px",
  display: "inline-block",
});

export const textWrap = style({
  fontSize: "10px",
  width: "70%",
  height: "100%",
  display: "inline-block",
  padding: "0px 0px 0px 10px",
});
