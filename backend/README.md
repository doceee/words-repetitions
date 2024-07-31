## Nest api

### Run app

Install dependencies

```bash
npm install
```

Copy env file

```bash
cp .env.example .env
```

Run docker compose services and setup db

```bash
docker compose up -d

npm run db:setup
```

Start the app

```bash
npm run start:dev
```
