const UserAlbumLikesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'useralbumlikes',
  version: '1.0.0',
  register: async (
    server,
    { userAlbumLikesService, albumsService, validator },
  ) => {
    const userAlbumLikesHandler = new UserAlbumLikesHandler(
      userAlbumLikesService,
      albumsService,
      validator,
    );

    server.route(routes(userAlbumLikesHandler));
  },
};
