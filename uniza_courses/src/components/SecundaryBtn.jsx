import { Button } from "@mui/material";

const SecundaryBtn = ({ children, sxChildren, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        padding: "8px 36px",

        borderRadius: "0.75rem",
        fontSize: "1rem",
        fontWeight: 800,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        border: "2px solid #df6690",
        boxSizing: "border-box",
        boxShadow: "none",
        ...sxChildren,
      }}
    >
      {children}
    </Button>
  );
};

export default SecundaryBtn;
