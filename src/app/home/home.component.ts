import { Component, OnInit, ViewChild } from '@angular/core';
import { Autenticacao } from '../services/autenticacao.service';
import { Publicacao } from '../model/publicacao.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private _autenticacaoService: Autenticacao;
    private email: string;

    @ViewChild('publicacoes')
    public publicacoes: Publicacao[];

    constructor(autenticacaoService: Autenticacao) {
        this._autenticacaoService = autenticacaoService;
    }

    ngOnInit() { }

    public logout(): void {
        this._autenticacaoService.logout();
    }

    public atualizarTimeline(): void {
        this.publicacoes.obterPublicacoes();
        console.log('teste.....');
    }
}
