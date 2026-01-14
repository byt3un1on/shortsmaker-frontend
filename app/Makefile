.PHONY: install run build test test-coverage lint format clean help validate up down logs ps

install:
	npm install

run:
	npm run dev

build:
	npm run build

test:
	npm test

test-coverage:
	npm run test:coverage

lint:
	npm run lint

format:
	npm run format

validate: install format lint test-coverage build

clean:
	rm -rf dist node_modules coverage

up:
	docker compose up -d --build

down:
	docker compose down

logs:
	docker compose logs -f

ps:
	docker compose ps

help:
	@echo "Available commands:"
	@echo "  install      - Install dependencies"
	@echo "  run          - Start development server"
	@echo "  build        - Build the project"
	@echo "  test         - Run tests"
	@echo "  test-coverage - Run tests with coverage"
	@echo "  lint         - Run ESLint"
	@echo "  format       - Format code with Prettier"
	@echo "  validate     - Full project validation"
	@echo "  up           - Deploy production version (Docker)"
	@echo "  down         - Stop production version (Docker)"
	@echo "  logs         - Show Docker logs"
	@echo "  ps           - Show Docker status"
	@echo "  clean        - Clean build artifacts"
