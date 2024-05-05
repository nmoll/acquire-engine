import { AcquireMergeAlertElement } from "../../elements/game/game-alerts/game-alerts.element";

export class MergeAlertHarness {
  constructor(private el: AcquireMergeAlertElement) {}

  async getTextContent() {
    await this.el.updateComplete;

    return this.el.shadowRoot!.textContent;
  }

  async isVisible() {
    await this.el.updateComplete;

    const alertEl = this.el.shadowRoot!.querySelector(
      "[data-qa=alert]"
    ) as HTMLElement | null;
    return !!alertEl;
  }
}
