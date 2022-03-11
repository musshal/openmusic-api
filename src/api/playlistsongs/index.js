const PlaylistSongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistsongs',
  version: '1.0.0',
  register: async (
    server,
    {
      playlistSongsService,
      playlistsService,
      songsService,
      usersService,
      playlistSongActivitiesService,
      validator,
    },
  ) => {
    const playlistSongsHandler = new PlaylistSongsHandler(
      playlistSongsService,
      playlistsService,
      songsService,
      usersService,
      playlistSongActivitiesService,
      validator,
    );

    server.route(routes(playlistSongsHandler));
  },
};
