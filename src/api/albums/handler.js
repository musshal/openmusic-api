class AlbumsHandler {
  constructor(service) {
    this._service = service;
  }

  postAlbumHandler(request, h) {
    try {
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
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });

      response.code(400);

      return response;
    }
  }
}

module.exports = AlbumsHandler;
