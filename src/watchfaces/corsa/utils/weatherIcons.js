const WEATHER_ICON_NAMES = [
  'cloudy.png',
  'shower.png',
  'snow_shower.png',
  'sunny.png',
  'overcast.png',
  'light_rain.png',
  'light_snow.png',
  'moderate_rain.png',
  'moderate_snow.png',
  'heavy_snow.png',
  'heavy_rain.png',
  'sandstorm.png',
  'sleet.png',
  'fog.png',
  'haze.png',
  'thundershower.png',
  'snowstorm.png',
  'dust.png',
  'extraordinary_rainstorm.png',
  'rain_with_hail.png',
  'thundershowers_with_hail.png',
  'heavy_rainstorm.png',
  'sand_blowing.png',
  'strong_sandstorm.png',
  'rainstorm.png',
  'unknown_weather.png',
  'cloudy_at_night.png',
  'shower_at_night.png',
  'clear_night.png',
];

export const WEATHER_ICONS = WEATHER_ICON_NAMES;

/**
 * Mutates weather icons array to fix bug when night icons are not rendered at night time
 * @param {Boolean} isNight
 */
export const updateWeatherIcons = (isNight) => {
  if (isNight) {
    WEATHER_ICONS[0] = 'cloudy_at_night.png';
    WEATHER_ICONS[1] = 'shower_at_night.png';
    WEATHER_ICONS[3] = 'clear_night.png';
  } else {
    WEATHER_ICONS[0] = 'cloudy.png';
    WEATHER_ICONS[1] = 'shower.png';
    WEATHER_ICONS[3] = 'sunny.png';
  }
};
