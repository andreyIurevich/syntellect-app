import { getCountryByName } from '../services/apiService';
import { makeAutoObservable, runInAction } from 'mobx';
import { nanoid } from 'nanoid';
import { CountryInfoBase, CountryInfo } from '../services/serverResponseInterface';

export default class AutoCompleteViewModel {
  constructor(public maxPromptLength: number) {
    this.maxPromptLength = maxPromptLength;
    makeAutoObservable(this);
  }

  public isLoading: boolean = false;
  public searchResult: Array<CountryInfo> = [];

  private removeDuplicates(countries: Array<CountryInfoBase>): Array<CountryInfo> {
    return countries.reduce((acc: Array<CountryInfo>, currentValue: CountryInfoBase) => {
      const callBack = (item: CountryInfo) => item.name === currentValue.name ||
        item.fullName === currentValue.fullName;
      const hasSamePrompt = acc.some(callBack);

      if (!hasSamePrompt) {
        acc.push({ id: nanoid(), ...currentValue });
      }

      return acc;
    }, [] as CountryInfo[]);
  }

  private applyPromptLength(countries: Array<CountryInfoBase>): Array<CountryInfoBase> {
    return countries.length > this.maxPromptLength ?
      countries.slice(0, this.maxPromptLength) :
      countries;
  }

  private convertSearchResult(countries: Array<CountryInfoBase>) {
    return this.removeDuplicates(this.applyPromptLength(countries));
  }

  public async searchCountries(searchText: string) {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const response = await getCountryByName(searchText);

      runInAction(() => {
        this.searchResult = this.convertSearchResult(response as Array<CountryInfoBase>);
        this.isLoading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.isLoading = false;
        this.searchResult = [];
      });
    }
  }
}