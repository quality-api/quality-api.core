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
    json: Awaited<Request["json"]>,
    blob: Awaited<Request["blob"]>,
    arrayBuffer: Awaited<Request["arrayBuffer"]>,
    bytes: Awaited<Request["bytes"]>,
    formData: Awaited<Request["formData"]>,
    text: Awaited<Request["text"]>
};

export type ContentType = keyof ContentTypeMap;