import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  {
  loginForm: FormGroup = this.fb.group({
    idaplicacion: ['1'],
    username    : ['', [Validators.required]],
    password    : ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}


  login() {
    this.spinner.show();
    this.authService.login(this.loginForm.value).subscribe((resp) => {
      // console.log('CREDENCIALES', resp.user);

      if (resp.user.aplicacion == 1 && resp.user.acceso == 1) {
        this.spinner.hide();
        Swal.fire(
          'Inicio de Sesión',
          'Bienvenid@ <br />' + `${resp.user.nombres} ${resp.user.apellidoPaterno}`,
          'success'
        );
        this.router.navigateByUrl('home');
      } else {
        Swal.fire('Inicio de Sesión', 'Credenciales incorrectas', 'error');
      }
    });
  }

  campoNoValido(campo: string): boolean {
    if (this.loginForm.get(campo)?.invalid && this.loginForm.get(campo)?.touched ) {
      return true;
    } else {
      return false;
    }
  }
}
