import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Cards from '../Cards/Cards';
// import Content from '../Content/Content';
// import ContentTabs from '../ContentTabs/ContentTabs'

import { fetchSeasons } from '../../api'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerTitle: {
    marginLeft: theme.spacing(2),
  },
}));



function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [showContent, setShowContent] = useState(false);
  const [seasonsData, setSeasonsData] = useState([]);
  const [year, setYear] = useState();
  // const [raceRound, setRaceRound] = useState();
  // const [raceYear, setRaceYear] = useState();
  

  useEffect(() => {
    const fetchAPI = async () => {
      setSeasonsData(await fetchSeasons())
    }

    fetchAPI();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const handleShowContent = (round, year) => {
  //   if(raceRound != null && raceRound != round){
  //     setShowContent(showContent);
  //     setRaceRound(round);
  //     setRaceYear(year);
  //   }else{
  //     setShowContent(!showContent);
  //     setRaceRound(round);
  //     setRaceYear(year);
  //   }

  // }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Typography variant="h6" gutterBottom className={classes.drawerTitle} >Seasons</Typography>
      <Divider />
      <List>
        {seasonsData.map((text, index) => (
          <ListItem button key={index} onClick={() => setYear(text.year)}>
            <ListItemText primary={text.year} />
            <ListItemIcon>{<ArrowRightIcon />}</ListItemIcon>
          </ListItem>
        )).reverse()}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Rewind
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* <div>
          {showContent && <ContentTabs raceRound={raceRound} raceYear={raceYear}/>}
        </div> */}
        <Cards  year={year}/>
      </main>
    </div>
  );
}

{/* handleShowContent={handleShowContent} */}
ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
