import { Component } from '@angular/core';

import { TarefaService} from '../services/tarefa.service';
import { CATEGORIAS, PRIORIDADES } from '../models/tarefa.model';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [   CommonModule, FormsModule, InputTextModule, SelectModule, ButtonModule],
  templateUrl: './form.html',
})
export class FormComponent {

  tarefa: any = {
    titulo: '',
    descricao: '',
    categoria: null,
    prioridade: null,
    concluida: false
  };

  categorias = CATEGORIAS;
  prioridades = PRIORIDADES;

  constructor(private service: TarefaService) {}

  salvar(): void {
    if (!this.tarefa.titulo || this.tarefa.titulo.length < 3) {
      alert('Título deve ter pelo menos 3 caracteres');
      return;
    }

    this.service.criar(this.tarefa);
    alert('Tarefa criada!');
  }
}
