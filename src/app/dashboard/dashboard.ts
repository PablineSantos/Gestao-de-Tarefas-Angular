import {Component, OnInit} from '@angular/core';
import {Tarefa} from '../models/tarefa.model';
import {TarefaService} from '../services/tarefa.service';
import {CardModule} from 'primeng/card';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:  [CommonModule, CardModule],
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {

  total:number = 0;
  pendentes:number = 0;
  concluidas:number = 0;

  constructor(private service: TarefaService) {}

  ngOnInit(): void {
    const tarefas: Tarefa[] = this.service.listar();

    this.total = tarefas.length;
    this.concluidas = this.service.contarConcluidas();
    this.pendentes = this.service.contarPendentes();
  }
}
