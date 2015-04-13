import { LoginController as AbstractLoginController } from "mcs-login";

class LoginController extends AbstractLoginController {
  constructor(config, sessions, $state, $scope) {
    super(config, sessions, $state, $scope);
    this.successfulLoginRoute = 'dashboard';
  }
}

LoginController.$inject = ["mcs-core.Config", "mcs-stellard.Sessions", "$state", "$scope"];

module.exports = function(mod) {
  mod.controller("LoginController", LoginController);
};