import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private API_URL: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.API_URL}/alpha/${code}`;
    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.API_URL}/capital/${term}`)
      .pipe(catchError(() => of([])));
  }

  searchCountries(term: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.API_URL}/name/${term}`)
      .pipe(catchError(() => of([])));
  }

  searchRegion(region: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.API_URL}/region/${region}`)
      .pipe(catchError(() => of([])));
  }
}