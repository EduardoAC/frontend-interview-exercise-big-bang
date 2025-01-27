import { screen } from "@testing-library/react";
import { describe, it, beforeEach, expect } from "vitest";
import { Scoreboard } from "./Scoreboard";
import { renderWithScore } from "../../utils/renderWithScore";

describe("Scoreboard Component", () => {
  beforeEach(() => {
    sessionStorage.clear(); // Clear sessionStorage before each test
  });

  it("displays initial scores as 0", () => {
    const scoreboard = { teo: 0, juan: 0 };
    sessionStorage.setItem("scoreboard", JSON.stringify(scoreboard));
    renderWithScore(<Scoreboard />);
    expect(screen.getByTestId("score-teo").textContent).toBe("teo0");
    expect(screen.getByTestId("score-juan").textContent).toBe("juan0");
  });

  it("displays scores from sessionStorage", () => {
    const scoreboard = { teo: 5, juan: 3 };
    sessionStorage.setItem("scoreboard", JSON.stringify(scoreboard));

    renderWithScore(<Scoreboard />);
    expect(screen.getByTestId("score-teo").textContent).toBe("teo5");
    expect(screen.getByTestId("score-juan").textContent).toBe("juan3");
  });
});
