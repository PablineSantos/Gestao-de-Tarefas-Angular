export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  prioridade: string;
  concluida: boolean;
  dataCriacao: Date;
  dataConclusao?: Date;
}
export const CATEGORIAS:string[] = [
  "Trabalho",
  "Pessoal",
  "Estudos",
  "Outros"
];
export const PRIORIDADES:string[] = [
  "Alta",
  "Média",
  "Baixa"
];
