const mapAlbumsDBToModel = ({
  id, name, year, songs,
}) => ({
  id,
  name,
  year,
  songs,
});

const mapSongsDBToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
});

module.exports = { mapAlbumsDBToModel, mapSongsDBToModel };
