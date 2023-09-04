export interface SearchForm {
  keyword: string;
  radius : string;
  category: string;
  location?: string;
  latlong?: string;
  autoDetect?: boolean;
}
