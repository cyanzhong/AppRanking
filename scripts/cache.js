exports.tabIndex = () => {
  const index = $cache.get("tab-index");
  if (index == undefined) {
    return 1;
  } else {
    return index;
  }
}

exports.setTabIndex = index => {
  $cache.set("tab-index", index);
}

exports.genreIndex = () => {
  const index = $cache.get("genre-index");
  if (index == undefined) {
    return 15;
  } else {
    return index;
  }
}

exports.setGenreIndex = index => {
  $cache.set("genre-index", index);
}

exports.regionIndex = () => {
  return $cache.get("region-index") || 0;
}

exports.setRegionIndex = index => {
  $cache.set("region-index", index);
}