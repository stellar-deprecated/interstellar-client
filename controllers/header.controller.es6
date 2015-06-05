import {Inject, Intent} from "interstellar-core";
import {sortBy} from "lodash";

@Inject("$scope", "interstellar-core.IntentBroadcast", "interstellar-sessions.Sessions", "interstellar-network.Server")
export class HeaderController {
  constructor($scope, IntentBroadcast, Sessions, Server) {
    this.IntentBroadcast = IntentBroadcast;

    if (Sessions.hasDefault()) {
      let session = Sessions.default;
      this.username = session.getUsername();
      this.address = session.getAddress();
      Server.accounts(this.address)
        .then(account => {
          this.balances = sortBy(account.balances, balance => balance.currency_type !== 'native');
          this.balances[0].balance = Math.floor(this.balances[0].balance/1000000);
          this.balances[0].currency_code = 'STR';
          this.balanceSTR = this.balances[0].balance;
        })
        .catch(e => {
          if (e.name === 'NotFoundError') {
            this.balances = [{balance: 0, currency_code: 'STR'}];
            this.balanceSTR = 0;
          } else {
            throw e;
          }
        })
        .finally(() => $scope.$apply());
    }
  }

  logout() {
    this.IntentBroadcast.sendBroadcast(new Intent(Intent.TYPES.LOGOUT));
  }
}

module.exports = function(mod) {
  mod.controller("HeaderController", HeaderController);
};
