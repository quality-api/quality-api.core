import type { MiddlewareFunction, RootJsonObject } from "./types";

export class Middleware<
    InParams extends RootJsonObject,
    InSearchParams extends RootJsonObject,
    InHeaders extends RootJsonObject,
    InBody,
    InData extends RootJsonObject,
    OutParams extends RootJsonObject,
    OutSearchParams extends RootJsonObject,
    OutHeaders extends RootJsonObject,
    OutBody,
    OutData extends RootJsonObject
> {

    private readonly _middlewareFunction: MiddlewareFunction<
        InParams,
        InSearchParams,
        InHeaders,
        InBody,
        InData,
        OutParams,
        OutSearchParams,
        OutHeaders,
        OutBody,
        OutData
    > = null!;

    public get middlewareFunction() {
        return this._middlewareFunction;
    }


    constructor(__middlewareFunction: MiddlewareFunction<
        InParams,
        InSearchParams,
        InHeaders,
        InBody,
        InData,
        OutParams,
        OutSearchParams,
        OutHeaders,
        OutBody,
        OutData
    >) {
        this._middlewareFunction = __middlewareFunction;
    }

}