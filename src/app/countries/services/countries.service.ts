import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, delay, map, Observable, of } from "rxjs";
import { Country } from "../interfaces/country";

@Injectable({ providedIn: "root" })
export class CountriesService {
  private apiUrl: string = "https://restcountries.com/v3.1";

  constructor(private http: HttpClient) {}

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
      );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  searchCapital(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${query}`;
    return this.getCountriesRequest(url);
  }

  searchCountry(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${query}`;
    return this.getCountriesRequest(url);
  }

  searchRegion(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${query}`;
    return this.getCountriesRequest(url);
  }
}
