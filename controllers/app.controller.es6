import {Intent} from "mcs-core";

export class AppController {
  constructor(IntentBroadcast) {
    this.IntentBroadcast = IntentBroadcast;
  }

  logout() {
    this.IntentBroadcast.sendBroadcast(new Intent(Intent.TYPES.LOGOUT));
  }
}

AppController.$inject = ["mcs-core.IntentBroadcast"];

module.exports = function(mod) {
  mod.controller("AppController", AppController);
};