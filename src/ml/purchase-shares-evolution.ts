import { Neuroevolution } from "ts-neuroevolution";
import type Network from "ts-neuroevolution/dist/declarations/network/network";
import type { IExportData } from "ts-neuroevolution/dist/declarations/types/neuroevolution-config";
import { ALL_HOTELS } from "../model";

export class PurchaseSharesEvolution {
  private neuro: Neuroevolution;

  constructor(exportData?: IExportData) {
    this.neuro = new Neuroevolution({
      network: [
        this.getInputNodes(),
        this.getHiddenNodes(),
        this.getOutputNodes(),
      ],
      population: 25,
      historic: 3,
    });
    if (exportData) {
      this.neuro.importData(exportData);
    }
  }

  public nextGeneration(): Network[] {
    return this.neuro.nextGeneration();
  }

  public networkScore(network: Network, score: number) {
    this.neuro.networkScore(network, score);
  }

  public export(): IExportData {
    return this.neuro.exportData();
  }

  private getInputNodes() {
    const hotelNodes = ALL_HOTELS.length;
    const shareNodes = ALL_HOTELS.length;
    const cashNodes = 1;

    return hotelNodes + shareNodes + cashNodes;
  }

  private getHiddenNodes() {
    return [20, 20];
  }

  private getOutputNodes() {
    return ALL_HOTELS.length;
  }
}
