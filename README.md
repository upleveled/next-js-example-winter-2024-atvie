# Next.js Example - Winter 2024

The Next.js Example - Winter 2024 is a project that demonstrates how to use Next.js to build a full-stack web application. It is part of the curriculum for the [UpLeveled Web Development Bootcamp](https://upleveled.io/web-development-bootcamp).

# Technologies

- Next.js
- Postgres.js

## Database Setup

Copy the `.env.example` file to a new file called `.env` (ignored from Git) and fill in the necessary information.

Follow the instructions from the PostgreSQL step in [UpLeveled's System Setup Instructions](https://github.com/upleveled/system-setup/blob/master/readme.md).

Then, connect to the built-in `postgres` database as administrator in order to create the database:

**Windows**

If it asks for a password, use `postgres`.

```bash
psql -U postgres
```

**macOS**

```bash
psql postgres
```

**Linux**

```bash
sudo -u postgres psql
```

Once you have connected, run the following to create the database:

```sql
CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
\connect winter_migration_2024;
CREATE SCHEMA <schema name> AUTHORIZATION <user name>;
```

Quit `psql` using the following command:

```bash
\q
```

On Linux, you will also need to create a Linux system user with a name matching the user name you used in the database. It will prompt you to create a password for the user - choose the same password as for the database above.

```bash
sudo adduser <user name>
```

Once you're ready to use the new user, reconnect using the following command.

**Windows and macOS:**

```bash
psql -U <user name> <database name>
```

**Linux:**

```bash
sudo -u <user name> psql -U <user name> <database name>
```

# UI Interface

<img width="1440" alt="Screenshot 2024-02-06 at 12 13 52" src="https://github.com/upleveled/next-js-example-winter-2024-atvie/assets/74430629/1f3b5ca5-4883-41aa-9ada-2b2658eb6267">
<img width="1440" alt="Screenshot 2024-02-06 at 12 13 26" src="https://github.com/upleveled/next-js-example-winter-2024-atvie/assets/74430629/45f32134-109b-43e2-a441-7bfb8a47642c">
