const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlist/{id}/songs',
    handler: handler.postSongToPlaylist,
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlist/{id}/songs',
    handler: handler.getSongsFromPlaylist,
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlist/{id}/songs',
    handler: handler.deleteSongFromPlaylist,
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
];

module.exports = routes;
