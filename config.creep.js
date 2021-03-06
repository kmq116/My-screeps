const baseRoles = require("./baseRoles");
const {
  harvester,
  upgrader,
  builder,
  carrier,
  repairer,
  invader,
  transporter,
  wallRepairer,
  terminalTransporter,
  powerCreep,
} = baseRoles;

const storage = {
  W7N14: "5f2faee527d67001743a955d",
  W7N15: "602b99f5bf07c5281a28e753",
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

  // builderW7N14: builder(storage.W7N14),
  // builderW7N15: builder(storage.W7N15),
  // repairerW7N15: repairer(storage.W7N15),

  // invader: invader("5f455234766bcced898aa2d6"),
  transporterW7N14: transporter("5f75a047075e74f8ef024e1b"),
  transporterW7N15: transporter("6040dcc3a6bccc07e74f52f7"),
  // wallRepairerW7N14: wallRepairer(storage.W7N14),
  // wallRepairerW7N15: wallRepairer(storage.W7N15),

  terminalTransporterW7N14: terminalTransporter(
    storage.W7N14,
    "5f455234766bcced898aa2d6",
    RESOURCE_ENERGY
  ),
  // from to type
  powerCreep: powerCreep(
    "5f455234766bcced898aa2d6",
    storage.W7N14,
    RESOURCE_OPS
  ),
};
