/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ModelTask {
  id?: string;
  label?: string;
  status?: boolean;
}

export interface RoutesAddTaskBody {
  label?: string;
}

export interface RoutesChangeStatusTaskBody {
  status?: boolean;
}

export interface RoutesEditTitleTaskBody {
  label?: string;
}

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  ResponseType,
} from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "/api",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData
          ? { "Content-Type": type }
          : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Todolist Cloud Deployment
 * @version 1.0
 * @baseUrl /api
 * @contact
 *
 * Api TODO List du cours de virtualisation
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  tache = {
    /**
     * @description get all todotask in mongodb
     *
     * @name TacheList
     * @summary Allow the user to get all todotask
     * @request GET:/tache
     */
    tacheList: (params: RequestParams = {}) =>
      this.request<ModelTask[], any>({
        path: `/tache`,
        method: "GET",
        ...params,
      }),

    /**
     * @description create todotask in mongodb
     *
     * @name TacheCreate
     * @summary Allow the user to create todotask
     * @request POST:/tache
     */
    tacheCreate: (Label: RoutesAddTaskBody, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/tache`,
        method: "POST",
        body: Label,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description get one todotask in mongodb
     *
     * @name TacheDetail
     * @summary Allow the user to get one todotask
     * @request GET:/tache/{id}
     */
    tacheDetail: (id: string, params: RequestParams = {}) =>
      this.request<ModelTask[], any>({
        path: `/tache/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name TacheUpdate
     * @summary Edit todoTask Label
     * @request PUT:/tache/{id}
     */
    tacheUpdate: (
      id: string,
      Label: RoutesEditTitleTaskBody,
      params: RequestParams = {}
    ) =>
      this.request<ModelTask, any>({
        path: `/tache/${id}`,
        method: "PUT",
        body: Label,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name TacheDelete
     * @summary Delete todoTask
     * @request DELETE:/tache/{id}
     */
    tacheDelete: (id: string, params: RequestParams = {}) =>
      this.request<ModelTask, any>({
        path: `/tache/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @name ChangeStatutUpdate
     * @summary Edit todoTask Status
     * @request PUT:/tache/{id}/change-statut
     */
    changeStatutUpdate: (
      id: string,
      Label: RoutesChangeStatusTaskBody,
      params: RequestParams = {}
    ) =>
      this.request<ModelTask, any>({
        path: `/tache/${id}/change-statut`,
        method: "PUT",
        body: Label,
        type: ContentType.Json,
        ...params,
      }),
  };
}
