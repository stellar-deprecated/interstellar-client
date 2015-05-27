import {Inject, Intent} from "mcs-core";
import {find} from "lodash";

@Inject("$scope", "mcs-core.IntentBroadcast", "mcs-stellard.Sessions", "mcs-stellard.Server")
export class HeaderController {
  constructor($scope, IntentBroadcast, Sessions, Server) {
    this.IntentBroadcast = IntentBroadcast;

    if (Sessions.hasDefault()) {
      let session = Sessions.default;
      this.username = session.getUsername();
      let address = session.getAddress();
      Server.accounts(address)
        .then(account => {
          if (!account) {
            this.balance = 0;
          } else {
            let balance = find(account.balances, balance => balance.currency_type === 'native');
            this.balance = Math.floor(balance.balance/1000000);
          }
          $scope.$apply();
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  logout() {
    this.IntentBroadcast.sendBroadcast(new Intent(Intent.TYPES.LOGOUT));
  }
}

module.exports = function(mod) {
  mod.controller("HeaderController", HeaderController);
};
