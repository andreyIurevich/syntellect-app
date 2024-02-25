export interface CountryInfoBase {
  name: string;
  fullName: string;
  flag: string;
}

export interface CountryInfo extends CountryInfoBase {
  id: string,
}