import { render, waitForElement } from "@testing-library/react";
import React from "react";
import App from "./App";
jest.mock("./services/blogs");

describe("<App />", () => {
  test("if no user logged in, blogs are not rendered", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() =>
      component.container.querySelector(".login-section")
    );

    const login = component.container.querySelector(".login-section");
    expect(login).toHaveTextContent("Log in to application");

    const blogs = component.container.querySelector(".blogs-section");
    expect(blogs).toBeNull();
  });

  test("if user is logged in, blogs are rendered", async () => {
    const user = {
      username: "tester",
      token: "1231231214",
      name: "Donald Tester"
    };

    localStorage.setItem("loggedinUser", JSON.stringify(user));

    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() =>
      component.container.querySelector(".blogs-section")
    );

    const login = component.container.querySelector(".login-section");
    expect(login).toBeNull();

    const blogs = component.container.querySelectorAll(".blog-item");
    expect(blogs.length).toBe(3);
  });
});
