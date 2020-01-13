module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER, // integer pois referencia o id da imagem
      references: { model: 'files', key: 'id' }, // references = foreign key, tabela 'files'
      onUpdate: 'CASCADE', // alteração também será feita na tabela usuários
      onDelete: 'SET NULL', // caso seja deletado
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
