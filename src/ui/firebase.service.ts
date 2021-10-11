import { initializeApp } from "firebase/app";
import {
  DatabaseReference,
  get,
  getDatabase,
  onValue,
  ref,
  set,
} from "firebase/database";
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
  private actionsRef: DatabaseReference;

  constructor() {
    const app = initializeApp(firebaseConfig);

    const db = getDatabase(app);
    this.actionsRef = ref(db, "games/1/actions");
  }

  getCurrentActions(): Promise<PlayerAction[]> {
    return new Promise((resolve) => {
      get(this.actionsRef)
        .then((snapshot) => {
          resolve(snapshot.exists() ? snapshot.val() : []);
        })
        .catch((error) => {
          alert("an error occured fetching the game state: " + error);
        });
    });
  }

  onActionsChanged(callback: (actions: PlayerAction[]) => void) {
    onValue(this.actionsRef, (snapshot) => {
      callback(snapshot.val() ?? []);
    });
  }

  updateActions(actions: PlayerAction[]) {
    set(this.actionsRef, actions);
  }
}
