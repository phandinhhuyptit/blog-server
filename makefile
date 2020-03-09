deploy-server:
	docker build -t meet-bear-backend-image .
	docker-compose up -d

