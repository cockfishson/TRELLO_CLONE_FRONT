import { style } from "@vanilla-extract/css";

export const card = style({
  backgroundColor: "rgba(75,75,75,0.8)",
  border: "1px solid #656166",
  borderRadius: "8px",
  minHeight:"40px",
  width:"90%",
  padding:"0% 4% 0% 4%",
  height:"fit-content",
  marginBottom: "12px",
  cursor: "pointer",
  color: "#d3d3d3",
  transition: "transform 0.2s, box-shadow 0.2s",
  alignItems:"center",
  ":hover": {
    transform: "translateY(-2px)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  },
  justifyContent:"space-between", 
  display:"flex",

});

export const dragging = style({
  backgroundColor: "rgba(75,75,75,0.6)",
});

export const cardTitle = style({
  fontSize: "14px",
  fontWeight: "600",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  color: "#9fadbc",
  margin:"0",
  height:"20px",
});

export const descriptionIcon = style({
  width:"20px",
  height: "20px",
})

export const modalContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const input = style({
  width: "95%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #9fadbc",
  backgroundColor: "rgb(36, 29, 36)",
  color: "#e4e4e4",
  fontSize: "14px",
  outline: "none",
  ":focus": {
    borderColor: "#9fadbc",
  },
});

export const textarea = style({
  width: "95%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #9fadbc",
  backgroundColor: "rgb(36, 29, 36)",
  color: "#e4e4e4",
  fontSize: "14px",
  outline: "none",
  height: "80px",
  resize: "vertical",
  ":focus": {
    borderColor: "#9fadbc",
  },
});

export const actions = style({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "12px",
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

export const deleteButton = style({
  backgroundColor: "#f44336",
  border: "none",
  borderRadius: "4px",
  padding: "8px 16px",
  color: "#fff",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  ":hover": {
    backgroundColor: "#e53935",
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

export const editButton = style({
  backgroundColor: "#2196f3",
  border: "none",
  borderRadius: "4px",
  padding: "8px 16px",
  color: "#fff",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  ":hover": {
    backgroundColor: "#1e88e5",
  },
});
