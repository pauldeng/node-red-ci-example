const should = require("should");

const functionNode = require("@node-red/nodes/core/core/80-function.js");
const helper = require("node-red-node-test-helper");

helper.init(require.resolve('node-red'));

describe("Simple math tests", function() {

    before(function(done) {
        helper.startServer(done);
    });

    afterEach(function(done) {
        helper.unload();
        helper.stopServer(done);
    });

    const flow = [
        {
            "id": "15f8e4de.924ddb",
            "type": "function",
            "func": "msg.payload = msg.payload + 1;\nreturn msg;",
            "outputs": 1,
            "noerr": 0,
            "wires": [
                ["n2"]
            ]
        },
        {
            id: "n2",
            type: "helper"
        }
    ];

    const settings = {
        functionGlobalContext: {
            osModule: require('os')
        }
    };

    it('1 + 1 = 2', function (done) {
        helper.load(functionNode, flow, settings, function () {
            const n2 = helper.getNode("n2");
            const n1 = helper.getNode("15f8e4de.924ddb");

            n2.on("input", function (msg) {
                msg.payload.should.equal(2);
                done();
            });

            // send data to the function need to be tested
            n1.receive({ payload: 1 });
        });
    });

});
