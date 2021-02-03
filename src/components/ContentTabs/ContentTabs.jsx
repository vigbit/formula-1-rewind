import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { fetchRaceData } from '../../api'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    minWidth: 650,
  },
}));

export default function NavTabs({raceRound, raceYear}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [raceData, setRaceData] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

console.log(raceRound, raceYear)

  useEffect(() => {
    const fetchAPI = async () => {
      setRaceData(await fetchRaceData())
    }
    fetchAPI();
  },[]); 

  console.log(raceData)

  const qualifying = (
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Driver</TableCell>
          <TableCell align="right">Q1</TableCell>
          <TableCell align="right">Q2</TableCell>
          <TableCell align="right">Q3</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {raceData.map((data, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              {data.givenName} {data.familyName}
            </TableCell>
            <TableCell align="right">{data.Q1}</TableCell>
            <TableCell align="right">{data.Q2}</TableCell>
            <TableCell align="right">{data.Q3}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Qualifying" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Results" href="/trash" {...a11yProps(1)} />
          <LinkTab label="Constructors" href="/spam" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {qualifying}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Page Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Page Three
      </TabPanel>
    </div>
  );
}
