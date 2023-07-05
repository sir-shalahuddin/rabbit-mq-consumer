/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(id) {
    // console.log(id);
    const query = {
      text: 'select playlists.id,name from playlists left join users on playlists.owner=users.id where playlists.id=$1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new Error('Playlist tidak ditemukan');
    }

    return result.rows[0];
  }

  async getSongsInPlaylist(playlistId) {
    // console.log(playlistId)
    const query = {
      text: 'SELECT id,title,performer FROM playlists_songs LEFT JOIN songs ON songs.id=playlists_songs.song_id WHERE playlists_songs.playlist_id =$1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new Error('Playlist tidak ditemukan');
    }
    return result.rows;
  }
}

module.exports = PlaylistsService;
