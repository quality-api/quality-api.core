export type JsonKey = string | number | symbol;

export type Json = Record<JsonKey, any>;

export type Method =
    "GET" |
    "POST" |
    "PUT" |
    "PATCH" |
    "DELETE" |
    "OPTIONS";

export type Headers = Record<JsonKey, string>;

export type Awaitable<T> = T | Promise<T>;

export type ContentTypeMap = {
    json: Awaited<ReturnType<Request["json"]>>,
    blob: Awaited<ReturnType<Request["blob"]>>,
    arrayBuffer: Awaited<ReturnType<Request["arrayBuffer"]>>,
    bytes: Awaited<ReturnType<Request["bytes"]>>,
    formData: Awaited<ReturnType<Request["formData"]>>,
    text: Awaited<ReturnType<Request["text"]>>
};

export type ContentType = keyof ContentTypeMap;

export type Alike<A, B, True, False> =
    { _: A } extends { _: B }
        ? True
        : False;