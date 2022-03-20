class UserAlbumLikesHandler {
  constructor(userAlbumLikesService, albumsService) {
    this._userAlbumLikesService = userAlbumLikesService;
    this._albumsService = albumsService;

    this.postUserAlbumLikeHandler = this.postUserAlbumLikeHandler.bind(this);
    this.getUserAlbumLikeByAlbumIdHandler = this.getUserAlbumLikeByAlbumIdHandler.bind(this);
  }

  async postUserAlbumLikeHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._albumsService.verifyExistingAlbumById(id);

    const isLiked = await this._userAlbumLikesService.verifyUserAlbumLike(
      credentialId,
      id,
    );

    if (!isLiked) {
      await this._userAlbumLikesService.addUserAlbumLikes(credentialId, id);

      const response = h.response({
        status: 'success',
        message: 'Album berhasil disukai',
      });

      response.code(201);

      return response;
    }

    await this._userAlbumLikesService.deleteUserAlbumLikes(credentialId, id);

    const response = h.response({
      status: 'success',
      message: 'Batal menyukai album berhasil',
    });

    response.code(201);

    return response;
  }

  async getUserAlbumLikeByAlbumIdHandler(request, h) {
    const { id } = request.params;
    const number = await this._userAlbumLikesService.getUserAlbumLikeByAlbumId(id);

    const response = h.response({
      status: 'success',
      data: {
        likes: number,
      },
    });

    response.code(200);

    return response;
  }
}

module.exports = UserAlbumLikesHandler;
