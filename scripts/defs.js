const genres = JSON.parse($file.read("assets/genres.json").string);
const regions = JSON.parse($file.read("assets/regions.json").string);

module.exports = {
  genres,
  regions
}