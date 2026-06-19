import { useEffect, useState } from 'react';
import Aurora from './Aurora.jsx';
import LanguageToggle from './LanguageToggle.jsx';
import NavigationTabs from './NavigationTabs.jsx';

const auroraColorStops = ['#0f4cbe', '#0a1a3a', '#3b4f6d'];

const copy = {
  zh: {
    title: 'Eterna — AI Persona Infrastructure',
    heroEyebrow: 'AI PERSONA INFRASTRUCTURE',
    heroTitle: '让你的Agent，<br />成为可运营的数字资产',
    heroLead: 'Eterna 帮助创作者将角色、虚拟主播、IP 人物和品牌形象升级为可部署的 AI 数字居民。它们可以被调用、授权、出售、接入任务，并在未来数字场景中为创作者创造收益机会。',
    begin: '关于数字居民',
    secondaryCta: '浏览数字居民',
    scroll: '向下滑动',
    afterlifeTitle: '在模型与 Agent 之上，建立数字人物资产层。',
    afterlifeBody: 'Agent 负责执行任务，数字人负责表达形象，Eterna 负责把身份、记忆、声音、外观、关系和授权边界整合成可部署的数字居民资产。',
    quoteOne: 'Eterna 不只是生成角色。',
    quoteTwo: 'Eterna 让角色成为资产。',
    personasTitle: 'AfterBorn：由创作者诞生的 AI 数字居民。',
    personasLead: 'AfterBorn 是 Eterna 网络中的数字居民实例。它由创作者创建，拥有身份、记忆、表达风格、外观、声音和 Agent 能力，可以被部署到内容生产、虚拟主播、IP 互动、品牌服务和未来数字世界中工作。',
    hire: '浏览所有数字居民',
    cardHint: '点击展开完整档案',
    expandedHint: '已展开',
    accessTitle: '让数字居民进入真实场景，而不只停留在聊天窗口。',
    accessLead: '数字居民可以服务于 AI 电影、虚拟主播、短视频口播、游戏 NPC、品牌人格、教育陪伴、客服运营、个人工作流和企业任务等未来更多场景。',
    joinTitle: '申请创建你的第一个 AI 数字居民',
    joinLead: '提交你的角色、分身、IP 或品牌人物设定，支持 AI 生成或风格化重建为数字居民。Eterna 将帮助你将其整理为可部署的人格资产，并逐步接入人格 + Agent 创建平台、调用日志、授权规则和未来收益分成机制。',
    name: '你的数字身份',
    email: '你的数字入口邮箱',
    submit: '创建数字居民',
    note: '未来，这些数字居民将进入 Eterna Network，在不同场景中接收任务、提供服务、产生收入，并按照授权规则与创作者共享收益。',
    footer: '开放接入，但不开放失控。',
  },
  en: {
    title: 'Eterna — AI Persona Infrastructure',
    heroEyebrow: 'AI PERSONA INFRASTRUCTURE',
    heroTitle: 'Turn your agents<br />into operable digital assets',
    heroLead: 'Eterna helps creators upgrade characters, virtual streamers, IP figures, and brand identities into deployable AI digital residents. They can be invoked, authorized, sold, connected to tasks, and create future earning opportunities for their creators across digital scenarios.',
    begin: 'Create Digital Resident',
    secondaryCta: 'View Sample Residents',
    scroll: 'Scroll down',
    afterlifeTitle: 'Above models and agents, build the digital persona asset layer.',
    afterlifeBody: 'Agents execute tasks. Digital humans express appearances. Eterna integrates identity, memory, voice, appearance, relationships, and authorization boundaries into deployable digital resident assets.',
    quoteOne: 'Eterna does not just generate characters.',
    quoteTwo: 'Eterna turns characters into assets.',
    personasTitle: 'AfterBorn: AI digital residents born from creators.',
    personasLead: 'AfterBorn are digital resident instances inside the Eterna network. Created by creators, they have identities, memories, expression styles, appearances, voices, and agent abilities, and can be deployed into content production, virtual streaming, IP interaction, brand services, and future digital worlds.',
    hire: 'Browse All Digital Residents',
    cardHint: 'Click to expand full profile',
    expandedHint: 'Expanded',
    accessTitle: 'Let digital residents enter real scenarios, not just stay in chat windows.',
    accessLead: 'Digital residents can serve AI films, virtual streamers, short-form video narration, game NPCs, brand personas, education companions, customer operations, personal workflows, enterprise tasks, and more future scenarios.',
    joinTitle: 'Apply to create your first AI digital resident',
    joinLead: 'Submit your character, double, IP, or brand persona concept. Eterna supports AI generation or stylized reconstruction into a digital resident, helps organize it into a deployable persona asset, and gradually connects it to the persona + agent creation platform, invocation logs, authorization rules, and future revenue-sharing mechanisms.',
    name: 'Your digital identity',
    email: 'Your digital access email',
    submit: 'Create Digital Resident',
    note: 'In the future, these digital residents will enter Eterna Network, receive tasks across different scenarios, provide services, generate income, and share revenue with creators according to authorization rules.',
    footer: 'Open access, not uncontrolled access.',
  },
};

const features = [
  {
    label: 'MEMORY VAULT',
    title: { zh: '记忆库', en: 'Memory Vault' },
    body: {
      zh: '保存角色经历、创作者设定、用户互动、工作记录与成长轨迹，让数字居民在长期调用中保持连续性。',
      en: 'Store character experiences, creator settings, user interactions, work records, and growth trajectories so digital residents remain continuous across long-term invocation.',
    },
  },
  {
    label: 'VALUE LEDGER',
    title: { zh: '价值账本', en: 'Value Ledger' },
    body: {
      zh: '记录每一次调用、部署、授权和商业使用，为未来收益结算、分成和资产估值提供依据。',
      en: 'Record every invocation, deployment, authorization, and commercial use to support future revenue settlement, sharing, and asset valuation.',
    },
  },
  {
    label: 'RELATIONSHIP GRAPH',
    title: { zh: '关系网络', en: 'Relationship Graph' },
    body: {
      zh: '数字居民可以拥有与创作者、用户、品牌、IP、任务和其他居民之间的关系，形成可持续扩展的数字社会结构。',
      en: 'Digital residents can hold relationships with creators, users, brands, IP, tasks, and other residents, forming a sustainably expandable digital social structure.',
    },
  },
];

const personas = [
  {
    name: { zh: 'Bethany Morgan | 42岁', en: 'Bethany Morgan | 42' },
    className: 'featured',
    avatar: '',
    body: {
      zh: '居民档案：\n由创作者设定的演员型数字居民，拥有表演经历、角色理解能力、访谈表达风格和可持续更新的职业记忆。',
      en: 'Resident profile:\nAn actor-type digital resident defined by a creator, with performance experience, character comprehension, interview-style expression, and continuously updated professional memory.',
    },
    bullets: [
      { zh: '可部署场景：', en: 'Deployable scenarios:' },
      { zh: 'AI 电影角色、幕后访谈、角色口播、IP 内容生产。', en: 'AI film roles, behind-the-scenes interviews, character narration, and IP content production.' },
    ],
  },
  {
    name: { zh: 'Aaron Miller | 40岁', en: 'Aaron Miller | 40' },
    className: '',
    avatar: 'bridge',
    body: {
      zh: '居民档案：\n品牌顾问型数字居民，适合承载商业表达、策略访谈、品牌叙事和知识型内容输出。',
      en: 'Resident profile:\nA brand-consultant digital resident suited for commercial expression, strategy interviews, brand storytelling, and knowledge-based content output.',
    },
    bullets: [
      { zh: '可部署场景：', en: 'Deployable scenarios:' },
      { zh: '品牌顾问、课程讲师、商业访谈、企业内容助理。', en: 'Brand consultant, course lecturer, business interviews, and enterprise content assistant.' },
    ],
  },
  {
    name: { zh: 'Eli Turner | 10岁', en: 'Eli Turner | 10' },
    className: '',
    avatar: 'cast',
    body: {
      zh: '居民档案：\n儿童角色型数字居民，适合互动叙事、教育陪伴、故事生成和游戏 NPC 场景。',
      en: 'Resident profile:\nA child-character digital resident suited for interactive storytelling, education companionship, story generation, and game NPC scenarios.',
    },
    bullets: [
      { zh: '可部署场景：', en: 'Deployable scenarios:' },
      { zh: '互动故事、教育产品、儿童 IP。', en: 'Interactive stories, education products, and children’s IP.' },
    ],
  },
  {
    name: { zh: 'Maya Chen | 28岁', en: 'Maya Chen | 28' },
    className: '',
    avatar: 'bridge',
    body: {
      zh: '居民档案：\n虚拟主播型数字居民，适合承载直播表达、粉丝互动、短视频口播和持续更新的内容人格。',
      en: 'Resident profile:\nA virtual-streamer digital resident suited for live expression, fan interaction, short-form narration, and a continuously updated content persona.',
    },
    bullets: [
      { zh: '可部署场景：', en: 'Deployable scenarios:' },
      { zh: '虚拟直播、短视频账号、粉丝互动、品牌联名内容。', en: 'Virtual livestreams, short-form accounts, fan interaction, and brand collaboration content.' },
    ],
  },
];

const scenarios = [
  { zh: 'AI 电影与虚拟演员', en: 'AI Film & Virtual Actors' },
  { zh: '虚拟主播与直播助手', en: 'Virtual Streamers & Live Assistants' },
  { zh: '短视频口播与内容账号', en: 'Short-Form Narration & Content Accounts' },
  { zh: '小说 / 短剧 / IP 角色', en: 'Novels / Short Drama / IP Characters' },
  { zh: '游戏 NPC 与互动叙事', en: 'Game NPCs & Interactive Stories' },
  { zh: '品牌人格与广告内容', en: 'Brand Personas & Ad Content' },
  { zh: '创作者数字分身', en: 'Creator Digital Doubles' },
  { zh: '教育陪伴与私人导师', en: 'Education Companions & Private Tutors' },
  { zh: '客服与私域运营', en: 'Customer Service & Private Traffic Operations' },
  { zh: '个人工作流与任务助理', en: 'Personal Workflows & Task Assistants' },
];

const applicationOptions = [
  { zh: '创建个人数字分身', en: 'Create a personal digital double' },
  { zh: '创建虚拟主播人格', en: 'Create a virtual streamer persona' },
  { zh: '创建短剧 / 小说 / IP 角色', en: 'Create a short drama / novel / IP character' },
  { zh: '创建品牌数字人物', en: 'Create a brand digital persona' },
  { zh: '创建游戏 NPC', en: 'Create a game NPC' },
  { zh: '创建教育 / 陪伴型居民', en: 'Create an education / companion resident' },
  { zh: '了解企业或团队合作', en: 'Discuss enterprise or team collaboration' },
];

const navItems = [
  { href: '#afterlife', label: { zh: '人物层', en: 'Persona Layer' } },
  { href: '#personas', label: { zh: '数字居民', en: 'Digital Residents' } },
  { href: '#access', label: { zh: '应用场景', en: 'Use Cases' } },
  { href: '#join', label: { zh: '创建申请', en: 'Create' } },
];

function App() {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('afterlife-language');
    return saved === 'en' ? 'en' : 'zh';
  });
  const [expandedPersona, setExpandedPersona] = useState(null);
  const [activeNav, setActiveNav] = useState('#afterlife');
  const [selectedApplication, setSelectedApplication] = useState(0);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    document.title = t.title;
    localStorage.setItem('afterlife-language', language);
  }, [language, t.title]);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));

    const updateActiveNav = () => {
      const marker = window.innerHeight * 0.38;
      let current = navItems[0].href;

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        if (section.getBoundingClientRect().top <= marker) {
          current = `#${id}`;
        }
      });

      const pageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      setActiveNav(pageBottom ? navItems[navItems.length - 1].href : current);
    };

    updateActiveNav();
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    window.addEventListener('resize', updateActiveNav);

    return () => {
      window.removeEventListener('scroll', updateActiveNav);
      window.removeEventListener('resize', updateActiveNav);
    };
  }, []);

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

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Eterna home">
          <span className="brand-mark" />
          <span>Eterna</span>
        </a>
        <NavigationTabs items={navItems} activeNav={activeNav} language={language} onSelect={setActiveNav} />
        <LanguageToggle language={language} onChange={setLanguage} />
      </header>

      <main id="top">
        <section className="hero panel" data-phase="birth">
          <div className="hero-copy">
            <p className="eyebrow">{t.heroEyebrow}</p>
            <h1 dangerouslySetInnerHTML={{ __html: t.heroTitle }} />
            <p className="hero-lead">{t.heroLead}</p>
            <div className="hero-actions">
              <a className="button primary" href="#afterlife">{t.begin}</a>
              <a className="button ghost" href="#personas">{t.secondaryCta}</a>
            </div>
          </div>
          <div className="scroll-hint">
            <span>{t.scroll}</span>
            <i />
          </div>
        </section>

        <section id="afterlife" className="panel reveal-section">
          <div className="section-kicker">01 / PERSONA LAYER</div>
          <div className="split">
            <div>
              <h2>{t.afterlifeTitle}</h2>
              <p>{t.afterlifeBody}</p>
            </div>
            <div className="quote-card">
              <p>{t.quoteOne}</p>
              <p>{t.quoteTwo}</p>
            </div>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.label}>
                <span>{feature.label}</span>
                <h3>{feature.title[language]}</h3>
                <p>{feature.body[language]}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="personas" className="panel reveal-section">
          <div className="section-kicker">02 / DIGITAL RESIDENTS</div>
          <div className="split center">
            <div>
              <h2>{t.personasTitle}</h2>
              <p>{t.personasLead}</p>
            </div>
            <a className="button primary" href="#join">{t.hire}</a>
          </div>
          <div className="persona-row">
            {personas.map((persona, index) => {
              const expanded = expandedPersona === index;
              return (
                <article
                  className={`persona-card ${persona.className} ${expanded ? 'expanded' : ''}`}
                  key={persona.name.en}
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
                  <p className="tag">ORIGINAL DIGITAL RESIDENT</p>
                  <h3>{persona.name[language]}</h3>
                  <p>{persona.body[language]}</p>
                  <ul>
                    {persona.bullets.map((bullet) => (
                      <li key={bullet.en}>{bullet[language]}</li>
                    ))}
                  </ul>
                  <span className="card-hint" data-expanded={t.expandedHint}>{t.cardHint}</span>
                </article>
              );
            })}
          </div>
        </section>

        <section id="access" className="panel reveal-section">
          <div className="section-kicker">03 / USE CASES</div>
          <h2>{t.accessTitle}</h2>
          <p className="section-lead">{t.accessLead}</p>
          <div className="orbit-list scenario-list">
            {scenarios.map((scenario) => (
              <span key={scenario.en}>{scenario[language]}</span>
            ))}
          </div>
        </section>

        <section id="join" className="panel cta-section reveal-section">
          <div className="cta-card">
            <p className="eyebrow">04 / CREATE</p>
            <h2>{t.joinTitle}</h2>
            <p>{t.joinLead}</p>
            <form className="signup-form">
              <input type="text" placeholder={t.name} aria-label={t.name} />
              <input type="email" placeholder={t.email} aria-label={t.email} />
              <div className={`custom-select ${isApplicationOpen ? 'open' : ''}`}>
                <button
                  className="custom-select-trigger"
                  type="button"
                  aria-expanded={isApplicationOpen}
                  aria-label={language === 'en' ? 'Application type' : '申请类型'}
                  onClick={() => setIsApplicationOpen((open) => !open)}
                >
                  <span>{applicationOptions[selectedApplication][language]}</span>
                  <i aria-hidden="true" />
                </button>
                <div className="custom-select-menu">
                  {applicationOptions.map((option, optionIndex) => (
                    <button
                      className={selectedApplication === optionIndex ? 'selected' : ''}
                      key={option.en}
                      type="button"
                      onClick={() => {
                        setSelectedApplication(optionIndex);
                        setIsApplicationOpen(false);
                      }}
                    >
                      <span>{option[language]}</span>
                    </button>
                  ))}
                </div>
              </div>
              <button className="submit-button" type="button">{t.submit}</button>
            </form>
            <small>{t.note}</small>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Eterna / AfterLife — Second Life Operating System</p>
        <p>{t.footer}</p>
      </footer>

    </>
  );
}

export default App;
