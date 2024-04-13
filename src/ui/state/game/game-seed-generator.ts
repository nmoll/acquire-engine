export interface GameSeedGenerator {
    generateSeed(): number;
}

export class RandomGameSeedGenerator implements GameSeedGenerator {
    generateSeed(): number {
        return Math.floor(Math.random() * 999);
    }
}