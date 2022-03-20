const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistSongActivitiesService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addPlaylistSongActivities(playlistId, songId, userId, action) {
    const id = `playlist_song_activity-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, playlistId, songId, userId, action],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Aktivitas gagal ditambahkan');
    }

    await this._cacheService.delete(`playlist_song_activities:${playlistId}`);

    return result.rows[0].id;
  }

  async getPlaylistSongActivities(playlistId) {
    try {
      const result = await this._cacheService.get(
        `playlist_song_activities:${playlistId}`,
      );

      return JSON.parse(result);
    } catch (error) {
      const query = {
        text: `SELECT users.username, songs.title, playlist_song_activities.action, playlist_song_activities.time
        FROM playlist_song_activities
        INNER JOIN users ON playlist_song_activities.user_id = users.id
        LEFT JOIN songs ON playlist_song_activities.song_id = songs.id
        WHERE playlist_song_activities.playlist_id = $1 ORDER BY playlist_song_activities.time`,
        values: [playlistId],
      };

      const result = await this._pool.query(query);

      if (!result.rowCount) {
        throw new NotFoundError('Aktivitas tidak ditemukan');
      }

      await this._cacheService.set(
        `playlist_song_activities:${playlistId}`,
        JSON.stringify(result.rows),
      );

      return result.rows;
    }
  }
}

module.exports = PlaylistSongActivitiesService;
