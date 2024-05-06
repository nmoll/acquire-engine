import { describe, it, beforeEach, expect } from "vitest";
import { AcquireGamePlayersElement } from "./acquire-game-players.element";
import { TestBed } from "../../test/test-bed";
import { PlayersHarness } from "../../test/harness/game-players.harness";

describe(AcquireGamePlayersElement.name, () => {
  let el: AcquireGamePlayersElement;
  let harness: PlayersHarness;

  beforeEach(() => {
    el = TestBed.configureTestingEnvironment({
      element: "acquire-game-players",
    });
    harness = new PlayersHarness(el);
  });

  describe("Open", () => {
    it("should render all player holdings", async () => {
      el.players = ["1_Player 1", "2_Player 2", "3_Player 3"];
      el.cashState = {
        "1_Player 1": 6000,
        "2_Player 2": 6000,
        "3_Player 3": 6000,
      };
      el.sharesState = {
        "1_Player 1": {
          American: 4,
        },
        "2_Player 2": {
          Luxor: 1,
          American: 2,
        },
        "3_Player 3": {},
      };
      el.playerId = "2_Player 2";
      el.currentPlayer = "3_Player 3";
      el.isOpen = true;

      expect(await harness.getPlayerHoldings()).toEqual([
        ["Player 1", "$6000", ["4", "0", "0", "0", "0", "0", "0"]],
        ["Player 2", "$6000", ["2", "0", "0", "0", "1", "0", "0"]],
        ["Player 3", "$6000", ["0", "0", "0", "0", "0", "0", "0"]],
      ]);
    });
  });

  describe("Closed", () => {
    it("should show player holdings and remaining shares", async () => {
      el.players = ["1_Player 1", "2_Player 2", "3_Player 3"];
      el.cashState = {
        "1_Player 1": 6000,
        "2_Player 2": 6000,
        "3_Player 3": 6000,
      };
      el.sharesState = {
        "1_Player 1": {
          American: 4,
        },
        "2_Player 2": {
          Luxor: 1,
          American: 2,
        },
        "3_Player 3": {},
      };
      el.playerId = "2_Player 2";
      el.currentPlayer = "3_Player 3";
      el.isOpen = false;

      expect(await harness.getPlayerHoldings()).toEqual([
        ["Player 2", "$6000", ["2", "0", "0", "0", "1", "0", "0"]],
        ["", "", ["19", "25", "25", "25", "24", "25", "25"]],
      ]);
    });

    it("should render all player holdings if game is over", async () => {
      el.players = ["1_Player 1", "2_Player 2", "3_Player 3"];
      el.cashState = {
        "1_Player 1": 6000,
        "2_Player 2": 6000,
        "3_Player 3": 6000,
      };
      el.sharesState = {
        "1_Player 1": {
          American: 4,
        },
        "2_Player 2": {
          Luxor: 1,
          American: 2,
        },
        "3_Player 3": {},
      };
      el.playerId = "2_Player 2";
      el.currentPlayer = "3_Player 3";
      el.isOpen = false;
      el.isGameOver = true;

      expect(await harness.getPlayerHoldings()).toEqual([
        ["Player 1", "$6000", ["4", "0", "0", "0", "0", "0", "0"]],
        ["Player 2", "$6000", ["2", "0", "0", "0", "1", "0", "0"]],
        ["Player 3", "$6000", ["0", "0", "0", "0", "0", "0", "0"]],
      ]);
    });
  });
});
