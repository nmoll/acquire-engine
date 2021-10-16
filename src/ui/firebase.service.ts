import { initializeApp } from "firebase/app";
import {
  Database,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  set,
} from "firebase/database";
import { IAcquireGameInstance } from "../model/acquire-game-instance";
import { AcquireGameState } from "../model/acquire-game-state";
import { PlayerAction } from "../model/player-action";

const firebaseConfig = {
  apiKey: "AIzaSyCSO_5-CdckMSPlvvc3F6uUgRkl4_BKSig",
  authDomain: "acquire-1d5b0.firebaseapp.com",
  databaseURL: "https://acquire-1d5b0-default-rtdb.firebaseio.com",
  projectId: "acquire-1d5b0",
  storageBucket: "acquire-1d5b0.appspot.com",
  messagingSenderId: "990047688882",
  appId: "1:990047688882:web:2f45a4e9610972e1de51ab",
};

export class FirebaseService {
  private db: Database;

  constructor() {
    const app = initializeApp(firebaseConfig);
    this.db = getDatabase(app);
  }

  getGame(
    gameId: string,
    callback: (game: IAcquireGameInstance | null) => void
  ) {
    get(ref(this.db, `games/${gameId}/instance`))
      .then((snapshot) => {
        callback(snapshot.exists() ? snapshot.val() : null);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onGameChanged(
    gameId: string,
    callback: (game: IAcquireGameInstance | null) => void
  ) {
    const gameRef = ref(this.db, `games/${gameId}/instance`);
    onValue(gameRef, (snapshot) => {
      if (!snapshot.exists()) {
        callback(null);
      } else {
        callback(this.normalizeGame(snapshot.val()));
      }
    });
  }

  private normalizeGame(gameSnapshot: any): IAcquireGameInstance {
    return {
      ...gameSnapshot,
      playerIds: Object.values(gameSnapshot.playerIds),
    };
  }

  createGame(instance: IAcquireGameInstance) {
    const gameRef = ref(this.db, `games/${instance.id}`);
    set(gameRef, {
      instance,
    });
  }

  addPlayerToGame(playerId: string, gameId: string) {
    const playerListRef = ref(this.db, `games/${gameId}/instance/playerIds`);
    const newPlayerRef = push(playerListRef);
    set(newPlayerRef, playerId);
  }

  startGame(gameId: string) {
    const gameStarted: AcquireGameState = "started";
    const gameStateRef = ref(this.db, `games/${gameId}/instance/state`);
    set(gameStateRef, gameStarted);
  }

  onActionsChanged(
    gameId: string,
    callback: (actions: PlayerAction[]) => void
  ) {
    const actionsRef = ref(this.db, `games/${gameId}/actions`);

    onValue(actionsRef, (snapshot) => {
      callback(snapshot.val() ?? []);
    });
  }

  updateActions(gameId: string, actions: PlayerAction[]) {
    const actionsRef = ref(this.db, `games/${gameId}/actions`);
    set(actionsRef, actions);
  }
}
