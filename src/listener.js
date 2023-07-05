/* eslint-disable no-underscore-dangle */
class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      const playlists = await this._playlistsService.getPlaylistById(playlistId);
      playlists.songs = await this._playlistsService.getSongsInPlaylist(playlists.id);
      const result = {
        playlist: playlists,
      };
      await this._mailSender.sendEmail(targetEmail, JSON.stringify(result));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = Listener;
