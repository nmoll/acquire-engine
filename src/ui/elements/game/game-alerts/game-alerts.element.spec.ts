import { beforeEach, describe, expect, it } from "vitest";
import { AcquireGameAlertsElement } from "./game-alerts.element";
import { TestBed } from "../../../test/test-bed";
import { MergeAlertHarness } from "../../../test/harness/merge-alert.harness";
import { MergeScenario } from "./test-data";
import { GameStateEngine } from "../../../../engine/game-state-engine/game-state-engine";
import { ModalService } from "../../modal/modal.service";
import { modalServiceContext } from "../../../context/modal.service.context";
import { render } from "lit";

describe(AcquireGameAlertsElement.name, () => {
  let el: AcquireGameAlertsElement;
  let harness: MergeAlertHarness;

  let modalService: ModalService;

  beforeEach(() => {
    modalService = new ModalService();

    el = TestBed.configureTestingEnvironment({
      element: "acquire-game-alerts",
      providers: [
        {
          context: modalServiceContext,
          initialValue: modalService,
        },
      ],
    });
    harness = new MergeAlertHarness(el);
  });

  it("should show alert if merge happened", async () => {
    expect(await harness.isVisible()).toBeFalsy();

    expect(modalService.modalRequest.value).toBeNull();

    const gameState = GameStateEngine.computeGameState(
      MergeScenario.gameInstance,
      MergeScenario.actions
    );

    el.gameState = gameState;

    expect(gameState.actionResult?.type === "Hotel Merged").toBeTruthy();

    await el.updateComplete;

    const modalRequest = modalService.modalRequest.value;
    if (!modalRequest) {
      throw new Error("Expected modal request");
    }

    expect(modalRequest.title).toEqual("Merge Event");

    const containerEl = document.createElement("div");
    render(modalRequest.template, containerEl);

    expect(containerEl.textContent).toContain("Nate merged");
    expect(containerEl.textContent).toContain("Joe awarded:");
    expect(containerEl.textContent).toContain("Nate awarded:");

    const hotelNames = containerEl.querySelectorAll("acquire-hotel-name");
    expect(hotelNames.length).toBe(2);
    expect(hotelNames.item(0).hotelChainType).toEqual("Festival");
    expect(hotelNames.item(1).hotelChainType).toEqual("Worldwide");

    const cashAwarded = containerEl.querySelectorAll("acquire-player-cash");
    expect(cashAwarded.length).toBe(2);
    expect(cashAwarded.item(0).cash).toEqual(3000);
    expect(cashAwarded.item(1).cash).toEqual(1500);
  });
});
