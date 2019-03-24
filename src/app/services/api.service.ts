/**
 * Api is a generic REST Api handler. Set your API url first.
 */
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

/**
 * Api provider to manage all API needed requests
 */
@Injectable()
export class ApiService {
  url = 'https://www.googleapis.com/youtube/v3';

  constructor(public http: HttpClient) {}

  /**
   * Making a GET request
   * @param {string} endpoint
   * @param params
   * @param reqOpts
   * @returns {Observable<ArrayBuffer>}
   */
  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      const keys = Object.keys(params);
      for (const k of keys) {
        if (k) {
          reqOpts.params = reqOpts.params.append(k, params[k]);
        }
      }
    } else {
      reqOpts.params = null;
    }
    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }
}
