import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Routing", () => {
  it("displays homepage at /", () => {
    render(<App />);
    const homePage = screen.getByTestId("home-page");
    expect(homePage).toBeInTheDocument();
  });
});
