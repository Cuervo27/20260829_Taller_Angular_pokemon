import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';
import { PokemonStorageService, PokemonData } from '../../services/pokemon-storage.service';
import { ResaltarTarjetaDirective } from '../../directives/resaltar-tarjeta.directive';

@Component({
  selector: 'app-buscador-pokemon',
  standalone: true,
  imports: [FormsModule, NgClass, NgStyle, ResaltarTarjetaDirective],
  templateUrl: './buscador-pokemon.component.html',
  styleUrl: './buscador-pokemon.component.css'
})

export class BuscadorPokemonComponent {

  pokemonService = inject(PokemonStorageService)

  nombrePokemonInput = signal('');
  pokemon = signal<PokemonData | null>(null);
  mensajeError = signal<string | null>(null);
  cargando = signal(false);

  buscarPokemon() {

    const nombrePokemon = this.nombrePokemonInput().trim().toLowerCase();

    if(!nombrePokemon) return;

    this.cargando.set(true);
    this.mensajeError.set(null);

    this.pokemonService.buscarEnAPI(nombrePokemon).subscribe({
      next: (res: any) => {
        this.pokemon.set({
          id: res.id,
          name: res.name.toUpperCase(),
          image: res.sprites.front_default,
          type: res.types[0].type.name,
          baseExperience: res.base_experience,
          esFavorito: false
        });
        this.cargando.set(false);
      }, error: () => {
        this.pokemon.set(null);
        this.mensajeError.set('Ojito, Pokemon no encontrado pirobo');
        this.cargando.set(false);
      }
    });
    
  }

  onInputChange(event: any) {
    this.nombrePokemonInput.set(event.target.value);
  }

  guardarEnEquipo() {
    const poke = this.pokemon();
    if(poke) {
      this.pokemonService.guardarPokemon(poke);
      alert(`${poke.name} agregado al almacenamiento exitosamente`);
      this.pokemon.set(null);
      this.nombrePokemonInput.set('');
    }
  }
}