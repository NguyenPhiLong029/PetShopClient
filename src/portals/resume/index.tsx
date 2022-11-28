import React from 'react';
import 'src/css/bootstrap-reboot.css';
import 'src/css/google-icon.scss';
import './index.scss';
import data, {
  CompanyProps,
  EducationProps,
  HeadProps,
  ProfileProps,
  ProjectProps,
  SidebarProps
} from './data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
  faUser,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import Icon from 'src/components/icon';
import avatar from 'assets/img/avatar.jpg';

const Head = (props: HeadProps) => (
  <div className="head">
    <div className="name">
      <span className="name__first">{props.firstname}</span>
      <span className="name__last">{props.lastname}</span>
    </div>
    <h1 className="title">{props.title}</h1>
  </div>
);

const Sidebar = (props: SidebarProps) => (
  <div className="sidebar">
    <div className="sidebar__avatar">
      <img src={avatar} alt="avatar" />
    </div>
    <div className="sidebar__item">
      <span className="icon">
        <FontAwesomeIcon icon={faUser} />
      </span>
      <span className="text">{props.fullname}</span>
    </div>
    <div className="sidebar__item">
      <span className="icon">
        <FontAwesomeIcon icon={faEnvelope} />
      </span>
      <span className="text">{props.email}</span>
    </div>
    <div className="sidebar__item">
      <span className="icon">
        <FontAwesomeIcon icon={faPhone} />
      </span>
      <span className="text">{props.phone}</span>
    </div>
    <div className="sidebar__item">
      <span className="icon internal-icon">
        <Icon name="IcSkype" />
      </span>
      <span className="text">{props.skype}</span>
    </div>
    <div className="sidebar__item">
      <span className="icon internal-icon">
        <Icon name="IcLinkedin" />
      </span>
      <span className="text">{props.linkedin}</span>
    </div>
    <div className="sidebar__item">
      <span className="icon">
        <FontAwesomeIcon icon={faLocationDot} />
      </span>
      <span className="text">{props.address}</span>
    </div>
    <div className="sidebar__summary">“{props.summary}”</div>
  </div>
);

const Profile = (props: ProfileProps) => (
  <div className="content__section profile">
    <h2>Profile</h2>
    <div className="profile__content">
      <h3>{props.years.title}</h3>
      {props.years.messages.map((m, i) => (
        <p key={i}>{m}</p>
      ))}
    </div>
    <div className="profile__content">
      <h3>{props.domains.title}</h3>
      {props.domains.messages.map((m, i) => (
        <p key={i}>{m}</p>
      ))}
    </div>
  </div>
);

const Project = (props: ProjectProps) => (
  <div className="project">
    <h4>{props.name}</h4>
    <p>{props.description}</p>
    <div className="project__role">
      <span>{props.role}</span>
    </div>
    <div className="project__table">
      <div className="project__table__duties">
        {props.duties.map((d, i) => (
          <p key={i}>- {d}</p>
        ))}
      </div>
      <div className="project__table__skillset">
        {props.skillset.map((k, i) => (
          <span key={i}>{k}</span>
        ))}
      </div>
    </div>
  </div>
);

const Company = (props: CompanyProps) => (
  <div className="company">
    <div className="company__info">
      <h3 className="company__info__name">{props.name}</h3>
      <div className="company__info__timeline">{props.timeline}</div>
      <div className="company__info__title">{props.title}</div>
      <hr />
      {props.duties.map((d, i) => (
        <p key={i} className="company__info__duty">
          - {d}
        </p>
      ))}
    </div>
    <div className="company__projects">
      {props.projects.map((proj, i) => (
        <Project key={i} {...proj} />
      ))}
    </div>
  </div>
);

const Companies = ({ data }: { data: CompanyProps[] }) => (
  <div className="content__section companies">
    <h2>Career</h2>
    <div className="companies__content ">
      {data.map((company, i) => (
        <Company key={i} {...company} />
      ))}
    </div>
  </div>
);

const Education = (props: EducationProps) => (
  <div className="content__section education">
    <h2>Education</h2>
    <div className="education__content ">
      <div className="edu_cert">
        {props.certs.map((c, i) => (
          <p key={i}>- {c}</p>
        ))}
      </div>
      <div className="edu_timeline">{props.timeline}</div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <div className="layout">
      <Head {...data.head} />
      <Sidebar {...data.sidebar} />
      <div className="content">
        <Profile {...data.profile} />
        <Companies data={data.companies} />
        <Education {...data.education} />
      </div>
    </div>
  );
};

export default App;
