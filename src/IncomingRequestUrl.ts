import type { DefaultParams, DefaultSearchParams, RootJsonObject } from "./types";

export class IncomingRequestUrl<
    Params extends RootJsonObject = DefaultParams,
    SearchParams extends RootJsonObject = DefaultSearchParams
> {

    private readonly _protocol: string = null!;
    public get protocol() {
        return this._protocol;
    }


    private readonly _host: string = null!;
    public get host() {
        return this._host;
    }


    private readonly _hostname: string = null!;
    public get hostname() {
        return this._hostname;
    }


    private readonly _pathname: string = null!;
    public get pathname() {
        return this._pathname;
    }


    private _params: any = {};
    public get params() {
        return this._params as Params;
    }

    public transformParams<T extends RootJsonObject>(newParams: T) {
        this._params = newParams;

        return this as unknown as IncomingRequestUrl<T, SearchParams>;
    }


    private _searchParams: any = {};
    public get searchParams() {
        return this._searchParams as SearchParams;
    }

    public transformSearchParams<T extends RootJsonObject>(newSearchParams: T) {
        this._searchParams = newSearchParams;

        return this as unknown as IncomingRequestUrl<Params, T>;
    }


    constructor(
        protocol: string,
        host: string,
        hostname: string,
        pathname: string,
        params: Params,
        searchParams: SearchParams
    ) {
        this._protocol = protocol;
        this._host = host;
        this._hostname = hostname;
        this._pathname = pathname;
        this._params = params;
        this._searchParams = searchParams;
    }

}