import type { Awaitable, Json } from "./types";
import type Request from "./Request";

export type Middleware<
    Start_Params extends Json,
    Start_SearchParams extends Json,
    Start_Body,
    Start_Data extends Json,
    End_Params extends Json,
    End_SearchParams extends Json,
    End_Body,
    End_Data extends Json
> = (
    request: Request<
        Start_Params,
        Start_SearchParams,
        Start_Body,
        Start_Data
    >
) =>
    Awaitable<
        Request<
            End_Params,
            End_SearchParams,
            End_Body,
            End_Data
        > | Response
    >;