import type { Awaitable, IncomingRequestContentType, IncomingRequestMethod, RootJsonObject } from "./types";
import { Middleware } from "./Middleware";
import { IncomingRequest } from "./IncomingRequest";
import { parseRequestBodyByContentType, searchParamsToObj } from "./utils";
import { IncomingRequestUrl } from "./IncomingRequestUrl";

export class Builder<
    Params extends RootJsonObject,
    SearchParams extends RootJsonObject,
    Headers extends RootJsonObject,
    Body
> {

    private readonly _contentType: IncomingRequestContentType | undefined | null = null;
    private readonly _middlewares: Middleware<any, any, any, any, any, any, any, any>[] = [];


    public mw<
        OutParams extends RootJsonObject,
        OutSearchParams extends RootJsonObject,
        OutHeaders extends RootJsonObject,
        OutBody
    >(middleware: Middleware<
        Params,
        SearchParams,
        Headers,
        Body,
        OutParams,
        OutSearchParams,
        OutHeaders,
        OutBody
    >) {
        this._middlewares.push(middleware);

        return this as unknown as Builder<OutParams, OutSearchParams, OutHeaders, OutBody>;
    }


    public handle(handler: (r: IncomingRequest<Params, SearchParams, Headers, Body>) => Awaitable<Response>) {
        return async (request: Request, context: { params: Promise<any> }) => {
            let body;

            try {
                body = this._contentType && await parseRequestBodyByContentType(request, this._contentType);
            }
            catch (err) {
                console.error(`Could not parse request body to content type "${this._contentType}". Returning 422.\n${err}`);

                return new Response(null, { status: 422 });
            }

            const url = new URL(request.url);

            const irurl = new IncomingRequestUrl(
                url.protocol,
                url.host,
                url.hostname,
                url.pathname,
                await context.params ?? {},
                searchParamsToObj(url.searchParams)
            );

            let ir = new IncomingRequest(
                irurl,
                request.method.toLowerCase() as IncomingRequestMethod,
                Object.fromEntries(request.headers.entries()),
                body
            );

            for (const mw of this._middlewares) {
                const execResult = await mw.middlewareFunction(ir);

                if (execResult instanceof Response) return execResult;

                ir = execResult;
            }

            return handler(ir as IncomingRequest<Params, SearchParams, Headers, Body>);
        };
    }


    constructor(__contentType?: IncomingRequestContentType | null) {
        this._contentType = __contentType;
    }

}