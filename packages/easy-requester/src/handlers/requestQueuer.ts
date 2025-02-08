/* eslint-disable @typescript-eslint/no-explicit-any, no-unused-vars */
type AnyExceptUndefined = Exclude<any, undefined | null>;

export interface RequestQueueProps {
  requestFn: () => Promise<any>;
  resolve: (value: any) => void;
  reject: (reason: AnyExceptUndefined) => void;
}
class RequestQueuer {
  private requestQueue: RequestQueueProps[] = [];
  private isRequestInProgress: boolean = false;

  constructor() {}

  private async processQueue(): Promise<void> {
    if (this.isRequestInProgress || this.requestQueue.length === 0) {
      return;
    }
    const { requestFn, resolve, reject } = this.requestQueue.shift()!;
    this.isRequestInProgress = true;

    try {
      const response = await requestFn();
      resolve(response);
    } catch (error) {
      reject(error);
    } finally {
      this.isRequestInProgress = false;
      this.processQueue();
    }
  }

  public enqueueRequest<TResponse>(requestFn: () => Promise<TResponse>): Promise<TResponse> {
    return new Promise<TResponse>((resolve, reject) => {
      this.requestQueue.push({ requestFn, resolve, reject });
      this.processQueue();
    });
  }
}

export default RequestQueuer;
