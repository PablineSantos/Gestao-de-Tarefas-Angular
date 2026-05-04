import { Injectable } from '@angular/core';
import {Tarefa} from '../models/tarefa/tarefa.model';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {

  private tarefas: Tarefa[] = [];

  listar(): Tarefa[] {
    return this.tarefas;
  }

  criar(tarefa: Tarefa) {
    tarefa.id = Date.now();
    tarefa.dataCriacao = new Date();
    this.tarefas.push(tarefa);
  }

  deletar(id: number) {
    this.tarefas = this.tarefas.filter(t => t.id !== id);
  }

  toggleConclusao(tarefa: Tarefa) {
    tarefa.concluida = !tarefa.concluida;
    tarefa.dataConclusao = tarefa.concluida ? new Date() : undefined;
  }
}
