// Não é possível utilizar "import/export" neste arquivo
module.exports = {
  // Para utilizar este dialeto é preciso as dependencias: pg pg-hstore
  dialect: 'postgres',
  host: '192.168.99.100',
  username: 'postgres',
  password: 'admin',
  database: 'meetapp',
  define: {
    // Garante uma colune "CreatedAt" e "UpdatedAt" no banco
    timestamps: true,

    // Utiliza o padrão de tabelas e colunas underscored "Model: UserGroup cria a tabela: user_groups"
    underscored: true,
    // Para colunas e relacionamentos
    underscoredAll: true,
  },
};
