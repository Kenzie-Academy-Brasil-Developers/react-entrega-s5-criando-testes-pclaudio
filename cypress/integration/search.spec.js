context("Search by CEP", () => {
  it("Enters the main page and tries to search address by CEP", () => {
    cy.visit("http://localhost:3000");
    cy.viewport(1440, 900);

    cy.get("input[placeholder='Insira o CEP']").type("01311000");
    cy.get("button.button").click();

    cy.get("form > div:nth-child(1) > div > input").should(
      "have.value",
      "Avenida Paulista"
    );
    cy.get("form > div:nth-child(3) > div > input").should(
      "have.value",
      "Bela Vista"
    );
    cy.get("form > div:nth-child(4) > div > input").should(
      "have.value",
      "São Paulo"
    );
    cy.get("form > div:nth-child(5) > div > input").should("have.value", "SP");
  });
});
