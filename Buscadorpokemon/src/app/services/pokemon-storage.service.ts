import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PokemonData {
  id: number;
  name: string;
  image: string;
  type: string;
  baseExperience: number;
  esFavorito: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class PokemonStorageService {
  private http = inject(HttpClient);
  private readonly STORAGE_KEY = 'EquipoPokemonRegistrado';
  misPokemons = signal<PokemonData[]>([]);

  constructor() { 
    this.cargarDesdeStorage();
  }

  private cargarDesdeStorage() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if(data) {
      this.misPokemons.set(JSON.parse(data));
    }
  }

  //1. Obtener datos de la Api
  buscarEnAPI(nombreOId: string) {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${nombreOId.toLowerCase()}`);
  }

  //Guardar Pokemon
  guardarPokemon(nuevo: PokemonData) {
    const actualizados = [...this.misPokemons(), nuevo];
    this.misPokemons.set(actualizados);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(actualizados));
  }


  //3. Actualizar Pokemon Favorito
  actualizarFavorito(id: number) {
    const actualizados = this.misPokemons().map(
      pokemon => {
        if(pokemon.id === id) {
          return {...pokemon, esFavorito: !pokemon.esFavorito};
        }
        return pokemon;
      });
      this.misPokemons.set(actualizados);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(actualizados));
  }

  //4. Eliminar Pokemon
  eliminarPokemon(id: number) {
    const filtrados = this.misPokemons().filter(poke => poke.id !== id);
    this.misPokemons.set(filtrados);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtrados));
  }
}