dev:
	yarn dev
deploy-server:
	docker build -t blog-backend-image .
	docker-compose up -d
deploy-staging-server:
	docker build -t blog-backend-image-dev .
	docker-compose -f blog-compose-dev.yml up -d
