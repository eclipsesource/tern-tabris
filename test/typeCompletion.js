module.exports = {
  typesWithoutCompletion: ["bool", "Color", "Font", "ItemHeight", "CellType"],
  types: {
    fn: {
      "name" : "apply",
      "type" : "fn(this: ?, args: [?])",
      "origin" : "ecma5"
    },
    string: {
      "name" : "charAt",
      "type" : "fn(i: number) -> string",
      "origin" : "ecma5"
    },
    number: {
      "name" : "toExponential",
      "type" : "fn(digits: number) -> string",
      "origin" : "ecma5"
    },
    array: {
      "name" : "concat",
      "type" : "fn(other: [?])",
      "origin" : "ecma5"
    },
    Action: {
      "name" : "get",
      "type" : "fn(name: string)",
      "origin" : "tabris"
    },
    LayoutData: {
      "name" : "baseline",
      "type" : "types.Widget",
      "origin" : "tabris"
    },
    Transformation: {
      "name" : "rotation",
      "type" : "number",
      "origin" : "tabris"
    },
    WidgetCollection: {
      "name" : "filter",
      "type" : "fn(selector: {})",
      "origin" : "tabris"
    },
    Bounds: {
      "name":"left",
      "type":"number",
      "origin":"tabris"
    },
    Widget: {
      "name" : "animate",
      "type" : "fn(animationProperties: ?, options: ?)",
      "origin" : "tabris"
    },
    Image: {
      "name" : "height",
      "type" : "number",
      "origin" : "tabris"
    },
    Tab: {
      "name" : "animate",
      "type" : "fn(animationProperties: ?, options: ?) -> Promise",
      "origin" : "tabris"
    }
  }
};