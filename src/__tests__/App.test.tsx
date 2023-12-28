import { render, act, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

jest.mock("@mui/material-next/Button", () => () => {
  return (
    <div>
      <button></button>
    </div>
  );
});

jest.mock("react-markdown", () => ({ children }: { children: any }) => {
  return <div>{children}</div>;
});

describe("dummy test", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });
});

describe("Main page tests", () => {
  it("renders and matches the snapshot", () => {
    const { container } = render(<App />);

    expect(container).toMatchSnapshot("main-page");
  });

  it("should preill the query input when clicked on the prompt tiles", async () => {
    const { getByText, getByDisplayValue } = render(<App />);

    const dummyTileOption = getByText("Create a script");
    expect(dummyTileOption).toBeTruthy();

    act(() => {
      fireEvent.click(dummyTileOption!);
    });

    await waitFor(() => {
      expect(getByDisplayValue("Write me a script for")).toBeTruthy();
    });
  });

  it("should display the mock response when query is typed and submitted", () => {
    const { container, getByPlaceholderText } = render(<App />);

    const queryInput = getByPlaceholderText("Enter a prompt here");
    expect(queryInput).toBeTruthy();

    act(() => {
      fireEvent.change(queryInput, {
        target: { value: "dummytypeduserquery" },
      });
    });

    act(() => {
      fireEvent.click(container.getElementsByClassName("send-icon")[0]);
    });

    expect(container).toMatchSnapshot("mock response on query submit");
  });

  it("should display the recent queries tags after submit", () => {
    const { container, getByText } = render(<App />);

    const dummyTileOption = getByText("Create a script");

    act(() => {
      fireEvent.click(dummyTileOption!);
    });

    act(() => {
      fireEvent.click(container.getElementsByClassName("send-icon")[0]);
    });

    // Click on the menu
    act(() => {
      fireEvent.click(
        container.getElementsByClassName("headerMenu cursor-pointer")[0]
      );
    });

    expect(getByText("Recent")).toBeDefined();
    expect(getByText("Script writing")).toBeDefined();
  });

  it("should handle no response case", () => {
    const { container, getByText, getByDisplayValue } = render(<App />);

    const dummyTileOption = getByText("No Response");

    act(() => {
      fireEvent.click(dummyTileOption!);
    });

    act(() => {
      fireEvent.click(container.getElementsByClassName("send-icon")[0]);
    });

    expect(container).toMatchSnapshot("no response snapshot");

    act(() => {
      fireEvent.click(
        container.getElementsByClassName("activeQueryQuestionEdit")[0]
      );
    });

    expect(
      getByDisplayValue("This query will give you no response")
    ).toBeTruthy();
  });
});
