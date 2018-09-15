import { Routes } from '@angular/router';

import { AcessoComponent } from './acesso/acesso.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';

export const ROUTES: Routes = [
    { path: '', component: AcessoComponent },
    { path: 'cadastro', component: CadastroComponent}
];
