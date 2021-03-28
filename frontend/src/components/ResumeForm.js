import Paper from "@material-ui/core/Paper";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Button } from "@material-ui/core";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Redirect } from "react-router-dom";

export default function UserResumeForm() {
  const today = new Date();
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
        backgroundColor: theme.palette.background.paper,
      },
    },
    skillList: {
      height: "250px",
    },
  }));

  const [fileLocations, setFileLocations] = React.useState({
    docx: null,
    pdf: null,
  });
  const [selectedStartDate, setSelectedDate] = React.useState(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0));
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0));
  const [
    selectedEducationStartDate,
    setSelectedEducationStartDate,
  ] = React.useState(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0));
  const [
    selectedEducationEndDate,
    setSelectedEducationEndDate,
  ] = React.useState(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0));

  function SubmitData() {
    const userInformation = {
      firstName: personalInfoFields.firstName,
      lastName: personalInfoFields.lastName,
      skills: personalInfoFields.skills,
      url: personalInfoFields.url,
      phoneNumber: personalInfoFields.phoneNumber,
      email: personalInfoFields.email,
      education: educationFields,
      experience: experienceFields,
    };

    axios
      .post(`http://localhost:5000/generate-resume`, { userInformation })
      .then((res) => {
        console.log(JSON.stringify(res.data));
        const values = fileLocations;
        values.docx = res.data.docxDownloadLink;
        values.pdf = res.data.pdfDownloadLink;
        setFileLocations(values);
        console.log(fileLocations.docx);
        setState({ redirect: "/view-resume" });
      });
  }

  const classes = useStyles();

  const [skill, setSkill] = React.useState("");

  const [experienceFields, setExperienceFields] = React.useState([
    {
      companyName: "",
      position: "",
      startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
      endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
      description: "",
      city: "",
      state: "",
    },
  ]);

  const [educationFields, setEducationFields] = React.useState([
    {
      schoolName: "",
      degree: "",
      major: "",
      startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
      endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
      city: "",
      state: "",
    },
  ]);

  const [personalInfoFields, setPersonalInfoFields] = React.useState({
    firstName: "",
    lastName: "",
    skills: [],
    url: "",
    phoneNumber: "",
    email: "",
  });

  const handlePeronsalInfoChange = (event) => {
    const values = personalInfoFields;
    switch (event.target.name) {
      case "firstName":
        values.firstName = event.target.value;
        break;
      case "lastName":
        values.lastName = event.target.value;
        break;
      case "email":
        values.email = event.target.value;
        break;
      case "url":
        values.url = event.target.value;
        break;
      case "phoneNumber":
        values.phoneNumber = event.target.value;
        break;
      default:
        console.log("handlePersonalInfoChange received an invalid case value");
    }
    setPersonalInfoFields(values);
  };

  const handleExperienceChange = (index, event) => {
    const values = [...experienceFields];

    switch (event.target.name) {
      case "companyName":
        values[index].companyName = event.target.value;
        break;
      case "description":
        values[index].description = event.target.value;
        break;
      case "city":
        values[index].city = event.target.value;
        break;
      case "state":
        values[index].state = event.target.value;
        break;
      default:
        console.log("handleExperienceChange received an invalid case value");
    }
    setExperienceFields(values);
  };

  const handleEducationChange = (index, event) => {
    const values = [...educationFields];

    switch (event.target.name) {
      case "schoolName":
        values[index].schoolName = event.target.value;
        break;
      case "degree":
        values[index].degree = event.target.value;
        break;
      case "major":
        values[index].major = event.target.value;
        break;
      case "city":
        values[index].city = event.target.value;
        break;
      case "state":
        values[index].state = event.target.value;
        break;
      default:
        console.log("handleEducationChange received an invalid case value");
    }
    setEducationFields(values);
  };

  const handleSkillChange = (event) => {
    setSkill(event.target.value);
  };

  const handleDateChange = (date, index, id) => {
    const values = [...experienceFields];
    const educationValues = [...educationFields];
    switch (id) {
      case "startDate":
        setSelectedDate(date);
        values[index].startDate = date;
        break;
      case "endDate":
        setSelectedEndDate(date);
        values[index].endDate = date;
        break;
      case "startEducationDate":
        setSelectedEducationStartDate(date);
        educationValues[index].startDate = date;
        break;
      case "endEducationDate":
        setSelectedEducationEndDate(date);
        educationValues[index].endDate = date;
        break;
      default:
        console.log("handleDateChange received an invalid case value");
    }
  };

  const handleAddSkill = (event) => {
    event.preventDefault();
    const values = personalInfoFields;
    values.skills.push(skill);
    setPersonalInfoFields(values);
    setSkill("");
  };

  const handleAddFields = () => {
    const values = [...experienceFields];
    values.push({
      companyName: "",
      startDate: "",
      endDate: "",
      description: "",
      city: "",
      state: "",
    });
    setExperienceFields(values);
  };

  const handleAddEducation = () => {
    const values = [...educationFields];
    values.push({
      schoolName: "",
      degree: "",
      major: "",
      startDate: new Date(),
      endDate: new Date(),
      city: "",
      state: "",
    });
    setEducationFields(values);
  };

  const handleRemoveSkill = (index) => {
    const values = personalInfoFields;
    values.skills.splice(index, 1);
    setPersonalInfoFields(values);
    setSkill(" ");
  };

  const handleRemoveFields = (index) => {
    const values = [...experienceFields];
    values.splice(index, 1);
    setExperienceFields(values);
  };

  const handleRemoveEducation = (index) => {
    const values = [...educationFields];
    values.splice(index, 1);
    setEducationFields(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("experienceFields", experienceFields);
  };
  const [state, setState] = React.useState({ redirect: null });
  if (state.redirect) {
    console.log(fileLocations.docx);
    return (
      <Redirect
        to={{
          pathname: state.redirect,
          state: { docxUrl: fileLocations.docx, pdfUrl: fileLocations.pdf },
        }}
      />
    );
  }
  return (
    <React.Fragment>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Build Your Resume The Smart Way
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Copy and Paste the link to the job you're applying to and we'll
          generate a custom resume tailored for that job.
        </Typography>
        <br />
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Job Listing Link
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="url"
                name="url"
                label="URL"
                fullWidth
                autoComplete="given-name"
                onChange={(event) => handlePeronsalInfoChange(event)}
              />
            </Grid>
          </Grid>
          <br />
          <br />
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                onChange={(event) => handlePeronsalInfoChange(event)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                onChange={(event) => handlePeronsalInfoChange(event)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="family-name"
                onChange={(event) => handlePeronsalInfoChange(event)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="phoneNumber"
                name="phoneNumber"
                label="Phone"
                fullWidth
                autoComplete="family-name"
                onChange={(event) => handlePeronsalInfoChange(event)}
              />
            </Grid>
            
            <Grid item xs={12} sm={12}>
              <Typography variant="h6">Experience</Typography>
            </Grid>
            {experienceFields.map((inputField, index) => (
              <React.Fragment key={`${inputField}~${index}`}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="companyName"
                    name="companyName"
                    label="Company Name"
                    fullWidth
                    autoComplete="shipping address-line1"
                    value={inputField.companyName}
                    onChange={(event) => handleExperienceChange(index, event)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="startDate"
                        label="Start Date"
                        name="startDate"
                        value={selectedStartDate}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        onChange={(event) =>
                          handleDateChange(event, index, "startDate")
                        }
                      />
                      <KeyboardDatePicker
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="endDate"
                        label="End Date"
                        value={selectedEndDate}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        onChange={(event) =>
                          handleDateChange(event, index, "endDate")
                        }
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.root}
                    id="description"
                    name="description"
                    label="Job Description/Tasks"
                    multiline
                    rows={4}
                    fullWidth={true}
                    variant="outlined"
                    value={inputField.description}
                    onChange={(event) => handleExperienceChange(index, event)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="city"
                    label="City"
                    fullWidth
                    autoComplete="shipping address-level2"
                    name="city"
                    value={inputField.city}
                    onChange={(event) => handleExperienceChange(index, event)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    name="state"
                    label="State"
                    value={inputField.state}
                    onChange={(event) => handleExperienceChange(index, event)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => handleRemoveFields(index)}
                  >
                    Remove Experience
                  </Button>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button variant="outlined" onClick={() => handleAddFields()}>
                Add Experience
              </Button>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6">Education</Typography>
            </Grid>
            {educationFields.map((inputField, index) => (
              <React.Fragment key={`${inputField}~${index}`}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="schoolName"
                    name="schoolName"
                    label="University"
                    fullWidth
                    autoComplete="shipping address-line1"
                    value={inputField.schoolName}
                    onChange={(event) => handleEducationChange(index, event)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="startDate"
                        label="Started"
                        name="startDate"
                        value={selectedEducationStartDate}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        onChange={(event) =>
                          handleDateChange(event, index, "startEducationDate")
                        }
                      />
                      <KeyboardDatePicker
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="endDate"
                        label="Graduated"
                        value={selectedEducationEndDate}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        onChange={(event) =>
                          handleDateChange(event, index, "endEducationDate")
                        }
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="degree"
                    name="degree"
                    label="Degree"
                    fullWidth
                    autoComplete="shipping address-line1"
                    value={inputField.degree}
                    onChange={(event) => handleEducationChange(index, event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="major"
                    name="major"
                    label="Major"
                    fullWidth
                    autoComplete="shipping address-line1"
                    value={inputField.major}
                    onChange={(event) => handleEducationChange(index, event)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="city"
                    label="City"
                    fullWidth
                    autoComplete="shipping address-level2"
                    name="city"
                    value={inputField.city}
                    onChange={(event) => handleEducationChange(index, event)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    name="state"
                    label="State"
                    value={inputField.state}
                    onChange={(event) => handleEducationChange(index, event)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => handleRemoveEducation(index)}
                  >
                    Remove Education
                  </Button>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button variant="outlined" onClick={() => handleAddEducation()}>
                Add Education
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Skills</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <form>
                <TextField
                  id="skill"
                  label="Skill"
                  autoComplete="shipping address-level2"
                  name="skill"
                  value={skill}
                  onChange={handleSkillChange}
                />
                <Button onClick={handleAddSkill} variant="outlined">
                  Add Skill
                </Button>
              </form>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="p">Click on any skill to remove.</Typography>
              <Paper variant="outlined" className={classes.skillList}>
                <List
                  component="nav"
                  aria-label="main mailbox folders"
                  onRemove={handleRemoveSkill}
                >
                  {personalInfoFields.skills.map((skill, index) => (
                    <ListItem
                      button
                      key={index}
                      onClick={() => handleRemoveSkill(index)}
                    >
                      <ListItemText primary={skill} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                fullWidth={true}
                className={classes.margin}
                onClick={() => SubmitData()}
              >
                Create Resume
              </Button>
            </Grid>
          </Grid>
        </form>
        {/*
        <br />
        <pre>{JSON.stringify(experienceFields, null, 2)}</pre>*/}
      </Container>
    </React.Fragment>
  );
}
