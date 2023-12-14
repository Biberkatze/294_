class Router {
  constructor(routes) {
    this.routes = routes;
    //rufe aufgrund des gegebenen hashes (bsp: #page) 
    //die richtige Funktion auf
    this.navigate = function (hash) {
      let route = this.getRouteByHash(hash);
      history.pushState({}, "", hash); //Wechseln des Hashwertes
      route.function();
    };
    //Navigiere zu der im hash der URL zugehörigen Funktion.
    this.urlResolve = function () {
      this.navigate(location.hash);
    };

    //Gib die korrekte Route für einen gegeben Hashwert aus.
    this.getRouteByHash = (hash) => {
      if (hash == "") {
        return routes["login"];
      }
      let route = routes["error"]; //Falls keine Route gefunden wurde: Error ausgeben.
      Object.keys(routes).forEach((key) => {
        if (routes[key].hash == hash) {
          route = routes[key];
        }
      });
      return route;
    };
    //Rufe urlResolve auf, sobald sich der Hashwert in der URL ändert.
    //Sonst muss die Sete neu geladen werden.
    addEventListener("hashchange", (event) => {
      this.urlResolve();
    });
  }
}
