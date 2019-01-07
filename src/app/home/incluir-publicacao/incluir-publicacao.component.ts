import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as firebase from 'firebase';

import { DataBaseService } from '../../services/dataBase.service';
import { ProgressoService } from '../../services/progresso.service';

import { Publicacao } from '../../model/publicacao.model';

@Component({
    selector: 'app-incluir-publicacao',
    templateUrl: './incluir-publicacao.component.html',
    styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {
    private _dataBaseService: DataBaseService;
    private _progressoService: ProgressoService;
    private email: string;
    private publicacao = new Publicacao();

    @Output()
    public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>();

    public formulario = new FormGroup({
        'titulo': new FormControl(null)
    });
    public porcentagemUpload = 0;
    public statusUpload = 'pendente';

    constructor(dataBaseService: DataBaseService, progressoService: ProgressoService) {
        this._dataBaseService = dataBaseService;
        this._progressoService = progressoService;
    }

    ngOnInit() {
        firebase.auth().onAuthStateChanged((user) => {
            this.email = user.email;
        });
    }

    public prepararImagemUpload(evento: Event): void {
        this.publicacao.imagem = (<HTMLInputElement>evento.target).files[0];
    }

    public publicar(): void {
        this.publicacao.titulo = this.formulario.get('titulo').value;
        this._dataBaseService.publicar(this.publicacao, this.email);

        const acompanhamentoUpload = interval(1500);

        const continua = new Subject();
        continua.next(true);

        acompanhamentoUpload
        .pipe(takeUntil(continua))
        .subscribe(() => {
            const statusUpload = this._progressoService.estado;
            this.porcentagemUpload = Math.floor((statusUpload.bytesTransferred / statusUpload.totalBytes) * 100);

            if (this._progressoService.status === 'concluído') {
                continua.next(false);
                this.atualizarTimeLine.emit();
            }

            this.statusUpload = this._progressoService.status;
        });
    }
}
