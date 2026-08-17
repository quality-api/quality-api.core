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



    private _searchParams: SearchParams = null!;

    public get searchParams() {
        return this._searchParams;
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



    private _data: Data = null!;

    public get data() {
        return this._data;
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