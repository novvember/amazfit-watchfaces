export const WEATHER_ICON_IDS = [
  'cloudy', // 0
  'shower-rain', // 1
  'snow-flurry', // 2
  'sunny', // 3
  'overcast', // 4
  'light-rain', // 5
  'light-snow', // 6
  'moderate-rain', // 7
  'moderate-snow', // 8
  'heavy-snow', // 9
  'heavy-rain', // 10
  'duststorm', // 11
  'sleet', // 12
  'foggy', // 13
  'haze', // 14
  'thundershower', // 15
  'snowstorm', // 16
  'dust', // 17
  'severe-storm', // 18
  'hail', // 19
  'thundershower-with-hail', // 20
  'heavy-storm', // 21
  'sand', // 22
  'sandstorm', // 23
  'storm', // 24
  'unknown', // 25
  'cloudy-night', // 26
  'shower-rain-night', // 27
  'clear-night', // 28
];

/**
 * Mutates weather icons array to fix bug when night icons are not rendered at night time
 * @param {Boolean} isNight
 */
export const updateWeatherIcons = (isNight) => {
  if (isNight) {
    WEATHER_ICON_IDS[0] = 'cloudy-night';
    WEATHER_ICON_IDS[1] = 'shower-rain-night';
    WEATHER_ICON_IDS[3] = 'clear-night';
  } else {
    WEATHER_ICON_IDS[0] = 'cloudy';
    WEATHER_ICON_IDS[1] = 'shower-rain';
    WEATHER_ICON_IDS[3] = 'sunny';
  }
};
