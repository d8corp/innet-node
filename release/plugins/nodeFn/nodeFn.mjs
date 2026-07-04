import { useHandler, useApp, innet } from 'innet';
import { Watch } from 'watch-state';

const nodeFn = () => {
    return () => {
        const handler = useHandler();
        const fn = useApp();
        new Watch(() => {
            innet(fn(), handler);
        });
    };
};

export { nodeFn };
