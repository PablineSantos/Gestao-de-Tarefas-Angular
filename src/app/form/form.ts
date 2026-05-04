import { Component } from '@angular/core';

import { TarefaService} from '../services/tarefa.service';
import {CATEGORIAS, PRIORIDADES, Tarefa} from '../models/tarefa.model';
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

  tarefa: Omit<Tarefa, 'id' | 'dataCriacao' | 'dataConclusao'> =  {
    titulo: '',
    descricao: '',
    categoria: '',
    prioridade: '',
    concluida: false
  };

  readonly categorias = CATEGORIAS;
  readonly prioridades = PRIORIDADES;

  constructor(private service: TarefaService) {}

  salvar(): void {
    if (!this.tarefa.titulo || this.tarefa.titulo.length < 3) {
      alert('Título deve ter pelo menos 3 caracteres');
      return;
    }

    this.service.criar(this.tarefa);
    this.tarefa = {
      titulo: '',
      descricao: '',
      categoria: '',
      prioridade: '',
      concluida: false
    };
    alert('Tarefa criada!');
  }
}
