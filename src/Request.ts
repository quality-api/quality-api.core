import type { Json, Method, Headers } from "./types";

class Request<
    Params extends Json,
    SearchParams extends Json,
    Body,
    Data extends Json
> {

    private _url: URL = null!;

    public get url() {
        return this._url;
    }



    private _params: Params = null!;

    public get params() {
        return this._params;
    }

    public setParams<T extends Json>(v: T) {
        return new Request<
            T,
            SearchParams,
            Body,
            Data
        >(
            this._url,
            v,
            this._searchParams,
            this._method,
            this._headers,
            this._body,
            this._data
        );
    }



    private _searchParams: SearchParams = null!;

    public get searchParams() {
        return this._searchParams;
    }

    public setSearchParams<T extends Json>(v: T) {
        return new Request<
            Params,
            T,
            Body,
            Data
        >(
            this._url,
            this._params,
            v,
            this._method,
            this._headers,
            this._body,
            this._data
        );
    }



    private _method: Method = null!;

    public get method() {
        return this._method;
    }



    private _headers: Headers = null!;

    public get headers() {
        return this._headers;
    }



    private _body: Body = null!;

    public get body() {
        return this._body;
    }

    public setBody<T>(v: T) {
        return new Request<
            Params,
            SearchParams,
            T,
            Data
        >(
            this._url,
            this._params,
            this._searchParams,
            this._method,
            this._headers,
            v,
            this._data
        );
    }



    private _data: Data = null!;

    public get data() {
        return this._data;
    }

    public setDataField<Key extends string, T>(key: Key, v: T) {
        return new Request<
            Params,
            SearchParams,
            Body,
            Data & Record<Key, T>
        >(
            this._url,
            this._params,
            this._searchParams,
            this._method,
            this._headers,
            this._body,
            { ...this._data, [key]: v }
        );
    }

    public deleteDataField<Key extends string, T>(key: Key, v: T) {
        const dataClone = structuredClone(this._data);

        delete dataClone[key];

        return new Request<
            Params,
            SearchParams,
            Body,
            Omit<Data, Key>
        >(
            this._url,
            this._params,
            this._searchParams,
            this._method,
            this._headers,
            this._body,
            dataClone
        );
    }



    constructor(
        __url: URL,
        __params: Params,
        __searchParams: SearchParams,
        __method: Method,
        __headers: Headers,
        __body: Body,
        __data: Data
    ) {
        this._url = __url;
        this._params = __params;
        this._searchParams = __searchParams;
        this._method = __method;
        this._headers = __headers;
        this._body = __body;
        this._data = __data;
    }

}

export default Request;