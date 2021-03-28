import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import FileViewer from 'react-file-viewer';
import Paper from '@material-ui/core/Paper';

const PDFViewer = props => {
  const docxUrl  = props.location.state.docxUrl
  const pdfUrl  = props.location.state.pdfUrl
  const type = "pdf";
  const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        },
      },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  const onError = e => {
    console.log(e, "error in file-viewer");
  };
  const classes = useStyles();

  return (
    <Container maxWidth="lg" component="main" className={classes.heroContent}>
    <div className={classes.root}>
        <Grid item xs={9}>
          <Paper className={classes.paper}><FileViewer fileType={type} filePath={pdfUrl} onError={onError} /> </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
          <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
          gutterBottom
        >
                You're All Set!
        </Typography>
        <Typography
          align="center"
          color="textSecondary"
          component="p"
          gutterBottom
        >
                Download your Resume
        </Typography>
          <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                fullWidth={true}
                className={classes.margin}
                href={docxUrl}
              >
                docx
              </Button>
            </Grid>
            <br/>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                fullWidth={true}
                className={classes.margin}
                color="secondary"
                href={pdfUrl}
              >
                pdf
              </Button>
            </Grid>
          </Paper>
        </Grid>
    </div>
    <br/>
    </Container>
  );
}


export default PDFViewer;



