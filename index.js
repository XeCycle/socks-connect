#!/usr/bin/env node

var $socks = require("socksv5");
var $tls = require("tls");

function connect({host, port, secure=false}, cont) {
  $socks.connect({
    host, port,
    proxyHost: "localhost",
    proxyPort: 1080,
    auths: [$socks.auth.None()]
  }, (!secure) ? cont : raw => {
    cont($tls.connect({
      socket: raw,
      servername: host
    }));
  });
}

module.exports = connect;

if (require.main === module) {
  var [,, $1, $2, $3] = process.argv;
  var opts;
  if ($1 === "-s") {
    opts = { host: $2, port: parseInt($3), secure: true };
  } else {
    opts = { host: $1, port: $2 };
  }
  connect(opts, sock => {
    process.stdin.pipe(sock);
    sock.pipe(process.stdout);
  });
}
