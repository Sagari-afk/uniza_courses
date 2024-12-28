import { Button } from "@mui/material";

const PrimaryBtn = ({ children, sxChildren, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        padding: "8px 36px",

        borderRadius: "0.75rem",
        fontSize: "1rem",
        fontWeight: 800,
        color: "black.main",
        background: "linear-gradient(94deg, #df6690 11.3%, #ffc65a 101.52%)",
        boxShadow: "none",
        ...sxChildren,
      }}
    >
      {children}
    </Button>
  );
};

export default PrimaryBtn;
