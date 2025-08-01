create table users (
 id varchar primary key,
 name varchar(200),
 emailId varchar(200) unique not null,
 password varchar(300) not null,
 dept varchar(200),
 role varchar(200) not null,
 index id_idx(id),
 index email_idx(emailId),
 index reg_num_idx(reg_num)
 );

CREATE TABLE faculty_logger (
    complaint_id VARCHAR(20) PRIMARY KEY, 
    student_id VARCHAR(20) NOT NULL,
    student_name VARCHAR(200) NOT NULL,
    date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    complaint TEXT NOT NULL,
    venue VARCHAR(200) NOT NULL,
    faculty_name VARCHAR(200),
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    photo_url VARCHAR(255),
    set_to_admin boolean default false,
    FOREIGN KEY (student_id) REFERENCES users(id)
     on delete cascade
     on update cascade
);

create table complaint_responses (
    response_id varchar(20) primary key,
    complaint_id varchar(20) not null,
    student_id varchar(200) not null,
    response text not null,
    status enum('pending','accepted','rejected') default 'pending',
    foreign key (complaint_id) references faculty_logger (complaint_id)
     on delete cascade
     on update cascade,
    foreign key (student_id) references users(id)
     on delete cascade
     on update cascade
);

create table faculty_to_admin_issues (
complaint_id varchar(20) primary key,
student_id varchar(20) not null,
date_time datetime not null,
foreign key (complaint_id) references faculty_logger(complaint_id)
 on delete cascade
 on update cascade,
foreign key (student_id) references users(id)
 on delete cascade
 on update cascade
);

create table meetings (
meeting_id varchar(20) primary key,
complaint_id varchar(20) not null,
student_id varchar(20) not null,
venue varchar(200) not null,
date_time datetime not null,
info text not null,
attendence enum ('pending','present','absent'),
foreign key (complaint_id) references faculty_to_admin_issues(complaint_id)
 on delete cascade
 on update cascade,
foreign key (student_id) references users(id)
 on delete cascade
 on update cascade
);