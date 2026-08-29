import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PokemonType {
  slot: number;
  type: { name: string; url: string };
}

export interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

export interface PokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
      dream_world?: {
        front_default: string | null;
      };
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: string[];
  stats: { name: string; value: number }[];
}

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  search(query: string): Observable<Pokemon> {
    const term = query.trim().toLowerCase();
    return new Observable<Pokemon>((subscriber) => {
      const sub = this.http
        .get<PokemonResponse>(`${this.baseUrl}/${encodeURIComponent(term)}`)
        .subscribe({
          next: (res) => {
            subscriber.next(this.mapPokemon(res));
            subscriber.complete();
          },
          error: (err) => subscriber.error(err),
        });
      return () => sub.unsubscribe();
    });
  }

  private mapPokemon(res: PokemonResponse): Pokemon {
    const image =
      res.sprites.other?.['official-artwork']?.front_default ||
      res.sprites.other?.dream_world?.front_default ||
      res.sprites.front_default ||
      '';

    return {
      id: res.id,
      name: res.name,
      image,
      height: res.height,
      weight: res.weight,
      types: res.types.map((t) => t.type.name),
      stats: res.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
    };
  }
}
