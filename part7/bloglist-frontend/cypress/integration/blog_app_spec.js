/// <reference types="Cypress" />

describe("Blogs App", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "test",
      password: "test",
      username: "test"
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function() {
    cy.contains("h1", "Blogs");
  });

  it("create new blog button is not present since user not logged in", function() {
    cy.contains("button", "New Blog").should("not.exist");
  });

  describe("when logged in", function() {
    beforeEach(function() {
      cy.contains("Login").click();
      cy.get("[data-cy=username]").type("test");
      cy.get("[data-cy=password]").type("test");
      cy.get("[data-cy=login]").click();
    });

    it("name of user is shown", function() {
      cy.contains("test logged in");
    });

    it("users page contains test user", function() {
      cy.get("[data-cy=users-nav]").click();
      cy.contains("td", "test");
    });

    describe("create new blog", function() {
      beforeEach(function() {
        cy.get("[data-cy=blogs-nav]").click();
        cy.contains("button", "New Blog").click();
        cy.get("[data-cy=blog-title]").type("Test Blog");
        cy.get("[data-cy=blog-author]").type("Test Author");
        cy.get("[data-cy=blog-url]").type("test.com");
        cy.get("[data-cy=create-blog-btn]").click();
        cy.get("[data-cy=sort-btn]").click();
        cy.get("[data-cy=sort-btn]").click();
      });

      it("test blog is added to list of blogs", function() {
        cy.get("[data-cy=blogs-nav]").click();
        cy.contains("Test Blog by Test Author");
      });

      it("like comment and then delete the newly added test blog", function() {
        cy.get("[data-cy=blogs-nav]").click();
        cy.contains("Test Blog by Test Author").click({ force: true });
        cy.get("[data-cy=like-btn]").click();
        cy.get("[data-cy=like-count]").contains("1");
        cy.get("[data-cy=comment-box]").type("Test Comment");
        cy.get("[data-cy=comment-btn]").click();
        cy.get("[data-cy=delete-btn]").click();
      });
    });

    it("logging out changes the button back to login", function() {
      cy.get("[data-cy=logout-nav]").click();
      cy.contains("Login");
    });
  });

  describe("user details", function() {
    beforeEach(function() {
      cy.get("[data-cy=users-nav]").click();
    });

    it("test user is listed", function() {
      cy.contains("td", "test");
    });

    it("test users details are shown", function() {
      cy.contains("test").click();
      cy.contains("h4", "Added Blogs");
    });
  });

  describe("invalid user is not logged in", function() {
    it("wrong password does not log in the user", function() {
      cy.contains("Login").click();
      cy.get("[data-cy=username]").type("test");
      cy.get("[data-cy=password]").type("wrong");
      cy.get("[data-cy=login]").click();
      cy.contains("Login");
      cy.contains("test logged in").should("not.exist");
    });
  });

  describe("sign up user", function() {
    it("user can sign up with a valid username and password", function() {
      cy.contains("Login").click();
      cy.get("[data-cy=new-user-checkbox]").click();
      cy.get("[data-cy=name]").type("New User");
      cy.get("[data-cy=username]").type("newuser");
      cy.get("[data-cy=password]").type("newpassword");
      cy.get("[data-cy=login]").click();
      cy.contains("New User logged in");
    });
  });
});
