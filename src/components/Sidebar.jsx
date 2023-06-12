import React, { useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box, Link, ListItemIcon } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { Context } from '../context/AuthContext';

export default function Sidebar() {
  const { logged, signOut } = useContext(Context);
  return (
    logged && (
      <Drawer variant="permanent" anchor="left">
        <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/" underline="none" color="inherit">
            <Typography variant="h5">ARARASTORE</Typography>
          </Link>
        </Toolbar>
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
          <List sx={{ width: '100%' }}>
            <SidebarLi title="Inicio" selected link="" />
            <SidebarLi title="Vitrine" link="showCase" />
            <SidebarLi title="Pedidos" link="orders" />
            <SidebarLi title="Roupas" link="products" />
          </List>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <List>
            <ListItemButton onClick={signOut}>
              <ListItemText>
                <Typography align="rigth">Sair</Typography>
              </ListItemText>
            </ListItemButton>
            <SidebarLiIcon />
          </List>
        </Box>
      </Drawer>
    )
  );
}

function SidebarLi({ title, selected, link }) {
  return (
    <ListItem disablePadding>
      <ListItemButton href={`/${link}`}>
        <ListItemText>
          <Typography align="center" sx={{ fontWeight: selected && 'bold' }}>
            {title}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
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
  );
}
