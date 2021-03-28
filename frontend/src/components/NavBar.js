import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import logo from "../img/resumate-logo.png"
import "../App.css"

export default function NavBar() {
  const useStyles = makeStyles((theme) => ({
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
  }));

  const classes = useStyles();

  return (
      <React.Fragment>
    <CssBaseline />
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          <RouterLink to="/landing"><img className="logo-nav" src={logo}/></RouterLink>
        </Typography>
        <nav>
          <Link
            variant="button"
            color="textPrimary"
            href="https://github.com/ganbaKotori/resumate"
            className={classes.link}
          >
            GitHub
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            href="#"
            className={classes.link}
          >
            DevPost
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
    </React.Fragment>
  );
}

