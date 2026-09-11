import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Usuario {
    id : number;
    nombreCompleto : string;
    documento : { 
      tipo: string;
      numero: string
    };
    fechaNacimiento : string;
    correo : string;
    datosPersonales : boolean;  
    fechaRegistro: string;

}


@Component({
  imports: [FormsModule],
  selector: 'app-registro-usuario',
  standalone: true,
  styleUrl: './registro-usuario.component.css',
  templateUrl: './registro-usuario.component.html',
})
export class RegistroUsuarioComponent {
  nombre = signal('');
  apellido = signal('');
  tipoDoc = signal('CC');
  dni = signal('');
  fechaNacimiento = signal('');
  correo = signal('');
  datosPersonales = signal(false);

    ultimoUsuario = signal<Usuario | null>(null);

    guardarUsuario() {
        if(!this.datosPersonales()){
          console.error('Debes aceptar el tratamiento de datos personales');
          return;
        }

        const usuarioCreado = {
        id : Date.now(),
        nombreCompleto : `${this.nombre()} ${this.apellido()}`,
        documento : {
          tipo: this.tipoDoc(),
          numero: this.dni()
        },
        fechaNacimiento : this.fechaNacimiento(),
        correo : this.correo(),
        datosPersonales : this.datosPersonales(),  
        fechaRegistro: new Date().toLocaleDateString()
    }

    localStorage.setItem(usuarioCreado.id.toString(), JSON.stringify(usuarioCreado));

    this.ultimoUsuario.set(usuarioCreado);

    }
}
