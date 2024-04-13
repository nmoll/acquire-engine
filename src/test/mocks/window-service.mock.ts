export class MockWindowService {
    private params = new Map<string, string>();
    private timeoutCallback: Function | null = null;

    setQueryParam(param: string, value: string | null) {
        if (value === null) {
            this.params.delete(param)
        } else {
            this.params.set(param, value);
        }
    }

    getQueryParam(param: string): string | null {
        return this.params.get(param) ?? null;
    }

    setTimeout(callback: Function, _duration: number) {
        this.timeoutCallback = callback;
    }

    getBaseUrl() {
        return "http://test-env.com"
    }

    mockResolveTimeout() {
        if (!this.timeoutCallback) {
            throw new Error('Expected timeout to exist');
        }

        this.timeoutCallback();
    }
}