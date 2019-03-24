import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {YoutubeService} from './services/youtube.service';
import {DomSanitizer} from '@angular/platform-browser';
import {LocalStorageService} from './services/local-storage.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  searchForm: FormGroup;
  buttonDisabled: boolean = false;
  loadingIndicator: boolean = false;
  videos: any[] = [];
  channelTitle = '';

  constructor(private fb: FormBuilder,
              private youtubeService: YoutubeService,
              public sanitizer: DomSanitizer,
              private localStorageService: LocalStorageService) {

  }

  ngOnInit(): void {
    this.initSearchForm();
    this.onChanges();
  }

  /**
   * Initialize search form using Reactive Forms Builder
   */
  initSearchForm() {
    this.searchForm = this.fb.group({
      id: ['UCP4bf6IHJJQehibu6ai__cg', [Validators.required]],
      part: ['contentDetails']
    });
  }

  /**
   * Detecting changes in search form to enable / disable submit buttons
   */
  onChanges(): void {
    if (this.searchForm) {
      this.buttonDisabled = this.searchForm.invalid;
      this.searchForm.valueChanges.subscribe(val => {
        this.buttonDisabled = this.searchForm.invalid;
      });
    }
  }

  /**
   * Get videoes from a Youtube channel
   * @param {boolean} force : force get videos from API not saved in localstorage
   */
  getVideos(force?: boolean) {
    if (this.searchForm.valid) {
      this.videos = [];
      this.buttonDisabled = true;
      this.loadingIndicator = true;
      this.channelTitle = this.localStorageService.get('youtube_channel_title');
      const videos = this.localStorageService.get('youtube_videos');
      // if there are videos saved in local storage and not force getting from API
      if (videos && !force) {
        this.videos = this.formatVideos(videos);
        this.buttonDisabled = false;
        this.loadingIndicator = false;
      } else {
        // firstly getting the channel by its ID, to get information about uploads list in this channel
        this.youtubeService.getChannel(this.searchForm.value).subscribe((response: any) => {
          if (response.items.length) {
            // get uploads list from the channel
            this.youtubeService.getVideos(response.items[0].contentDetails.relatedPlaylists.uploads).subscribe((data: any) => {
              if (data.items.length) {
                this.videos = this.formatVideos(data.items);
                this.channelTitle = this.videos[0].snippet.channelTitle;
                this.localStorageService.set('youtube_channel_title', this.channelTitle);
                this.localStorageService.set('youtube_videos', this.videos);
              }

              this.buttonDisabled = false;
              this.loadingIndicator = false;
            });
          } else {
            this.buttonDisabled = false;
            this.loadingIndicator = false;
          }
        }, error => console.log(error));
      }
    }
  }

  /**
   * Passing Angular security for external links to enable embed videos
   * get every video note or initialize it as blank
   * @param videos
   * @returns {any}
   */
  formatVideos(videos: any) {
    return videos.map(v => {
      v.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${v.snippet.resourceId.videoId}`);
      v.note = v.note ? v.note : '';
      return v;
    });
  }

  /**
   * Clear saved items and force Youtube API call
   */
  forceRefresh() {
    this.localStorageService.clearAll();
    this.getVideos(true);
  }

  /**
   * When drop a video card into new position move it in the vidoes array and save in local storage
   * In future will be saved in the DB
   * @param {CdkDragDrop<any[]>} event
   */
  onDropVideo(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.videos, event.previousIndex, event.currentIndex);
    this.localStorageService.set('youtube_videos', this.videos);
  }

  /**
   * Save a note for each video
   * In future will be saved in the DB
   * @param video
   */
  saveVideoNote(video: any) {
    this.localStorageService.set('youtube_videos', this.videos);
  }
}
