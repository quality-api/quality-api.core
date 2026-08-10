import type { IncomingRequest } from "./IncomingRequest";

export type IncomingRequestMethod =
    "get" |
    "head" |
    "post" |
    "put" |
    "delete" |
    "connect" |
    "options" |
    "trace" |
    "patch";

export type IncomingRequestContentTypeMap = {
    json: Awaited<ReturnType<Request["json"]>>;
    blob: Awaited<ReturnType<Request["blob"]>>;
    bytes: Awaited<ReturnType<Request["bytes"]>>;
    text: Awaited<ReturnType<Request["text"]>>;
    arrayBuffer: Awaited<ReturnType<Request["arrayBuffer"]>>;
    formData: Awaited<ReturnType<Request["formData"]>>;
};

export type IncomingRequestContentType = keyof IncomingRequestContentTypeMap;

export type DefaultParams = Record<string, string>;

export type DefaultSearchParams = Record<string, string | string[]>;

export type DefaultHeaders = Record<string, string>;

export type DefaultData = RootJsonObject;

export type MiddlewareFunction<
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
> =
    (ir: IncomingRequest<InParams, InSearchParams, InHeaders, InBody, InData>) =>
        Awaitable<
            IncomingRequest<OutParams, OutSearchParams, OutHeaders, OutBody, OutData> |
            Response
        >;

export type Awaitable<T> = T | Promise<T>;

export type RootJsonObject = Record<any, any>;