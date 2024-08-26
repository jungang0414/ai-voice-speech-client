import { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Link } from "react-router-dom";

function NavBottom() {
  const [value, setValue] = useState(0);
  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" LinkComponent={Link} to="/" />
        <BottomNavigationAction label="News" LinkComponent={Link} to="/news" />
        <BottomNavigationAction label="#" LinkComponent={Link} to="#" />
      </BottomNavigation>
    </Box>
  );
}

export default NavBottom;
