"use strict";

var fs = require("fs"), path = require("path"), tern = require("tern"), assert = require('assert');
require("../tabris.js");
var typeCompletion = require("./typeCompletion.js");

var projectDir = path.resolve(__dirname, "..");
var resolve = function(pth) {
  return path.resolve(projectDir, pth);
};
var browser = JSON.parse(fs
    .readFileSync(resolve("node_modules/tern/defs/browser.json")), "utf8");
var ecma5 = JSON.parse(fs
    .readFileSync(resolve("node_modules/tern/defs/ecma5.json")), "utf8");

var allDefs = {
  browser : browser,
  ecma5 : ecma5
};

var defaultQueryOptions = {
  types: true,
  docs: false,
  urls: false,
  origins: true
}

function createServer(defs, options) {
  var plugins = {};
  if (options) plugins['tabris'] = options; else plugins['tabris'] = {};
  var server = new tern.Server({
    plugins : plugins,
    defs : defs
  });
  return server;
}

exports.assertCompletion = function(text, expected, queryOptions, pluginOptions, name) {
  var defs = [];
  var defNames = ["ecma5", "browser"];
  if (defNames) {
    for (var i = 0; i < defNames.length; i++) {
      var def = allDefs[defNames[i]];
      defs.push(def);
    }
  }
  if (!queryOptions) queryOptions = defaultQueryOptions;

  var server = createServer(defs, pluginOptions);
  server.addFile("test1.js", text);
  server.request({
    query : {
      type: "completions",
      file: "test1.js",
      end: text.length,
      types: queryOptions.types,
      docs: queryOptions.docs,
      urls: queryOptions.urls,
      origins: queryOptions.origins,
      caseInsensitive: true,
      lineCharPositions: true,
      expandWordForward: false
    }
  }, function(err, resp) {
    if (err)
      throw err;
    var actualMessages = resp.messages;
    var expectedMessages = expected.messages;

    if(name) {
      var actualItem = {};
      var completions = resp["completions"];
      if (completions) {
        completions.forEach(function(item) {
          if (item['name'] === name) actualItem = item;
        });
      }
      assert.equal(JSON.stringify(actualItem), JSON.stringify(expected));
    } else {
      assert.equal(JSON.stringify(resp), JSON.stringify(expected));
    }
  });
}

exports.assertFunction = function(type, fn) {
  if(fn.returnType && (typeCompletion.typesWithoutCompletion.indexOf(fn.returnType) < 0)) {
    assertFunctionWithReturnType(type, fn);
  } else {
    exports.assertCompletion("var element = new tabris." + type + "();element.", {
      "name" : fn.name,
      "type" : fn.type,
      "origin" : "tabris"
    }, null, null, fn.name);
  }
};

exports.runCommonTests = function(type, testData) {
  var _exports = {};
  if(testData.properties) {
    testData.properties.forEach(function(property) {
      _exports['test ' + property.name + ' property completion'] =
        function() {exports.assertProperty(type, {type: property.type, name: property.name});};
    });
  }
  if(testData.prototype) {
    testData.prototype.forEach(function(fn) {
      _exports['test ' + fn.name + ' function completion'] =
        function() {exports.assertFunction(type, {name: fn.name, type: fn.type, returnType: fn.returnType});};
    });
  }
  if(testData.events) {
    testData.events.forEach(function(event) {
      _exports['test ' + event.name + ' event completion'] =
        function() {exports.assertEvent(type, event.name, (event.origin ? event.origin : null));};
    });
  }
  if(testData.inheriting) {
    testData.inheriting.forEach(function(inherited) {
      var commonExports = exports.runCommonTests(inherited, {
        events: testData.events,
        functions: testData.functions,
        properties: testData.properties
      });
      for (var prop in commonExports) {
        _exports["test " + inherited + prop.substr(4)] = commonExports[prop];
      }
    });
  }
  return _exports;
};

function assertFunctionWithReturnType(type, fn) {
  exports.assertCompletion("new tabris." + type + "()." + fn.name + "().",
    typeCompletion.types[fn.returnType], null, null, typeCompletion.types[fn.returnType].name);
}

exports.assertProperty = function(type, fn) {
  if(typeCompletion.typesWithoutCompletion.indexOf(fn.type) < 0) {
    assertPropertyWithReturnType(type, fn);
  } else {
    var nameWithQuote = "'" + fn.name + "'";
    exports.assertCompletion("var element = new tabris." + type + "();element.get('" + fn.name, {
      "name" : nameWithQuote,
      "type" : fn.type[0].toLowerCase() !== fn.type[0] ? "!propertyTypes." + fn.type : fn.type,
      "origin" : "tabris",
      "displayName" : fn.name
    }, null, null, nameWithQuote);
  }
};

function assertPropertyWithReturnType(type, fn) {
  exports.assertCompletion(
    "var element = new tabris." + type + "();element.get('" + fn.name + "').",
    typeCompletion.types[fn.type],
    null,
    null,
    typeCompletion.types[fn.type].name
  );
}

exports.assertEvent = function(type, eventName, origin) {
  var eventNameWithQuote = "'" + eventName + "'";
  exports.assertCompletion("var element = new tabris." + type + "();element.on('" + eventName, {
    "name" : eventNameWithQuote,
    "type" : "!events." + (origin ? origin : type) + "Events." + eventName,
    "origin" : "tabris",
    "displayName" : eventName
  }, null, null, eventNameWithQuote);
};
