import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import LoadingMask from "./components/LoadingMask";
import Laptop from "./components/Laptop";
import { AppBar, Button, TextField, Toolbar } from "@mui/material";

const url = "https://demoapi.com/api/laptop";

const App = () => {
  const [laptops, setLaptops] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [loading, setLoading] = useState(true);
  const [asc, setAsc] = useState(true);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const getLaptops = async () => {
      const response = await fetch(url);
      const laptops = await response.json();
      setLaptops(laptops);
      setLoading(false);
    };
    getLaptops();
  }, []);

  useEffect(() => {
    const filteredLaptops = laptops?.filter((laptop) =>
      laptop.name.includes(filterValue)
    );
    setFiltered(filteredLaptops);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue]);

  const handleSort = () => {
    if (filtered) {
      if (asc) {
        filtered.sort((a, b) => a.weight - b.weight);
      } else {
        filtered.sort((a, b) => b.weight - a.weight);
      }
      setFiltered([...filtered])
    } else {
      if (asc) {
        laptops.sort((a, b) => a.weight - b.weight);
      } else {
        laptops.sort((a, b) => b.weight - a.weight);
      }
      setLaptops([...laptops]);
    }
    setAsc(!asc);
  };

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <>
      <AppBar position="static" sx={{ background: "#cccccc", padding: "1rem" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            type="text"
            label="Filter By Name"
            variant="outlined"
            value={filterValue}
            onChange={handleFilter}
          />
          <Button variant="contained" onClick={handleSort}>
            Sort
          </Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h1">Laptops</Typography>
      {loading ? (
        <LoadingMask />
      ) : filtered ? (
        filtered?.map((laptop) => (
          <Laptop
            key={laptop.name}
            name={laptop.name}
            brand={laptop.brand}
            weight={laptop.weight}
          />
        ))
      ) : (
        laptops?.map((laptop) => (
          <Laptop
            key={laptop.name}
            name={laptop.name}
            brand={laptop.brand}
            weight={laptop.weight}
          />
        ))
      )}
    </>
  );
};

export default App;
