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

const fileToBase64 = async (file) => {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.onabort = reject;
    reader.readAsDataURL(file);
  });
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

  const [image, setImage] = useState(undefined);

  const days = [...daysOfTheWeek, "The best day ever"];

  const boxWidth = 8;
  const dayBoxes = days.map((day, index) => {
    return (
      <>
        <Grid size={Math.min(boxWidth, 12 - index)} offset={index}>
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
      <Container maxWidth="md" sx={{ my: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{
            py: 1,
            backgroundSize: "cover",
            backgroundImage: `url('${image}')`,
          }}
        >
          {dayBoxes}
        </Grid>
        <Stack direction="column">
          <TextField
            sx={{ my: 2 }}
            label="Background image"
            type="file"
            onChange={async (event) => {
              setImage(await fileToBase64(event.target.files[0]));
            }}
          />
          {dayInputs}
        </Stack>
      </Container>
    </>
  );
};

export default App;
