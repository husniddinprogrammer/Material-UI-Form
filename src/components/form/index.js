import React from "react";
import { useForm, Controller } from "react-hook-form";
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
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      text: "",
      radio: "",
      dropdown: "",
      date: "",
      checkbox: {
        option1: false,
        option2: false,
      },
      slider: 30,
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}
      >
        <Typography variant="h5" gutterBottom>
          Form Demo
        </Typography>

        {/* Text Input */}
        <Controller
          name="text"
          control={control}
          rules={{ 
            required: "This field is required",
            minLength: {
              value: 3,
              message: "Minimum 3 characters required"
            },
            maxLength: {
              value: 50,
              message: "Maximum 50 characters allowed"
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Text Input (3-50 chars)"
              margin="normal"
              required
              error={!!errors.text}
              helperText={errors.text?.message || "Enter 3-50 characters"}
              sx={{
                '& .MuiOutlinedInput-root.Mui-error fieldset': {
                  borderColor: 'red !important',
                  borderWidth: 2,
                },
              }}
            />
          )}
        />

        {/* Radio Input */}
        <Controller
          name="radio"
          control={control}
          rules={{ required: "Please select an option" }}
          render={({ field }) => (
            <FormControl margin="normal" required error={!!errors.radio}>
              <FormLabel sx={{ color: errors.radio ? 'red' : 'inherit' }}>Radio Input (Required)</FormLabel>
              <RadioGroup {...field}>
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
                  {errors.radio.message}
                </Typography>
              )}
            </FormControl>
          )}
        />

        {/* Dropdown Input */}
        <Controller
          name="dropdown"
          control={control}
          rules={{ required: "Please select an option" }}
          render={({ field }) => (
            <FormControl 
              fullWidth 
              margin="normal" 
              required 
              error={!!errors.dropdown}
              sx={{
                '& .MuiOutlinedInput-root.Mui-error fieldset': {
                  borderColor: 'red !important',
                  borderWidth: 2,
                },
              }}
            >
              <InputLabel sx={{ color: errors.dropdown ? 'red' : 'inherit' }}>Dropdown Input (Required)</InputLabel>
              <Select
                {...field}
                label="Dropdown Input (Required)"
              >
                <MenuItem value="item1">Item 1</MenuItem>
                <MenuItem value="item2">Item 2</MenuItem>
                <MenuItem value="item3">Item 3</MenuItem>
              </Select>
              {errors.dropdown && (
                <Typography variant="caption" color="error">
                  {errors.dropdown.message}
                </Typography>
              )}
            </FormControl>
          )}
        />

        {/* Date Input */}
        <Controller
          name="date"
          control={control}
          rules={{ 
            required: "Please select a date",
            validate: {
              notFuture: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selectedDate <= today || "Date cannot be in the future";
              },
              notTooPast: (value) => {
                const selectedDate = new Date(value);
                const minDate = new Date();
                minDate.setFullYear(minDate.getFullYear() - 100);
                return selectedDate >= minDate || "Date cannot be more than 100 years ago";
              }
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              margin="normal"
              type="date"
              label="Date Input (Required)"
              InputLabelProps={{ shrink: true }}
              required
              error={!!errors.date}
              helperText={errors.date?.message || "Select a valid date (not future)"}
              sx={{
                '& .MuiOutlinedInput-root.Mui-error fieldset': {
                  borderColor: 'red !important',
                  borderWidth: 2,
                },
              }}
            />
          )}
        />

        {/* Checkbox Input */}
        <Controller
          name="checkbox.option1"
          control={control}
          render={({ field }) => (
            <FormControl margin="normal">
              <FormLabel>Checkbox Input</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Checkbox Option 1"
                />
                <Controller
                  name="checkbox.option2"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label="Checkbox Option 2"
                    />
                  )}
                />
              </FormGroup>
            </FormControl>
          )}
        />

        {/* Slider Input */}
        <Controller
          name="slider"
          control={control}
          rules={{ 
            min: {
              value: 10,
              message: "Minimum value is 10"
            },
            max: {
              value: 90,
              message: "Maximum value is 90"
            }
          }}
          render={({ field }) => (
            <Box mt={3}>
              <Slider
                {...field}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                
              />
              {errors.slider && (
                <Typography variant="caption" color="error">
                  {errors.slider.message}
                </Typography>
              )}
            </Box>
          )}
        />

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
            type="button"
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
