# Scream


## Deploy using Docker-Compose

Download `docker-compose.yml` from the repository, update the docker environment variables and run the following command:
```bash
docker-compose up -d
```

Your application will be available at `http://IP:8300` where `IP` is the IP address of your server.

## Setup
you need to setup your available status. In the `./confs` dir please add a `status.json` with the following type of content:
```json
[
    {
        "status": "ok",
        "description": "everything is ok"
    },
    {
        "status": "lockdown",
        "description": "emergency lockdown"
    }
]
```

and have fun to customize the configs.