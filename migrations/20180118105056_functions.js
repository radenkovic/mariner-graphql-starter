exports.up = knex =>
  knex.raw(`
    -- UUIDs
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- UPDATED AT
    CREATE OR REPLACE FUNCTION updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$ language 'plpgsql';    
  `);

exports.down = async knex => knex.raw(`DROP FUNCTION updated_at();`);
