export type HeadProps = {
  firstname: string;
  lastname: string;
  title: string;
};

export type SidebarProps = {
  fullname: string;
  email: string;
  phone: string;
  skype: string;
  linkedin: string;
  address: string;
  summary: string;
};

export type ProfileProps = {
  years: {
    title: string;
    messages: string[];
  };
  domains: {
    title: string;
    messages: string[];
  };
};

export type ProjectProps = {
  name: string;
  description: string;
  role: string;
  duties: string[];
  skillset: string[];
};

export type CompanyProps = {
  name: string;
  timeline: string;
  title: string;
  duties: string[];
  projects: ProjectProps[];
};

export type EducationProps = {
  timeline: string;
  certs: string[];
};

export interface ResumeProps {
  head: HeadProps;
  sidebar: SidebarProps;
  profile: ProfileProps;
  companies: CompanyProps[];
  education: EducationProps;
}

export default {
  head: {
    firstname: 'Hung',
    lastname: 'Nguyen',
    title: 'Software Development'
  },
  sidebar: {
    fullname: 'Nguyễn Phi Hùng',
    email: 'nguyenphihung520@gmail.com',
    phone: '+84 (0) 396 791 774',
    skype: 'skype: hungnguyen52000',
    linkedin: 'https://www.linkedin.com/in/hung-nguyen-7b7736181/',
    address:
      '985/36/2a Au Co Street, Tan Son Nhi Ward, Tan Phu District, HCMC.',
    summary:
      'Working as a full-stack developer in 7 years, I always have passion for software development, especially in web/mobile app. I can work well in back-end development (Nodejs, .Net) and experience in front-end development (Web, Mobile). I prefer to find a flexible and professional working environment to contribute solutions as well as improve my career.'
  },
  profile: {
    years: {
      title: '7 years experience in software development',
      messages: [
        '04 years of experience in Front-End: Web, Mobile, TV (TizenOS, WebOS, AndroidTV)',
        '03 years  of experience in Back-End: NodeJS, .NET',
        'Experience in Front-End development: Web app, Mobile app, TV app (Tizen, WebOS, AndroidTV), React, React Native, Basic Angular, Server-side-rendering, SEO, resource optimization.',
        'Experience in Back-End development: NodeJS, .NET, OOP, Functional Programing.',
        'Rest API, Web protocol, Relationship Database, Firebase.',
        'Performance Analyst and optimization.',
        'Methodology: Waterfall, Kanban, Agile, Scrum.'
      ]
    },
    domains: {
      title: 'Domain knowledge',
      messages: [
        'E-commerce',
        'Entertainment OTT platform',
        'Content management',
        'Account management system'
      ]
    }
  },
  companies: [
    {
      name: 'POPS WORLDWIDE',
      timeline: 'Feb 2020 - Current',
      title: 'NodeJS Senior Fullstack',
      duties: [
        'Work as a Front-End developer in Web app, TV app, Mobile app.',
        'Permanently supported as Back-End developer in NodeJS server (API, Database).',
        'Design systems and propose technical solutions.',
        'Analyse requirements and propose solutions.',
        'Leading new features, enhance and optimise performance.'
      ],
      projects: [
        {
          name: 'POPS App',
          description: `POPS App is the regions' leading online video entertainment platform, providing thousands of hours of high-quality and exclusive content tailor-made for all ages. Available on smartphones, Smart TVs, websites and tablets, POPS App is an easy-to-use all-in-one platform to access the very best copyrighted entertainment from the most talented content creators in Vietnam, Thailand, and around the world.`,
          role: 'Fullstack/Feature Lead',
          duties: [
            'Analyse business to document and propose solutions.',
            'Develop new features, maintain and optimise current system.',
            'Do testing and document guideline.'
          ],
          skillset: [
            'NodeJS',
            'NextJS',
            'SSR',
            'SEO',
            'Bundle optimisation',
            'React/React Native',
            'TizenOS',
            'WebOS',
            'AndroidTV',
            'REST API',
            'Firebase',
            'Google Analytics',
            'Unit Testing'
          ]
        },
        {
          name: 'POPS Kids App',
          description: `POPS Kids is the most beloved and well-known kids' brand in Southeast Asia., Committed to building a safe environment for our children by providing a wide range of local and international edutainment and entertainment content, POPS Kids App is both fun and engaging.`,
          role: 'Fullstack/Feature Lead',
          duties: [
            'Analyse business to document and propose solutions.',
            'Develop new features, maintain and optimise current system.',
            'Do testing and document guideline.'
          ],
          skillset: [
            'NodeJS',
            'NextJS',
            'SSR',
            'SEO',
            'Bundle optimisation',
            'React/React Native',
            'TizenOS, WebOS',
            'AndroidTV',
            'REST API',
            'Firebase',
            'Google Analytics',
            'Unit Testing'
          ]
        }
      ]
    },
    {
      name: 'NITECO VIETNAM',
      timeline: 'Apr 2018 - Feb 2020',
      title: 'Senior Fullstack',
      duties: [
        'Work as a fullstack developer in core systems and websites',
        'Design DB, analyse system to propose solutions.',
        'Research requirements and propose solutions to clients',
        'Develop, maintain and optimise system.'
      ],
      projects: [
        {
          name: 'Adairs - Australia',
          description: `Adairs is an ecommerce system of Australia. The project sells and manages many things about the interior of a house as furniture, homewares, bedroom and bathroom things,  etc. Requirement of the project is upgrading to a new version of CMS, maintaining current features, developing new features, optimising system performance as well as integrating components from third parties.`,
          role: 'Back-End Developer',
          duties: [
            'Develop new features, maintain current system.',
            'Research business to document and propose solutions.',
            'Analyse and optimise performance.',
            'Do testing and guidelines.'
          ],
          skillset: [
            'REST API',
            'EpiServer CMS',
            'EpiServer Commerce',
            'ASP.NET 5.1',
            'MSSQL Server 2016',
            'AngularJS',
            'ReactJS/Redux/Saga'
          ]
        },
        {
          name: 'Bemz - Sweden',
          description: `Bemz is an e-commerce system of Sweden. The project sells and manages cover fabrics and legs of sofa, chair, armrest, etc. Requirement of the project is maintaining current features, developing new features, optimising system performance as well as integrating components from third parties.`,
          role: 'Fullstack Developer',
          duties: [
            'Develop new features, maintain current system.',
            'Research business to document and propose solutions.',
            'Analyse and optimise performance.',
            'Do testing and guidelines.'
          ],
          skillset: [
            'REST API',
            'EpiServer CMS',
            'EpiServer Commerce',
            'ASP.NET 5.1',
            'MSSQL Server 2016',
            'Google GTM, ReactJS'
          ]
        }
      ]
    },
    {
      name: 'NASHTECH VIETNAM',
      timeline: 'Aug 2017 - Apr 2018',
      title: 'Fullstack',
      duties: [
        'Working in core systems and web app.',
        'Analyse requirements and propose solutions to clients.',
        'Implement new UI responsive.',
        'Develop, maintain and optimise web app.'
      ],
      projects: [
        {
          name: 'Thomsons HR Benefits - Singapore',
          description: `A web application system that provides services regarding human resource management and mainly manages all things of benefits of staff in a company or an organisation (insurrances, allowances, etc). Requirement of the project is building a new system based on the business of legacy systems with new technologies.`,
          role: 'Front-End Developer',
          duties: [
            'Research legacy systems to propose solutions and migrate features to new systems.',
            'Refactor legacy systems.',
            'Implement web app and UI, demo to clients',
            'Develop, maintain and optimise web app.',
            'Unit test and document guidelines.'
          ],
          skillset: [
            'Typescript',
            'Angular2/CLI',
            'ASP.NET MVC 5.1',
            'REST API',
            'Identity FW 2.1',
            'MSSQL Server 2016',
            'Google GTM'
          ]
        }
      ]
    },
    {
      name: 'TMA SOLUTIONS',
      timeline: 'Feb 2016 - Aug 2017',
      title: 'Fullstack',
      duties: [
        'Work as Front-End in web apps.',
        'Work as Back-End in .NET systems',
        'Analyse requirements and propose solutions to clients.',
        'Develop and maintain web apps.'
      ],
      projects: [
        {
          name: 'Musac Education System - New Zealand',
          description: `A large education system helps to manage almost all things of a school operation such as student, teacher, staff, class, course, room, timetable, event, finance, report, etc. Requirements of the project are maintaining current features, developing new features, and optimising system performance.`,
          role: 'Fullstack Developer',
          duties: [
            'Implement new UI responsive.',
            'Develop and maintain web apps.',
            'Documentation and guideline.',
            'Performance optimising and unit testing.'
          ],
          skillset: [
            'AngularJS',
            'ASP.NET 5.1',
            'REST API',
            'MSSQL Server 2014',
            'Apache, MySQL'
          ]
        },
        {
          name: 'Account Management SSO - USA',
          description: `An account management system based on Identity Server which provides user authentication/authorization, Single Sign-On. The system manages Organisation and users hierarchy. Requirements of the project are maintaining current features, developing new features, optimising system performance, managing cloud server and deployment.`,
          role: 'Back-End Developer',
          duties: [
            'Implement new UI responsive.',
            'Develop and maintain web apps.',
            'Documentation and guideline.',
            'Performance optimising and unit testing.'
          ],
          skillset: [
            'AngularJS',
            'ASP.NET 5.1',
            'REST API',
            'Entity FW',
            'Identity FW',
            'MSSQL Server 2014'
          ]
        }
      ]
    }
  ],
  education: {
    timeline: '2011 - 2015',
    certs: [
      'Bachelor of Information technology.',
      'University of Finance and Marketing, HCMC, Vietnam.'
    ]
  }
} as ResumeProps;
