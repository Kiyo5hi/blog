---
title: How Do I Manage My Development Environment
description: While my development environment gets more complicated than ever before, what is a smart way of managing this?
category: Technology
createdAt: 2023-01-31T00:00-08:00
updatedAt: 2023-01-31T00:00-08:00
---

When I was using my old Dell XPS 15, I was confronted with the issue that the battery died so fast that the battery life could not last for more than 3 hours of programming. I knew there was something wrong with my laptop on its own, computation-intensive tasks and countless energy-inefficient apps, however, drained the battery fast.

To reiterate, I am facing the following issue:

- Installing dev tools on my PC slows my PC down
- Computation-intensive tasks kill my battery fast
- If I break my dev env, I have to either do research for hours to fix a single trivial issue or reinstall everything

Therefore, if I send all the computation to the cloud and let servers handle that for me, my laptop can serve solely as a client with trivial tasks. In this way, additionally, my laptop is somewhat "stateless" since all my work "states" will be stored in the cloud.

Moreover, I can exploit the power of LXCs so that once I have any issue with the dev env itself, I can simply replace one container with another.

To make it clearer: I need a docker daemon running on a server, and to establish a secure connection between the docker client on my PC to the daemon. VSCode also has an extension to "attach to container" which makes this easier than ever.

## Setup Docker Daemon

### Install Docker Daemon

To get started, I installed Docker on my server following the [official documentation](https://docs.docker.com/engine/install/debian/) and make docker engine accessible with non-root users following [post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/).

### Access Docker Daemon Through HTTPS

To access the daemon from my PC, the docker daemon has to be reachable from the internet securely.

First, generate a set of certificates to protect the port that I am about to open for my docker daemon following [this guide](https://docs.docker.com/engine/security/protect-access/#use-tls-https-to-protect-the-docker-daemon-socket).

### Configure The Daemon

A docker daemon is configured with `/etc/docker/daemon.json`. To enable the daemon for accessing through a TCP port, I have modified the file to be like this:

```json
{
    "tlsverify": true,
    "tlscacert": "/path/to/ca.pem",
    "tlscert": "/path/to/server-cert.pem",
    "tlskey": "/path/to/server-key.pem",
    "hosts": [
        "tcp://0.0.0.0:2376",
        "unix:///var/run/docker.sock"
    ]
}
```

**Note:** the port has to be opened!

### Configure The Service

With the daemon configured, I can modify the options of `dockerd` at startup.

Debian manages services using `systemd`, and docker has its service definition file at `/lib/systemd/system/docker.service`:

```ini
# ...
ExecStart=/usr/bin/dockerd $DOCKER_OPTS
# ...
```

By configuring the startup options, now the daemon only relies on `daemon.json` instead of any other flags/options provided to the binary executable.

Restart the daemon to apply the changes:

```shell
systemctl daemon-reload
systemctl restart docker.service
```

## Setup Docker Client

### Install Docker Client

There are tons of ways of installing docker client or docker CLI **(not docker desktop)**. The easiest way to do this is to find the most appropriate package from the most appropriate package manager on a system. On the other hand, the most general way to do this is to install the docker client with [binaries](https://docs.docker.com/engine/install/binaries/) directly, with the server/daemon removed to cause less trouble.

### Configure Docker Client

Now, I have to establish the connection between my system and the server daemon. First, I have to make a directory for certificates that I generated before:

```shell
mkdir -p ~/.docker
cp {ca,cert,key}.pem ~/.docker
```

With certificates settled, let the client know where to connect:

```shell
# Replace $HOST with hostname to the server
export DOCKER_HOST=tcp://$HOST:2376 DOCKER_TLS_VERIFY=1
```

Also, to make this a default behavior, simply append this line to `.zshrc` or any `.rc` file of the preferred shell.

To test the connection, run this:

```shell
docker version
```

With everything configured, start a container on the server and [attach it](https://code.visualstudio.com/docs/devcontainers/attach-container) using VSCode.

## Bonus - Code Server and Jupyter

Code Server is such a nice project, so read [this](https://coder.com/docs/code-server/latest) and try [this](https://hub.docker.com/r/codercom/code-server). I also created a [Dockerfile](https://github.com/Kiyo5hi/Dockerfiles/blob/main/code-server/Dockerfile) on top of this image to conveniently and constantly restart my container (just in case).

Now, I can develop on my iPad by installing the PWA which is a built-in feature of Code Server. It is also worth mentioning that Code Server cannot handle port-forwarding like how VSCode does due to the limitations of browsers; this is an issue when I want HMR when doing front-end stuff since HMR is implemented with WebSocket, which is problematic when I have everything protected with SSL. Some workarounds existed in the [official repository](https://github.com/coder/code-server), but workarounds are just not my flavor.

As for Jupyter, since I also work on scientific computations (implying ML, CV, DL, etc.), I do need it sometimes. Grab one of the images [here](https://hub.docker.com/u/jupyter), configure it with [documentation](https://jupyter-docker-stacks.readthedocs.io/en/latest/index.html) aside, then reverse proxy it.

## Note

All my containers are managed using [Docker Compose](https://docs.docker.com/compose/) and all services are reverse proxied with [my favorite web server](https://caddyserver.com/) which is also another container. LOL.
