import type { Awaitable, ContentType, Json, Method } from "./types";
import type { Middleware } from "./Middleware";
import Request from "./Request";
import { nativeSearchParamsToObject } from "./utils";
import MiddlewareRequest from "./MiddlewareRequest";

class Builder<
    Params extends Json,
    SearchParams extends Json,
    Body,
    Data extends Json
> {

    private readonly _contentType: ContentType = null!;
    private readonly _middlewares: Middleware<any, any, any, any, any, any, any, any, any, any, any, any>[] = [];



    public add<
        Out_Params extends Json,
        Out_SearchParams extends Json,
        Out_Body,
        Out_Data extends Json,
        Modified_Params extends boolean,
        Modified_SearchParams extends boolean,
        Modified_Body extends boolean,
        Modified_Data extends boolean
    >(
        mw: Middleware<
            Params,
            SearchParams,
            Body,
            Data,
            Out_Params,
            Out_SearchParams,
            Out_Body,
            Out_Data,
            Modified_Params,
            Modified_SearchParams,
            Modified_Body,
            Modified_Data
        >
    ) {
        this._middlewares.push(mw);

        return this as unknown as Builder<
            Modified_Params extends true
                ? Out_Params
                : Params,
            Modified_SearchParams extends true
                ? Out_SearchParams
                : SearchParams,
            Modified_Body extends true
                ? Out_Body
                : Body,
            Modified_Data extends true
                ? Out_Data
                : Data
        >;
    }



    public end(fn: (request: Request<Params, SearchParams, Body, Data>) => Awaitable<Response>) {
        return async (nativeRequest: globalThis.Request, context: { params: Promise<any> }) => {
            let body;

            try {
                body = this._contentType && await nativeRequest[this._contentType]();
            }
            catch {
                return new Response(null, { status: 422 });
            }

            let request = new MiddlewareRequest(
                new URL(nativeRequest.url),
                await context.params,
                nativeSearchParamsToObject(nativeRequest.url.search.toString()),
                nativeRequest.method.toUpperCase() as Method,
                Object.fromEntries(nativeRequest.headers.entries()),
                body,
                {}
            );

            for (const mw of this._middlewares) {
                const result = await mw(request);

                if (result instanceof Response)
                    return result;

                request = result;
            }

            return fn(request as unknown as Request<Params, SearchParams, Body, Data>);
        };
    }



    constructor(__contentType?: ContentType) {
        if (__contentType) this._contentType = __contentType;
    }

}

export default Builder;