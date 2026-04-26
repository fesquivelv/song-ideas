module.exports = {
    up: async (queryInterface, Sequelize) => {
      const songId = '110e8400-e29b-41d4-a716-446655440001';
      const userId = '550e8400-e29b-41d4-a716-446655440000';
      await queryInterface.bulkInsert('song_ideas', [
        {
        id: songId,
        name: 'Balada en Am',
        description: 'Una balada melancólica con acordes suaves y letra introspectiva.',
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);

      await queryInterface.bulkInsert('lyrics', [
        {
          id: '220e8400-e29b-41d4-a716-446655440002', 
          title: 'Verso 1',
          content: 'En la penumbra de mi habitación, \nLas sombras bailan con mi soledad, \nRecuerdos susurran en el viento, \nY el silencio grita mi verdad.',
          ideaId: songId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '330e8400-e29b-41d4-a716-446655440003', 
          title: 'Coro',
          content: 'Balada en Am, melodía de dolor, \nNotas que acarician el corazón, \nEn cada acorde se esconde un suspiro, \nY en cada verso, una confesión.',
          ideaId: songId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('lyrics', null, {});
      return queryInterface.bulkDelete('song_ideas', null, {});
    }
  };
      