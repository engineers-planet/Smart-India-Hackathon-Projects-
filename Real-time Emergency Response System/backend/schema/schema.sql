create table profile
(
    id              uuid
        constraint profile_pk
            primary key,
    first_name      text   not null,
    last_name       text   not null,
    aadhar          bigint not null,
    mobile          bigint not null,
    age             int    not null,
    place           text   not null,
    disability_type text   not null,
    disability      text   not null,
    severity        int    not null,
    qualifications  text   not null
);

create unique index profile_aadhar_uindex
    on profile (aadhar);

create unique index profile_mobile_uindex
    on profile (mobile);

create table admin
(
    id       uuid
        constraint admin_pk
            primary key,
    name     text not null,
    password int  not null
);

create table grievance
(
    id         uuid,
    admin_id   uuid not null
        constraint grievance_admin_id_fk
            references admin,
    profile_id uuid not null
        constraint grievance_profile_id_fk
            references profile
);

create table company
(
    id      uuid
        constraint company_pk
            primary key,
    name    text   not null,
    head    text   not null,
    mobile  bigint not null,
    website text   not null,
    gstin   bigint not null
);

create unique index company_gstin_uindex
    on company (gstin);

create table job
(
    id            uuid
        constraint job_pk
            primary key,
    company_id    uuid not null,
    position      text not null,
    salary        int  not null,
    description   text not null,
    location      text not null,
    sector        text not null,
    disability    text not null,
    qualification text not null
);

create table application
(
    id         uuid
        constraint application_pk
            primary key,
    job_id     uuid not null
        constraint application_job_id_fk
            references job,
    profile_id uuid not null
        constraint application_profile_id_fk
            references profile
);

alter table job
    add constraint job_company_id_fk
        foreign key (company_id) references company;

create table scheme
(
    id          uuid
        constraint scheme_pk
            primary key,
    name        text not null,
    description text not null,
    type        text not null,
    admin_id    uuid not null
        constraint scheme_admin_id_fk
            references admin,
    eligibility text not null
);

create table beneficiary
(
    id         uuid
        constraint beneficiary_pk
            primary key,
    scheme_id  uuid not null
        constraint beneficiary_scheme_id_fk
            references scheme,
    profile_id uuid not null
        constraint beneficiary_profile_id_fk
            references profile,
    status     int  not null
);

alter table admin
    alter column password type text using password::text;

ALTER TABLE admin ALTER COLUMN id SET DATA TYPE UUID USING (uuid_generate_v4());
ALTER TABLE application ALTER COLUMN id SET DATA TYPE UUID USING (uuid_generate_v4());
ALTER TABLE beneficiary ALTER COLUMN id SET DATA TYPE UUID USING (uuid_generate_v4());
ALTER TABLE company ALTER COLUMN id SET DATA TYPE UUID USING (uuid_generate_v4());
ALTER TABLE grievance ALTER COLUMN id SET DATA TYPE UUID USING (uuid_generate_v4());
ALTER TABLE job ALTER COLUMN id SET DATA TYPE UUID USING (uuid_generate_v4());
ALTER TABLE profile ALTER COLUMN id SET DATA TYPE UUID USING (uuid_generate_v4());
ALTER TABLE scheme ALTER COLUMN id SET DATA TYPE UUID USING (uuid_generate_v4());

ALTER TABLE admin alter column id set DEFAULT extensions.uuid_generate_v4();
ALTER TABLE application alter column id set DEFAULT extensions.uuid_generate_v4();
ALTER TABLE beneficiary alter column id set DEFAULT extensions.uuid_generate_v4();
ALTER TABLE company alter column id set DEFAULT extensions.uuid_generate_v4();
ALTER TABLE grievance alter column id set DEFAULT extensions.uuid_generate_v4();
ALTER TABLE job alter column id set DEFAULT extensions.uuid_generate_v4();
ALTER TABLE profile alter column id set DEFAULT extensions.uuid_generate_v4();
ALTER TABLE scheme alter column id set DEFAULT extensions.uuid_generate_v4();

SELECT extensions.uuid_generate_v4();