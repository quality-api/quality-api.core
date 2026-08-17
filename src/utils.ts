export function nativeSearchParamsToObject(_nsp: URLSearchParams | string) {
    const nsp = _nsp instanceof URLSearchParams ? _nsp : new URLSearchParams(_nsp);

    const result: Record<string, string | string[]> = {};

    for (const k of nsp.keys()) {
        const v = nsp.getAll(k);

        result[k] =
            v.length === 1
                ? v[0]
                : v;
    }

    return result;
}