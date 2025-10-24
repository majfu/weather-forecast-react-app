export interface City {
  name: string;
  local_names?: {
    [key: string]: string | undefined;
    ascii?: string;
    feature_name?: string;
  };
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
