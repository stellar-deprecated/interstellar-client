require("file?name=index.html!./index.html");

require('./styles/main.header.scss');
require('./styles/main.footer.scss');

import {App, Intent, mod as mcsCore} from "mcs-core";
import {mod as mcsLogin} from "mcs-login";
import {mod as mcsStellard} from "mcs-stellard";
import {mod as mcsSettings} from "mcs-settings";
import {mod as mcsStellarApi} from "mcs-stellar-api";

let config = require('./config.json');
export const app = new App("mcs-stellar-client", config);

app.use(mcsCore.name);
app.use(mcsLogin.name);
app.use(mcsStellard.name);
app.use(mcsSettings.name);
app.use(mcsStellarApi.name);

app.templates   = require.context("raw!./templates", true);
app.controllers = require.context("./controllers",   true);

app.routes = ($stateProvider) => {
  $stateProvider.state('index', {
    url: "/",
    controller: function($state) {
      $state.go('login');
    }
  });
  $stateProvider.state('register', {
    url: "/register",
    templateUrl: "mcs-stellar-client/register"
  });
  $stateProvider.state('login', {
    url: "/login",
    templateUrl: "mcs-stellar-client/login"
  });
  $stateProvider.state('dashboard', {
    url: "/dashboard",
    templateUrl: "mcs-stellar-client/dashboard",
    requireSession: true
  });
  $stateProvider.state('send', {
    url: "/send",
    templateUrl: "mcs-stellar-client/send",
    requireSession: true
  });
  $stateProvider.state('history', {
    url: "/history",
    templateUrl: "mcs-stellar-client/history",
    requireSession: true
  });
};

// Register BroadcastReceivers
let registerBroadcastReceivers = ($state, IntentBroadcast) => {
  IntentBroadcast.registerReceiver(Intent.TYPES.SEND_TRANSACTION, intent => {
    $state.go('send');
  });

  IntentBroadcast.registerReceiver(Intent.TYPES.SHOW_DASHBOARD, intent => {
    $state.go('dashboard');
  });

  IntentBroadcast.registerReceiver(Intent.TYPES.LOGOUT, intent => {
    $state.go('index');
  });
};
registerBroadcastReceivers.$inject = ["$state", "mcs-core.IntentBroadcast"];
app.run(registerBroadcastReceivers);

app.bootstrap();
