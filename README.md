# Node Red CI Example

This is a example of Node Red npm test for Continuous Integration. It uses node-red-node-test-helper.

## What
The Node Red flow is simple, it has two functions as of below. Inject node injects a number 1 and debug node displays 4 at the end (1 + 1 + 2 = 4).
![flows](imgs/node-red-flow.png)  
The test script will test two functions with following cases by npm test:
* 1+1=2
* 1+2=3
* 1+1+2=4

## Test Procedure
```bash
git clone https://github.com/pauldeng/node-red-ci-example.git
cd node-red-ci-example
npm install
npm test
```

## Add tests to your existing project
```bash
# in your project folder
npm install mocha chai should node-red node-red-node-test-helper --save-dev
# please refer to https://github.com/node-red/node-red-node-test-helper
# edit package.json and add "scripts": {"test": "mocha \"test/**/*_spec.js\""}, 
mkdir test
cd test
# now you can add your own test script
```

## CI Service Integration
### Travis CI
add .travis.yml as in the file  
check out the Travis CI output: https://travis-ci.com/pauldeng/node-red-ci-example
### BitBucket Pipelines
add bitbucket-pipelines.yml

