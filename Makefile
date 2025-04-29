FOLDER_NAME = user_Demo
COMPOSE = docker-compose

build:
	${COMPOSE} build

up:
	${COMPOSE} up -d

down:
	${COMPOSE} down 

stop:
	${COMPOSE} stop

restart: down build up


prune:
	docker system prune 

clean:
	docker build prune


ps:
	${COMPOSE} ps -a

logs:
	${COMPOSE} logs 


