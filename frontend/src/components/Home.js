import React from "react";
import ResumeForm from "./ResumeForm";
import Banner from "./Banner";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
 
    heroContent: {
      padding: theme.spacing(2, 0, 6, 0.5),
    },
  }));

const Home = () => {
    const classes = useStyles();
    return (
      <React.Fragment>
        <Container maxWidth="lg" component="main" className={classes.heroContent}>
          <Banner />
        </Container>
        <Container maxWidth="lg" component="main" className={classes.heroContent}>
          <ResumeForm />
        </Container>
      </React.Fragment>
    );
  };

export default Home;