import { getCountryByName, CountryInfo } from '../api/apiService';
import { makeAutoObservable, runInAction } from 'mobx';

export default class AutoCompleteViewModel {
  constructor(public maxPromptLength: number) {
    this.maxPromptLength = maxPromptLength;
    makeAutoObservable(this);
  }

  public searchResult: Array<CountryInfo> = [];

  private removeDuplicates(countries: Array<CountryInfo>): Array<CountryInfo> {
    return countries.reduce((acc: Array<CountryInfo>, currentValue: CountryInfo) => {
      const callBack = (item: CountryInfo) => item.name === currentValue.name ||
        item.fullName === currentValue.fullName;
      const hasSamePrompt = acc.some(callBack);

      if (!hasSamePrompt) {
        acc.push(currentValue);
      }

      return acc;
    }, []);
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
      const response = await getCountryByName(searchText);

      runInAction(() => {
        this.searchResult = this.convertSearchResult(response as Array<CountryInfo>);
      });
    } catch (err) {
      console.log('-> error ', err);
    }
  }
}