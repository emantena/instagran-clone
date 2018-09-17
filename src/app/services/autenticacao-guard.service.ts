import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Autenticacao } from './autenticacao.service';

@Injectable()
export class AutenticacaoGuard implements CanActivate {
    private _autenticacaoService: Autenticacao;

    constructor(autenticacaoService: Autenticacao) {
        this._autenticacaoService = autenticacaoService;
    }

    canActivate(): boolean {
        return this._autenticacaoService.estaAutenticado();
    }

}
