import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { CssBaseline, Box, Toolbar, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { itemsList } from './SidebarMenu';


// MUI Sidebar Design
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  background: '#0E7E80',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
    background: '#0E7E80'
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const MainMenu = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className='jlpt-wrapper'>
        <Box className='jlpt-header'>
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h1">JLPT Apply Forms</Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open} className="sidebar">
            <DrawerHeader>
              <Typography variant="h5">JLPT Forms</Typography>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <List>
              {itemsList.map(item => {
                return (
                  <ListItem
                    disablePadding
                    key={item.text}
                    onClick={() => navigate(item.path)}
                    className={location.pathname === item.path ? "active" : ""}
                  >
                    {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItem>
                );
              })}
            </List>
          </Drawer>
        </Box>
        <Box component="main" className="main-wrap">
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '1.2rem',
      fontWeight: '500',
      color: '#FFF',
    },
    h5: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#FFF',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiBox-root.jlpt-wrapper": {
          display: 'flex',
          padding: '0',
          ".MuiBox-root.jlpt-header": {
            padding: '0',
            ".MuiAppBar-root": {
              background: '#0E7E80',
              ".MuiToolbar-root": {
                ".MuiIconButton-root": {
                  marginRight: '10px',
                  ".MuiSvgIcon-root": {
                    fontSize: '2.2rem',
                  },
                },
              },
            },
            ".MuiDrawer-root": {
              ".MuiPaper-root": {
                ".MuiSvgIcon-root": {
                  fontSize: '2.2rem',
                  color: '#FFF',
                },
                ".MuiList-root": {
                  ".MuiListItem-root": {
                    padding: '0 16px',
                    margin: '20px 0',
                    cursor: 'pointer',
                    color: '#FFF',
                    opacity: '0.5',
                    "&.active": {
                      opacity: '1',
                      borderLeft: '4px solid #FFF',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});

export default MainMenu;