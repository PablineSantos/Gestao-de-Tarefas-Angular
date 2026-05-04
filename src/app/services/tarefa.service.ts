import { Injectable } from '@angular/core';
import {Tarefa} from '../models/tarefa.model';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  constructor() {
    this.carregar();
  }
  private salvar(): void {
    localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
  }

  private carregar(): void {
    const dados = localStorage.getItem('tarefas');
    if (dados) {
      this.tarefas = JSON.parse(dados);
    }
  }
  private tarefas: Tarefa[] = [];

  listar(): Tarefa[] {
    return this.tarefas;
  }

  criar(tarefa: Omit<Tarefa, 'id' | 'dataCriacao' | 'dataConclusao'>): void {
    const novaTarefa: Tarefa = {
      ...tarefa,
      id: Date.now(),
      dataCriacao: new Date(),
      dataConclusao: undefined
    };

    this.tarefas.push(novaTarefa);
    this.salvar();
  }

  deletar(id: number) {
    this.tarefas = this.tarefas.filter(t => t.id !== id);
    this.salvar();
  }

  atualizarStatus(tarefa: Tarefa): void {
    tarefa.dataConclusao = tarefa.concluida ? new Date() : undefined;
    this.salvar();
  }
  contarConcluidas(): number {
    return this.tarefas.filter(t => t.concluida).length;
  }

  contarPendentes(): number {
    return this.tarefas.filter(t => !t.concluida).length;
  }
  buscarPorId(id: number): Tarefa | undefined {
    return this.tarefas.find(t => t.id === id);
  }

  atualizar(tarefaAtualizada: Tarefa): void {
    this.tarefas = this.tarefas.map(t =>
      t.id === tarefaAtualizada.id ? tarefaAtualizada : t
    );
    this.salvar();
  }

  contarPorPrioridade(prioridade: string): number {
    return this.tarefas.filter(t => t.prioridade === prioridade).length;
  }
}
