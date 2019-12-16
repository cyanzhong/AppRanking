const defs = require("./defs");
const api = require("./api");
const templates = require("./templates");
const cache = require("./cache");

const indice = {
  tab: cache.tabIndex(),
  genre: cache.genreIndex(),
  region: cache.regionIndex(),
}

exports.init = async() => {

  $ui.render({
    props: {
      navButtons: [
        {
          symbol: "globe",
          handler: selectRegion
        },
        {
          symbol: "list.bullet",
          handler: selectGenre
        }
      ]
    },
    views: [
      {
        type: "tab",
        props: {
          id: "tab",
          items: [
            $l10n("FREE_APPS"),
            $l10n("PAID_APPS")
          ],
          index: indice.tab
        },
        layout: (make, view) => {
          make.left.right.inset(8);
          make.top.equalTo(4);
          make.height.equalTo(30);
        },
        events: {
          changed: sender => {
            selectTabIndex(sender.index);
          }
        }
      },
      {
        type: "view",
        props: {
          id: "separator",
          bgcolor: $color("#dddddd")
        },
        layout: (make, view) => {
          make.top.equalTo($("tab").bottom).offset(4);
          make.left.right.equalTo(0);
          make.height.equalTo(1.0 / $device.info.screen.scale);
        }
      },
      {
        type: "list",
        props: {
          id: "list",
          template: templates.list,
          rowHeight: 60
        },
        layout: (make, view) => {
          make.left.bottom.right.equalTo(0);
          make.top.equalTo($("separator").bottom);
        },
        events: {
          didSelect: (sender, indexPath, data) => {
            const appid = data["appid"];
            $app.openURL(`https://apps.apple.com/app/${appid}`);
          },
          pulled: () => reloadData()
        }
      },
      {
        type: "lottie",
        props: {
          id: "animation",
          src: "assets/loading.json",
          loop: true,
          alpha: 0
        },
        layout: $layout.center
      }
    ]
  });

  reloadData(true);
}

function selectTabIndex(index) {
  indice.tab = index;
  cache.setTabIndex(index);
  reloadData(true);
}

async function selectGenre() {
  const names = defs.genres.map(genre => $l10n(genre.name));
  const {index} = await $ui.menu(names);

  if (index == undefined) {
    return;
  }

  indice.genre = index;
  cache.setGenreIndex(index);
  reloadData(true);
}

async function selectRegion() {
  const names = defs.regions.map(region => `${region.flag} ${$l10n(region.name)}`);
  const {index} = await $ui.menu(names);

  if (index == undefined) {
    return;
  }

  indice.region = index;
  cache.setRegionIndex(index);
  reloadData(true);
}

async function reloadData(initialLoading=false) {
  const genre = defs.genres[indice.genre];
  const region = defs.regions[indice.region];
  $ui.title = `${region.flag} ${$l10n(genre.name)}`;

  const view = $("list");
  if (view == null) {
    return;
  }

  if (!initialLoading) {
    view.beginRefreshing();
  }

  setAnimationViewAlpha(1);

  const data = await api.fetch(region.code, genre.code, indice.tab == 0, initialLoading);
  view.data = data.map((item, index) => {
    return {
      "rank-label": {
        "text": `${index + 1}`
      },
      "icon": {
        "src": item["im:image"][2]["label"]
      },
      "name-label": {
        "text": item["im:name"]["label"]
      },
      "appid": item["id"]["attributes"]["im:id"]
    }
  });

  view.endRefreshing();
  $delay(0.5, () => {
    setAnimationViewAlpha(0);
  });
}

function setAnimationViewAlpha(alpha) {
  const list = $("list");
  const lottie = $("animation");
  if (alpha > 0) {
    lottie.play();
  } else {
    lottie.stop();
  }

  $ui.animate({
    duration: 0.4,
    animation: () => {
      list.alpha = 1 - alpha;
      lottie.alpha = alpha;
    }
  });
}