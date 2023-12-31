import { Component, OnInit } from '@angular/core';
import { TokenService } from '../security/token.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isLogged = false;
  nombreUsuario = "";
  nombre = "";

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUserNameComplete()|| '{}';
      this.nombre = this.tokenService.getRol() || '{}';
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
      this.nombre = '';
    }
  }

}
