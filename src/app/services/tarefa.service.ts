import { Injectable } from '@angular/core';
import {Tarefa} from '../models/tarefa.model';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {

  private tarefas: Tarefa[] = [];

  listar(): Tarefa[] {
    return [...this.tarefas];
  }

  criar(tarefa: Omit<Tarefa, 'id' | 'dataCriacao' | 'dataConclusao'>): void {
    const novaTarefa: Tarefa = {
      ...tarefa,
      id: Date.now(),
      dataCriacao: new Date(),
      dataConclusao: undefined
    };

    this.tarefas.push(novaTarefa);
  }

  deletar(id: number) {
    this.tarefas = this.tarefas.filter(t => t.id !== id);
  }

  toggleConclusao(tarefa: Tarefa) {
    tarefa.concluida = !tarefa.concluida;
    tarefa.dataConclusao = tarefa.concluida ? new Date() : undefined;
  }
  contarConcluidas(): number {
    return this.tarefas.filter(t => t.concluida).length;
  }

  contarPendentes(): number {
    return this.tarefas.filter(t => !t.concluida).length;
  }
}
