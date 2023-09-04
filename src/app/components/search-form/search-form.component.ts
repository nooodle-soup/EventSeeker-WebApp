import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  @Output() searchFormSubmitted = new EventEmitter<any>();
  @Output() searchFormCleared = new EventEmitter<void>();

  searchForm: FormGroup | any;
  options: string[] = ['Default', 'Music', 'Sports', 'Arts & Theatre', 'Film', 'Miscellaneous'];
  defaultOption = 'Default';

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      keyword: ['', Validators.required],
      radius: [''],
      location: [''],
      category: ['Default'],
      autoDetect: [false],
    });
  }

  onSubmit() {
    if (this.searchForm.get('radius').value == '') {
      this.searchForm.patchValue({'radius':'10'});
    }
    this.searchFormSubmitted.emit(this.searchForm.value);
  }

  onClear() {
    this.searchForm.patchValue({
      keyword: '',
      radius: '',
      location: '',
      category: 'Default',
      autoDetect: false,
    });
    this.searchForm.get('location')?.enable();
    this.searchFormCleared.emit();
  }

  toggleAutoDetect(event:Event) {
    // console.log((event.target as HTMLInputElement).checked);
    if ((event.target as HTMLInputElement).checked) {
      this.searchForm.patchValue({'location':''});
      this.searchForm.get('location')?.disable();
    } else {
      this.searchForm.get('location')?.enable();
    }
  }
}



// import { Component } from '@angular/core';
// import axios from 'axios';

// @Component({
//   selector: 'app-search-form',
//   templateUrl: './search-form.component.html',
//   styleUrls: ['./search-form.component.css']
// })
// export class SearchFormComponent {
//   // keyword: string;
//   // distance: string = "10";
//   // category: string;
//   // location: string;
//   // autoDetectLocation: boolean = false;
//   // eventList: any[] = [];

//   // categoryOptions: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

//   // constructor() {
//   //   this.keyword = "";
//   //   this.distance = "10";
//   //   this.category = "Option 1";
//   //   this.location = "";
//   //   this.autoDetectLocation = false;
//   // }
  

//   // async search() {
//   //   const url = this.getSearchUrl();
//   //   console.log('API URL:', url);
//   //   try {
//   //     const response = await axios.get(url);
//   //     this.eventList = response.data;
//   //     console.log('API Response:', response.data);
//   //   } catch (error) {
//   //     console.error('API Error:', error);
//   //   }
//   // }

//   // clear() {
//   //   this.keyword = '';
//   //   this.distance = "10";
//   //   this.category = '';
//   //   this.location = '';
//   //   this.autoDetectLocation = false;
//   //   this.eventList = [];
//   // }

//   // private getSearchUrl(): string {
//   //   let url = 'https://example.com/search?';
//   //   url += `keyword=${this.keyword}&`;
//   //   url += `distance=${this.distance}&`;
//   //   url += `category=${this.category}&`;
//   //   url += `location=${this.getLocation()}&`;
//   //   return url;
//   // }

//   // private getLocation(): string {
//   //   if (this.autoDetectLocation) {
//   //     // Call IPINFO API to get current location
//   //     // Use latitude and longitude for location
//   //     // Return formatted string
//   //     return 'lat,lng';
//   //   } else {
//   //     return this.location;
//   //   }
//   // }

//   // displayEventList() {
//   //   // Call API and display event-list
//   //   this.search();
//   // }

//   // onSubmit(event: any) {
//   //   event.preventDefault();
//   //   this.search();
//   // }

//   // onClickClear(event: any) {
//   //   event.preventDefault();
//   //   this.clear();
//   // }
// }
