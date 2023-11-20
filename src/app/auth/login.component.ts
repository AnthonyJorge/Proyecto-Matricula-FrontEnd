import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AuthService } from '../security/auth.service';
import { LoginUsuario } from '../security/login-usuario';
import { TokenService } from '../security/token.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate(300)
      ])
    ]),
    trigger('fadeInScale', [
      state('void', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate('0.5s ease-in-out')
      ])
    ]),
    trigger('buttonAnimation', [
      state('void', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      transition(':enter', [
        animate('0.3s ease-out')
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({
          transform: 'scale(0.9)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario = {};
  roles: string[] = [];
  errMsj!: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {
    console.log("constructor >> constructor >>> " + this.tokenService.getToken());
   }

  ngOnInit() {


    if (this.tokenService.getToken()) {
        this.isLogged = true;
        this.isLoginFail = false;
        this.roles = this.tokenService.getAuthorities();
   }

  }
  @Component({
    selector: 'app-tu-componente',
    templateUrl: './tu-componente.component.html',
    styleUrls: ['./tu-componente.component.css'],
    animations: [
      trigger('fadeInOut', [
        state('void', style({
          opacity: 0
        })),
        transition(':enter, :leave', [
          animate(300)
        ])
      ]),
      trigger('fadeInScale', [
        state('void', style({
          transform: 'scale(0.5)',
          opacity: 0
        })),
        transition(':enter, :leave', [
          animate('0.5s ease-in-out')
        ])
      ]),
      trigger('buttonAnimation', [
        state('void', style({
          transform: 'scale(1)',
          opacity: 1
        })),
        transition(':enter', [
          animate('0.3s ease-out')
        ]),
        transition(':leave', [
          animate('0.3s ease-in', style({
            transform: 'scale(0.9)',
            opacity: 0
          }))
        ])
      ])
    ]
  })
  onLogin(): void {
    console.log("sadasdasda");
    this.authService.login(this.loginUsuario).subscribe(
      (data:any) => {
          this.isLogged = true;
          this.tokenService.setToken(data.token);
          this.tokenService.setUserName(data.login);
          this.tokenService.setUserNameComplete(data.nombreCompleto)
          this.tokenService.setRol(data.rolNombre)
          this.tokenService.setAuthorities(data.authorities);
          this.tokenService.setUserId(data.idUsuario);
          this.tokenService.setOpciones(data.opciones);

          this.roles = data.authorities;
          this.router.navigate(['/']);
          console.log("onLogin() >> token >>> " +  this.tokenService.getToken());
          console.log("onLogin() >> setUserName >>> " +  this.tokenService.getUserName());
          console.log("onLogin() >> setUserNameComplete >>> " +  this.tokenService.getUserNameComplete());
          console.log("onLogin() >> idUsuario >>> " +  this.tokenService.getUserId());
          console.log("onLogin() >> roles >>> " +  this.tokenService.getAuthorities());
          console.log("onLogin() >> opciones >>> INICIO >> " );
          this.tokenService.getOpciones().forEach(obj => {
            console.log(" >> onLogin() >> " +  obj.nombre ); 
          });
          console.log("onLogin() >> opciones >>> FIN >> " );
      },
      (err:any) => {
          this.isLogged = false;
          this.errMsj = err.message;
          console.log(err);
          if (err.status == 401){
    
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Usuario no Autorizado",
              })

          }
      }
    );
  }

}
