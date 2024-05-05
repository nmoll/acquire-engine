import { Signal, computed, signal } from "@lit-labs/preact-signals";
import { TemplateResult } from "lit";

export interface ModalConfig {
  title: string;
  template: TemplateResult<1>;
}

export class ModalService {
  private modalRequests: Signal<ModalConfig[]> = signal([]);
  modalRequest: Signal<ModalConfig | null> = computed(() => {
    return this.modalRequests.value[0] ?? null;
  });

  private promiseResolver?: (_val: unknown) => void;

  open(config: ModalConfig): Promise<void> {
    this.modalRequests.value = [...this.modalRequests.value, config];

    return new Promise((resolver) => {
      this.promiseResolver = resolver;
    }).then(() => {
      this.modalRequests.value = this.modalRequests.value.slice(1);
    });
  }

  onClose() {
    if (this.promiseResolver) {
      this.promiseResolver(1);
    }
  }
}
