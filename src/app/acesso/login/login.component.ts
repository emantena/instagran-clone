import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Autenticacao } from '../../services/autenticacao.service';
import { LoginModel } from '../../model/login.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

    public formularioLogin = new FormGroup({
        'email': new FormControl(null, [
            Validators.required
        ]),
        'senha': new FormControl(null, [
            Validators.required
        ])
    });

    // region services
    private _autenticacaoService: Autenticacao;
    // endregion
    constructor(autenticacao: Autenticacao) {
        this._autenticacaoService = autenticacao;
    }

    ngOnInit() {}

    public exibirPainelCadastro(): void {
        this.exibirPainel.emit('cadastro');
    }

    public autenticar(): void {
        const loginModel = new LoginModel(this.formularioLogin.get('email').value, this.formularioLogin.get('senha').value);

        this._autenticacaoService.autenticar(loginModel);
    }
}
