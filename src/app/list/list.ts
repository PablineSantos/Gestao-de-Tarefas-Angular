import {Component, OnInit} from '@angular/core';
import {CardModule} from 'primeng/card';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {TarefaService} from '../services/tarefa.service';
import {CATEGORIAS, PRIORIDADES, Tarefa} from "../models/tarefa.model";
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {SelectModule } from 'primeng/select';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [FormsModule, CardModule, ButtonModule, CheckboxModule, CommonModule, SelectModule ],
  templateUrl: './list.html'
})
export class ListaComponent implements OnInit {

  tarefas: Tarefa[] = [];
  readonly categorias = CATEGORIAS;
  readonly prioridades = PRIORIDADES;
  constructor(private service: TarefaService, private router: Router) {}

  ngOnInit():void {
    this.tarefas = this.service.listar();
  }

  atualizarStatus(tarefa: Tarefa): void {
    this.service.atualizarStatus(tarefa);
  }

  editar(id: number): void {
    this.router.navigate(['/editar', id]);
  }

  excluir(id: number):void {
    if (confirm('Deseja excluir?')) {
      this.service.deletar(id);
    }

  }
  nova(): void {
    this.router.navigate(['/nova']);
  }

  filtroCategoria = '';
  filtroPrioridade = '';
  filtroStatus = '';
  busca = '';

  get tarefasFiltradas(): Tarefa[] {
    return this.tarefas.filter(t => {

      const matchCategoria =
        !this.filtroCategoria || t.categoria === this.filtroCategoria;

      const matchPrioridade =
        !this.filtroPrioridade || t.prioridade === this.filtroPrioridade;

      const matchStatus =
        !this.filtroStatus ||
        (this.filtroStatus === 'concluida' && t.concluida) ||
        (this.filtroStatus === 'pendente' && !t.concluida);

      const matchBusca =
        !this.busca ||
        t.titulo.toLowerCase().includes(this.busca.toLowerCase()) ||
        t.descricao.toLowerCase().includes(this.busca.toLowerCase());

      return matchCategoria && matchPrioridade && matchStatus && matchBusca;
    });
  }

}
