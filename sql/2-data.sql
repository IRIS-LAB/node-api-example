/* datas smart_group */
insert into smart_group (code, label, role_admin) values ('iris', 'Iris', 'smart_iris_admin');
insert into smart_group (code, label, role_admin) values ('rungis', 'Rungis', 'smart_rungis_admin');
insert into smart_group (code, label, role_admin) values ('car', 'Car', 'smart_car_admin');

/* datas preferences */
WITH pref (start_display, end_display, refresh_value, slot, unit, group_code) AS
( VALUES
    (8, 19, 35, 0.5, 'HOUR', 'iris'),
    (8, 19, 35, 0.5, 'HOUR', 'rungis'),
    (1, 6, 29, 0.5, 'DAY_OF_WEEK', 'car')
)  
INSERT INTO preferences
   (start_display, end_display, refresh_value, slot, unit, group_id) 
SELECT 
    pref.start_display, pref.end_display, pref.refresh_value, pref.slot, pref.unit, smart_group.id
FROM 
  smart_group JOIN pref
    ON smart_group.code = pref.group_code ;
