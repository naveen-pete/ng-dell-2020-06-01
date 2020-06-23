import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@demo/navbar",
  app: () => System.import("@demo/navbar"),
  activeWhen: () => true,
  customProps: {
    domElement: document.getElementById("mf-header"),
  },
});

registerApplication({
  name: "@demo/home",
  app: () => System.import("@demo/home"),
  activeWhen: (location) => location.pathname === "/",
  customProps: {
    domElement: document.getElementById("mf-content"),
  },
});

registerApplication({
  name: "@demo/users",
  app: () => System.import("@demo/users"),
  activeWhen: (location) => location.pathname.startsWith("/users"),
  customProps: {
    domElement: document.getElementById("mf-content"),
  },
});

start({
  urlRerouteOnly: true,
});
