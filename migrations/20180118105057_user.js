exports.up = knex =>
  knex.raw(`
    CREATE OR REPLACE FUNCTION updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$ language 'plpgsql';
    
    CREATE TABLE "user" (
      id SERIAL PRIMARY KEY,
      email VARCHAR UNIQUE NOT NULL,
      username VARCHAR UNIQUE NOT NULL,
      password VARCHAR NOT NULL,
      name VARCHAR,
      created_at TIMESTAMP without time zone default (now() at time zone 'utc'),
      updated_at TIMESTAMP without time zone default (now() at time zone 'utc')
    );
    CREATE TRIGGER user_updated_at BEFORE UPDATE ON "user" FOR EACH ROW EXECUTE PROCEDURE updated_at();
  `);

exports.down = async knex =>
  knex.raw(`
    DROP TABLE "user";
  `);
