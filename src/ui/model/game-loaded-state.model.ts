import { IAcquireGameInstance } from "../../model/acquire-game-instance";

export type GameLoadedState =
    | {
        type: "initial";
    }
    | {
        type: "loading";
    }
    | {
        type: "not found";
    }
    | {
        type: "loaded";
        game: IAcquireGameInstance;
    };