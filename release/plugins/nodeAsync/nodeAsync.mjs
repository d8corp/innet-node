import { useApp, useHandler, innet } from 'innet';
import { scope, onDestroy } from 'watch-state';

function nodeAsync() {
    return () => {
        const { activeWatcher } = scope;
        const app = useApp();
        const handler = useHandler();
        let works = true;
        onDestroy(() => {
            works = false;
        });
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        app.then(data => {
            if (works) {
                scope.activeWatcher = activeWatcher;
                innet(data, handler);
                scope.activeWatcher = undefined;
            }
        });
    };
}

export { nodeAsync };
