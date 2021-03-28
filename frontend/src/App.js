import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NavBar from "./components/NavBar";
import PDFViewer from "./components/PDFViewer";
import Home from './components/Home';
import Landing from './components/Landing'

import { BrowserRouter as Router, Route } from "react-router-dom";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        LBP
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
    link: {
      margin: theme.spacing(1, 1.5),
    },
    heroContent: {
      padding: theme.spacing(2, 0, 6, 0.5),
    },
    footer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(8),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up("sm")]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
      },
    },
  }));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <CssBaseline />
      <NavBar />
      <Route path="/landing" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/view-resume" component={PDFViewer} />
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Copyright />
      </Container>
      {/* End footer */}
    </Router>
  );
}



export default App;
