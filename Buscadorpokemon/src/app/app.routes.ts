import { Routes } from '@angular/router';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { BuscadorPokemonComponent} from './components/buscador-pokemon/buscador-pokemon.component';

export const routes: Routes = [
    { path: 'registro', component: RegistroUsuarioComponent },
    { path: 'buscador', component: BuscadorPokemonComponent },
    { path: '', redirectTo: '/registro', pathMatch: 'full' }
];