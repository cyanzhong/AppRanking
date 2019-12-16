exports.list = {
  views: [
    {
      type: "label",
      props: {
        id: "rank-label",
        font: $font("bold", 25),
        align: $align.center,
        bgcolor: $color("#f0f0f0"),
        textColor: $color("gray"),
        smoothRadius: 6
      },
      layout: (make, view) => {
        make.left.top.bottom.inset(8);
        make.centerY.equalTo(view.super);
        make.size.equalTo($size(52, 24));
      }
    },
    {
      type: "image",
      props: {
        id: "icon",
        smoothRadius: 10,
        borderWidth: 1,
        borderColor: $color("#dddddd")
      },
      layout: (make, view) => {
        make.top.bottom.inset(8);
        make.left.equalTo($("rank-label").right).offset(8);
        make.width.equalTo(view.height);
      }
    },
    {
      type: "label",
      props: {
        id: "name-label",
        font: $font(20),
        lines: 1,
        lineBreakMode: 4
      },
      layout: (make, view) => {
        make.left.equalTo($("icon").right).offset(8);
        make.right.inset(8);
        make.centerY.equalTo(view.super);
      }
    }
  ]
}