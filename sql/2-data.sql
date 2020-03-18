/* datas smart_group */
insert into smart_group (code, label, role_admin) values ('irisRoom', 'Salles Iris', 'smart_iris_admin');
insert into smart_group (code, label, role_admin) values ('irisBox', 'Box Iris', 'smart_iris_admin');
insert into smart_group (code, label, role_admin) values ('rungis', 'Rungis', 'smart_rungis_admin');
insert into smart_group (code, label, role_admin) values ('car', 'Car', 'smart_car_admin');

/* datas preferences */
WITH pref (start_value, end_value, nb_slot_availabled, nb_slot_displayed, slot, unit, calendar_type, group_code) AS
( VALUES
    (8, 19, 12, 12, 0.5, 'HOUR', 'DAILY', 'irisRoom'),
    (8, 19, 12, 12, 0.5, 'HOUR', 'DAILY', 'irisBox'),
    (8, 19, 12, 12, 0.5, 'HOUR', 'DAILY', 'rungis'),
    (8, 19, 12, 12, 0.5, 'HOUR', 'DAILY', 'rungis'),
    (1, 6, 12, 12, 0.5, 'DAY', 'WEEKLY', 'car')
)  
INSERT INTO preferences
   (start_value, end_value, nb_slot_availabled, nb_slot_displayed, slot, unit, calendar_type, group_id) 
SELECT 
    pref.start_value, pref.end_value, pref.nb_slot_availabled, pref.nb_slot_displayed, pref.slot, pref.unit, pref.calendar_type, smart_group.id
FROM 
  smart_group JOIN pref
    ON smart_group.code = pref.group_code ;
