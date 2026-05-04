import {Component, OnInit} from '@angular/core';
import {Tarefa} from '../models/tarefa.model';
import {TarefaService} from '../services/tarefa.service';
import {CardModule} from 'primeng/card';
import { CommonModule } from "@angular/common";
import {Router} from '@angular/router';

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

  constructor(private service: TarefaService, private router: Router) {}

  irParaNova(): void {
    this.router.navigate(['/nova']);
  }

  irParaLista(): void {
    this.router.navigate(['/tarefas']);
  }

  altas = 0;
  medias = 0;
  baixas = 0;

  ngOnInit(): void {
    this.atualizarDados();
  }

  atualizarDados(): void {
    this.total = this.service.listar().length;
    this.concluidas = this.service.contarConcluidas();
    this.pendentes = this.service.contarPendentes();
    this.altas = this.service.contarPorPrioridade('Alta');
    this.medias = this.service.contarPorPrioridade('Média');
    this.baixas = this.service.contarPorPrioridade('Baixa');
  }
}
