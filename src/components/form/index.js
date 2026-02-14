import React, { useState } from "react";
import {
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormGroup,
  Slider,
  Button,
  Box,
  Typography,
} from "@mui/material";

const FormDemo = () => {
  const [text, setText] = useState("");
  const [radio, setRadio] = useState("");
  const [dropdown, setDropdown] = useState("");
  const [date, setDate] = useState("");
  const [checkbox, setCheckbox] = useState({
    option1: false,
    option2: false,
  });
  const [slider, setSlider] = useState(30);
  const [errors, setErrors] = useState({
    text: false,
    radio: false,
    dropdown: false,
    date: false,
  });

  const validateForm = () => {
    const newErrors = {
      text: !text.trim(),
      radio: !radio,
      dropdown: !dropdown,
      date: !date,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const formData = {
      text,
      radio,
      dropdown,
      date,
      checkbox,
      slider,
    };

    console.log("Form Data:", formData);
  };

  const handleReset = () => {
    setText("");
    setRadio("");
    setDropdown("");
    setDate("");
    setCheckbox({
      option1: false,
      option2: false,
    });
    setSlider(30);
    setErrors({
      text: false,
      radio: false,
      dropdown: false,
      date: false,
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}
      >
        <Typography variant="h5" gutterBottom>
          Form Demo
        </Typography>

        {/* Text Input */}
        <TextField
          fullWidth
          label="Text Input"
          margin="normal"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (errors.text) {
              setErrors({...errors, text: false});
            }
          }}
          required
          error={errors.text}
          helperText={errors.text ? "This field is required" : ""}
          sx={{
            '& .MuiOutlinedInput-root.Mui-error fieldset': {
              borderColor: 'red !important',
              borderWidth: 2,
            },
          }}
        />

        {/* Radio Input */}
        <FormControl 
          margin="normal" 
          required 
          error={errors.radio}
        >
          <FormLabel sx={{ color: errors.radio ? 'red' : 'inherit' }}>Radio Input</FormLabel>
          <RadioGroup
            value={radio}
            onChange={(e) => {
              setRadio(e.target.value);
              if (errors.radio) {
                setErrors({...errors, radio: false});
              }
            }}
          >
            <FormControlLabel
              value="option1"
              control={<Radio />}
              label="Radio Option 1"
            />
            <FormControlLabel
              value="option2"
              control={<Radio />}
              label="Radio Option 2"
            />
          </RadioGroup>
          {errors.radio && (
            <Typography variant="caption" color="error">
              This field is required
            </Typography>
          )}
        </FormControl>

        {/* Dropdown Input */}
        <FormControl 
          fullWidth 
          margin="normal" 
          required 
          error={errors.dropdown}
          sx={{
            '& .MuiOutlinedInput-root.Mui-error fieldset': {
              borderColor: 'red !important',
              borderWidth: 2,
            },
          }}
        >
          <InputLabel sx={{ color: errors.dropdown ? 'red' : 'inherit' }}>Dropdown Input</InputLabel>
          <Select
            value={dropdown}
            label="Dropdown Input"
            onChange={(e) => {
              setDropdown(e.target.value);
              if (errors.dropdown) {
                setErrors({...errors, dropdown: false});
              }
            }}
          >
            <MenuItem value="item1">Item 1</MenuItem>
            <MenuItem value="item2">Item 2</MenuItem>
            <MenuItem value="item3">Item 3</MenuItem>
          </Select>
          {errors.dropdown && (
            <Typography variant="caption" color="error">
              This field is required
            </Typography>
          )}
        </FormControl>

        {/* Date Input */}
        <TextField
          fullWidth
          margin="normal"
          type="date"
          label="Date Input"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            if (errors.date) {
              setErrors({...errors, date: false});
            }
          }}
          required
          error={errors.date}
          helperText={errors.date ? "This field is required" : ""}
          sx={{
            '& .MuiOutlinedInput-root.Mui-error fieldset': {
              borderColor: 'red !important',
              borderWidth: 2,
            },
          }}
        />

        {/* Checkbox Input */}
        <FormControl margin="normal">
          <FormLabel>Checkbox Input</FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkbox.option1}
                  onChange={(e) =>
                    setCheckbox({
                      ...checkbox,
                      option1: e.target.checked,
                    })
                  }
                />
              }
              label="Checkbox Option 1"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkbox.option2}
                  onChange={(e) =>
                    setCheckbox({
                      ...checkbox,
                      option2: e.target.checked,
                    })
                  }
                />
              }
              label="Checkbox Option 2"
            />
          </FormGroup>
        </FormControl>

        {/* Slider Input */}
        <Box mt={3}>
          <FormLabel>Slider Input</FormLabel>
          <Slider
            value={slider}
            onChange={(e, newValue) => setSlider(newValue)}
            min={0}
            max={100}
          />
        </Box>

        {/* Buttons */}
        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
          >
            SUBMIT
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={handleReset}
          >
            RESET
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormDemo;
