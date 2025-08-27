const getRandomColor = () => {
  const randomArr = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
  ];

  function getRandomFromSection(low, high) {
    const RANDOM = Math.random();
    const RANGE = high - low + 1;

    return Math.floor(RANDOM * RANGE) + low;
  }

  const colorStr = Array.from({ length: 6 }).reduce((prev, curr) => {
    const random = getRandomFromSection(0, 15);
    return prev + randomArr[random];
  }, '0x');

  return Number(colorStr);
};

export class Settings {
  constructor() {
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(96),
      y: px(40),
      w: px(288),
      h: px(46),
      color: 0xffffff,
      text_size: px(36),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: 'VIEW_CONTAINER',
      show_level: hmUI.show_level.ONLY_EDIT,
    });

    const viewContainer = hmUI.createWidget(hmUI.widget.VIEW_CONTAINER, {
      x: px(0),
      y: px(86),
      w: px(480),
      h: px(400),
      // show_level: hmUI.show_level.ONLY_EDIT,
    });

    Array.from({ length: 5 }).forEach((_, index) => {
      viewContainer.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: px(index * 400),
        w: px(480),
        h: px(400),
        color: getRandomColor(),
        show_level: hmUI.show_level.ONLY_EDIT,
      });

      viewContainer.createWidget(hmUI.widget.TEXT, {
        x: px(96),
        y: px(170) + px(index * 400),
        w: px(288),
        h: px(46),
        text_size: px(36),
        color: 0xffffff,
        align_h: hmUI.align.CENTER_H,
        align_v: hmUI.align.CENTER_V,
        text: `INDEX: ${index}`,
        show_level: hmUI.show_level.ONLY_EDIT,
      });
    });

    // const viewContainerButton = hmUI.createWidget(hmUI.widget.VIEW_CONTAINER, {
    //   x: px(0),
    //   y: px(86),
    //   w: px(480),
    //   h: px(400),
    //   z_index: 1,
    //   scroll_enable: false,
    // });

    // viewContainerButton.createWidget(hmUI.widget.BUTTON, {
    //   x: 0,
    //   y: px(50),
    //   w: px(200),
    //   h: px(100),
    //   text: 'Click',
    //   radius: px(12),
    //   normal_color: 0x00ff00,
    //   press_color: 0x00ffff,
    //   click_func: () => {
    //     console.log('click button');
    //   },
    //   show_level: hmUI.show_level.ONLY_EDIT,
    // });
  }
}
