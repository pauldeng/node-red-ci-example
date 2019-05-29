"use strict";

const should = require("should");

const functionNode = require("@node-red/nodes/core/core/80-function.js");
const helper = require("node-red-node-test-helper");

const fs = require("fs");
// read your main node red flow source code
const node_red_flows_string = fs.readFileSync("flows.json");

helper.init(require.resolve("node-red"));

describe("Simple math tests", function() {
  before(function(done) {
    helper.startServer(done);
  });

  afterEach(function() {
    helper.unload();
  });

  after(function(done) {
    helper.stopServer(done);
  });

  const flow = [
    {
      id: "n1",
      type: "function",
      func: "msg.payload = msg.payload + 1;\nreturn msg;",
      outputs: 1,
      noerr: 0,
      wires: [["n2"]]
    },
    {
      id: "n2",
      type: "helper"
    }
  ];

  const settings = {
    functionGlobalContext: {
      osModule: require("os")
    }
  };

  // this is interal test
  it("1 + 1 = 2", function(done) {
    helper.load(functionNode, flow, settings, function() {
      const n2 = helper.getNode("n2");
      const n1 = helper.getNode("n1");

      n2.on("input", function(msg) {
        msg.payload.should.equal(2);
        done();
      });

      // send data to the function need to be tested
      n1.receive({ payload: 1 });
    });
  });

  let node_red_flows = JSON.parse(node_red_flows_string);

  // remove all inject and debug nodes as they seems not working well with the test helper library
  for (let i = 0; i < node_red_flows.length; i++) {
    if (node_red_flows[i].type === "inject") {
      node_red_flows.splice(i, 1);
    }
  }

  // change the debug print node to test helper node
  node_red_flows[
    node_red_flows.findIndex(function(node) {
      return node.id === "b3448699.0af008";
    })
  ].type = "helper";

  //console.log(JSON.stringify(node_red_flows));

  // this is real, it reads your node red flows and test
  it("1 + 2 = 3", function(done) {
    helper.load(functionNode, node_red_flows, settings, function() {
      const n2 = helper.getNode("b3448699.0af008");
      const n1 = helper.getNode("e99a886c.09f818");

      n2.on("input", function(msg) {
        msg.payload.should.equal(3);
        done();
      });

      // send data to the function need to be tested
      n1.receive({ payload: 1 });
    });
  });
});
