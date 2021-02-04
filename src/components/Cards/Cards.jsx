import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse'

import { fetchSeasonData } from '../../api'

import Grid from '@material-ui/core/Grid'

import sampleImage from '../../images/sample.png'

import { useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ContentTabs from '../ContentTabs/ContentTabs'


const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '10px',
    height: '100%',
    
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
  },
 
  cover: {
    width: 50,
    objectFit: 'contain',
    
  }
}));

export default function ImgMediaCard({handleShowContent, year}) {

  const [ seasonData, setSeasonData ] = useState([]);
  const [ expanded, setExpanded ] = useState(false);
  const [raceRound, setRaceRound] = useState();
  const [raceYear, setRaceYear] = useState();
  const [selectedIndex, setSelectedIndex] = useState("");

  useEffect( () => {
    const fetchAPI = async () => {
      setSeasonData( await fetchSeasonData(year));    
    }
    fetchAPI();
  }, [year]);

  console.log(year)

  console.log(seasonData);

  const handleExpandClick = (round, year, index) => {
      if(selectedIndex != index){
        setSelectedIndex(index);
      }else{
        setSelectedIndex(selectedIndex);
      }
      setExpanded(!expanded);
      setRaceRound(round);
      setRaceYear(year);
  }

  const classes = useStyles();
  const theme = useTheme();

  return (
    seasonData
    ?
    (<div className={classes.root}>
      <Grid container > 
      
      { seasonData.map( (data, index) =>(
          <Grid item xs={12} key={index}>
          <Card>
          {/* handleShowContent(data.round, data.season) */}
            <div >
            
              <CardMedia
                className={classes.cover}
                component="img"
                alt="none"
                src={sampleImage}
                title="none"
              />
              <CardContent className={classes.content} onClick={() =>  handleExpandClick(data.round, data.season, index) }>
              <Typography variant="body2" color="textSecondary" component="p">
                  Round {data.round}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.raceName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {data.circuitName}
                </Typography>
              </CardContent>
            </div>
            <Collapse in={expanded && selectedIndex == index} timeout="auto" unmountOnExit>
              {<ContentTabs raceRound={raceRound} raceYear={raceYear}/> }
            </Collapse>
          </Card>
         </Grid>
        
      ))}
      </Grid>
    </div>) : null

  );
}
