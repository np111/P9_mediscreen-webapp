import Router from 'next/router';
import {format, parse, Url, UrlObject} from 'url';
import {LinkProps} from './components/ui/util/link';
import {qs} from './utils/query-utils';

export const routes = {
    patientList: () => ({href: '/'}),
    addPatient: () => ({href: '/patient/add'}),
    patient: ({patientId, edit}: {patientId: string; edit?: boolean}) => ({
        href: '/patient/[patientId]' + qs({patientId, edit}),
        as: '/patient/' + encodeURIComponent(patientId) + qs({edit}),
    }),
};

export interface AppRouterOptions {
    replace?: boolean;
}

export class AppRouter {
    public static push(route: LinkProps, query?: any, opts?: AppRouterOptions) {
        const href = AppRouter._parseUrl(route.href);
        let as = !route.as ? undefined : AppRouter._parseUrl(route.as);
        if (query) {
            if (!as) as = {...href};
            if (href) {
                href.query = {...href.query as any, ...query};
                AppRouter._clearUrlCache(href);
            }
        }
        const push = opts && opts.replace ? Router.replace : Router.push;
        return push.call(Router, AppRouter._formatUrl(href), !as ? undefined : AppRouter._formatUrl(as), <any>opts);
    }

    private static _parseUrl(url: string | UrlObject): Url {
        return typeof url === 'string' ? parse(url, true) : url as Url;
    }

    private static _formatUrl(url: UrlObject): string {
        return url.href !== null && url.href !== undefined ? url.href : format(url);
    }

    private static _clearUrlCache(url: any) {
        delete url.href;
        delete url.search;
    }
}
