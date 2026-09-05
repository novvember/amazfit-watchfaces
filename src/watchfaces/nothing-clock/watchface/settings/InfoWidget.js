import { INFO_TEXT_PROPS } from './InfoWidget.layout';

export class InfoWidget {
  constructor() {
    const { name, version, vender } = hmApp.getPackageInfo();
    const text = [
      name,
      version ? `v. ${version}` : undefined,
      vender ? `github: @${vender}` : undefined,
    ]
      .filter(Boolean)
      .join(' / ');

    hmUI.createWidget(hmUI.widget.TEXT, { ...INFO_TEXT_PROPS, text });
  }
}
