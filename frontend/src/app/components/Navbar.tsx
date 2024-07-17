"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { usePathname } from "next/navigation";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { name: "Todas as Campanhas", path: "/" },
  { name: "Suas Campanhas", path: "/your-campaigns" },
  { name: "Mensagem", path: "#" },
  { name: "Perfil", path: "#" },
];

export default function Navbar(props: Props) {
  const path = usePathname();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user } = useAuthContext();
  const [hydrated, setHydrated] = React.useState(false);

  const container = window !== undefined ? () => window().document.body : undefined;

  const isLoggedIn = hydrated && user !== "";

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (path === "/login" || path === "/cadastro") {
    return null;
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Tiquim
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton href={item.path} sx={{ textAlign: "center" }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem key={"Sair"} disablePadding sx={{ display: isLoggedIn ? "inline" : "none" }}>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary={"Sair"} />
          </ListItemButton>
        </ListItem>

        <ListItem key={"Login"} disablePadding sx={{ display: !isLoggedIn ? "inline" : "none" }}>
          <ListItemButton href="/login" sx={{ textAlign: "center" }}>
            <ListItemText primary={"Login"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" sx={{ backgroundColor: "white", boxShadow: "none" }}>
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "text.primary" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              ml: 4,
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              color: "text.primary",
              fontWeight: "bold",
            }}
          >
            Tiquim
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                href={item.path}
                sx={{ mr: 2, color: "text.primary", textTransform: "none", fontWeight: "bold" }}
              >
                {item.name}
              </Button>
            ))}
            <Button
              variant="contained"
              size="small"
              sx={{
                mr: 4,
                color: "white",
                textTransform: "none",
                backgroundColor: "black",
                fontWeight: "bold",
                display: isLoggedIn ? null : "none",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
            >
              Sair
            </Button>

            <Button
              variant="contained"
              href="/login"
              size="small"
              sx={{
                mr: 4,
                color: "white",
                textTransform: "none",
                backgroundColor: "black",
                fontWeight: "bold",
                display: !isLoggedIn ? null : "none",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
