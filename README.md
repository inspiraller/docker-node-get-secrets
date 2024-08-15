# steps

# 1. Create .secrets folder and file
1. mkdir .secrets
2. echo mypassword1 > .secrets/THEPASSWORD1
3. echo mypassword2 > .secrets/THEPASSWORD2

## 2. TEST VIA  docker-compose
1. `docker-compose up --build`
expect stdout of  mypassword1


## 3. TEST VIA  docker build
1. `docker build -t distroless-node-dumbinit:1 --secret id=THEPASSWORD1,src=./.secrets/THEPASSWORD1 --secret id=THEPASSWORD2,src=./.secrets/THEPASSWORD2 --no-cache .`
2. `docker run --name distroless-node-dumbinit -p 80:80 distroless-node-dumbinit:1`
expect stdout of  mypassword1

--------------------------
# kill
- `docker-compose down`
- `docker stop distroless-node-dumbinit`
- `docker rm distroless-node-dumbinit`
- `docker image rm distroless-node-dumbinit:1`
- `docker system prune`



