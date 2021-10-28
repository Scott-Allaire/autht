create database autht;
create user 'autht'@'%' identified by 'secret';
grant all on autht.* to 'autht'@'%';
flush privileges;