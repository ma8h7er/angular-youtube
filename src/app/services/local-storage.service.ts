import { Injectable } from '@angular/core';

/**
 * Local Storage provider to manage saving and getting data from local storage of the browser
 */
@Injectable()
export  class LocalStorageService {

  constructor() {}

  /**
   * Get saved item from local storage by its key
   * @param key
   * @returns JSON | {null}
   */
  get(key: any) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
  }

  /**
   * Save new item in the local storage
   * @param key
   * @param value
   */
  set(key:any, value:any) {
    const data = JSON.stringify(value);
    if (data) {
      localStorage.setItem(key, data);
    }
  }

  /**
   * Clear all saved data for the app in local storage
   */
  clearAll() {
    localStorage.clear();
  }
}
