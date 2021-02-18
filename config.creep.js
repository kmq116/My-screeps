const harvester = require("role.harvester");
const upgrader = require("role.upgrader");
const builder = require("role.builder");
const carrier = require("role.carrier");
const repairer = require("role.repairer");
const invader = require("role.invader");
const transporter = require("role.transporter");
const wallRepairer = require("role.wallRepairer");
const terminalTransporter = require("role.terminalTransporter");

module.exports = {
  // W7N14
  harvesterW7N1401: harvester("5bbcac7e9099fc012e6358d3"),
  harvesterW7N1402: harvester("5bbcac7e9099fc012e6358d2"),
  harvesterW7N1501: harvester("5bbcac7e9099fc012e6358cf"),
  harvesterW7N1502: harvester("5bbcac7e9099fc012e6358ce"),
  carrierW7N14: carrier("5f2faee527d67001743a955d"),
  carrierW7N15: carrier("602b99f5bf07c5281a28e753"),
  upgraderW7N15: upgrader("602b99f5bf07c5281a28e753"),
  upgraderW7N14: upgrader("5f2faee527d67001743a955d"),

  builderW7N15: builder("602b99f5bf07c5281a28e753"),
  repairerW7N15: repairer("602b99f5bf07c5281a28e753"),
  
  invader: invader("5f2faee527d67001743a955d"),
  transporterW7N14: transporter("5f75a047075e74f8ef024e1b"),
  wallRepairerW7N14: wallRepairer("5f2faee527d67001743a955d"),
  // from to type
  terminalTransporterW7N14: terminalTransporter(
    "5f2faee527d67001743a955d",
    "5f572ed57d36e2eb6c6dfebe",
    RESOURCE_ENERGY
  ),
};
