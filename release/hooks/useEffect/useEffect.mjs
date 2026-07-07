import { withScope } from '@watch-state/utils';
import { queueNanotask } from 'queue-nano-task';
import { onDestroy } from 'watch-state';

function useEffect(callback) {
    let run = true;
    onDestroy(() => {
        run = false;
    });
    const effect = withScope(callback);
    queueNanotask(() => {
        if (run) {
            effect();
        }
    }, 1, true);
}

export { useEffect };
