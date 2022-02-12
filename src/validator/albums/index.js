const { AlbumPayloadsSchema } = require('./schema');

const AlbumsValidator = {
  validateAlbumPayload: (payload) => {
    const validationResult = AlbumPayloadsSchema.validate(payload);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = AlbumsValidator;
