// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDynx9QTaUqc9Ece8UqV3o43w88WONC-c4",
    authDomain: "stock-control-crud.firebaseapp.com",
    databaseURL: "https://stock-control-crud.firebaseio.com",
    projectId: "stock-control-crud",
    storageBucket: "stock-control-crud.appspot.com",
    messagingSenderId: "807122655701"
  }
};
