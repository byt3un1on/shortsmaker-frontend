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

validate: lint test

clean:
	rm -rf dist node_modules coverage

help:
	@echo "Available commands:"
	@echo "  install      - Install dependencies"
	@echo "  run          - Start development server"
	@echo "  build        - Build the project"
	@echo "  test         - Run tests"
	@echo "  test-coverage - Run tests with coverage"
	@echo "  lint         - Run ESLint"
	@echo "  format       - Format code with Prettier"
	@echo "  clean        - Clean build artifacts"
