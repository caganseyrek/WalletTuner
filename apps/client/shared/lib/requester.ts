import { EasyRequester } from "@wallettuner/easy-requester";

const requester: EasyRequester = new EasyRequester({
  onNewRequest: "enqueue-new",
  acceptStatusCodes: [400, 404],
});

export default requester;
