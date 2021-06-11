import React, { Component } from 'react';
import './Home.css';
import Header from "../../common/header/Header.js";
import tileData from "../../common/moviesData.js";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      flexGrow:1,
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      height: 210,
      width: '100%',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    
    titleBar: {
      background: 'rgba(128,128,128,0.7)'
        
    },
  }));

  const useStyles1 = makeStyles((theme) => ({
    root1: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList1: {
      transform: 'translateZ(0)',
      cursor: 'pointer'
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },

    formControl: {
      margin: theme.spacing.unit,
      minWidth: 240,
      maxWidth: 240
  },

  title: {
    color: theme.palette.primary.light,
}
  }));

function SingleLineGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={6}>
        {tileData.map((tile) => (
          <GridListTile key={tile.id}>
            <img src={tile.poster_url} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        ))}
      </GridList>       
    </div>
  );
}

function TitlebarGridList() {
    const classes1 = useStyles1();
  
    return (
      <div className="flex-container">
          <div className="right">
            <div className={classes1.root1}>
              <GridList cellHeight={350} cols={4} className={classes1.gridList1}>
            {tileData.map((tile) => (
              <GridListTile className="released-movie-grid-item" key={"grid" + tile.id}>
              
                  <img src={tile.poster_url} className="movie-poster" alt={tile.title} />
                    <GridListTileBar
                        title={tile.title}
                        subtitle={<span>Release Date: {new Date(tile.release_date).toDateString()}</span>}
                  />
                </GridListTile>
              ))}
          
        </GridList>
      </div>
      </div>

      <div className="left">
        <Card>
          <CardContent>
            <FormControl className={classes1.formControl}>
              <Typography className={classes1.title} color="textSecondary">
                FIND MOVIES BY:
              </Typography>
            </FormControl>

            <FormControl className={classes1.formControl}>
              <InputLabel>Movie Name</InputLabel>
              <Input id="movieName"/>
            </FormControl>

            <FormControl className={classes1.formControl}>
              <InputLabel>Genres</InputLabel>
                <Select
                  multiple
                >
                </Select>
            </FormControl>

            <FormControl className={classes1.formControl}>
              <InputLabel>Artists</InputLabel>
                <Select
                  multiple                        
                >
                </Select>
            </FormControl>

            <FormControl className={classes1.formControl}>
              <TextField
                id="releaseDateStart"
                label="Release Date Start"
                type="date"
                defaultValue=""
                InputLabelProps={{ shrink: true }}
                                  
              />
            </FormControl>

            <FormControl className={classes1.formControl}>
              <TextField
                id="releaseDateEnd"
                label="Release Date End"
                type="date"
                defaultValue=""
                InputLabelProps={{ shrink: true }}    
              />
            </FormControl>

            <br />
            <br />
            <FormControl className={classes1.formControl}>
              <Button variant="contained" color="primary">
                APPLY
              </Button>
            </FormControl>

          </CardContent>
        </Card>
      </div>
    </div>
    )
}   

class Home extends Component {

    render() {
        return (
            <div>
                <Header />
                <SingleLineGridList />  
                <TitlebarGridList />    
            </div>
        )
    }
    
}
export default Home
