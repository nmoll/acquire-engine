import type Network from "ts-neuroevolution/dist/declarations/network/network";
import { PurchaseSharesEvolution } from "./purchase-shares-evolution";
import { SmartPlayer } from "./aiPlayer";
import { GameSimulator } from "./game-simulator";

const file1 = Bun.file('./__TRAINING_DATA__/export.json');
// const file2 = Bun.file('./__TRAINING_DATA__/export-11-0.json');

const data1 = JSON.parse(await file1.text())
// const data2 = JSON.parse(await file2.text())

const evolution1 = new PurchaseSharesEvolution(data1)
const evolution2 = new PurchaseSharesEvolution();

const gen1 = evolution1.nextGeneration();
const gen2 = evolution2.nextGeneration();

const numPlayers = Math.min(gen1.length, gen2.length);
for (let i = 0; i < numPlayers; i++) {
    const player1 = new SmartPlayer('1', gen1[i]);
    const player2 = new SmartPlayer('2', gen2[i]);
    const simulator = new GameSimulator([player1, player2]);

    const wins = simulator.simulate(10);

    console.log(`${wins.get('1') ?? 0} - ${wins.get('2') ?? 0}`)
}
