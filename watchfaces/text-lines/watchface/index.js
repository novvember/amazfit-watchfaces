WatchFace({
    onInit() {
        console.log('index page.js on init invoke');
    },

    build() {
        console.log('index page.js on build invoke');
        this.buildBackgroundText();
        this.buildTime();
        this.buildTimeForAOD();
        this.buildDisconnectStatus();
        this.buildAlarmStatus();
        this.buildBattery();
        this.buildTemperature();
        this.buildStepCounter();
        this.buildDayOfWeek();
        this.buildDate();
    },

    onDestroy() {
        console.log('index page.js on destroy invoke');
    },

    buildBackgroundText() {
        hmUI.createWidget(hmUI.widget.IMG, {
            x: 0,
            y: 0,
            src: 'bg-text.png',
            show_level: hmUI.show_level.ONLY_NORMAL,
        });
    },

    buildTime() {
        hmUI.createWidget(hmUI.widget.IMG_TIME, {
            hour_zero: 1,
            hour_startX: 156,
            hour_startY: 156,
            hour_array: new Array(10)
                .fill(null)
                .map((_, i) => `primary/${i}.png`),
            hour_space: 0,
            hour_align: hmUI.align.LEFT,

            minute_zero: 1,
            minute_startX: 234,
            minute_startY: 156,
            minute_array: new Array(10)
                .fill(null)
                .map((_, i) => `primary/${i}.png`),
            minute_space: 0,
            minute_align: hmUI.align.LEFT,
            minute_follow: 0,

            second_zero: 1,
            second_startX: 312,
            second_startY: 156,
            second_array: new Array(10)
                .fill(null)
                .map((_, i) => `tertiary/${i}.png`),
            second_space: 0,
            second_align: hmUI.align.LEFT,
            second_follow: 0,
            enable: false,
            show_level: hmUI.show_level.ONLY_NORMAL,
        });
    },

    buildTimeForAOD() {
        hmUI.createWidget(hmUI.widget.IMG_TIME, {
            hour_zero: 1,
            hour_startX: 156,
            hour_startY: 156,
            hour_array: new Array(10)
                .fill(null)
                .map((_, i) => `secondary/${i}.png`),
            hour_space: 0,
            hour_align: hmUI.align.LEFT,

            minute_zero: 1,
            minute_startX: 234,
            minute_startY: 156,
            minute_array: new Array(10)
                .fill(null)
                .map((_, i) => `secondary/${i}.png`),
            minute_space: 0,
            minute_align: hmUI.align.LEFT,
            minute_follow: 0,

            enable: false,
            show_level: hmUI.show_level.ONAL_AOD,
        });
    },

    buildDisconnectStatus() {
        hmUI.createWidget(hmUI.widget.IMG_STATUS, {
            x: 78,
            y: 364,
            src: 'disconnect.png',
            type: hmUI.system_status.DISCONNECT,
            show_level: hmUI.show_level.ONLY_NORMAL,
        });
    },

    buildAlarmStatus() {
        hmUI.createWidget(hmUI.widget.IMG_STATUS, {
            x: 78,
            y: 0,
            src: 'alarmset.png',
            type: hmUI.system_status.CLOCK,
            show_level: hmUI.show_level.ONLY_NORMAL,
        });
    },

    buildBattery() {
        hmUI.createWidget(hmUI.widget.TEXT_IMG, {
            x: 39,
            y: 104,
            type: hmUI.data_type.BATTERY,
            font_array: new Array(10)
                .fill(null)
                .map((_, i) => `tertiary/${i}.png`),
            align_h: hmUI.align.RIGHT,
            h_space: 0,
            show_level: hmUI.show_level.ONLY_NORMAL,
            unit_sc: 'tertiary/percent.png',
            unit_tc: 'tertiary/percent.png',
            unit_en: 'tertiary/percent.png',
            invalid_image: 'nodata.png',
            padding: false,
            isCharacter: false,
        });
    },

    buildTemperature() {
        hmUI.createWidget(hmUI.widget.TEXT_IMG, {
            x: 156,
            y: 52,
            type: hmUI.data_type.WEATHER_CURRENT,
            font_array: new Array(10)
                .fill(null)
                .map((_, i) => `secondary/${i}.png`),
            align_h: hmUI.align.RIGHT,
            h_space: 0,
            show_level: hmUI.show_level.ONLY_NORMAL,
            unit_sc: 'temp-C.png',
            unit_tc: 'temp-C.png',
            unit_en: 'temp-C.png',
            negative_image: 'secondary/minus.png',
            invalid_image: 'nodata.png',
            padding: false,
            isCharacter: false,
        });
    },

    buildStepCounter() {
        hmUI.createWidget(hmUI.widget.TEXT_IMG, {
            x: 78,
            y: 312,
            type: hmUI.data_type.STEP,
            font_array: new Array(10)
                .fill(null)
                .map((_, i) => `tertiary/${i}.png`),
            align_h: hmUI.align.RIGHT,
            h_space: 0,
            show_level: hmUI.show_level.ONLY_NORMAL,
            invalid_image: 'nodata.png',
            padding: false,
            isCharacter: false,
        });
    },

    buildDayOfWeek() {
        hmUI.createWidget(hmUI.widget.IMG_WEEK, {
            x: 156,
            y: 260,
            week_en: new Array(7).fill(null).map((_, i) => `day/${i}.png`),
            show_level: hmUI.show_level.ONLY_NORMAL,
        });
    },

    buildDate() {
        hmUI.createWidget(hmUI.widget.IMG_DATE, {
            month_startX: 195,
            month_startY: 208,
            month_en_array: new Array(12)
                .fill(null)
                .map((_, i) => `month/${i}.png`),
            month_align: hmUI.align.LEFT,
            month_zero: 0,
            month_follow: 0,
            month_space: 0,
            month_is_character: true,
            day_startX: 78,
            day_startY: 208,
            day_sc_array: new Array(10)
                .fill(null)
                .map((_, i) => `secondary/${i}.png`),
            day_tc_array: new Array(10)
                .fill(null)
                .map((_, i) => `secondary/${i}.png`),
            day_en_array: new Array(10)
                .fill(null)
                .map((_, i) => `secondary/${i}.png`),
            day_align: hmUI.align.RIGHT,
            day_zero: 0,
            day_follow: 0,
            day_space: 0,
            day_is_character: false,
            enable: false,
            show_level: hmUI.show_level.ONLY_NORMAL,
        });
    },
});
