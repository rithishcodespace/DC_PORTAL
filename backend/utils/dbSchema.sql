create table users (
 id int auto_increment primary key,
 name varchar(200),
 emailId varchar(200) unique not null,
 password varchar(300) not null,
 reg_num varchar(200),
 dept varchar(200),
 role varchar(200) not null,
 index id_idx(id),
 index email_idx(emailId),
 index reg_num_idx(reg_num)
 );