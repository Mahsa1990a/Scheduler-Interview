describe("Navigation", () => {

  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");

    //In jQuery, we would use $("li"), with Cypress we can use cy.get("li").
    //get the list item that contains the text "Tuesday" and clicks on it.
    // cy.get("li").contains("Tuesday").click();    UPDATE:
    // cy.get("li").contains("Tuesday").should("have.css", "background-color", "rgb(242, 242, 242)");

    // we are identifying that we want the list item element that contains "Tuesday".
    // cy.contains("li", "Tuesday")
    // cy.contains("[data-testid=day]", "Tuesday")
    // .click()
    // .should("have.class", "day-list__item--selected");

    // cy.contains("li", "Tuesday")
    // .click()
    // .should("have.css", "background-color", "rgb(242, 242, 242)");

    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected");
  });

});