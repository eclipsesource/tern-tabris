var util = require("./util");

var inheriting = [
  "Button",
  "Canvas",
  "CheckBox",
  "CollectionView",
  "Composite",
  "ImageView",
  "Picker",
  "ProgressBar",
  "RadioButton",
  "Slider",
  "TabFolder",
  "TextInput",
  "TextView",
  "ToggleButton",
  "Video",
  "WebView"
];

var properties = [
  {name: "background", type: "Color"},
  {name: "backgroundImage", type: "Image"},
  {name: "bounds", type: "Bounds"},
  {name: "enabled", type: "bool"},
  {name: "font", type: "Font"},
  {name: "textColor", type: "Color"},
  {name: "highlightOnTouch", type: "bool"},
  {name: "id", type: "string"},
  {name: "class", type: "string"},
  {name: "layoutData", type: "LayoutData"},
  {name: "opacity", type: "number"},
  {name: "transform", type: "Transformation"},
  {name: "visible", type: "bool"},
];

var functions = [
  {name: "id", type: "string"},
  {name: "cid", type: "string"},
  {name: "type", type: "string"},
  {name: "set", type: "fn(name: string, value: ?)", returnType: "Widget"},
  {name: "get", type: "fn(name: string)"},
  {name: "animate", type: "fn(animationProperties: ?, options: ?)"},
  {name: "apply", type: "fn(properties: ?)"},
  {name: "appendTo", type: "fn(parent: types.Widget)", returnType: "Widget"},
  {name: "parent", type: "fn() -> types.Widget", returnType: "Widget"},
  {name: "children", type: "fn(selector?: string) -> types.WidgetCollection", returnType: "WidgetCollection"},
  {name: "find", type: "fn(selector?: string) -> types.WidgetCollection", returnType: "WidgetCollection"},
  {name: "on", type: "fn(type: string, listener: fn())", returnType: "Widget"},
  {name: "once", type: "fn(type: string, listener: fn())", returnType: "Widget"},
  {name: "off", type: "fn(type?: string, listener?: fn())", returnType: "Widget"},
  {name: "trigger", type: "fn(type?: string, param?: ?)", returnType: "Widget"},
  {name: "dispose", type: "fn()"},
  {name: "isDisposed", type: "fn() -> bool", returnType: "bool"}
];

var events = [
  {name: "animationend", origin: "Widget"},
  {name: "animationstart", origin: "Widget"},
  {name: "resize", origin: "Widget"},
  {name: "dispose", origin: "Widget"},
  {name: "longpress", origin: "Widget"},
  {name: "pan", origin: "Widget"},
  {name: "pan:left", origin: "Widget"},
  {name: "pan:right", origin: "Widget"},
  {name: "pan:up", origin: "Widget"},
  {name: "pan:down", origin: "Widget"},
  {name: "swipe:left", origin: "Widget"},
  {name: "swipe:right", origin: "Widget"},
  {name: "swipe:up", origin: "Widget"},
  {name: "swipe:down", origin: "Widget"},
  {name: "tap", origin: "Widget"},
  {name: "touchcancel", origin: "Widget"},
  {name: "touchend", origin: "Widget"},
  {name: "touchmove", origin: "Widget"},
  {name: "touchstart", origin: "Widget"}
];

module.exports = util.runCommonTests("Button", {properties: properties, events: events, functions: functions, inheriting: inheriting});

exports['test set() returns self'] = function() {
  util.assertCompletion("var button = tabris.create('Button', {});button.set('text', {}).", {
    "name":"animate",
    "type":"fn(animationProperties: ?, options: ?)",
    "origin":"tabris"
  }, null, null, "animate");
};

exports['test on() listener "this" completion'] = function() {
  util.assertCompletion("var button = tabris.create('Button', {});" +
      "button.on('selection', selectionHandler);" +
      "var selectionHandler = function() { this.", {
    "name":"animate",
    "type":"fn(animationProperties: ?, options: ?)",
    "origin":"tabris"
  }, null, null, "animate");
};

exports['test children.forEach() argument is a Widget'] = function() {
  util.assertCompletion("var button = tabris.create('Button', {});" +
  "var children = button.children();" +
  "children.forEach(function(elt) {elt.", {
  "name" : "get",
    "type" : "fn(name: string)",
    "origin" : "tabris"
  }, null, null, "get");
};

exports['test children.filter() argument is a Widget'] = function() {
  util.assertCompletion("var button = tabris.create('Button', {});" +
  "var children = button.children();" +
  "children.filter(function(elt) {elt.", {
  "name" : "get",
    "type" : "fn(name: string)",
    "origin" : "tabris"
  }, null, null, "get");
};

if (module === require.main) require("test").run(exports);