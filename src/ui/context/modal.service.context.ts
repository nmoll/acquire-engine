import { createContext } from "@lit/context";
import { ModalService } from "../elements/modal/modal.service";

export const modalServiceContext = createContext<ModalService>("modalService");
