import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { UsernameForm } from "./UsernameForm";

describe("UsernameForm Component", () => {
  it("renders input and submit button", () => {
    render(<UsernameForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText("Enter your name:")).toBeInTheDocument();
    expect(screen.getByText("Add player")).toBeInTheDocument();
  });

  it("can type a username into the input field", () => {
    render(<UsernameForm onSubmit={vi.fn()} />);
    const input = screen.getByLabelText("Enter your name:");
    fireEvent.change(input, { target: { value: "JohnDoe" } });
    expect(input).toHaveValue("JohnDoe");
  });

  it("calls onSubmit with valid input when form is submitted", () => {
    const onSubmit = vi.fn();
    render(<UsernameForm onSubmit={onSubmit} />);

    const input = screen.getByLabelText("Enter your name:");
    fireEvent.change(input, { target: { value: "JohnDoe" } });

    const button = screen.getByText("Add player");
    fireEvent.click(button);

    expect(onSubmit).toHaveBeenCalledWith("JohnDoe");
  });

  it("display required field when submitting empty", () => {
    const onSubmit = vi.fn();
    render(<UsernameForm onSubmit={onSubmit} />);

    const input = screen.getByLabelText("Enter your name:");
    fireEvent.change(input, { target: { value: "" } });

    const button = screen.getByText("Add player");
    fireEvent.click(button);

    expect(screen.getByText("Player name is required.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("resets input value after adding a player", () => {
    const onSubmit = vi.fn();
    render(<UsernameForm onSubmit={onSubmit} />);

    const input = screen.getByLabelText("Enter your name:");
    fireEvent.change(input, { target: { value: "Player" } });

    const button = screen.getByText("Add player");
    fireEvent.click(button);

    // Ensure onSubmit is called with the correct value
    expect(onSubmit).toHaveBeenCalledWith("Player");
    expect(onSubmit).toHaveBeenCalledTimes(1);

    // Check that the input field has been reset
    expect((input as HTMLInputElement).value).toBe("");
  });
});
