import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pokemon, PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private pokemonService = inject(PokemonService);

  query = '';
  loading = signal(false);
  error = signal<string | null>(null);
  pokemon = signal<Pokemon | null>(null);

  onSubmit(event?: Event): void {
    event?.preventDefault();
    const term = this.query.trim();
    if (!term) {
      this.error.set('Escribe el nombre o número de un Pokémon.');
      this.pokemon.set(null);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.pokemonService.search(term).subscribe({
      next: (result) => {
        this.pokemon.set(result);
        this.loading.set(false);
      },
      error: () => {
        this.pokemon.set(null);
        this.error.set(`No se encontró ningún Pokémon con "${term}".`);
        this.loading.set(false);
      },
    });
  }

  padId(id: number): string {
    return `#${id.toString().padStart(3, '0')}`;
  }

  formatMeters(dm: number): string {
    return `${(dm / 10).toFixed(1)} m`;
  }

  formatKg(hg: number): string {
    return `${(hg / 10).toFixed(1)} kg`;
  }

  statLabel(name: string): string {
    const labels: Record<string, string> = {
      hp: 'HP',
      attack: 'Ataque',
      defense: 'Defensa',
      'special-attack': 'At. Esp.',
      'special-defense': 'Def. Esp.',
      speed: 'Velocidad',
    };
    return labels[name] ?? name;
  }
}
