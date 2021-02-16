const harvester = require("role.harvester");
const upgrader = require("role.upgrader");
const builder = require("role.builder");
const carrier = require("role.carrier");
const invader = require('role.invader')
module.exports = {
  // W7N14
  harvester1: harvester("5bbcac7e9099fc012e6358d3"),
  harvester2: harvester("5bbcac7e9099fc012e6358d2"),
  carrier: carrier("5f2faee527d67001743a955d"),
  // W7N15
  harvester3: harvester("5bbcac7e9099fc012e6358cf"),
  harvester4: harvester("5bbcac7e9099fc012e6358ce"),
  carrierW7N15: carrier("602b99f5bf07c5281a28e753"),
  upgraderW7N15:upgrader('602b99f5bf07c5281a28e753'),
  invader:invader('5f2faee527d67001743a955d'),

  upgrader1: upgrader("5f2faee527d67001743a955d"),
  builder: builder("602b99f5bf07c5281a28e753"),
};
