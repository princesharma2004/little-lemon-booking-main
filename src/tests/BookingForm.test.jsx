import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "../components/BookingForm";
import { ChakraProvider } from "@chakra-ui/react";

const renderWithChakra = (ui) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

test("renders booking form", () => {
  renderWithChakra(<BookingForm />);
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
});

test("shows validation errors when submitting empty form", async () => {
  renderWithChakra(<BookingForm />);
  fireEvent.click(screen.getByRole("button", { name: /book table/i }));

  expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/date is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/time is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/number of guests is required/i)).toBeInTheDocument();
});