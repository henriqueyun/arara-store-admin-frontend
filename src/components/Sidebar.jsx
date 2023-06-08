import React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Box, Link, ListItemIcon } from "@mui/material";
import { Settings } from "@mui/icons-material";

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
    >
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <Link href="/" underline="none" color="inherit">
          <Typography variant="h5">ARARASTORE</Typography>
        </Link>
      </Toolbar>
      <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
        <List sx={{ width: "100%" }}>
          <SidebarLi title="Inicio" selected />
          <SidebarLi title="Vitrine" />
          <SidebarLi title="Pedidos" />
          <SidebarLi title="Roupas" />
        </List>
      </Box>
      <Box sx={{ display: "flex" }}>
        <List>
          <SidebarLiIcon />
        </List>
      </Box>
    </Drawer>
  )
}

function SidebarLi({ title, selected }) {
  return (
    <ListItem disablePadding>
      <ListItemButton >
        <ListItemText>
          <Typography align="center" sx={{ fontWeight: selected && "bold" }}>
            {title}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

function SidebarLiIcon() {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <Settings sx={{ color: (theme) => theme.palette.common.white }} />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  )
}