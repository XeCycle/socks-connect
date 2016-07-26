# socks-connect

Connect over a SOCKS proxy to a remote host and port, redirecting
traffic from/to stdin/stdout, optionally handling TLS.  Clone
this, then

```
$ socks-connect [-s] host port
```

Assumes proxy is on `localhost:1080` and requires no auth.

## Background

A quick and dirty hack for me to connect to GMail from Gnus.
Somehow `socat` using SOCKS4a did not work, and I have no idea
how `openssl` or `gnutls-cli` uses proxies, so I wrapped this up.
The Gnus config is simply
```
(nnimap-stream shell)
(nnimap-shell-program "socks-connect -s imap.gmail.com 993")
```

## Notes

The script wants a fairly recent version of node.js for the ES6
features; also it hard-codes the proxy server.  You may want to
modify it before use.
