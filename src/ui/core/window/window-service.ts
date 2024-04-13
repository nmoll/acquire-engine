export class WindowService {
    getQueryParam(param: string): string | null {
        return new URLSearchParams(window.location.search).get(param);
    }

    setQueryParam(param: string, value: string | null) {
        const url = new URL(window.location.href);
        if (value === null) {
            url.searchParams.delete(param);
        } else {
            url.searchParams.set(param, value);
        }
        window.history.pushState({}, "", url.toString())
    }

    getBaseUrl() {
        return window.location.origin;
    }

    setTimeout(callback: Function, duration: number) {
        setTimeout(callback, duration);
    }
}