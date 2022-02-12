class AlbumsHandler {
  constructor(service) {
    this._service = service;
  }

  postAlbumHandler(request, h) {
    const { name, year } = request.payload;

    const albumId = this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      data: {
        albumId,
      },
    });

    response.code(201);

    return response;
  }
}

module.exports = AlbumsHandler;
