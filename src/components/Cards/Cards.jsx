import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { fetchSeasonData } from '../../api'

import Grid from '@material-ui/core/Grid'

import sampleImage from '../../images/sample.png'

import { useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px',
    maxWidth: 345,
    [theme.breakpoints.down("md")] : {
    maxWidth: 300
    },
    
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

  useEffect( () => {
    const fetchAPI = async () => {
      setSeasonData( await fetchSeasonData(year));    
    }
    fetchAPI();
  }, [year]);

  console.log(year)

  console.log(seasonData);

  const classes = useStyles();
  const theme = useTheme();

  // const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    seasonData
    ?
    (<div>
      <Grid container> 
      
      { seasonData.map( (data, index) =>(
          <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.root} onClick={() => handleShowContent()} key={index}>
            <div className={classes.details}>
            
              <CardMedia
                className={classes.cover}
                component="img"
                alt="none"
                src={sampleImage}
                title="none"
              />
              <CardContent className={classes.content}>
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
          </Card>
         
         </Grid>
        
      ))}
      </Grid>
    </div>) : null

  );
}
