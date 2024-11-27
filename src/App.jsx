import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import "./App.css";

import { useState } from "react";
import { Schedule } from "@mui/icons-material";

const ScheduleBox = ({ children }) => (
  <Paper variant="elevation" sx={{ padding: 1, mx: 1 }}>
    {children}
  </Paper>
);

const applyScheduleForDay = (inputState, day, value) => {
  return { ...inputState, [day]: value };
};

const ScheduleInputBox = ({ setter, schedule, day }) => {
  return (
    <TextField
      value={schedule[day]}
      label={day}
      sx={{ my: 2 }}
      onChange={(event) =>
        setter(applyScheduleForDay(schedule, day, event.target.value))
      }
    />
  );
};

const App = () => {
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [schedule, setSchedule] = useState(
    daysOfTheWeek.reduce((acc, item) => ({ ...acc, [item]: "" }), {}),
  );

  const days = [...daysOfTheWeek, "The best day ever"];

  const boxWidth = 8;
  const dayBoxes = days.map((day, index) => {
    return (
      <>
        <Grid size={Math.min(boxWidth, 12-index)} offset={index}>
          <ScheduleBox key={day}>
            {day} {schedule[day]}
          </ScheduleBox>
        </Grid>
        <Grid size={12 - boxWidth - index}></Grid>
      </>
    );
  });

  const dayInputs = days.map((day) => {
    return (
      <ScheduleInputBox
        key={day}
        setter={setSchedule}
        schedule={schedule}
        day={day}
      />
    );
  });

  return (
    <>
      <Container maxWidth="md" sx={{my: 1}}>
        <Grid container spacing={2}>
          {dayBoxes}
        </Grid>
        <Stack direction="column">{dayInputs}</Stack>
      </Container>
    </>
  );
};

export default App;
