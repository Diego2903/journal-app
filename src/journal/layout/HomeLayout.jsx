import { Box, Toolbar } from "@mui/material"
import { NavBar, Sidebar } from "../components";

const drawerWidth = 240;

export const HomeLayout = ({ children }) => {
  return (

    <Box sx={{ display: "flex" }}>

      <NavBar drawerWidth={drawerWidth} />

      <Sidebar drawerWidth={drawerWidth} />

      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Toolbar />
        {children}

      </Box>
    </Box>

  )
}
