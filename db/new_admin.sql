update users
set is_admin = true
where email = $1
returning *;