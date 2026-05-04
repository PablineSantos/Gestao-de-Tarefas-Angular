import {Component, OnInit} from '@angular/core';
import {CardModule} from 'primeng/card';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {TarefaService} from '../services/tarefa.service';
import {Tarefa} from "../models/tarefa.model";
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-tarefa-lista',
  standalone: true,
  imports: [FormsModule, CardModule, ButtonModule, CheckboxModule, CommonModule],
  templateUrl: './list.html'
})
export class TarefaListaComponent implements OnInit {

  tarefas: Tarefa[] = [];

  constructor(private service: TarefaService) {
  }

  ngOnInit() {
    this.tarefas = this.service.listar();
  }

  toggle(tarefa: Tarefa) {
    this.service.toggleConclusao(tarefa);
  }

  excluir(id: number) {
    if (confirm('Deseja excluir?')) {
      this.service.deletar(id);
    }
  }
}
