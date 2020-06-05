module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'docker',
  database: 'inspi-port',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

/**
 * O comando underscored e underscoredAll altera o nome das 
 * tabelas e colunas.
 * 
 * EX: underscored(para tabelas) = UserId --> user_id
 * EX: underscoredAll(para colunas) = UserId --> user_id
 */