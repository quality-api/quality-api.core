import type { ContentType, Json } from "./types";
import Builder from "./Builder";
import type { Middleware } from "./Middleware";

namespace QualityApi {

    export function start(contentType?: ContentType) {
        return new Builder(contentType);
    }

    export function createMiddleware<
        Start_Params extends Json,
        Start_SearchParams extends Json,
        Start_Body,
        Start_Data extends Json,
        End_Params extends Json,
        End_SearchParams extends Json,
        End_Body,
        End_Data extends Json
    >(
        fn: Middleware<
            Start_Params,
            Start_SearchParams,
            Start_Body,
            Start_Data,
            End_Params,
            End_SearchParams,
            End_Body,
            End_Data
        >
    ) {
        return fn;
    }

}

export default QualityApi;