import { Middleware } from "./Middleware";
import type {
    DefaultHeaders,
    DefaultParams, DefaultSearchParams,
    IncomingRequestContentType,
    IncomingRequestContentTypeMap,
    MiddlewareFunction, RootJsonObject
} from "./types";
import { Builder } from "./Builder";

namespace QualityApi {

    export function createMiddleware<
        InParams extends RootJsonObject,
        InSearchParams extends RootJsonObject,
        InHeaders extends RootJsonObject,
        InBody,
        OutParams extends RootJsonObject,
        OutSearchParams extends RootJsonObject,
        OutHeaders extends RootJsonObject,
        OutBody
    >(
        mf: MiddlewareFunction<InParams, InSearchParams, InHeaders, InBody, OutParams, OutSearchParams, OutHeaders, OutBody>
    ) {
        return new Middleware<InParams, InSearchParams, InHeaders, InBody, OutParams, OutSearchParams, OutHeaders, OutBody>(mf);
    }

    export function initBuilder<T extends IncomingRequestContentType | undefined | null>(contentType?: T) {
        return new Builder<
            DefaultParams,
            DefaultSearchParams,
            DefaultHeaders,
            T extends IncomingRequestContentType
                ? IncomingRequestContentTypeMap[T]
                : unknown
        >(contentType);
    }

    export function respond(
        body: ConstructorParameters<typeof Response>[0],
        init: ConstructorParameters<typeof Response>[1]
    ) {
        return new Response(body, init);
    }

}

export default QualityApi;