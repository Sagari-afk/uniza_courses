import { Button } from "@mui/material";

const SecundaryBtn = ({ type, children, sxChildren, onClick, ...props }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        padding: "8px 36px",
        width: "100%",

        borderRadius: "0.75rem",
        fontSize: "1rem",
        fontWeight: 800,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        border: "2px solid #df6690",
        boxSizing: "border-box",
        boxShadow: "none",
        ...sxChildren,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SecundaryBtn;
