declare namespace hmFS {
  // --- Flags ---
  /** read-only */
  const O_RDONLY: number;
  /** write-only  */
  const O_WRONLY: number;
  /** read-write */
  const O_RDWR: number;
  /** If file does not exist, create and open */
  const O_CREAT: number;
  /** Used in conjunction with O_CREAT. If it does not exist, create and open it, if it does exist, return an error. */
  const O_EXCL: number;
  /** If the file exists, the length is truncated to 0. */
  const O_TRUNC: number;

  // --- File operations ---
  /**
   * Open a file
   * flag - FLAG const from hmFS
   * @returns fileId
   */
  function open(path: string, flag: number): number;

  /**
   * Close a file
   * @returns result ('0' - success)
   */
  function close(fileId: number): number;

  /**
   * Read from a file
   * @returns result of operation ('0' - success)
   */
  function read(
    fileId: number,
    buffer: ArrayBuffer,
    offset: number,
    length: number,
  ): number;

  // /**
  //  * Write to a file
  //  * @returns number of bytes written
  //  */
  // function write(fileId: number, buffer: ArrayBuffer, offset: number, length: number): number;

  // /**
  //  * Move the file pointer
  //  */
  // function seek(fileId: number, offset: number, whence: number): number;

  /**
   * Get file information
   * size - number of bytes
   * mtime - File last modified time in UTC seconds
   * @returns [stat, error] if file does not exist
   */
  function stat(
    path: string,
  ): [{ size: number; mtime?: number }, number] | undefined;

  // /**
  //  * Delete a file
  //  */
  // function remove(path: string): number;

  // /**
  //  * Rename a file
  //  */
  // function rename(oldPath: string, newPath: string): number;

  // --- SysPro (persistent key-value storage) ---
  /**
   * Store temporary string, system reboot will clear.
   */
  function SysProSetChars(key: string, value: string): void;

  /**
   * Get the temporarily stored string, system reboot will clear it.
   */
  function SysProGetChars(key: string): string | undefined;

  /**
   * Store a temporary integer, system reboot will clear
   */
  function SysProSetInt(key: string, value: number): void;

  /**
   * Retrieve a temporary integer, system reboot will clear
   */
  function SysProGetInt(key: string): number;
}
