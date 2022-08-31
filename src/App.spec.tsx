import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

describe("Routing", () => {
  const setup = () => {
    render(
      <Router>
        <App />
      </Router>
    );
  };

  it("displays homepage at /", () => {
    setup();
    const homePage = screen.getByTestId("home-page");
    expect(homePage).toBeInTheDocument();
  });
  it("does not display sign up page when at /", () => {
    setup();
    const page = screen.queryByTestId("signup-page");
    expect(page).not.toBeInTheDocument();
  });
  it("displays signup page at /signup", () => {
    window.history.pushState({}, "", "/signup");
    setup();
    const page = screen.queryByTestId("signup-page");
    expect(page).toBeInTheDocument();
  });
  it("does not display sign up page when at /signup", () => {
    window.history.pushState({}, "", "/signup");
    setup();
    const page = screen.queryByTestId("home-page");
    expect(page).not.toBeInTheDocument();
  });
  it("displays login page at /login", () => {
    window.history.pushState({}, "", "/login");
    setup();
    const page = screen.queryByTestId("login-page");
    expect(page).toBeInTheDocument();
  });
  it("displays user page at /user", () => {
    window.history.pushState({}, "", "/user");
    setup();
    const page = screen.queryByTestId("user-page");
    expect(page).toBeInTheDocument();
  });

  it.each`
    targetPage
    ${"Home"}
    ${"Sign Up"}
    ${"Login"}
  `("has link to $targetPage on Navbar", ({ targetPage }) => {
    setup();
    const link = screen.getByRole("link", { name: targetPage });
    expect(link).toBeInTheDocument();
  });

  it.each`
    initialPath  | clickingTo   | visiblePage
    ${"/"}       | ${"Sign Up"} | ${"signup-page"}
    ${"/signup"} | ${"Home"}    | ${"home-page"}
    ${"/signup"} | ${"Login"}   | ${"login-page"}
  `(
    "displays $visiblePage after clicking $clickingTo link",
    ({ initialPath, clickingTo, visiblePage }) => {
      setup();
      const link = screen.getByRole("link", { name: clickingTo });
      userEvent.click(link);
      expect(screen.getByTestId(visiblePage)).toBeInTheDocument();
    }
  );

  it("displays home page when clicking brand logo", () => {
    setup();
    const logo = screen.queryByAltText("Hoaxify") as HTMLElement;
    userEvent.click(logo);
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });
});
