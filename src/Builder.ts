import type { Awaitable, ContentType, ContentTypeMap, Json, Method } from "./types";
import type { Middleware } from "./Middleware";
import Request from "./Request";
import { nativeSearchParamsToObject } from "./utils";

class Builder<
    Params extends Json,
    SearchParams extends Json,
    Body,
    Data extends Json
> {

    private readonly _contentType: ContentType = null!;
    private readonly _middlewares: Middleware<any, any, any, any, any, any, any, any>[] = [];



    public add<
        Out_Params extends Json,
        Out_SearchParams extends Json,
        Out_Body,
        Out_Data extends Json
    >(
        mw: Middleware<
            Params,
            SearchParams,
            Body,
            Data,
            Out_Params,
            Out_SearchParams,
            Out_Body,
            Out_Data
        >
    ) {
        this._middlewares.push(mw);

        return this as unknown as Builder<Out_Params, Out_SearchParams, Out_Body, Out_Data>;
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

            let request = new Request(
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

            return fn(request as Request<Params, SearchParams, Body, Data>);
        };
    }



    constructor(__contentType?: ContentType) {
        if (__contentType) this._contentType = __contentType;
    }

}

export default Builder;