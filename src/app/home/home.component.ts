import { Component, OnInit } from '@angular/core';
import { Autenticacao } from '../services/autenticacao.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private _autenticacaoService: Autenticacao;

    constructor(autenticacaoService: Autenticacao) {
        this._autenticacaoService = autenticacaoService;
    }

    ngOnInit() {}

    public logout(): void {
        this._autenticacaoService.logout();
    }
}
