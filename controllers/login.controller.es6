import {Inject} from 'mcs-core';
import {LoginController as AbstractLoginController} from "mcs-login";

@Inject("mcs-core.Config", "mcs-core.IntentBroadcast", "mcs-stellard.Sessions", "$http", "$scope")
class LoginController extends AbstractLoginController {
}

module.exports = function(mod) {
  mod.controller("LoginController", LoginController);
};
