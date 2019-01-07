import { Component, OnInit } from '@angular/core';
import { Autenticacao } from '../../services/autenticacao.service';
import { DataBaseService } from '../../services/dataBase.service';
import * as firebase from 'firebase';
import { Publicacao } from '../../model/publicacao.model';

@Component({
    selector: 'app-publicacoes',
    templateUrl: './publicacoes.component.html',
    styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {
    private email: string;
    public publicacoes: Publicacao[];

    constructor(private _autenticacaoService: Autenticacao,
        private _dataBaseService: DataBaseService
     ) {}

    ngOnInit() {
        firebase.auth().onAuthStateChanged((user) => {
            this.email = user.email;
            this.obterPublicacoes();
        });

    }

    public obterPublicacoes(): any {
        this._dataBaseService.obterPublicacoes(this.email)
            .then((publicacoes: Publicacao[]) => {
                this.publicacoes = publicacoes;
            });
    }
}
