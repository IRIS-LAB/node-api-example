/* table smart_group */
create table smart_group(
   id SERIAL primary key,
   code varchar(50) not null,
   label varchar(255) not null,
   role_admin varchar(255) not null
);
