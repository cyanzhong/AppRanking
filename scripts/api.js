exports.fetch = async(region, genre, free, initialLoading=false) => {
  const type = free ? "topfreeapplications" : "toppaidapplications";
  const url = `https://itunes.apple.com/${region}/rss/${type}/limit=200/genre=${genre}/json`;
  
  if (initialLoading) {
    $ui.loading(true);
  }

  const {data} = await $http.get(url);
  $ui.loading(false);
  return data.feed.entry;
}