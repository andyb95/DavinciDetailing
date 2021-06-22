drop table if exists users;

create table users(
    user_id serial primary key,
    email text,
    password text,
    is_admin boolean
);