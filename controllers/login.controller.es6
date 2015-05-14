import { LoginController as AbstractLoginController } from "mcs-login";

class LoginController extends AbstractLoginController {
}

LoginController.$inject = ["mcs-core.Config", "mcs-core.IntentBroadcast", "mcs-stellard.Sessions", "$http", "$scope"];

module.exports = function(mod) {
  mod.controller("LoginController", LoginController);
};