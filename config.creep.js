const harvester = require("role.harvester");
const upgrader = require("role.upgrader");
const builder = require("role.builder");
const carrier = require("role.carrier");
const repairer = require("role.repairer");
const invader = require("role.invader");
const transporter = require("role.transporter");
const wallRepairer = require("role.wallRepairer");
const terminalTransporter = require("role.terminalTransporter");
const powerCreep = require("role.powerCreep");

const storage = {
  W7N14: "5f2faee527d67001743a955d",
  W7N15: "602b99f5bf07c5281a28e753"
};
module.exports = {
  // W7N14
  harvesterW7N1401: harvester("5bbcac7e9099fc012e6358d3"),
  harvesterW7N1402: harvester("5bbcac7e9099fc012e6358d2"),
  harvesterW7N1501: harvester("5bbcac7e9099fc012e6358cf"),
  harvesterW7N1502: harvester("5bbcac7e9099fc012e6358ce"),

  carrierW7N14: carrier(storage.W7N14),
  carrierW7N15: carrier(storage.W7N15),
  upgraderW7N15: upgrader(storage.W7N15),
  upgraderW7N14: upgrader(storage.W7N14),

  builderW7N15: builder(storage.W7N15),
  repairerW7N15: repairer(storage.W7N15),

  invader: invader(storage.W7N14),
  transporterW7N14: transporter("5f75a047075e74f8ef024e1b"),
  wallRepairerW7N14: wallRepairer(storage.W7N14),
  wallRepairerW7N15: wallRepairer(storage.W7N15),
  // from to type
  terminalTransporterW7N14: terminalTransporter(
    '5f455234766bcced898aa2d6',
    "5fb1893ae7f0760f5449d7ed",
    RESOURCE_POWER
  ),
  // from to type
  powerCreep: powerCreep(
    "5f455234766bcced898aa2d6",
    storage.W7N14,
    RESOURCE_OPS
  ),
};
