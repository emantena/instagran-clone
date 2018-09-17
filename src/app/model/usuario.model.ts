export class Usuario {
    public email: string;
    public nome_completo: string;
    public nome_usuario: string;
    public senha: string;

    constructor(email: string, nome_completo: string, nome_usuario: string, senha: string) {
        this.email = email;
        this.nome_completo = nome_completo;
        this.nome_usuario = nome_usuario;
        this.senha = senha;
    }
}
