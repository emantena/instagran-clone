
import * as firebase from 'firebase';
import { Publicacao } from '../model/publicacao.model';
import { Guid } from 'guid-typescript';
import { Injectable } from '@angular/core';
import { ProgressoService } from './progresso.service';

@Injectable()
export class DataBaseService {
    private _progressoService: ProgressoService;

    constructor(progressoService: ProgressoService) {
        this._progressoService = progressoService;
    }

    public publicar(publicacao: Publicacao, email: string): void {
        const nomeArquivo = Guid.create();

        firebase.storage()
            .ref()
            .child(`imagens/${nomeArquivo}`)
            .put(publicacao.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                // andamento do processo
                (snapshot: any) => {
                    this._progressoService.status = 'em andamento';
                    this._progressoService.estado = snapshot;
                },
                // erro
                (error) => {
                    this._progressoService.status = 'erro';
                    console.log(error);
                },
                // call back de finalização
                () => {
                    this._progressoService.status = 'concluído';

                    publicacao.imagem = nomeArquivo.toString();

                    console.log(this._progressoService.estado);

                    firebase.database()
                        .ref(`publicacoes/${btoa(email)}`)
                        .push(publicacao);
                }
            );
    }

    public obterPublicacoes(email: string): Publicacao[] {
        firebase.database()
            .ref(`publicacoes/${btoa(email)}`)
            .once('value')
            .then((snapshot: any) => {
                // console.log(snapshot.val());
                const publicacoes: Array<Publicacao> = [];

                snapshot.forEach((childSnapshot) => {
                    const publicacao: Publicacao = new Publicacao();

                    publicacao.titulo = childSnapshot.val().titulo;

                    firebase.storage()
                        .ref(`imagens/${childSnapshot.val().imagem}`)
                        .getDownloadURL()
                        .then((url: string) => {
                            publicacao.imagem = url;

                            publicacoes.push(publicacao);

                            firebase.database()
                                .ref(`usuario_detalhe/${btoa(email)}`);
                        });
                });

                return publicacoes;
                // console.log(publicacoes);
            });

        const teste = new Array<Publicacao>();
        return teste;
    }
}
