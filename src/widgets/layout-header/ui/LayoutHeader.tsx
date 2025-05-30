import {
  FILMS_LIST,
  FILMS_TOP_LIST,
  iconComponents,
} from '@/shared/consts/constants';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Icon = ({ iconName }) => {
  const IconComponent = iconComponents[iconName];
  return <IconComponent />;
};

export const LayoutHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const trigger = useScrollTrigger({
    target: window,
  });

  const handleDrawerToggle = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar>
        <Container>
          <Toolbar>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer open={isOpen} onClose={handleDrawerToggle}>
              <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
                <List>
                  {FILMS_TOP_LIST.map(item => (
                    <Link key={item.title} component={RouterLink} to={item.url}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Icon iconName={item.icon} />
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Divider />
                <List>
                  {FILMS_LIST.map(item => (
                    <Link key={item.title} component={RouterLink} to={item.url}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Icon iconName={item.icon} />
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Box>
            </Drawer>
            <Typography
              sx={{ color: 'white', textDecoration: 'none' }}
              component={RouterLink}
              variant="h4"
              to="/"
            >
              Movienest
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
};
