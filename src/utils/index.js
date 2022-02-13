const mapAlbumsDBToModel = ({ id, name, year }) => ({ id, name, year });

const mapSongsDBToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
}) => ({ id, title, year, genre, performer, duration, albumId });

module.exports = { mapAlbumsDBToModel, mapSongsDBToModel };
