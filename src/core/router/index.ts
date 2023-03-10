import router from '@/router';
import { HRouter } from '@/core/types';
import { Router } from 'vue-router';

function useRouter() {
    (router as HRouter).$plugin = {
        addViews: (list: Array<any>, options: any) => {
            if (!options) {
                options = {};
            }

            // Parse route config
            list.forEach((e: any) => {
                (router as Router).addRoute('index', e);
            });
        },
    };

    let lock = false;

    (router as Router).onError((err: any) => {
        if (!lock) {
            lock = true;
            console.error(err);

            setTimeout(() => {
                lock = false;
            }, 0);
        }
    });
}

export default useRouter;
