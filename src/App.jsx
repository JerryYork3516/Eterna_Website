import { useCallback, useEffect, useState } from 'react';
import Aurora from './Aurora.jsx';
import LanguageToggle from './LanguageToggle.jsx';
import NavigationTabs from './NavigationTabs.jsx';

const auroraColorStops = ['#0f4cbe', '#0a1a3a', '#3b4f6d'];

const content = {
  cn: {
    title: 'Eterna — AI Persona Infrastructure',
    brand: 'Eterna',
    homeAria: 'Eterna home',
    navAria: 'Primary navigation',
    languageToggleAria: 'Switch to English',
    applicationTypeAria: '申请类型',
    footerProduct: 'Eterna / AfterLife — Second Life Operating System',
    nav: [
      { href: '#afterlife', label: '人物层' },
      { href: '#personas', label: '数字居民' },
      { href: '#access', label: '应用场景' },
      { href: '#join', label: '创建申请' },
    ],
    hero: {
      eyebrow: 'AI PERSONA INFRASTRUCTURE',
      title: '让你的Agent，<br />成为可运营的数字资产',
      lead: 'Eterna 帮助创作者将角色、虚拟主播、IP 人物和品牌形象升级为可部署的 AI 数字居民。它们可以被调用、授权、出售、接入任务，并在未来数字场景中为创作者创造收益机会。',
      begin: '关于数字居民',
      secondaryCta: '浏览数字居民',
      scroll: '向下滑动',
    },
    afterlife: {
      kicker: '01 / PERSONA LAYER',
      title: '在模型与 Agent 之上，建立数字人物资产层。',
      body: 'Agent 负责执行任务，数字人负责表达形象，Eterna 负责把身份、记忆、声音、外观、关系和授权边界整合成可部署的数字居民资产。',
      quoteOne: 'Eterna 不只是生成角色。',
      quoteTwo: 'Eterna 让角色成为资产。',
      features: [
        {
          label: 'MEMORY VAULT',
          title: '记忆库',
          body: '保存角色经历、创作者设定、用户互动、工作记录与成长轨迹，让数字居民在长期调用中保持连续性。',
        },
        {
          label: 'VALUE LEDGER',
          title: '价值账本',
          body: '记录每一次调用、部署、授权和商业使用，为未来收益结算、分成和资产估值提供依据。',
        },
        {
          label: 'RELATIONSHIP GRAPH',
          title: '关系网络',
          body: '数字居民可以拥有与创作者、用户、品牌、IP、任务和其他居民之间的关系，形成可持续扩展的数字社会结构。',
        },
      ],
    },
    personas: {
      kicker: '02 / DIGITAL RESIDENTS',
      title: 'AfterBorn：由创作者诞生的 AI 数字居民。',
      lead: 'AfterBorn 是 Eterna 网络中的数字居民实例。它由创作者创建，拥有身份、记忆、表达风格、外观、声音和 Agent 能力，可以被部署到内容生产、虚拟主播、IP 互动、品牌服务和未来数字世界中工作。',
      hire: '浏览所有数字居民',
      cardHint: '点击展开完整档案',
      expandedHint: '已展开',
      tag: 'ORIGINAL DIGITAL RESIDENT',
      residents: [
        {
          name: 'Bethany Morgan | 42岁',
          className: 'featured',
          avatar: '',
          body: '居民档案：\n由创作者设定的演员型数字居民，拥有表演经历、角色理解能力、访谈表达风格和可持续更新的职业记忆。',
          bullets: [
            '可部署场景：',
            'AI 电影角色、幕后访谈、角色口播、IP 内容生产。',
          ],
        },
        {
          name: 'Aaron Miller | 40岁',
          className: '',
          avatar: 'bridge',
          body: '居民档案：\n品牌顾问型数字居民，适合承载商业表达、策略访谈、品牌叙事和知识型内容输出。',
          bullets: [
            '可部署场景：',
            '品牌顾问、课程讲师、商业访谈、企业内容助理。',
          ],
        },
        {
          name: 'Eli Turner | 10岁',
          className: '',
          avatar: 'cast',
          body: '居民档案：\n儿童角色型数字居民，适合互动叙事、教育陪伴、故事生成和游戏 NPC 场景。',
          bullets: [
            '可部署场景：',
            '互动故事、教育产品、儿童 IP。',
          ],
        },
        {
          name: 'Maya Chen | 28岁',
          className: '',
          avatar: 'bridge',
          body: '居民档案：\n虚拟主播型数字居民，适合承载直播表达、粉丝互动、短视频口播和持续更新的内容人格。',
          bullets: [
            '可部署场景：',
            '虚拟直播、短视频账号、粉丝互动、品牌联名内容。',
          ],
        },
      ],
    },
    access: {
      kicker: '03 / USE CASES',
      title: '让数字居民进入真实场景，而不只停留在聊天窗口。',
      lead: '数字居民可以服务于 AI 电影、虚拟主播、短视频口播、游戏 NPC、品牌人格、教育陪伴、客服运营、个人工作流和企业任务等未来更多场景。',
      scenarios: [
        'AI 电影与虚拟演员',
        '虚拟主播与直播助手',
        '短视频口播与内容账号',
        '小说 / 短剧 / IP 角色',
        '游戏 NPC 与互动叙事',
        '品牌人格与广告内容',
        '创作者数字分身',
        '教育陪伴与私人导师',
        '客服与私域运营',
        '个人工作流与任务助理',
      ],
    },
    join: {
      kicker: '04 / CREATE',
      title: '申请创建你的第一个 AI 数字居民',
      lead: '提交你的角色、分身、IP 或品牌人物设定，支持 AI 生成或风格化重建为数字居民。Eterna 将帮助你将其整理为可部署的人格资产，并逐步接入人格 + Agent 创建平台、调用日志、授权规则和未来收益分成机制。',
      name: '你的数字身份',
      email: '你的数字入口邮箱',
      submit: '创建数字居民',
      note: '未来，这些数字居民将进入 Eterna Network，在不同场景中接收任务、提供服务、产生收入，并按照授权规则与创作者共享收益。',
      applicationOptions: [
        '创建个人数字分身',
        '创建虚拟主播人格',
        '创建短剧 / 小说 / IP 角色',
        '创建品牌数字人物',
        '创建游戏 NPC',
        '创建教育 / 陪伴型居民',
        '了解企业或团队合作',
      ],
    },
    footer: '开放接入，但不开放失控。',
  },
  en: {
    title: 'Eterna — AI Persona Infrastructure',
    brand: 'Eterna',
    homeAria: 'Eterna home',
    navAria: 'Primary navigation',
    languageToggleAria: '切换到中文',
    applicationTypeAria: 'Application type',
    footerProduct: 'Eterna / AfterLife — Second Life Operating System',
    nav: [
      { href: '#afterlife', label: 'Persona Layer' },
      { href: '#personas', label: 'Digital Residents' },
      { href: '#access', label: 'Use Cases' },
      { href: '#join', label: 'Create' },
    ],
    hero: {
      eyebrow: 'AI PERSONA INFRASTRUCTURE',
      title: 'Turn your agents<br />into operable digital assets',
      lead: 'Eterna helps creators upgrade characters, virtual streamers, IP figures, and brand identities into deployable AI digital residents. They can be invoked, authorized, sold, connected to tasks, and create future earning opportunities for their creators across digital scenarios.',
      begin: 'Create Digital Resident',
      secondaryCta: 'View Sample Residents',
      scroll: 'Scroll down',
    },
    afterlife: {
      kicker: '01 / PERSONA LAYER',
      title: 'Above models and agents, build the digital persona asset layer.',
      body: 'Agents execute tasks. Digital humans express appearances. Eterna integrates identity, memory, voice, appearance, relationships, and authorization boundaries into deployable digital resident assets.',
      quoteOne: 'Eterna does not just generate characters.',
      quoteTwo: 'Eterna turns characters into assets.',
      features: [
        {
          label: 'MEMORY VAULT',
          title: 'Memory Vault',
          body: 'Store character experiences, creator settings, user interactions, work records, and growth trajectories so digital residents remain continuous across long-term invocation.',
        },
        {
          label: 'VALUE LEDGER',
          title: 'Value Ledger',
          body: 'Record every invocation, deployment, authorization, and commercial use to support future revenue settlement, sharing, and asset valuation.',
        },
        {
          label: 'RELATIONSHIP GRAPH',
          title: 'Relationship Graph',
          body: 'Digital residents can hold relationships with creators, users, brands, IP, tasks, and other residents, forming a sustainably expandable digital social structure.',
        },
      ],
    },
    personas: {
      kicker: '02 / DIGITAL RESIDENTS',
      title: 'AfterBorn: AI digital residents born from creators.',
      lead: 'AfterBorn are digital resident instances inside the Eterna network. Created by creators, they have identities, memories, expression styles, appearances, voices, and agent abilities, and can be deployed into content production, virtual streaming, IP interaction, brand services, and future digital worlds.',
      hire: 'Browse All Digital Residents',
      cardHint: 'Click to expand full profile',
      expandedHint: 'Expanded',
      tag: 'ORIGINAL DIGITAL RESIDENT',
      residents: [
        {
          name: 'Bethany Morgan | 42',
          className: 'featured',
          avatar: '',
          body: 'Resident profile:\nAn actor-type digital resident defined by a creator, with performance experience, character comprehension, interview-style expression, and continuously updated professional memory.',
          bullets: [
            'Deployable scenarios:',
            'AI film roles, behind-the-scenes interviews, character narration, and IP content production.',
          ],
        },
        {
          name: 'Aaron Miller | 40',
          className: '',
          avatar: 'bridge',
          body: 'Resident profile:\nA brand-consultant digital resident suited for commercial expression, strategy interviews, brand storytelling, and knowledge-based content output.',
          bullets: [
            'Deployable scenarios:',
            'Brand consultant, course lecturer, business interviews, and enterprise content assistant.',
          ],
        },
        {
          name: 'Eli Turner | 10',
          className: '',
          avatar: 'cast',
          body: 'Resident profile:\nA child-character digital resident suited for interactive storytelling, education companionship, story generation, and game NPC scenarios.',
          bullets: [
            'Deployable scenarios:',
            'Interactive stories, education products, and children’s IP.',
          ],
        },
        {
          name: 'Maya Chen | 28',
          className: '',
          avatar: 'bridge',
          body: 'Resident profile:\nA virtual-streamer digital resident suited for live expression, fan interaction, short-form narration, and a continuously updated content persona.',
          bullets: [
            'Deployable scenarios:',
            'Virtual livestreams, short-form accounts, fan interaction, and brand collaboration content.',
          ],
        },
      ],
    },
    access: {
      kicker: '03 / USE CASES',
      title: 'Let digital residents enter real scenarios, not just stay in chat windows.',
      lead: 'Digital residents can serve AI films, virtual streamers, short-form video narration, game NPCs, brand personas, education companions, customer operations, personal workflows, enterprise tasks, and more future scenarios.',
      scenarios: [
        'AI Film & Virtual Actors',
        'Virtual Streamers & Live Assistants',
        'Short-Form Narration & Content Accounts',
        'Novels / Short Drama / IP Characters',
        'Game NPCs & Interactive Stories',
        'Brand Personas & Ad Content',
        'Creator Digital Doubles',
        'Education Companions & Private Tutors',
        'Customer Service & Private Traffic Operations',
        'Personal Workflows & Task Assistants',
      ],
    },
    join: {
      kicker: '04 / CREATE',
      title: 'Apply to create your first AI digital resident',
      lead: 'Submit your character, double, IP, or brand persona concept. Eterna supports AI generation or stylized reconstruction into a digital resident, helps organize it into a deployable persona asset, and gradually connects it to the persona + agent creation platform, invocation logs, authorization rules, and future revenue-sharing mechanisms.',
      name: 'Your digital identity',
      email: 'Your digital access email',
      submit: 'Create Digital Resident',
      note: 'In the future, these digital residents will enter Eterna Network, receive tasks across different scenarios, provide services, generate income, and share revenue with creators according to authorization rules.',
      applicationOptions: [
        'Create a personal digital double',
        'Create a virtual streamer persona',
        'Create a short drama / novel / IP character',
        'Create a brand digital persona',
        'Create a game NPC',
        'Create an education / companion resident',
        'Discuss enterprise or team collaboration',
      ],
    },
    footer: 'Open access, not uncontrolled access.',
  },
};

const LayoutContainer = ({ children, className = '' }) => (
  <div className={`layout-container ${className}`.trim()}>{children}</div>
);

const TextBlock = ({ children, className = '' }) => (
  <div className={`text-block ${className}`.trim()}>{children}</div>
);

const HeroLayout = ({ chrome, children }) => (
  <section className="hero panel" data-phase="birth">
    {chrome}
    <LayoutContainer>{children}</LayoutContainer>
  </section>
);

const SectionLayout = ({ id, className = '', children }) => (
  <section id={id} className={`panel ${className}`.trim()}>
    <LayoutContainer>{children}</LayoutContainer>
  </section>
);

function App() {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('afterlife-language');
    if (saved === 'en') return 'en';
    if (saved === 'zh' || saved === 'cn') return 'cn';
    return 'cn';
  });
  const [expandedPersona, setExpandedPersona] = useState(null);
  const [activeNav, setActiveNav] = useState('#afterlife');
  const [selectedApplication, setSelectedApplication] = useState(0);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const page = content[language];
  const navItems = page.nav;

  const getNavScrollOffset = useCallback(() => {
    const nav = document.querySelector('.navigation-tabs');
    if (!nav) return 88;
    return nav.getBoundingClientRect().bottom + 16;
  }, []);

  const scrollToHref = useCallback((href) => {
    const target = document.querySelector(href);
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - getNavScrollOffset();

    setActiveNav(href);
    window.scrollTo({
      top: Math.max(0, top),
      behavior: 'smooth',
    });
  }, [getNavScrollOffset]);

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    document.title = page.title;
    localStorage.setItem('afterlife-language', language);
  }, [language, page.title]);

  useEffect(() => {
    if (!isApplicationOpen) return undefined;

    const closeSelectOnScroll = () => {
      setIsApplicationOpen(false);
    };

    window.addEventListener('scroll', closeSelectOnScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', closeSelectOnScroll);
    };
  }, [isApplicationOpen]);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const intersectionRatios = new Map();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        intersectionRatios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });

      const visibleSection = [...intersectionRatios.entries()]
        .filter(([, ratio]) => ratio >= 0.5)
        .sort((a, b) => b[1] - a[1])[0];

      if (visibleSection?.[0]) {
        setActiveNav(`#${visibleSection[0]}`);
      }
    }, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    sections.forEach((section) => observer.observe(section));

    const onScroll = () => {
      setIsScrolled(window.scrollY > 32);

      const pageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (pageBottom) {
        setActiveNav(navItems[navItems.length - 1].href);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [navItems]);

  const togglePersona = (index) => {
    setExpandedPersona((current) => (current === index ? null : index));
  };

  return (
    <>
      <div className="aurora-backdrop" aria-hidden="true">
        <Aurora
          colorStops={auroraColorStops}
          blend={0.59}
          amplitude={1}
          speed={0.9}
        />
      </div>

      <NavigationTabs
        items={navItems}
        activeNav={activeNav}
        ariaLabel={page.navAria}
        onSelect={scrollToHref}
      />

      <main id="top">
        <HeroLayout
          chrome={(
            <div className="hero-chrome">
              <a className="brand" href="#top" aria-label={page.homeAria}>
                <span className="brand-mark" />
                <span>{page.brand}</span>
              </a>
              <LanguageToggle
                language={language}
                ariaLabel={page.languageToggleAria}
                hidden={isScrolled}
                onChange={setLanguage}
              />
            </div>
          )}
        >
            <TextBlock className="hero-copy content-limit">
              <p className="eyebrow i18n-safe">{page.hero.eyebrow}</p>
              <h1 className="i18n-safe" dangerouslySetInnerHTML={{ __html: page.hero.title }} />
              <p className="hero-lead i18n-safe">{page.hero.lead}</p>
              <div className="hero-actions">
                <a className="button primary" href="#afterlife" onClick={(event) => { event.preventDefault(); scrollToHref('#afterlife'); }}>{page.hero.begin}</a>
                <a className="button ghost" href="#personas" onClick={(event) => { event.preventDefault(); scrollToHref('#personas'); }}>{page.hero.secondaryCta}</a>
              </div>
            </TextBlock>
            <div className="scroll-hint">
              <span>{page.hero.scroll}</span>
              <i />
            </div>
        </HeroLayout>

        <SectionLayout id="afterlife">
            <div className="section-kicker i18n-safe">{page.afterlife.kicker}</div>
            <div className="split">
              <TextBlock className="content-limit">
                <h2 className="i18n-safe">{page.afterlife.title}</h2>
                <p className="i18n-safe">{page.afterlife.body}</p>
              </TextBlock>
              <TextBlock className="quote-card">
                <p className="i18n-safe">{page.afterlife.quoteOne}</p>
                <p className="i18n-safe">{page.afterlife.quoteTwo}</p>
              </TextBlock>
            </div>
            <div className="feature-grid">
              {page.afterlife.features.map((feature) => (
                <article key={feature.label} className="text-block">
                  <span className="i18n-safe">{feature.label}</span>
                  <h3 className="i18n-safe">{feature.title}</h3>
                  <p className="i18n-safe">{feature.body}</p>
                </article>
              ))}
            </div>
        </SectionLayout>

        <SectionLayout id="personas">
            <div className="section-kicker i18n-safe">{page.personas.kicker}</div>
            <div className="split center">
              <TextBlock className="content-limit">
                <h2 className="i18n-safe">{page.personas.title}</h2>
                <p className="i18n-safe">{page.personas.lead}</p>
              </TextBlock>
              <a className="button primary" href="#join" onClick={(event) => { event.preventDefault(); scrollToHref('#join'); }}>{page.personas.hire}</a>
            </div>
            <div className="persona-row">
              {page.personas.residents.map((persona, index) => {
                const expanded = expandedPersona === index;
                return (
                  <article
                    className={`persona-card text-block ${persona.className} ${expanded ? 'expanded' : ''}`}
                    key={persona.name}
                    tabIndex="0"
                    role="button"
                    aria-expanded={expanded}
                    onClick={() => togglePersona(index)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        togglePersona(index);
                      }
                    }}
                  >
                    <div className={`avatar ${persona.avatar}`} />
                    <p className="tag i18n-safe">{page.personas.tag}</p>
                    <h3 className="i18n-safe">{persona.name}</h3>
                    <p className="i18n-safe">{persona.body}</p>
                    <ul>
                      {persona.bullets.map((bullet) => (
                        <li className="i18n-safe" key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <span className="card-hint" data-expanded={page.personas.expandedHint}>{page.personas.cardHint}</span>
                  </article>
                );
              })}
            </div>
        </SectionLayout>

        <SectionLayout id="access">
            <div className="section-kicker i18n-safe">{page.access.kicker}</div>
            <TextBlock className="content-limit">
              <h2 className="i18n-safe">{page.access.title}</h2>
              <p className="section-lead i18n-safe">{page.access.lead}</p>
            </TextBlock>
            <div className="orbit-list scenario-list">
              {page.access.scenarios.map((scenario) => (
                <span className="i18n-safe" key={scenario}>{scenario}</span>
              ))}
            </div>
        </SectionLayout>

        <SectionLayout id="join" className="cta-section">
            <TextBlock className="cta-card">
              <p className="eyebrow i18n-safe">{page.join.kicker}</p>
              <h2 className="i18n-safe">{page.join.title}</h2>
              <p className="i18n-safe">{page.join.lead}</p>
              <form className="signup-form">
                <input type="text" placeholder={page.join.name} aria-label={page.join.name} />
                <input type="email" placeholder={page.join.email} aria-label={page.join.email} />
                <div className={`custom-select ${isApplicationOpen ? 'open' : ''}`}>
                  <button
                    className="custom-select-trigger"
                    type="button"
                    aria-expanded={isApplicationOpen}
                    aria-label={page.applicationTypeAria}
                    onClick={() => setIsApplicationOpen((open) => !open)}
                  >
                    <span>{page.join.applicationOptions[selectedApplication]}</span>
                    <i aria-hidden="true" />
                  </button>
                  <div className="custom-select-menu">
                    {page.join.applicationOptions.map((option, optionIndex) => (
                      <button
                        className={selectedApplication === optionIndex ? 'selected' : ''}
                        key={option}
                        type="button"
                        onClick={() => {
                          setSelectedApplication(optionIndex);
                          setIsApplicationOpen(false);
                        }}
                      >
                        <span>{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <button className="submit-button" type="button">{page.join.submit}</button>
              </form>
              <small className="i18n-safe">{page.join.note}</small>
            </TextBlock>
        </SectionLayout>
      </main>

      <footer className="site-footer">
        <p>{page.footerProduct}</p>
        <p>{page.footer}</p>
      </footer>

    </>
  );
}

export default App;
