require("file?name=index.html!./index.html");

import {App, mod as mcsCore} from "mcs-core";
import {mod as mcsLogin} from "mcs-login";
import {mod as mcsStellard} from "mcs-stellard";
import {mod as mcsSettings} from "mcs-settings";

export const app = new App("mcs-stellar-client");

app.use(mcsCore.name);
app.use(mcsLogin.name);
app.use(mcsStellard.name);
app.use(mcsSettings.name);

app.templates   = require.context("raw!./templates", true);
app.controllers = require.context("./controllers",   true);

app.routes = (state) => {
  state.state('index', {
    url: "/",
    controller: function($state) {
      $state.go('login');
    }
  });
  state.state('login', {
    url: "/login",
    templateUrl: "mcs-stellar-client/login"
  });
  state.state('dashboard', {
    url: "/dashboard",
    templateUrl: "mcs-stellar-client/dashboard"
  });
  //state.state('settings', {
  //  url: "/settings",
  //  templateUrl: "mcs-settings/main"
  //});
};

app.bootstrap();