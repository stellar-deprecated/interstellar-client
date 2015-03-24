import { LoginController as AbstractLoginController } from "mcs-login";

class LoginController extends AbstractLoginController {
  constructor(config, sessions, state) {
    super(config, sessions, state);
  }

  onSuccessfulLogin(wallet) {
    super.onSuccessfulLogin(wallet);
    this.state.go("dashboard");
  }
}

LoginController.$inject = ["mcs-core.Config", "mcs-stellard.Sessions", "$state"];

module.exports = function(mod) {
  mod.controller("LoginController", LoginController);
};