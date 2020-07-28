const db = require('../../config/db')

module.exports = {
  create (data) {
    const query = `
    INSERT INTO products (
			category_id,
			user_id,
			name,
			description,
			old_price,
			price,
			quantity,
			status
     	) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
  	`
    data.price = data.price.replace(/\D/g, '')

    const values = [
      data.name,
      data.user_id || 1,
      1,
      data.description,
      data.old_price || data.price,
      data.price,
      data.quantity,
      data.status || 1
    ]
    return db.query(query, values)
  },
  find (id) {
    return db.query('SELECT * FROM products WHERE id = $1', [id])
  }
}
