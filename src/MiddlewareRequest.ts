import type { Json } from "./types";
import Request from "./Request";

class MiddlewareRequest<
    Params extends Json,
    SearchParams extends Json,
    Body,
    Data extends Json,
    Modified_Params extends boolean,
    Modified_SearchParams extends boolean,
    Modified_Body extends boolean,
    Modified_Data extends boolean
> extends Request<Params, SearchParams, Body, Data> {

    public setParams<T extends Json>(v: T) {
        return new MiddlewareRequest<
            T,
            SearchParams,
            Body,
            Data,
            true,
            Modified_SearchParams,
            Modified_Body,
            Modified_Data
        >(
            this.url,
            v,
            this.searchParams,
            this.method,
            this.headers,
            this.body,
            this.data
        );
    }



    public setSearchParams<T extends Json>(v: T) {
        return new MiddlewareRequest<
            Params,
            T,
            Body,
            Data,
            Modified_Params,
            true,
            Modified_Body,
            Modified_Data
        >(
            this.url,
            this.params,
            v,
            this.method,
            this.headers,
            this.body,
            this.data
        );
    }



    public setBody<T>(v: T) {
        return new MiddlewareRequest<
            Params,
            SearchParams,
            T,
            Data,
            Modified_Params,
            Modified_SearchParams,
            true,
            Modified_Data
        >(
            this.url,
            this.params,
            this.searchParams,
            this.method,
            this.headers,
            v,
            this.data
        );
    }



    public setData<T extends Json>(v: T) {
        return new MiddlewareRequest<
            Params,
            SearchParams,
            Body,
            T,
            Modified_Params,
            Modified_SearchParams,
            Modified_Body,
            true
        >(
            this.url,
            this.params,
            this.searchParams,
            this.method,
            this.headers,
            this.body,
            v
        );
    }

}

export default MiddlewareRequest;