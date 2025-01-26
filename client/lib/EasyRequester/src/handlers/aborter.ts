import Debugger from "../utils/debugger";

class Aborter {
  private controllers: Map<string, AbortController>;
  private abortController?: AbortController;

  constructor() {
    this.controllers = new Map();
  }

  public getControllers(): Map<string, AbortController> {
    return this.controllers;
  }

  public setupAbortController(generatedURL: string, requestConfig: RequestInit): void {
    this.abortController = new AbortController();
    requestConfig.signal = this.abortController.signal;

    if (this.controllers.has(generatedURL)) {
      const previousController = this.controllers.get(generatedURL);
      previousController?.abort();
    }
    this.controllers.set(generatedURL, this.abortController);
  }

  public handleAbortError(error: Error, generatedURL: string): void {
    if ((error as Error).name === "AbortError") {
      Debugger.log(`${this.handleAbortError.name} at ${Aborter.name}`, `Request to ${generatedURL} was aborted.`);
    }
    this.getControllers().delete(generatedURL);
  }
}

export default Aborter;
