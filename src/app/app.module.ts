import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.route';

import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { BannerComponent } from './acesso/banner/banner.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';

// region
import { Autenticacao } from './services/autenticacao.service';
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';
import { AutenticacaoGuard } from './services/autenticacao-guard.service';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';
import { DataBaseService } from './services/dataBase.service';
import { ProgressoService } from './services/progresso.service';
// endregion

@NgModule({
    declarations: [AppComponent,
        AcessoComponent,
        BannerComponent,
        LoginComponent,
        CadastroComponent,
        HomeComponent,
        PublicacoesComponent,
        IncluirPublicacaoComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(ROUTES)
    ],
    providers: [
        Autenticacao,
        AutenticacaoGuard,
        DataBaseService,
        ProgressoService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
