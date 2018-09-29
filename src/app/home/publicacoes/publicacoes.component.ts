import { Component, OnInit } from '@angular/core';
import { Autenticacao } from '../../services/autenticacao.service';
import { DataBaseService } from '../../services/dataBase.service';
import * as firebase from 'firebase';

@Component({
    selector: 'app-publicacoes',
    templateUrl: './publicacoes.component.html',
    styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {
    private email: string;

    constructor(private _autenticacaoService: Autenticacao,
        private _dataBaseService: DataBaseService
     ) {}

    ngOnInit() {
        firebase.auth().onAuthStateChanged((user) => {
            this.email = user.email;
            this.obterPublicacoes();
        });

    }

    private obterPublicacoes(): any {
        this._dataBaseService.obterPublicacoes(this.email);
    }
}
