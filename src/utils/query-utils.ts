export function qs(query: {[key: string]: string | boolean | undefined}) {
    let ret = '';
    for (const key in query) {
        if (Object.prototype.hasOwnProperty.call(query, key)) {
            const value = query[key];
            if (value === undefined || value === false) {
                continue;
            }
            ret += !ret.length ? '?' : '&';
            ret += encodeURIComponent(key) + '=';
            if (value === true) {
                ret += 'true';
            } else {
                ret += encodeURIComponent(value);
            }
        }
    }
    return ret;
}

export function clearEmpty(query: any): any {
    const ret: any = {};
    for (const key in query) {
        if (Object.prototype.hasOwnProperty.call(query, key)) {
            const value = query[key];
            if (value !== undefined && value !== null && value !== '') {
                ret[key] = value;
            }
        }
    }
    return ret;
}
