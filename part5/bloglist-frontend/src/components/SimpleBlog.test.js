import { fireEvent, render } from "@testing-library/react";
import React from "react";
import SimpleBlog from "./SimpleBlog";

describe("<Simple Blog />", () => {
  test("renders simple blog content", () => {
    const blog = {
      title: "Test Blog",
      author: "Test Author",
      likes: 10
    };

    const component = render(<SimpleBlog blog={blog} />);

    expect(component.container).toHaveTextContent("Test Blog");
    expect(component.container).toHaveTextContent("Test Author");

    const likesDiv = component.container.querySelector(".simple-blog-likes");
    expect(likesDiv).toHaveTextContent("blog has 10 likes");
  });

  test("clicking test button twice calls event handler twice", () => {
    const blog = {
      title: "Test Blog",
      author: "Test Author",
      likes: 10
    };

    const mockHandler = jest.fn();

    const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />);
    const likeBtn = component.container.querySelector(".like-btn");
    fireEvent.click(likeBtn);
    fireEvent.click(likeBtn);

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
