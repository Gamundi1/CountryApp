import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{

  public countries: Country[] = [];
  public regions: Region[] = ["Africa","Americas","Asia","Europe","Oceania"];
  public selectedRegion?: Region;

constructor(public countryService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countryService.cacheStore.byRegion.region;
  }

    searchByRegion(region: Region): void {

      this.selectedRegion = region;

      this.countryService.searchRegion( region ).subscribe(countries => this.countries = countries)
    }
}
