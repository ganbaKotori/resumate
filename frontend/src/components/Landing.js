import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"
import logo from "../img/resumate-logo.png"
import "../App.css"

export default function Landing() {

  const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(3),
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height:'95vh'
    },
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(7),
        paddingRight: 0,
      },
    },

    mainFeaturedPostContent2: {
        position: 'relative',
        padding: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(10),
          marginTop: 40,
        },
      },
    
  }));

  const classes = useStyles();

  return (
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5e342aff8b6cf300071d86b7%2F0x0.jpg)` }}>
    {/* Increase the priority of the hero background image */}
    {<img style={{ display: 'none' }} src={"https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5e342aff8b6cf300071d86b7%2F0x0.jpg"} alt={"Sample"} />}
    <div className={classes.overlay} />
    <Grid container>
      <Grid item md={6}>
        <div className={classes.mainFeaturedPostContent}>
            <img className="logo" src={logo}/>
          <Typography component="h1" variant="h2" color="inherit" gutterBottom>
          Optimizing the Perfect Resume for Every Job
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
          Resumate generates a resume for you based on the requirements of the job and the skills you provde.
          </Typography>

          <Button component={Link} to={'/home'} variant="contained" size="large" to="/home" color="primary">
Get Started
</Button>
        </div>
      </Grid>

      <Grid item md={6}>
        <div className={classes.mainFeaturedPostContent2}>
        <img className="linkedin" src="http://assets.stickpng.com/images/58e91afdeb97430e81906504.png" />
        <br/>
        <img className="indeed" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Indeed_logo.png" />
        <br/>
        <Typography align='center' variant="h5" color="inherit" paragraph>
          Resumate supports LinkedIn and indeed. Simply copy the <b>url</b> of the job listing and let Resumate do its magic
          </Typography>

          

         
        </div>
      </Grid>
    </Grid>
  </Paper>
  );
}