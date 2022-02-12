const { nanoid } = require('nanoid');

class AlbumsService {
  constructor() {
    this._albums = [];
  }

  addAlbum({ name, year }) {
    const id = nanoid(16);

    const newAlbum = {
      name,
      year,
    };

    this._albums.push(newAlbum);

    const isSuccess = this._albums.filter((album) => album.id === id).length > 0;

    if (!isSuccess) {
      throw new Error('Album gagal ditambahkan');
    }

    return id;
  }

  getAlbumById(id) {
    const album = this._albums.filter((a) => a.id === id)[0];

    if (!album) {
      throw new Error('Album tidak ditemukan');
    }

    return album;
  }
}

module.exports = AlbumsService;
