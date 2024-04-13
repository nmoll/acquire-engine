import { LocalStorage } from "../../ui/core/local-storage/local-storage";

export class MockLocalStorage implements LocalStorage {
    getItem(_key: string): string | null {
        return null;
    }
    setItem(_key: string, _value: string): void { }
    removeItem(_key: string): void { }
}