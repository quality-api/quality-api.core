import type { MiddlewareFunction, RootJsonObject } from "./types";

export class Middleware<
    InParams extends RootJsonObject,
    InSearchParams extends RootJsonObject,
    InHeaders extends RootJsonObject,
    InBody,
    OutParams extends RootJsonObject,
    OutSearchParams extends RootJsonObject,
    OutHeaders extends RootJsonObject,
    OutBody
> {

    private readonly _middlewareFunction: MiddlewareFunction<
        InParams,
        InSearchParams,
        InHeaders,
        InBody,
        OutParams,
        OutSearchParams,
        OutHeaders,
        OutBody
    > = null!;

    public get middlewareFunction() {
        return this._middlewareFunction;
    }


    constructor(__middlewareFunction: MiddlewareFunction<
        InParams,
        InSearchParams,
        InHeaders,
        InBody,
        OutParams,
        OutSearchParams,
        OutHeaders,
        OutBody
    >) {
        this._middlewareFunction = __middlewareFunction;
    }

}