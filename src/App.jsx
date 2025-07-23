import { ChakraProvider, Container, Heading } from "@chakra-ui/react";
import BookingForm from "./components/BookingForm";

function App() {
  return (
    <ChakraProvider>
      <Container maxW="container.md" py={10}>
        <Heading mb={6} textAlign="center">
          Little Lemon Table Booking
        </Heading>
        <BookingForm />
      </Container>
    </ChakraProvider>
  );
}

export default App;