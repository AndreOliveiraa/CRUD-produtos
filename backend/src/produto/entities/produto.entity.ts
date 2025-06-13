import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    preco: number;

    @Column()
    categoria: string;

    @Column()
    descricao: string;

    @Column({ nullable: true })
    imagemUrl: string;
}
