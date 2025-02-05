import { Button } from "@mui/material";

const SecundaryBtn = ({ type, children, sxChildren, onClick, ...props }) => {
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

        border: "2px solid #df6690",
        boxSizing: "border-box",
        boxShadow: "none",
        color: "primary.main",
        backgroundColor: "transperent",
        ...sxChildren,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SecundaryBtn;
