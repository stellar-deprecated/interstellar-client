require("file?name=index.html!./index.html");

require('./styles/main.header.scss');
require('./styles/main.footer.scss');

import interstellarCore, {App, Intent} from "interstellar-core";
import interstellarWallet from "interstellar-wallet";
import interstellarNetwork from "interstellar-network";
import interstellarNetworkWidgets from "interstellar-network-widgets";
import interstellarSessions from "interstellar-sessions";
import interstellarStellarApi from "interstellar-stellar-api";

let config = require('./config.json');
const app = new App("interstellar-client", config);

app.use(interstellarCore);
app.use(interstellarWallet);
app.use(interstellarNetwork);
app.use(interstellarNetworkWidgets);
app.use(interstellarSessions);
app.use(interstellarStellarApi);

app.templates   = require.context("raw!./templates", true);
app.controllers = require.context("./controllers",   true);

app.routes = ($stateProvider) => {
  $stateProvider.state('login', {
    url: "/",
    templateUrl: "interstellar-client/login"
  });
  $stateProvider.state('register', {
    url: "/register",
    templateUrl: "interstellar-client/register"
  });
  $stateProvider.state('dashboard', {
    url: "/dashboard",
    templateUrl: "interstellar-client/dashboard",
    requireSession: true
  });
  $stateProvider.state('transfer', {
    url: "/transfer",
    templateUrl: "interstellar-client/transfer",
    requireSession: true
  });
  $stateProvider.state('history', {
    url: "/history",
    templateUrl: "interstellar-client/history",
    requireSession: true
  });
  $stateProvider.state('settings', {
    url: "/settings",
    templateUrl: "interstellar-client/settings",
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
registerBroadcastReceivers.$inject = ["$state", "interstellar-core.IntentBroadcast"];
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

goToMainStateWithoutSession.$inject = ["$state", "$rootScope", "interstellar-sessions.Sessions"];
app.run(goToMainStateWithoutSession);

app.bootstrap();
