import * as RxDB from "rxdb";
import { RxDatabase, QueryChangeDetector } from "rxdb";

QueryChangeDetector.enable();
QueryChangeDetector.enableDebugging();

RxDB.plugin(require("pouchdb-adapter-idb"));
RxDB.plugin(require("pouchdb-adapter-http")); //enable syncing over http

const collections = [
  {
    name: "spreadsheet",
    schema: require("./Schema.js").default,
    methods: {},
    sync: true
  }
];

// note that I can make this url any pouchdb or couchdb server. So for example: https://glitch.com/edit/#!/lemon-passive
const syncURL = `https://lemon-passive.glitch.me/`; // was previously //"http://" + window.location.hostname + ":10102/";
console.log("host: " + syncURL);
// const syncURL = host;

let dbPromise = null;

const _create = async function() {
  console.log("DatabaseService: creating database..");
  const db = await RxDB.create({
    name: "spreadsheetdb",
    adapter: "idb"
    // password: "myLongAndStupidPassword",
    // ignoreDuplicate: true
  });
  console.log("DatabaseService: created database");
  window["db"] = db; // write to window for debugging

  // show leadership in title
  db.waitForLeadership().then(() => {
    console.log("isLeader now");
    document.title = "♛ " + document.title;
  });

  // create collections
  console.log("DatabaseService: create collections");
  await Promise.all(collections.map(colData => db.collection(colData)));

  // sync
  console.log("DatabaseService: sync");
  collections
    .filter(col => col.sync)
    .map(col => col.name)
    .map(colName =>
      db[colName].sync({
        remote: syncURL + colName + "/"
      })
    );

  return db;
};

export function get() {
  if (!dbPromise) dbPromise = _create();
  return dbPromise;
}
