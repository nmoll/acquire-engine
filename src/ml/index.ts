import { GameSimulator } from "./game-simulator";
import { RandomPlayer, SmartPlayer } from "./aiPlayer";
import { IExportData } from "ts-neuroevolution/dist/declarations/types/neuroevolution-config";
import * as Bun from "bun";
import { PurchaseSharesEvolution } from "./purchase-shares-evolution";

const EXPORT_DATA_PATH = "./__TRAINING_DATA__";

const baseEvolution = new PurchaseSharesEvolution();
const baseNetwork = baseEvolution.nextGeneration()[0];

const playGeneration = (
  evolution: PurchaseSharesEvolution
): {
  averageScore: number;
  bestScore: number;
} => {
  const generations = evolution.nextGeneration();

  const scores: number[] = [];
  generations.forEach((network) => {
    const learningModel = new SmartPlayer("1_Smart", network);
    const baseModel = new RandomPlayer("2_base");

    const simulator = new GameSimulator([learningModel, baseModel]);
    const result = simulator.simulate(100);
    const totalGames =
      (result.get(learningModel.playerId) ?? 0) +
      (result.get(baseModel.playerId) ?? 0);
    const score = (result.get(learningModel.playerId) ?? 0) / totalGames;
    evolution.networkScore(network, score);
    scores.push(score);
  });
  const totalScore = scores.reduce((prev, curr) => prev + curr, 0);

  return {
    averageScore: totalScore / generations.length,
    bestScore: Math.max(...scores),
  };
};

// const playRoundRobin = (networks: Network[]): Map<number, number> => {
//     const result = new Map<number, number>();
//     for (let i = 0; i < networks.length; i++) {
//         for (let j = i + 1; j < networks.length; j++) {
//             const player1 = new SmartPlayer(`${i}`, networks[i])
//             const player2 = new SmartPlayer(`${j}`, networks[j]);
//             const simulator = new GameSimulator([player1, player2]);
//             const wins = simulator.simulate(1);
//             result.set(i, (result.get(i) ?? 0) + (wins.get(player1.playerId) ?? 0))
//             result.set(j, (result.get(j) ?? 0) + (wins.get(player2.playerId) ?? 0));

//         }
//     }
//     return result;
// }

let exportData: IExportData | undefined = undefined;
const file = Bun.file(EXPORT_DATA_PATH + "/export-2.json");
if (await file.exists()) {
  exportData = JSON.parse(await file.text());
}

const evolution = new PurchaseSharesEvolution(exportData);

// for (let i = 0; i < 500; i++) {
//     console.log('new generation');
//     const generation = evolution.nextGeneration();
//     const result = playRoundRobin(generation);

//     let strongestScore = 0;
//     let strongestNetwork = generation[0];

//     for (let g = 0; g < generation.length; g++) {
//         const network = generation[g];
//         const score = (result.get(g) ?? 0) / generation.length;
//         evolution.networkScore(network, score);
//         if (score > strongestScore) {
//             strongestScore = score;
//             strongestNetwork = generation[g]
//         }
//     }

//     console.log('strongest', strongestScore);

//     const simulator = new GameSimulator([new SmartPlayer('smart', strongestNetwork), new RandomPlayer('random')]);
//     const wins = simulator.simulate(100);
//     const score = wins.get('smart') ?? 0;
//     console.log('score against random', score)

//     exportData = evolution.export();
//     console.log('saving training data');
//     await Bun.write(EXPORT_DATA_PATH + `/export-${i}-${score}.json`, JSON.stringify(exportData));
// }

for (let x = 0; x < 1000; x++) {
  const result = playGeneration(evolution);
  const best = result.bestScore.toFixed(2);
  const avg = result.averageScore.toFixed(2);
  console.log(`Generation: ${x} Best: ${best} Avg: ${avg}`);

  exportData = evolution.export();
  await Bun.write(
    EXPORT_DATA_PATH + `/export-test-${x}-${best}-${avg}.json`,
    JSON.stringify(exportData)
  );
}
