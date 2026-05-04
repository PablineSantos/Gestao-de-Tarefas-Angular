import { Component } from '@angular/core';

import { TarefaService} from '../services/tarefa.service';
import {CATEGORIAS, PRIORIDADES, Tarefa} from '../models/tarefa.model';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { SelectModule } from 'primeng/select';
import {ActivatedRoute, Router} from '@angular/router';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, SelectModule, ButtonModule, Card],
  templateUrl: './form.html',
})
export class FormComponent {

  tarefa: Partial<Tarefa> =  {
    titulo: '',
    descricao: '',
    categoria: '',
    prioridade: '',
    concluida: false
  };
  modoEdicao = false;

  readonly categorias = CATEGORIAS;
  readonly prioridades = PRIORIDADES;

  constructor(private service: TarefaService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const tarefa = this.service.buscarPorId(Number(id));
      if (tarefa) {
        this.tarefa = { ...tarefa };
        this.modoEdicao = true;
      }
    }
  }
  voltar(): void {
    this.router.navigate(['/tarefas']);
  }

  salvar(): void {

    if (!this.tarefa.titulo || this.tarefa.titulo.length < 3) {
      alert('Título deve ter pelo menos 3 caracteres');
      return;
    }

    if (this.modoEdicao) {
      this.service.atualizar(this.tarefa as Tarefa);
    } else {
      this.service.criar(this.tarefa as Omit<Tarefa, 'id' | 'dataCriacao' | 'dataConclusao'>);
    }

    this.router.navigate(['/tarefas']);
  }
}
