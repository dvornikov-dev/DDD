import pkg from 'pg';
const { Pool } = pkg;

export default (options) => { 
  const pool = new Pool({...options});
  return (table) => ({
    async query(sql, args) {
      const result = await pool.query(sql, args);
      return result.rows;
    },

    async read(id, fields = ['*']) {
      const names = fields.join(', ');
      const sql = `SELECT ${names} FROM ${table}`;
      if (!id) return pool.query(sql);
      return pool.query(`${sql} WHERE id = $1`, [id]);
    },

    async create({ ...record }) {
      const keys = Object.keys(record);
      const nums = new Array(keys.length);
      const data = new Array(keys.length);
      let i = 0;
      for (const key of keys) {
          data[i] = record[key]; 
          nums[i] = `$${++i}`;
      }
      const fields = '"' + keys.join('", "') + '"';
      const sql = `INSERT INTO "${table}" (${fields}) VALUES (${nums.join(", ")})`;
      return pool.query(sql, data);
    },

    async update(id, { ...record }) {
      const keys = Object.keys(record);
      const updates = new Array(keys.length);
      const data = new Array(keys.length);
      let i = 0;
      for (const key of keys) {
          data[i] = record[key]; 
          updates[i] = `${key} = $${++i}`;
      }
      const sql = `UPDATE ${table} SET ${updates.join(', ')} WHERE id = $${++i}`;
      data.push(id);
      return pool.query(sql, data);
    },

    async delete(id) {
      const sql = `DELETE FROM ${table} WHERE id = $1`;
      return pool.query(sql, [id]);
    },
  });
}