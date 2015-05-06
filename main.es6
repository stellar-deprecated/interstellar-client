require("file?name=index.html!./index.html");

require('./styles/main.header.scss');
require('./styles/main.footer.scss');

import {App, mod as mcsCore} from "mcs-core";
import {mod as mcsLogin} from "mcs-login";
import {mod as mcsStellard} from "mcs-stellard";
import {mod as mcsSettings} from "mcs-settings";
import {mod as mcsStellarApi} from "mcs-stellar-api";

export const app = new App("mcs-stellar-client");

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
    url: "/send/:destination",
    templateUrl: "mcs-stellar-client/send",
    requireSession: true
  });
};

app.bootstrap();