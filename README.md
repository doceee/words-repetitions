## App

### Run app locally

#### Client

Install dependencies

```bash
cd client
npm install
```

Copy env file

```bash
cp .env.example .env
```

Start the app

```bash
npm run dev
```

#### Server

Install dependencies

```bash
cd server
npm install
```

Copy env file

```bash
cp .env.example .env
```

Run docker compose services and db migrations

```bash
npm run db:dev:up

npm run prisma:deploy
```

Start the app

```bash
npm run start:dev
```

#### Landing page

Install dependencies

```bash
cd landing-page
npm install
```

Copy env file

```bash
cp .env.example .env
```

Start the app

```bash
npm run dev
```
