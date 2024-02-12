#!/usr/bin/env bash

# Exit if any command exits with a non-zero exit code
set -o errexit

echo "Setting up PostgreSQL on Alpine Linux..."

export PGHOST=/postgres-volume/run/postgresql
export PGDATA="$PGHOST/data"

echo "Adding exclusive data directory permissions for postgres user..."
chmod 0700 "$PGDATA"

echo "Initializing database cluster..."
initdb -D "$PGDATA"

echo "Prepending volume path to Unix Domain Socket path..."
sed -i "s/#unix_socket_directories = '\/run\/postgresql'/unix_socket_directories = '\/postgres-volume\/run\/postgresql'/g" "$PGDATA/postgresql.conf"

echo "Enabling connections on all available IP interfaces..."
echo "listen_addresses='*'" >> "$PGDATA/postgresql.conf"

echo "Starting PostgreSQL..."
pg_ctl start -D "$PGDATA"

echo "Creating database, user and schema..."
psql -U postgres postgres << SQL
  CREATE DATABASE $PGDATABASE;
  CREATE USER $PGUSERNAME WITH ENCRYPTED PASSWORD '$PGPASSWORD';
  GRANT ALL PRIVILEGES ON DATABASE $PGDATABASE TO $PGUSERNAME;
  \\connect $PGDATABASE
  CREATE SCHEMA $PGUSERNAME AUTHORIZATION $PGUSERNAME;
SQL
