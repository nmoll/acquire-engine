import { IAcquireGameInstance } from "../model/acquire-game-instance";
import { PlayerAction } from "../model/player-action";

import {
  RealtimeChannel,
  SupabaseClient,
  createClient,
} from "@supabase/supabase-js";

export class DatabaseClient {
  private db: SupabaseClient;
  private gameChannelSub: RealtimeChannel | null = null;

  constructor() {
    this.db = createClient(
      "https://yxpdhbkmlkmemexhllxl.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4cGRoYmttbGttZW1leGhsbHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk5OTg2OTMsImV4cCI6MjAwNTU3NDY5M30.SE8vc02MrgVLvgbnuiR_njek2_xDBvLNI7bQnX-VVkI"
    );
  }

  getGame(
    gameId: string,
    callback: (game: IAcquireGameInstance | null) => void
  ) {
    this.db
      .from("game")
      .select("instance")
      .eq("game_id", gameId)
      .then((res) => {
        const game = res.data?.[0];
        if (game) {
          callback(game.instance);
        }
      });
  }

  onGameChanged(
    gameId: string,
    callback: (game: IAcquireGameInstance | null) => void
  ) {
    this.getGameChannel(gameId, (instance) => callback(instance));
  }

  createGame(instance: IAcquireGameInstance) {
    this.db
      .from("game")
      .insert({
        game_id: instance.id,
        instance,
      })
      .then(() => {});
  }

  updateGame(
    instance: IAcquireGameInstance,
    callback: (instance: IAcquireGameInstance) => void
  ) {
    this.db
      .from("game")
      .update({
        instance,
      })
      .eq("game_id", instance.id)
      .then(() => {
        callback(instance);
      });
  }

  addPlayerToGame(
    playerId: string,
    gameId: string,
    callback: (instance: IAcquireGameInstance) => void
  ) {
    this.getGame(gameId, (instance) => {
      if (instance) {
        instance.playerIds.push(playerId);
        this.updateGame(instance, callback);
      }
    });
  }

  startGame(
    gameId: string,
    callback: (instance: IAcquireGameInstance) => void
  ) {
    this.getGame(gameId, (instance) => {
      if (instance) {
        instance.state = "started";
        this.updateGame(instance, callback);
      }
    });
  }

  onActionsChanged(
    gameId: string,
    callback: (actions: PlayerAction[]) => void
  ) {
    this.getGameChannel(gameId, (_, actions) => callback(actions));
  }

  updateActions(gameId: string, actions: PlayerAction[]) {
    this.db
      .from("game")
      .update({ actions })
      .eq("game_id", gameId)
      .then(() => {});
  }

  private getGameChannel(
    gameId: string,
    callback: (instance: IAcquireGameInstance, actions: PlayerAction[]) => void
  ) {
    if (!this.gameChannelSub) {
      this.gameChannelSub = this.db
        .channel("schema-db-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "game",
            filter: `game_id=eq.${gameId}`,
          },
          (payload) => {
            callback(
              (payload.new as any).instance,
              (payload.new as any).actions
            );
          }
        )
        .subscribe();
    }

    return this.gameChannelSub;
  }
}
