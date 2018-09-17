import { Usuario } from '../model/usuario.model';
import * as firebase from 'firebase';
import { LoginModel } from '../model/login.model';

export class Autenticacao {
    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resp: any) => {
                delete usuario.senha; // remove a senha do obj usuario

                firebase.database()
                    .ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    public autenticar(loginModel: LoginModel): void {
        firebase.auth().signInWithEmailAndPassword(loginModel.email, loginModel.senha)
            .then((resp: any) => {
                console.log(resp);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }
}
