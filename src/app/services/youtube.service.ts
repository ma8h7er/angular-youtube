import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {environment} from '../../environments/environment';

/**
 * Youtube provider to manage Youtube functionality
 */
@Injectable()
export class YoutubeService {
  // Youtube API key: get it from Google developer console
  private apiKey = environment.youtubeApiKey;

  constructor(public api: ApiService) {}

  /**
   * Get Youtube channel by channel ID
   * @param params
   * @returns {Observable<ArrayBuffer>}
   */
  getChannel(params: any) {
    params.key = this.apiKey;
    return this.api.get('channels', params);
  }

  /**
   * Get videos from a Youtube channel by its ID
   * @param {string} channelId
   * @returns {Observable<ArrayBuffer>}
   */
  getVideos(channelId: string) {
    const params = {
      key: this.apiKey,
      part : 'snippet',
      maxResults : 12,
      playlistId : channelId,
    };
    return this.api.get('playlistItems', params);
  }
}
