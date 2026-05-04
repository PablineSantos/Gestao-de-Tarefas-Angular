import { Routes } from '@angular/router';
import {FormComponent} from './form/form';
import {DashboardComponent} from './dashboard/dashboard';
import {ListaComponent} from './list/list';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'tarefas', component: ListaComponent },
  { path: 'nova', component: FormComponent },
  { path: 'editar/:id', component: FormComponent }
];
