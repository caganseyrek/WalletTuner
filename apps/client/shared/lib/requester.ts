import { EasyRequester } from "@wallettuner/easy-requester";

const requester: EasyRequester = new EasyRequester({
  onNewRequest: "enqueue-new",
});

export default requester;
