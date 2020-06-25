import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@dell/navbar",
  app: () => System.import("@dell/navbar"),
  activeWhen: () => {
    return true;
  },
  customProps: {
    domElement: document.getElementById("mf-header"),
  }
});

registerApplication({
  name: "@dell/home",
  app: () => System.import("@dell/home"),
  activeWhen: (location) => location.pathname === "/",
  customProps: {
    domElement: document.getElementById("mf-content"),
  },
});

registerApplication({
  name: "@dell/users",
  app: () => System.import("@dell/users"),
  activeWhen: (location) => location.pathname.startsWith("/users"),
  customProps: {
    domElement: document.getElementById("mf-content"),
  },
});

// http://localhost:9000/users
// http://localhost:9000/users/10

start({
  urlRerouteOnly: true,
});
