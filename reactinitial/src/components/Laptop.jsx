import { Paper, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

const Laptop = ({ name, brand, weight }) => {
  const [showMore, setShowMore] = useState(false);

  const handleClick = () => {
    setShowMore(!showMore);
  };

  return (
    <Paper elevation={4} sx={{ margin: "1rem", padding: "1rem", display: 'flex', flexDirection: 'column', alignItems: "center"}}>
      <Typography variant="h3">{name}</Typography>
      {showMore ? (
        <>
          <Typography variant="h4">Brand: {brand}</Typography>
          <Typography variant="body1">weight: {weight}kg</Typography>
        </>
      ) : null}
      <Button variant="contained" onClick={handleClick}>
        {showMore ? "Show less" : "Show more"}
      </Button>
    </Paper>
  );
};

Laptop.propTypes = {
  name: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
};

export default Laptop;
