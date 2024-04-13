import { Context } from "@lit/context";
import { ContextProvider } from "@lit/context";

interface TestingEnvironmentOptions<K extends keyof HTMLElementTagNameMap> {
    element: K,
    providers?: {
        context: Context<any, any>,
        initialValue: any
    }[]
}

export const TestBed = {
    configureTestingEnvironment: <K extends keyof HTMLElementTagNameMap>(options: TestingEnvironmentOptions<K>): HTMLElementTagNameMap[K] => {
        const oldHostEl = document.getElementById('host-el');
        if (oldHostEl) {
            oldHostEl.remove();
        }

        const hostEl = document.createElement('div');
        hostEl.id = 'host-el';

        const el = document.createElement(options.element);

        if (options.providers) {
            options.providers.forEach(config => {
                new ContextProvider(hostEl, config)
            })
        }

        hostEl.appendChild(el);
        document.appendChild(hostEl);

        return el;
    }
}