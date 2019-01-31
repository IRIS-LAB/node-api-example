/* table smart_group */
create table smart_group(
   id SERIAL primary key,
   code varchar(50) not null,
   label varchar(255) not null,
   role_admin varchar(255) not null
);

/* table preferences */

create table preferences(
   id SERIAL primary key,
   group_id integer references smart_group(id),
   start_value numeric(4,2) not null,
   end_value numeric(4,2) not null,
   nb_slot_availabled numeric(4,2) not null,
   nb_slot_displayed numeric(4,2) not null,
   slot numeric(4,2) not null,
   unit varchar(255) not null,
   calendar_type varchar(255) not null
);
