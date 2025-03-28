import { Button } from "@mui/material";

const PrimaryBtn = ({ type, children, sxChildren, onClick, ...props }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      sx={{
        padding: "8px 36px",
        width: "100%",

        borderRadius: "0.75rem",
        fontSize: "1rem",
        fontWeight: 800,
        background: "linear-gradient(94deg, #df6690 11.3%, #ffc65a 101.52%)",
        boxShadow: "none",
        color: "#fff",
        ...sxChildren,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryBtn;
