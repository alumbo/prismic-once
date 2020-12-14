import Prismic from 'prismic-javascript';

export default class PrismicOnce {
  static init(apiEndpoint) {
    PrismicOnce.apiEndpoint = apiEndpoint;
  }

  static query(q, optionsOrCallback, cb) {
    return PrismicOnce._call('query', arguments);
  }
  static queryFirst(q, optionsOrCallback, cb) {
    return PrismicOnce._call('queryFirst', arguments);
  }
  static getByID(id, options, cb) {
    return PrismicOnce._call('getByID', arguments);
  }
  static getByIDs(ids, options, cb) {
    return PrismicOnce._call('getByIDs', arguments);
  }
  static getByUID(type, uid, options, cb) {
    return PrismicOnce._call('getByUID', arguments);
  }
  static getSingle(type, options, cb) {
    return PrismicOnce._call('getSingle', arguments);
  }
  static getBookmark(bookmark, options, cb) {
    return PrismicOnce._call('getBookmark', arguments);
  }
  static getPreviewResolver(token, documentId) {
    return PrismicOnce._call('getPreviewResolver', arguments);
  }
  static previewSession(token, linkResolver, defaultUrl, cb) {
    return PrismicOnce._call('previewSession', arguments);
  }

  static clearCache() {
    PrismicOnce._cache = [];
  }

  static apiEndpoint = null;
  static get client() {
    if (!PrismicOnce.apiEndpoint) {
      throw Error(
        `Call PrismicOnce.init first to set the Prismic api end point url.\nPrismicOnce.init('https://*****.cdn.prismic.io/api/v2');`
      );
    }
    if (!PrismicOnce._client) PrismicOnce._client = Prismic.client(PrismicOnce.apiEndpoint);
    return PrismicOnce._client;
  }

  static _client = null;
  static _cache = [];
  static _call(method, args) {
    const cacheKey = `${method}_${JSON.stringify(args)}`;
    if (!PrismicOnce._cache[cacheKey])
      PrismicOnce._cache[cacheKey] = PrismicOnce.client[method].apply(PrismicOnce.client, args);
    return PrismicOnce._cache[cacheKey];
  }
}
