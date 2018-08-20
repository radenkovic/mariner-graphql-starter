exports.up = knex =>
  knex.raw(`  
    CREATE TABLE "user" (
      id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
      email VARCHAR UNIQUE NOT NULL,
      username VARCHAR UNIQUE NOT NULL,
      password VARCHAR NOT NULL,
      password_reset_token VARCHAR,
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
