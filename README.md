# steps

# 1. Create .secrets folder and file
1. mkdir .secrets
2. echo mypassword1 > .secrets/THEPASSWORD1
3. echo mypassword2 > .secrets/THEPASSWORD2

## 2. TEST VIA  docker-compose
1. `docker-compose up --build`
expect stdout of  mypassword1


## 3. TEST VIA  docker build
# :ro means read_only: true
# Note that the folder is then read-only in the container and read-write on the host.
# - https://docs.docker.com/engine/storage/bind-mounts/
1. `docker build -t distroless-getsecret:1 --no-cache .`
2. `docker run --name distroless-getsecret -v "${PWD}/.secrets:/run/secrets:ro"  -p 80:80 distroless-getsecret:1`
or 
2. `docker run --name distroless-getsecret -v "./.secrets:/run/secrets:ro"  -p 80:80 distroless-getsecret:1`
expect stdout of  mypassword1

--------------------------
# kill
- `docker-compose down`
- `docker stop distroless-getsecret`
- `docker rm distroless-getsecret`
- `docker image rm distroless-getsecret:1`
- `docker system prune`



