import { Injectable, inject, signal } from '@angular/core';
import {httpClient} from '@angular/common/http';

export interface PokemonData {
  id: number;
  name: string;
  image: string;
  types: string;
  baseExperience: number;
  esFavorito: boolean;
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

  //1. Obtener datos de la Api
  buscarEnAPI(nombre0Id: string) {
    return this.http<any>('https://pokeapi.co/api/v2/pokemon/${nombre0Id.toLowerCase}')
  }

  //Guardar Pokemon
  guardarPokemon(nuevo: PokemonTarjeta) {
    const actualizados = [...misPokemons(), nuevo];
    this.misPokemons.set(actualizados);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(actualizados))
  }


  //3. Actualizar Pokemon Favorito
  actualizarFavorito(id: number) {
    const actualizados = this.misPokemons().map(
      Poke => {
        if(Poke.id === id) {
          return {...Poke, esFavorito: !Poke.esFavorito}
        }
        return Poke;
      });
      this.misPokemons.set(actualizados)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(actualizados))
  }

  //4. Eliminar Pokemon
  eliminarPokemon(id: number){
    const filtrados = this.misPokemons().filter(poke => poke.id !==id);
    this.misPokemons.set(filtrados);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtrados));
  }
}
   ng 