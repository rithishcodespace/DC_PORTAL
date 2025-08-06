CREATE TABLE faculty_logger (
    complaint_id VARCHAR(20) PRIMARY KEY, 
    student_id bigint NOT NULL,
    date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    complaint TEXT NOT NULL,
    venue VARCHAR(200) NOT NULL,
    faculty_id VARCHAR(200),
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    photo_url VARCHAR(255),
    FOREIGN KEY (student_id) REFERENCES students(id)
     on delete cascade
     on update cascade
);

create table complaint_responses (
    response_id varchar(20) primary key,
    complaint_id varchar(20) not null,
    student_id bigint not null,
    response text not null,
    status enum('pending','accepted','rejected') default 'pending',
    foreign key (complaint_id) references faculty_logger (complaint_id)
     on delete cascade
     on update cascade,
    foreign key (student_id) references students(id)
     on delete cascade
     on update cascade
);

create table faculty_to_admin_issues (
    complaint_id varchar(20) primary key,
    student_id bigint not null,
    date_time datetime not null,
    foreign key (complaint_id) references faculty_logger(complaint_id)
    on delete cascade
    on update cascade,
    foreign key (student_id) references students(id)
    on delete cascade
    on update cascade
);

create table meetings (
    meeting_id varchar(25) primary key,
    complaint_id varchar(20) not null,
    admin_id bigint not null,
    venue varchar(200) not null,
    date_time datetime not null,
    info text not null,
    attendence enum ('pending','present','absent'),
    foreign key (admin_id) references admins(id)
    on delete cascade
    on update cascade
);

create table students(
    id bigint auto_increment primary key,
    name varchar(200) not null,
    reg_num varchar(200) not null,
    email_id varchar(200) not null,
    password varchar(200) not null,
    dept varchar(100) not null,

    UNIQUE INDEX reg_num_idx (reg_num),      
    UNIQUE INDEX email_id_idx (email_id)
);

create table admins(
    id bigint auto_increment primary key,
    name varchar(200) not null,
    email_id varchar(200) not null,
    password varchar(200) not null,
    dept varchar(100) not null,
    
    UNIQUE INDEX email_id_idx (email_id)
);

create table faculties(
    id bigint auto_increment primary key,
    name varchar(200) not null,
    email_id varchar(200) not null,
    password varchar(200) not null,
    dept varchar(100) not null,
        
    UNIQUE INDEX email_id_idx (email_id)
);