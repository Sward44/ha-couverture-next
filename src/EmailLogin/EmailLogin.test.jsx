import { render, screen, fireEvent } from "@testing-library/react";
import EmailLogin from "./EmailLogin";

describe("EmailLogin", () => {
  test("should call signIn function with correct parameters", () => {
    const signInMock = jest.fn();
    const { container } = render(<EmailLogin signIn={signInMock} />);
    const emailInput = screen.getByLabelText("Email");
    const form = container.querySelector("form");

    fireEvent.change(emailInput, {
      target: { value: "davidlaunay567@gmail.com" },
    });
    fireEvent.submit(form);

    expect(signInMock).toHaveBeenCalledWith("email", {
      id: "davidlaunay567@gmail.com",
      email: "davidlaunay567@gmail.com",
      name: undefined,
      firstName: null,
      lastName: null,
      image: null,
      role: "admin",
    });
  });

  test("should call signIn function with default role for regular user", () => {
    const signInMock = jest.fn();
    const { container } = render(<EmailLogin signIn={signInMock} />);
    const emailInput = screen.getByLabelText("Email");
    const form = container.querySelector("form");

    fireEvent.change(emailInput, {
      target: { value: "regularuser@example.com" },
    });
    fireEvent.submit(form);

    expect(signInMock).toHaveBeenCalledWith("email", {
      id: "regularuser@example.com",
      email: "regularuser@example.com",
      name: undefined,
      firstName: null,
      lastName: null,
      image: null,
      role: "user",
    });
  });
});
