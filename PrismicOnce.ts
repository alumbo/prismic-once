import Prismic from 'prismic-javascript';
import ApiSearchResponse from 'prismic-javascript/types/ApiSearchResponse';
import { DefaultClient } from 'prismic-javascript/types/client';
import { PreviewResolver } from 'prismic-javascript/types/PreviewResolver';
import { RequestCallback } from 'prismic-javascript/types/request';
import { QueryOptions } from 'prismic-javascript/types/ResolvedApi';

export default class PrismicOnce {
  static init(apiEndpoint: string): void {
    PrismicOnce.apiEndpoint = apiEndpoint;
  }

  static query(
    q: string | string[],
    optionsOrCallback?: QueryOptions | RequestCallback<ApiSearchResponse>,
    cb?: RequestCallback<ApiSearchResponse>
  ): Promise<ApiSearchResponse> {
    return PrismicOnce._call('query', arguments);
  }
  static queryFirst(
    q: string | string[],
    optionsOrCallback?: QueryOptions | RequestCallback<Document>,
    cb?: RequestCallback<Document>
  ): Promise<Document> {
    return PrismicOnce._call('queryFirst', arguments);
  }
  static getByID(id: string, options: QueryOptions, cb: RequestCallback<Document>): Promise<Document> {
    return PrismicOnce._call('getByID', arguments);
  }
  static getByIDs(
    ids: string[],
    options: QueryOptions,
    cb: RequestCallback<ApiSearchResponse>
  ): Promise<ApiSearchResponse> {
    return PrismicOnce._call('getByIDs', arguments);
  }
  static getByUID(type: string, uid: string, options: QueryOptions, cb: RequestCallback<Document>): Promise<Document> {
    return PrismicOnce._call('getByUID', arguments);
  }
  static getSingle(type: string, options: QueryOptions, cb: RequestCallback<Document>): Promise<Document> {
    return PrismicOnce._call('getSingle', arguments);
  }
  static getBookmark(bookmark: string, options: QueryOptions, cb: RequestCallback<Document>): Promise<Document> {
    return PrismicOnce._call('getBookmark', arguments);
  }
  static getPreviewResolver(token: string, documentId?: string): PreviewResolver {
    return PrismicOnce._call('getPreviewResolver', arguments);
  }
  static previewSession(
    token: string,
    linkResolver: (doc: any) => string,
    defaultUrl: string,
    cb?: RequestCallback<string>
  ): Promise<string> {
    return PrismicOnce._call('previewSession', arguments);
  }

  static clearCache(): void {
    PrismicOnce._cache = [];
  }

  static apiEndpoint: string = null;
  static get client(): DefaultClient {
    if (!PrismicOnce.apiEndpoint) {
      throw Error(
        `Call PrismicOnce.init first to set the Prismic apiEndpoint url.\nPrismicOnce.init('https://*****.cdn.prismic.io/api/v2');`
      );
    }
    if (!PrismicOnce._client) PrismicOnce._client = Prismic.client(PrismicOnce.apiEndpoint);
    return PrismicOnce._client;
  }

  static _client = null;
  static _cache = [];
  static _call(method, args): any {
    const cacheKey: string = `${method}_${JSON.stringify(args)}`;
    if (!PrismicOnce._cache[cacheKey])
      PrismicOnce._cache[cacheKey] = PrismicOnce.client[method].apply(PrismicOnce.client, args);
    return PrismicOnce._cache[cacheKey];
  }
}
