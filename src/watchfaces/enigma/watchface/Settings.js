import { SettingsScreen } from './SettingsScreen';

export class Settings {
  constructor() {
    this._buildOpenButton();
    this._background = this._buildBackground();

    const mainButtons = [
      {
        type: 'submenu_button',
        text: 'Animations',
        onClick: () => this._switchScreen('animations'),
      },
      {
        type: 'submenu_button',
        text: 'Colors',
        onClick: () => this._switchScreen('colors'),
      },
      {
        type: 'submenu_button',
        text: 'Grid',
        onClick: () => this._switchScreen('grid'),
      },
      {
        type: 'submenu_button',
        text: 'Data',
        onClick: () => this._switchScreen('data'),
      },
    ];

    this._mainScreen = new SettingsScreen({
      title: 'Enigma Settings',
      onBackClick: () => this._toggleVisibility(false),
      elements: mainButtons,
    });

    this._secondScreens = {
      animations: new SettingsScreen({
        title: 'Animations',
        onBackClick: () => this._switchScreen('main'),
        elements: [],
      }),
    };

    this._currentScreenId = 'main';
  }

  _switchScreen(screenId) {
    if (screenId === 'main') {
      this._secondScreens[this._currentScreenId].toggleVisibility(false);
      this._currentScreenId = 'main';
    } else {
      this._secondScreens[screenId].toggleVisibility(true);
      this._currentScreenId = screenId;
    }
  }

  _buildOpenButton() {
    const BUTTON_SIZE = px(80);

    return hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(480 / 2) - BUTTON_SIZE / 2,
      y: px(480) - BUTTON_SIZE - px(20),
      w: BUTTON_SIZE,
      h: BUTTON_SIZE,
      normal_src: 'settings/settings_button.png',
      press_src: 'settings/settings_button_active.png',
      radius: BUTTON_SIZE,
      click_func: () => this._toggleVisibility(true),
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  }

  _buildBackground() {
    const background = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: px(480),
      h: px(480),
      color: 0x000000,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    background.setProperty(hmUI.prop.VISIBLE, false);

    return background;
  }

  _toggleVisibility(isVisible) {
    this._background.setProperty(hmUI.prop.VISIBLE, isVisible);
    this._mainScreen.toggleVisibility(isVisible);
  }
}
