import { getCountryByName, CountryInfo } from '../api/apiService';
import { makeAutoObservable, runInAction } from 'mobx';
import { nanoid } from 'nanoid';

interface ICountryInfo extends CountryInfo {
  id: string,
}

export default class AutoCompleteViewModel {
  constructor(public maxPromptLength: number) {
    this.maxPromptLength = maxPromptLength;
    makeAutoObservable(this);
  }

  public isLoading: boolean = false;
  public searchResult: Array<ICountryInfo> = [];

  private removeDuplicates(countries: Array<CountryInfo>): Array<ICountryInfo> {
    return countries.reduce((acc: Array<ICountryInfo>, currentValue: CountryInfo) => {
      const callBack = (item: CountryInfo) => item.name === currentValue.name ||
        item.fullName === currentValue.fullName;
      const hasSamePrompt = acc.some(callBack);

      if (!hasSamePrompt) {
        acc.push({ id: nanoid(), ...currentValue });
      }

      return acc;
    }, [] as ICountryInfo[]);
  }

  private applyPromptLength(countries: Array<CountryInfo>): Array<CountryInfo> {
    return countries.length > this.maxPromptLength ?
      countries.slice(0, this.maxPromptLength) :
      countries;
  }

  private convertSearchResult(countries: Array<CountryInfo>) {
    return this.removeDuplicates(this.applyPromptLength(countries));
  }

  public async searchCountries(searchText: string) {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const response = await getCountryByName(searchText);

      runInAction(() => {
        this.searchResult = this.convertSearchResult(response as Array<CountryInfo>);
        this.isLoading = false;
      });
    } catch (err) {
      console.log('-> error ', err);
    }
  }
}