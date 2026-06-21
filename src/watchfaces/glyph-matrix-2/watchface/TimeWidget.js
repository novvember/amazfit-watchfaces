import {
  AOD_TIME_COLON_PROPS,
  AOD_TIME_HOUR_IMAGE_PROPS,
  AOD_TIME_MINUTE_IMAGE_PROPS,
  TIME_COLON_PROPS,
  TIME_GROUP_PROPS,
  TIME_HOUR_IMAGE_PROPS,
  TIME_MINUTE_IMAGE_PROPS,
} from './TimeWidget.layout';

const X = px(79);
const Y = px(177);

export class TimeWidget {
  constructor() {
    this._group = hmUI.createWidget(hmUI.widget.GROUP, {
      ...TIME_GROUP_PROPS,
      x: X,
      y: Y,
    });

    this._buildNormal();
    this._buildAod();
  }

  _buildNormal() {
    this._group.createWidget(hmUI.widget.IMG_TIME, TIME_COLON_PROPS);
    this._group.createWidget(hmUI.widget.IMG_TIME, TIME_HOUR_IMAGE_PROPS);
    this._group.createWidget(hmUI.widget.IMG_TIME, TIME_MINUTE_IMAGE_PROPS);
  }

  _buildAod() {
    this._group.createWidget(hmUI.widget.IMG, AOD_TIME_COLON_PROPS);
    this._group.createWidget(hmUI.widget.IMG_TIME, AOD_TIME_HOUR_IMAGE_PROPS);
    this._group.createWidget(hmUI.widget.IMG_TIME, AOD_TIME_MINUTE_IMAGE_PROPS);
  }
}
