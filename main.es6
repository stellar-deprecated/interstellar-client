require("file?name=index.html!./index.html");

require('./styles/main.header.scss');
require('./styles/main.footer.scss');

import mcsCore, {App, Intent} from "mcs-core";
import mcsLogin from "mcs-login";
import mcsStellard from "mcs-stellard";
import mcsStellarApi from "mcs-stellar-api";

let config = require('./config.json');
const app = new App("mcs-stellar-client", config);

app.use(mcsCore);
app.use(mcsLogin);
app.use(mcsStellard);
app.use(mcsStellarApi);

app.templates   = require.context("raw!./templates", true);
app.controllers = require.context("./controllers",   true);

app.routes = ($stateProvider) => {
  $stateProvider.state('login', {
    url: "/",
    templateUrl: "mcs-stellar-client/login"
  });
  $stateProvider.state('register', {
    url: "/register",
    templateUrl: "mcs-stellar-client/register"
  });
  $stateProvider.state('dashboard', {
    url: "/dashboard",
    templateUrl: "mcs-stellar-client/dashboard",
    requireSession: true
  });
  $stateProvider.state('transfer', {
    url: "/transfer",
    templateUrl: "mcs-stellar-client/transfer",
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
    $state.go('login');
  });
};
registerBroadcastReceivers.$inject = ["$state", "mcs-core.IntentBroadcast"];
app.run(registerBroadcastReceivers);

let goToMainStateWithoutSession = ($state, $rootScope, Sessions) => {
  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
    let hasDefault = Sessions.hasDefault();
    if (toState.requireSession && !hasDefault) {
      event.preventDefault();
      $state.go('login');
    }
  })
};

goToMainStateWithoutSession.$inject = ["$state", "$rootScope", "mcs-stellard.Sessions"];
app.run(goToMainStateWithoutSession);

app.bootstrap();
