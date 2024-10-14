import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import AddGarbageDetailsPage from "./AddGarbageDetailsPage";

// Mock axios post
jest.mock("axios");

describe("AddGarbageDetailsPage", () => {
  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    // Mock useCookies to return a sample userID
    jest.spyOn(require("react-cookie"), "useCookies").mockImplementation(() => [
      { userID: "USER1234" },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case 1: Successfully add garbage details
  test("should successfully add garbage details when form is filled correctly", async () => {
    // Mock the axios post response
    axios.post.mockResolvedValue({ data: { message: "Garbage Added" } });

    render(<AddGarbageDetailsPage />);

    // Select valid category, enter weight, and submit form
    fireEvent.change(screen.getByLabelText(/Garbage Category/i), {
      target: { value: "plastic" },
    });
    fireEvent.change(screen.getByLabelText(/Weight \(kg\)/i), {
      target: { value: "5" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Submit Details/i));

    // Expect axios to be called with the correct payload
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://localhost:8070/garbage/addGarbage", {
        category: "plastic",
        weight: "5",
        date: expect.any(String),
        payment: 500, // Payment calculation (5kg * 100 Rs)
        userID: "USER1234",
      });

      // Check if "Garbage Added" alert is shown
      expect(window.alert).toHaveBeenCalledWith("Garbage Added");
    });
  });

  // Test case 2: Should show an error message for missing inputs
  test("should show an error when the weight is not provided", async () => {
    render(<AddGarbageDetailsPage />);

    // Select category but leave weight blank
    fireEvent.change(screen.getByLabelText(/Garbage Category/i), {
      target: { value: "organic" },
    });

    // Submit form
    fireEvent.click(screen.getByText(/Submit Details/i));

    // Expect an error message
    await waitFor(() => {
      expect(screen.getByText(/Enter weight in kg/i)).toBeInTheDocument();
    });
  });

  // Test case 3: Verify payment calculation based on weight
  test("should calculate payment correctly when weight is entered", () => {
    render(<AddGarbageDetailsPage />);

    // Enter weight of 3 kg
    fireEvent.change(screen.getByLabelText(/Weight \(kg\)/i), {
      target: { value: "3" },
    });

    // Verify that payment is correctly calculated
    expect(screen.getByDisplayValue("300")).toBeInTheDocument(); // Payment should be 3kg * 100 Rs
  });
});
