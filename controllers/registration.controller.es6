export class RegistrationController {
  constructor(sessions) {
    //
  }
}

RegistrationController.$inject = ["mcs-stellard.Sessions"];

module.exports = function(mod) {
  mod.controller("RegistrationController", RegistrationController);
};