import { AnyExceptUndefined } from "../easy-requester";
import Debugger from "../utils/debugger";

class Queuer {
  private queuerParams: {
    isRequestInProgress: boolean;
    requestQueue: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      requestFn: () => Promise<any>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolve: (value: any) => void;
      reject: (reason: AnyExceptUndefined) => void;
    }[];
  } = {
    isRequestInProgress: false,
    requestQueue: [],
  };

  constructor() {}

  private async processQueue(): Promise<void> {
    if (this.queuerParams.isRequestInProgress || this.queuerParams.requestQueue.length === 0) {
      Debugger.log(
        `${this.processQueue.name} at ${Queuer.name}`,
        `Found ${this.queuerParams.requestQueue.length} in queue. Skipping processing request queue.`,
      );
      return;
    }

    const { requestFn, resolve, reject } = this.queuerParams.requestQueue.shift()!;
    this.queuerParams.isRequestInProgress = true;

    Debugger.log(`${this.processQueue.name} at ${Queuer.name}`, "Started processing a request from the queue...");
    try {
      const response = await requestFn();
      resolve(response);
      Debugger.log(`${this.processQueue.name} at ${Queuer.name}`, "Successfully resolved a request from the queue...");
    } catch (error) {
      reject(error);
      Debugger.error(
        `${this.processQueue.name} at ${Queuer.name}`,
        `An error named ${(error as Error).name} occurred while resolved a request from the queue: ${
          (error as Error).stack
        }`,
      );
    } finally {
      this.queuerParams.isRequestInProgress = false;
      this.processQueue();
    }
  }

  public enqueueRequest<TResponse>(requestFn: () => Promise<TResponse>): Promise<TResponse> {
    return new Promise<TResponse>((resolve, reject) => {
      this.queuerParams.requestQueue.push({ requestFn, resolve, reject });
      this.processQueue();
    });
  }
}

export default Queuer;
