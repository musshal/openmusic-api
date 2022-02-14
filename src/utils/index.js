const mapAlbumsDBToModel = ({
  id, name, year, songs,
}) => ({
  id,
  name,
  year,
  songs,
});

module.exports = { mapAlbumsDBToModel };
