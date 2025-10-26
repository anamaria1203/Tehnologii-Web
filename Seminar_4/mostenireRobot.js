class Software {
  constructor(name) {
    this.name = name;
  }
  run() {
    console.log(`${this.name} is running`);
  }
}

class Plugin {
  constructor(name) {
    this.name = name;
    this.installed = false;
    this.enabled = false;
  }
  install(target) {
    this.installed = true;
    console.log(`Plugin "${this.name}" installed on ${target.name}`);
  }
  enable() {
    if (!this.installed) throw new Error(`Plugin "${this.name}" not installed`);
    this.enabled = true;
    console.log(`Plugin "${this.name}" enabled`);
  }

  action() {
    if (this.enabled) console.log(`[${this.name}] doing its job...`);
  }
}

class Browser extends Software {
  constructor(name) {
    super(name);
    this.plugins = [];
  }

  addPlugin(plugin) {
    if (typeof plugin.install !== "function") {
      throw new Error("Invalid plugin: missing install()");
    }
    this.plugins.push(plugin);
  }

  installPlugins() {
    this.plugins.forEach((p) => p.install(this));
  }

  listPlugins() {
    return this.plugins.map((p) => p.name);
  }

  run() {
    super.run();
    this.plugins.forEach((p) => p.action?.());
  }
}

const chrome = new Browser("FoxCat");
const adblock = new Plugin("AdBlock");
const grammar = new Plugin("Grammar");

chrome.addPlugin(adblock);
chrome.addPlugin(grammar);

console.log("Plugins:", chrome.listPlugins());
chrome.installPlugins();
adblock.enable();
grammar.enable();

chrome.run();
