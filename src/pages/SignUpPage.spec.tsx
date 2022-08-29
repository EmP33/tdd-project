import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpPage from "./SignUpPage";
import "../locale/i18n";

describe("Sign Up Page", () => {
  describe("Layout", () => {
    it("has header", () => {
      render(<SignUpPage />);
      const header = screen.queryByRole("heading", { name: "Sign Up" });
      expect(header).toBeInTheDocument();
    });
    it("has username input", () => {
      render(<SignUpPage />);
      const input = screen.getByPlaceholderText("Username") as HTMLInputElement;
      expect(input).toBeInTheDocument();
    });
    it("has email input", () => {
      render(<SignUpPage />);
      const input = screen.getByPlaceholderText("Email") as HTMLInputElement;
      expect(input).toBeInTheDocument();
    });
    it("has password input", () => {
      render(<SignUpPage />);
      const input = screen.getByPlaceholderText("Password") as HTMLInputElement;
      expect(input).toBeInTheDocument();
    });
    it("has password type for password input", () => {
      render(<SignUpPage />);
      const input = screen.getByPlaceholderText("Password") as HTMLInputElement;
      expect(input.type).toBe("password");
    });
    it("has password repeat input", () => {
      render(<SignUpPage />);
      const input = screen.getByPlaceholderText(
        "Password Repeat"
      ) as HTMLInputElement;
      expect(input).toBeInTheDocument();
    });
    it("has password type for password repeat input", () => {
      render(<SignUpPage />);
      const input = screen.getByPlaceholderText(
        "Password Repeat"
      ) as HTMLInputElement;
      expect(input.type).toBe("password");
    });
    it("has Sign Up Button", () => {
      render(<SignUpPage />);
      const button = screen.getByRole("button", { name: "Sign Up" });
      expect(button).toBeInTheDocument();
    });
    it("disables the button initially", () => {
      render(<SignUpPage />);
      const button = screen.getByRole("button", { name: "Sign Up" });
      expect(button).toBeDisabled();
    });
  });

  describe("interactions", () => {
    let button: HTMLButtonElement;
    const setup = () => {
      render(<SignUpPage />);
      const usernameInput = screen.getByPlaceholderText("Username");
      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const passwordRepeatInput =
        screen.getByPlaceholderText("Password Repeat");
      userEvent.type(usernameInput, "user1");
      userEvent.type(emailInput, "user@gmail.com");
      userEvent.type(passwordInput, "12345678");
      userEvent.type(passwordRepeatInput, "12345678");
      button = screen.getByRole("button", { name: "Sign Up" });
    };
    it("enables the button when password and password repeat fields have same value", () => {
      setup();
      expect(button).toBeEnabled();
    });
    it("sends username, email and password to backend after clicking the button", async () => {
      setup();
      const mockFn = jest.fn();
      window.fetch = mockFn;
      userEvent.click(button);
      const firstCallOfMockFunction = mockFn.mock.calls[0];
      const body = JSON.parse(firstCallOfMockFunction[1].body);
      expect(body).toEqual({
        username: "user1",
        email: "user@gmail.com",
        password: "12345678",
      });
    });
    it("displays spinner while the api request in progress", async () => {
      setup();
      const mockFn = jest.fn();
      window.fetch = mockFn;
      userEvent.click(button);

      const spinner = screen.getByRole("status", { hidden: true });
      expect(spinner).toBeInTheDocument();

      const firstCallOfMockFunction = mockFn.mock.calls[0];
      const body = JSON.parse(firstCallOfMockFunction[1].body);
      expect(body).toEqual({
        username: "user1",
        email: "user@gmail.com",
        password: "12345678",
      });
    });
    it("does not display spinner when there is no api request", () => {
      setup();
      const spinner = screen.queryByRole("status", { hidden: true });
      expect(spinner).not.toBeInTheDocument();
    });
    it("displays account activation notification after successful sign up request", async () => {
      setup();

      const message = "Please check your email to activate your account";

      expect(screen.queryByText(message)).not.toBeInTheDocument();
      const mockFn = jest.fn();
      window.fetch = mockFn;
      userEvent.click(button);

      expect(await screen.findByText(message)).toBeInTheDocument();

      // const firstCallOfMockFunction = mockFn.mock.calls[0];
      // const body = JSON.parse(firstCallOfMockFunction[1].body);
      // expect(body).toEqual({
      //   username: "user1",
      //   email: "user@gmail.com",
      //   password: "12345678",
      // });
    });
  });
});
