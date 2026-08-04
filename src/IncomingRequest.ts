import type { IncomingRequestMethod, RootJsonObject } from "./types";
import type { IncomingRequestUrl } from "./IncomingRequestUrl";

export class IncomingRequest<
    Params extends RootJsonObject,
    SearchParams extends RootJsonObject,
    Headers extends RootJsonObject,
    Body
> {

    private _url: IncomingRequestUrl = null!;
    public get url() {
        return this._url as IncomingRequestUrl<Params, SearchParams>;
    }

    public transformUrl<
        P extends RootJsonObject,
        SP extends RootJsonObject
    >(
        transformer: (__url: IncomingRequestUrl<Params, SearchParams>) => IncomingRequestUrl<P, SP>
    ): IncomingRequest<P, SP, Headers, Body> {
        this._url = transformer(this._url as any) as any;

        return this as unknown as IncomingRequest<P, SP, Headers, Body>;
    }


    private readonly _method: IncomingRequestMethod = null!;
    public get method() {
        return this._method;
    }


    private _headers: any = {};
    public get headers() {
        return this._headers as Headers;
    }

    public transformHeaders<T extends RootJsonObject>(newHeaders: T): IncomingRequest<Params, SearchParams, T, Body> {
        this._headers = newHeaders;

        return this as unknown as IncomingRequest<Params, SearchParams, T, Body>;
    }


    private _body: any = undefined;
    public get body() {
        return this._body as Body;
    }

    public transformBody<T>(newBody: T): IncomingRequest<Params, SearchParams, Headers, T> {
        this._body = newBody;

        return this as unknown as IncomingRequest<Params, SearchParams, Headers, T>;
    }


    constructor(
        url: IncomingRequestUrl,
        method: IncomingRequestMethod,
        headers: Headers,
        body: Body
    ) {
        this._url = url;
        this._method = method;
        this._headers = headers;
        this._body = body;
    }

}