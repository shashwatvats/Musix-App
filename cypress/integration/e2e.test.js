Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:9000/auth/login",
    body: {
      email: "Ritik@gmail.com",
      password: "Ritik@123",
    },
  }).then((data) => {
    window.localStorage.setItem("token", data.body.access_token);
    window.localStorage.setItem("firstName", data.body.userData.firstname);
    window.localStorage.setItem("email", data.body.userData.email);
  });
});

describe("Muzix Test cases", () => {
  it("should have login signup Button on home Page", () => {
    cy.visit("/");
    cy.contains("LogIn/SignUp");
  });
  it("should have various Sections on home Page", () => {
    cy.contains("Genres");
    cy.contains("Artists");
    cy.contains("Albums");
    cy.contains("Trending Pop");
  });
  it("should not have Favourite Section on home Page", () => {
    cy.contains("Favourite").should("not.exist");
  });
  it("should Play/Pause Song", () => {
    cy.get(".cypresstestplay").first().click();
    cy.wait(6000);
    cy.get(".cypresstestpause").first().click();
  });
  it("should be redirected to artist page", () => {
    cy.get(".artistCypress").first().click();
    cy.url().should("include", "/artists");
    cy.wait(3000);
  });
  it("should be redirected to album page", () => {
    cy.visit("/");
    cy.wait(3000);
    cy.get(".albumCypress").first().click();
    cy.url().should("include", "/albums");
    cy.wait(3000);
  });
  it("should be redirected to genre page", () => {
    cy.visit("/");
    cy.wait(3000);
    cy.get(".genreCypress").first().click();
    cy.url().should("include", "/genres");
    cy.wait(3000);
  });

  it("should be redirected to search page", () => {
    cy.visit("/");
    cy.contains("Search").click();
    cy.url().should("include", "/search");
  });
  it("should display error message on empty field", () => {
    cy.get(".searchCypress").click();
    cy.get(".MuiAlert-message").should(
      "have.text",
      "Select parameter and fill query"
    );
  });
  it("should display Result on correct input", () => {
    cy.get(".MuiFormControl-root").click();
    cy.get(".MuiList-root li:first").click();
    cy.get(".MuiList-root li:nth-child(2)").click();
    cy.get(".MuiPopover-root").click();
    cy.get("#queryCypress").type("Weezer");
    cy.get(".searchCypress").click();
  });

  it("should display Selected Output", () => {
    cy.contains("Artists");
    cy.contains("Albums");
  });
  it("should check for Wrong Login Credentials", () => {
    cy.visit("/");
    cy.contains("LogIn/SignUp").click();
    cy.get("#email").type("wrongEmail");
    cy.get("#password").type("wrongPassword");
    cy.get("#login-button").click();
    cy.get(".MuiAlert-message").should(
      "have.text",
      "Incorrect email or password"
    );
  });
  it("should show Red Text on Wrong Email", () => {
    cy.get("#signupButton").click();
    cy.get("#firstName").type("Sachin");
    cy.get("#lastName").type("Shukla");
    cy.get("#age").type("40");
    cy.get("#city").type("Bhopal");
    cy.get("#email").type("WrongEmail");
    cy.contains("Email should be Valid").should(
      "have.css",
      "color",
      "rgb(255, 0, 0)"
    );
  });
  it("should show Green Text on Correct Email", () => {
    cy.get("#email").clear().type("fsghjs@as.xccom");
    cy.contains("Email should be Valid").should(
      "have.css",
      "color",
      "rgb(0, 128, 0)"
    );
  });
  it("should show Red Text on Small Password", () => {
    cy.get("#password").type("12334");
    cy.contains("Password should have minimum length 8").should(
      "have.css",
      "color",
      "rgb(255, 0, 0)"
    );
  });
  it("should show Green Text on Correct Password", () => {
    cy.get("#password").clear().type("12334444");
    cy.contains("Password should have minimum length 8").should(
      "have.css",
      "color",
      "rgb(0, 128, 0)"
    );
  });
  it("should show Green Text on 1 Uppercase,1 Lowercase and 1 special character Password", () => {
    cy.get("#password").type("@Aa");
    cy.contains(
      "Password should have 1 special character, 1 lowercase and 1 uppercase"
    ).should("have.css", "color", "rgb(0, 128, 0)");
  });
  it("Should Error on Not Having FirstName", () => {
    cy.get("#firstName").clear();
    cy.get("button").contains("Register").click();
    cy.get(".MuiAlert-message").should(
      "have.text",
      "Desired Password, Email and firstName required!!"
    );
  });
  it("Everything validation is Fulfilled", () => {
    cy.get("#firstName").type("Sachin");
    cy.get("button").contains("Register").click();
    cy.get(".MuiAlert-message").should(
      "have.text",
      "User registered successfully"
    );
  });
  it("should check for Correct Login Credentials", () => {
    cy.get("#email").type("Ritik@gmail.com");
    cy.get("#password").type("Ritik@123");
    cy.get("#login-button").click();
    cy.get(".MuiAlert-message").should("have.text", "LoggedIn Successfully!!");
  });

  it("should  have Favourite Section on Dashboard Page", () => {
    cy.contains("Favourite");
  });
  it("should  be able to add songs to favourite on Dashboard Page", () => {
    cy.login();
    cy.get(".favbuttonadd").first().click();
    cy.wait(3000);
    cy.get(".favbuttondelete").first().click();
    cy.wait(1000);
    cy.get(".favbuttonadd").first().click();
    cy.wait(1000);
    cy.get(".deleteFav").last().click();
  });
});
