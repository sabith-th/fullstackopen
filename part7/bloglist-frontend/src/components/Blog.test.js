import { fireEvent, render } from "@testing-library/react";
import React from "react";
import Blog from "./Blog";

describe("<Blog />", () => {
  test("renders blog content", () => {
    const blog = {
      title: "Blog Test",
      author: "Blog Author",
      likes: 100,
      url: "https://example.com"
    };

    const mockHandler = jest.fn();

    const component = render(
      <Blog
        blog={blog}
        updateBlogLikes={mockHandler}
        user={{}}
        deleteBlog={mockHandler}
      />
    );
    expect(component.container).toHaveTextContent(
      `${blog.title} ${blog.author}`
    );
  });

  test("blog details are toggled by clicking blog post", () => {
    const blog = {
      title: "Blog Test",
      author: "Blog Author",
      likes: 100,
      url: "https://example.com",
      user: {
        username: "user"
      }
    };

    const user = {
      username: "user"
    };

    const mockHandler = jest.fn();

    const component = render(
      <Blog
        blog={blog}
        updateBlogLikes={mockHandler}
        user={user}
        deleteBlog={mockHandler}
      />
    );

    const blogTitle = component.container.querySelector(".blog-title");
    expect(blogTitle).toHaveTextContent(`${blog.title} ${blog.author}`);

    let blogDetailsDiv = component.container.querySelector(".blog-details");
    expect(blogDetailsDiv).toBeNull();
    fireEvent.click(blogTitle);

    blogDetailsDiv = component.container.querySelector(".blog-details");
    expect(blogDetailsDiv).toBeDefined();
    expect(blogDetailsDiv).toHaveTextContent(`Likes: ${blog.likes}`);
  });
});
