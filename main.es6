require("file?name=index.html!./index.html");

require("angular");
require("angular-ui-router");

import {App, mod as mcsCore} from "mcs-core";
import {mod as mcsLogin} from "mcs-login";
import {mod as mcsStellard} from "mcs-stellard";

export const app = new App("client");
app.use('ui.router');
app.use(mcsCore.name);
app.use(mcsLogin.name);
app.use(mcsStellard.name);

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
    templateUrl: "client/login"
  });
};

app.bootstrap();