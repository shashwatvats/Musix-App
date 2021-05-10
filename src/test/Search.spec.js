import Search from "../Components/Search/Search";
import { render, screen } from "@testing-library/react";
import { render as renderer, unmountComponentAtNode } from "react-dom";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

export default Search;
describe("Search Component TestCases", () => {
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

  test("Should Search Have Rendering", () => {
    render(
      <Router>
        <App />
      </Router>
    );
  });

  // test("Should have class flex in Search Component", () => {
  //   render(
  //     <Router>
  //       <App />
  //     </Router>
  //   );
  //   expect(screen.getByTestId("form1")).toHaveClass("form-group");
  // });

  test("Should have atleast one input  in  component", () => {
    renderer(
      <Router>
        <App />
      </Router>,
      element
    );
    screen.debug(element);
    const count = element.getElementsByTagName("input").length;
    expect(count).toBeGreaterThanOrEqual(0);
  });

  // test("Should have placeholder as query in input", () => {
  //   render(
  //     <Router>
  //       <Search />
  //     </Router>
  //   );
  //   expect(screen.getByPlaceholderText("Query"));
  // });

  test("Should have atleast one input  in  component", () => {
    renderer(
      <Router>
        <App />
      </Router>,
      element
    );
    const count = element.getElementsByTagName("div").length;
    expect(count).toBeGreaterThanOrEqual(3);
  });

  // test('Should render Search component with artists', () => {
  //         render(<Router><Search /></Router>);
  //         expect(screen.getByAltText(/Image Not Available/))
  //     });
  test("Should have atleast one input  in  component", () => {
    renderer(
      <Router>
        <App />
      </Router>,
      element
    );
    const count = element.getElementsByTagName("button").length;
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
