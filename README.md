## App

### To run app locally

#### Client

Install client dependencies

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

Install server dependencies

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
