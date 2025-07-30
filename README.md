Aplikacja wspiera naukę słownictwa w języku angielskim poprzez powtarzanie, gry oraz system powtórek. Umożliwia śledzenie postępów, korzystanie z różnych trybów nauki (w tym gier pamięciowych i quizów), a także automatyczne tłumaczenie słów.

#### Użyte technologie

Repozytorium wykorzystuje następujące technologie:

- **Frontend**: Vue 3, Vite, Pinia, Vue Router, Tailwind CSS, Vuelidate, Cypress (do testów E2E)
- **Backend**: NestJS, Prisma ORM, PostgreSQL, Redis, Axios, Jest (do testów)
- **Landing Page**: Nuxt 3, Tailwind CSS, Vue 3, Vue Router
- **Infrastruktura i DevOps**: Docker, Docker Compose, Nginx, Ansible
- **Inne**: LibreTranslate (samodzielnie hostowana usługa tłumaczeń)

<details>
<summary>Jak uruchomić playbook Ansible</summary>

Skonfiguruj inventory i zmienne:

- Edytuj `ansible/inventory.yml`, aby dopasować do konfiguracji serwera i projektu.
- Upewnij się, że masz plik `.env.yml` z wymaganymi sekretami i zmiennymi (zobacz `inventory.yml` jako odniesienie).

Uruchom playbook:

```bash
cd ansible
ansible-playbook -i inventory.yml playbook.yml --tags="setup"
```

</details>

<details>
<summary>Jak uruchomić aplikację lokalnie</summary>

#### Frontend

Zainstaluj zależności i skopiuj plik env

```bash
cd frontend
npm install
cp .env.example .env
```

Uruchom aplikację

```bash
npm run dev
```

#### Backend

Zainstaluj zależności i skopiuj plik env

```bash
cd backend
npm install
cp .env.example .env
```

Uruchom usługi docker compose i migracje bazy danych

```bash
npm run db:up

npm run db:setup
```

Uruchom aplikację

```bash
npm run start:dev
```

#### Landing page

Zainstaluj zależności i skopiuj plik env

```bash
cd landing
npm install
cp .env.example .env
```

Uruchom aplikację

```bash
npm run dev
```

</details>
