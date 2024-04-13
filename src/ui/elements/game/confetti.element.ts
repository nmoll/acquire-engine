import { css, html, LitElement, svg, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createConfirmEvent } from "../../events/confirm-event";

@customElement("acquire-confetti")
export class ConfettiElement extends LitElement {
  static styles = css`
    svg {
      position: absolute;
      inset: 0px;
      height: 100%;
      width: 100%;
    }

    .message {
      position: absolute;
      inset: 0px;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      font-size: 1.5rem;
    }

    button {
      width: 8rem;
      padding: 0.5rem 1rem;
      background: transparent;
      border: 1px solid var(--colors-primary);
      color: var(--colors-primary);
      cursor: pointer;
    }

    circle {
      opacity: 0;
      animation: dash var(--duration) var(--delay) linear var(--direction)
        infinite forwards;
    }

    @keyframes dash {
      10% {
        opacity: 1;
      }
      20% {
        opacity: 1;
      }
      30% {
        opacity: 0;
      }
      50% {
        opacity: 0;
        stroke-dashoffset: 0;
      }
      100% {
        opacity: 0;
        stroke-dashoffset: 0;
      }
    }
  `;

  @property()
  message!: string;

  @state()
  width: number;

  @state()
  height: number;

  constructor() {
    super();

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    });
  }

  render() {
    const circles: TemplateResult[] = [];

    for (let i = 0; i < (this.width + this.height) / 10; i++) {
      const radius = this.randRange(20, 60);
      const x = Math.round(Math.random() * this.width);
      const y = Math.round(Math.random() * this.height);
      const stroke = `hsl(${this.randRange(0, 360)}deg 40% 80%)`;
      const duration = `${this.randRange(3, 5)}s`;
      const delay = `${this.randRange(-1, 1)}s`;
      const direction = i % 2 === 0 ? "reverse" : "normal";

      circles.push(svg`
        <circle
          r="${radius}"
          cx="${x}"
          cy="${y}"
          stroke="${stroke}"
          stroke-width="${radius / 10}"
          style="
            stroke-dasharray: ${radius * 0.5}, ${radius * Math.PI * 2 - radius * 0.5
        };
            stroke-dashoffset: ${radius * Math.PI * 2};
            --radius: ${radius};
            --duration: ${duration};
            --delay: ${delay}; 
            --direction: ${direction}
          "
          fill="none"
        >
        </circle>
      `);
    }

    return html`
      ${svg`<svg xmlns="http://www.w3.org/2000/svg">${circles}</svg>`}
      <div
        class="message"
        @click="${() => this.dispatchEvent(createConfirmEvent())}"
      >
        ${this.message}
        <button>OK</button>
      </div>
    `;
  }

  private randRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-confetti": ConfettiElement;
  }
}
