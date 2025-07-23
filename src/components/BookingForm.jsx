import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const BookingSchema = Yup.object().shape({
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
  guests: Yup.number().min(1).max(10).required("Number of guests is required"),
  name: Yup.string().required("Name is required"),
});

const BookingForm = () => {
  const toast = useToast();

  const availableTimes = ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"];

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg">
      <Formik
        initialValues={{
          date: "",
          time: "",
          guests: "",
          name: "",
        }}
        validationSchema={BookingSchema}
        onSubmit={(values, actions) => {
          toast({
            title: "Booking Confirmed",
            description: `Table booked for ${values.name} on ${values.date} at ${values.time}`,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          actions.resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <VStack spacing={4}>
              <Field name="name">
                {({ field }) => (
                  <FormControl isInvalid={errors.name && touched.name}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input {...field} id="name" placeholder="Enter your name" />
                    {errors.name && <Text color="red.500">{errors.name}</Text>}
                  </FormControl>
                )}
              </Field>

              <Field name="date">
                {({ field }) => (
                  <FormControl isInvalid={errors.date && touched.date}>
                    <FormLabel htmlFor="date">Date</FormLabel>
                    <Input {...field} id="date" type="date" />
                    {errors.date && <Text color="red.500">{errors.date}</Text>}
                  </FormControl>
                )}
              </Field>

              <Field name="time">
                {({ field }) => (
                  <FormControl isInvalid={errors.time && touched.time}>
                    <FormLabel htmlFor="time">Time</FormLabel>
                    <Select {...field} id="time" placeholder="Select time">
                      {availableTimes.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </Select>
                    {errors.time && <Text color="red.500">{errors.time}</Text>}
                  </FormControl>
                )}
              </Field>

              <Field name="guests">
                {({ field }) => (
                  <FormControl isInvalid={errors.guests && touched.guests}>
                    <FormLabel htmlFor="guests">Number of Guests</FormLabel>
                    <Select {...field} id="guests" placeholder="Select guests">
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Select>
                    {errors.guests && (
                      <Text color="red.500">{errors.guests}</Text>
                    )}
                  </FormControl>
                )}
              </Field>

              <Button colorScheme="teal" type="submit" width="full">
                Book Table
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default BookingForm;