import '@zos/app';

declare module '@zos/app' {
  // device-types 4.0.0 exposes the package fields only as object.
  // https://docs.zepp.com/docs/reference/device-app-api/newAPI/app/getPackageInfo/
  function getPackageInfo(): {
    readonly name?: string;
    readonly version?: string;
    readonly vender?: string;
  };
}
