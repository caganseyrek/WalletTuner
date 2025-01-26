class Debugger {
  private static isDebugMode: boolean = false;

  private constructor() {}

  public static setDebugMode(debugMode: boolean): void {
    this.isDebugMode = debugMode;
  }

  public static log(location: string, debugMessage: string): void {
    if (this.isDebugMode) {
      // eslint-disable-next-line no-console
      console.debug(`[EasyRequester_DEBUG] ${debugMessage} at ${location}`);
    }
    return;
  }

  public static error(location: string, errorMessage: string): void {
    if (this.isDebugMode) {
      // eslint-disable-next-line no-console
      console.debug(`[EasyRequester_ERROR] ${errorMessage} at ${location}`);
    }
    throw new Error(`EasyRequesterError: ${errorMessage} at ${location}`);
  }
}

export default Debugger;
