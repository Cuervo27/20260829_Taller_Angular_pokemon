import { Injectable, inject, signal } from '@angular/core';
import {httpClient} from '@angular/common/http';

export interface PokemonData {
  id: number;
  name: string;
  image: string;
  types: string;
  baseExperience: number;
  esFavorito?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class PokemonStorageService {
  private http = inject(httpClient);
  private readonly STORAGE_KEY = 'EquipoPokemonRegistrado';
  misPokemons = signal<PokemonTarjeta[]>([]);

  constructor() { 
    this.CargarDesdeStorage();
  }

  private CargarDesdeStorage() {
    const Data = localStorage.getItem(this.STORAGE_KEY);
    if(Data) {
      this.misPokemons.set(JSON.parse(Data));
    }
  }
  private http = inject(httpClient);
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
