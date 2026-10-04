import '@zos/ui';

/** Public @zos/ui declarations missing from device-types 4.0.0. */
declare module '@zos/ui' {
  // The package describes the show_level option, but omits the exported constants.
  const show_level: {
    readonly ONLY_NORMAL: number;
    readonly ONAL_AOD: number;
    readonly ONLY_EDIT: number;
  };

  // The package omits this watchface status constant group.
  const system_status: {
    readonly DISCONNECT: number;
  };

  // PublicWidgetType uses IHmUIWidgetType, which omits these watchface IDs.
  namespace HmWearableProgram {
    namespace DeviceSide {
      namespace HmUI {
        interface IHmUIWidgetType {
          WATCHFACE_EDIT_BG: number;
          IMG_STATUS: number;
        }
      }
    }
  }

  // The package has prop.VISIBLE and the underlying setter, but its public IMG
  // return type exposes only setProperty(prop.MORE, object).
  interface CreateWidget {
    (widgetType: PublicWidgetType['IMG'], options: HmUIImgCreateWidgetOptions): PublicImageWidget & {
      setProperty(prop: PublicPropType['VISIBLE'], value: boolean): boolean;
    };

    // The public TEXT widget type omits its documented prop.TEXT setter.
    (widgetType: PublicWidgetType['TEXT'], options: HmUITextCreateWidgetOptions): PublicTextWidget & {
      setProperty(prop: PublicPropType['TEXT'], value: string): boolean;
    };
  }
}
