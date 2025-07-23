### Technologies Used

This repository uses the following main technologies:

- **Frontend**: Vue 3, Vite, Pinia, Vue Router, Tailwind CSS, Vuelidate, Cypress (for E2E testing)
- **Backend**: NestJS, Prisma ORM, PostgreSQL, Redis, Axios, Jest (for testing)
- **Landing Page**: Nuxt 3, Tailwind CSS, Vue 3, Vue Router
- **Infrastructure & DevOps**: Docker, Docker Compose, Nginx, Ansible
- **Other**: LibreTranslate (self-hosted translation service)

See each subdirectory for more details and configuration files.

<details>
<summary>How to Run the Ansible Playbook</summary>

Configure your inventory and variables:
   - Edit `ansible/inventory.yml` to match your server and project configuration.
   - Make sure you have a `.env.yml` file with required secrets and variables (see `inventory.yml` for reference).


Run the playbook:

   ```bash
   cd ansible
   ansible-playbook -i inventory.yml playbook.yml --tags="setup"
   ```
</details>

<details>
<summary>How to run the app locally</summary>

#### Frontend

Install dependencies

```bash
cd frontend
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

#### Backend

Install dependencies

```bash
cd backend
npm install
```

Copy env file

```bash
cp .env.example .env
```

Run docker compose services and db migrations

```bash
npm run db:up

npm run db:setup
```

Start the app

```bash
npm run start:dev
```

#### Landing page

Install dependencies

```bash
cd landing
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

</details>
