import type { Awaitable, Json } from "./types";
import type MiddlewareRequest from "./MiddlewareRequest";

export type Middleware<
    Start_Params extends Json,
    Start_SearchParams extends Json,
    Start_Body,
    Start_Data extends Json,
    End_Params extends Json,
    End_SearchParams extends Json,
    End_Body,
    End_Data extends Json,
    Modified_Params extends boolean,
    Modified_SearchParams extends boolean,
    Modified_Body extends boolean,
    Modified_Data extends boolean
> = (
    request: MiddlewareRequest<
        Start_Params,
        Start_SearchParams,
        Start_Body,
        Start_Data,
        false,
        false,
        false,
        false
    >
) =>
    Awaitable<
        MiddlewareRequest<
            End_Params,
            End_SearchParams,
            End_Body,
            End_Data,
            Modified_Params,
            Modified_SearchParams,
            Modified_Body,
            Modified_Data
        > | Response
    >;