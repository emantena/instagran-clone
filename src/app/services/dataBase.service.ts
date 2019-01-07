
import * as firebase from 'firebase';
import { Publicacao } from '../model/publicacao.model';
import { Guid } from 'guid-typescript';
import { Injectable } from '@angular/core';
import { ProgressoService } from './progresso.service';
import { resolve, reject } from 'q';

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

                    firebase.database()
                        .ref(`publicacoes/${btoa(email)}`)
                        .push(publicacao);
                }
            );
    }

    public obterPublicacoes(email: string): Promise<Publicacao[]> {
        return new Promise((resolve, reject) => {

        firebase.database()
            .ref(`publicacoes/${btoa(email)}`)
            .orderByKey()
            .once('value')
            .then((snapshot: any) => {
                // console.log(snapshot.val());
                const publicacoes: Array<Publicacao> = [];

                snapshot.forEach((childSnapshot) => {
                    const publicacao: Publicacao = new Publicacao();

                    publicacao.titulo = childSnapshot.val().titulo;
                    publicacao.imagem = childSnapshot.val().imagem;
                    publicacao.key = childSnapshot.key;

                    publicacoes.push(publicacao);
                });

                return publicacoes.reverse();
            })
            .then((publicacoes) => {
                publicacoes.forEach((publicacao) => {
                    firebase.storage()
                        .ref(`imagens/${publicacao.imagem}`)
                        .getDownloadURL()
                        .then((url: string) => {
                            publicacao.imagem = url;

                            firebase.database()
                                .ref(`usuario_detalhe/${btoa(email)}`)
                                    .once('value')
                                    .then((usuario) => {
                                        publicacao.autor = usuario.val().nome_completo;
                                    });
                        });
                });

                resolve(publicacoes);
            });
        });
    }
}
