insert into users
(email, password, is_admin)
values
($1, $2, false)
returning *;