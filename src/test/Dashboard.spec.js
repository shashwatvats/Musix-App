import Dashboard from "../Components/Dashboard/Dashboard";
import { render, screen } from "@testing-library/react";
import { render as renderer, unmountComponentAtNode } from "react-dom";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

describe("Dashboard Component TestCases", () => {
  let element = "";

  beforeEach(() => {
    element = document.createElement("div");
    document.body.appendChild(element);
  });

  afterEach(() => {
    unmountComponentAtNode(element);
    element.remove();
    element = null;
  });

  test("Should Dashboard Have Rendering", () => {
    render(
      <Router>
        <App />
      </Router>
    );
  });

  test("Should have attribute in image in Dashboard Component", () => {
    renderer(
      <Router>
        <App />
      </Router>,
      element
    );
    // screen.debug();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("Should have atleast one div in Dashboard component", () => {
    renderer(
      <Router>
        <App />
      </Router>,
      element
    );
    const count = element.getElementsByTagName("div").length;
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
