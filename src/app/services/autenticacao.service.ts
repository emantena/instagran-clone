import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario.model';

import * as firebase from 'firebase';
import { LoginModel } from '../model/login.model';

@Injectable()
export class Autenticacao {
    public token_id: string;
    private _route: Router;

    constructor(route: Router) {
        this._route = route;
    }

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resp: any) => {
                this.cadastrarUsuarioDetalhe(usuario);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    public autenticar(loginModel: LoginModel): void {
        firebase
            .auth()
            .signInWithEmailAndPassword(loginModel.email, loginModel.senha)
            .then((resp: any) => {
                firebase
                    .auth()
                    .currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.setTokenLocalStorage(idToken);
                        this._route.navigate(['/home']);
                    });
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    public logout(): void {
        firebase
            .auth()
            .signOut()
            .then(() => {
                window.localStorage.removeItem('token_id');
                this._route.navigate(['']);
            });
    }

    public estaAutenticado(): boolean {
        this.token_id = window.localStorage.getItem('token_id');

        if (this.token_id === null) {
            this._route.navigate(['/']);
        }

        return this.token_id !== null;
    }

    private cadastrarUsuarioDetalhe(usuario: Usuario): void {
        delete usuario.senha; // remove a senha do obj usuario
        firebase
            .database()
            .ref(`usuario_detalhe/${btoa(usuario.email)}`)
            .set(usuario);
    }

    private setTokenLocalStorage(idToken: string) {
        this.token_id = idToken;
        window.localStorage.setItem('token_id', idToken);
    }
}
