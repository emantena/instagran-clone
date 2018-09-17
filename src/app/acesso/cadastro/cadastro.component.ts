import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../model/usuario.model';
import { Autenticacao } from '../../services/autenticacao.service';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {
    @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();
    private _autenticacaoService: Autenticacao;

    public formularioCadastro = new FormGroup({
        'email': new FormControl(null, [
            Validators.required,
            Validators.email
        ]),
        'nome_completo': new FormControl(null, [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50)
        ]),
        'nome_usuario': new FormControl(null, [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50)
        ]),
        'senha': new FormControl(null, [
            Validators.required,
            Validators.minLength(8)
        ])
    });

    constructor(autenticacaoService: Autenticacao) {
        this._autenticacaoService = autenticacaoService;
    }

    ngOnInit() {}

    public exibirPainelLogin(): void {
        this.exibirPainel.emit('login');
    }

    public cadastrarUsuario(): void {
        const usuario = new Usuario(this.formularioCadastro.get('email').value,
        this.formularioCadastro.get('nome_completo').value,
        this.formularioCadastro.get('nome_usuario').value,
        this.formularioCadastro.get('senha').value);

        this._autenticacaoService.cadastrarUsuario(usuario)
        .then( () => { this.exibirPainelLogin(); });
    }
}
