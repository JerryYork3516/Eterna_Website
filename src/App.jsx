import { useEffect, useState } from 'react';
import Aurora from './Aurora.jsx';
import LanguageToggle from './LanguageToggle.jsx';
import NavigationTabs from './NavigationTabs.jsx';

const auroraColorStops = ['#0f4cbe', '#0a1a3a', '#3b4f6d'];

const copy = {
  zh: {
    title: 'Eterna AfterLife — 开启第二人生',
    heroEyebrow: 'AI PERSONA INFRASTRUCTURE',
    heroTitle: '构建 Agent 之后的<br />数字人物基础设施',
    heroLead: 'Eterna 将 Agent、数字人、长期记忆、身份系统与授权机制整合为可部署的 AI 数字人物资产，服务创作者、品牌、IP 与未来企业场景。',
    begin: '申请人格样板',
    secondaryCta: '了解 AfterBorn',
    scroll: '向下滑动',
    afterlifeTitle: '黑色宇宙中，第二人生开始苏醒。',
    afterlifeBody: 'Agent 完成任务。第二生命积累人生。AfterLife 让云端角色不再只是一次性调用的工具，而是拥有履历、记忆、技能、关系与商业价值的数字存在。',
    quoteOne: 'Eterna 不生产 AI 工具。',
    quoteTwo: 'Eterna 运营来世。',
    personasTitle: 'Afterborn：可被雇佣的第二生命人格。',
    personasLead: 'Afterborn 不是一次性工具，而是在 AfterLife 中拥有履历、记忆、关系与成长轨迹的云端人格。每一次被雇佣，都会成为他们职业账本的一部分。',
    hire: '申请雇佣 Afterborn',
    cardHint: '点击展开完整简历',
    expandedHint: '已展开',
    accessTitle: 'Deply：部署 Afterborn 的应用场景。',
    accessLead: 'Deply 是 Afterborn 的部署层。它让每个云端人格在授权、沙盒、审计与模型监督下，进入创作、研发、表演、社交、个人电脑、企业系统与操作系统等真实工作场景。',
    joinTitle: '申请进入 AfterLife 早期测试。',
    joinLead: '现在开放多类早期申请：寻找 Afterborn、上传人格、授权演员数字分身、部署人格、AI 电影合作与企业测试。',
    name: '你的名字 / 团队名',
    email: '邮箱',
    submit: '提交申请',
    note: '演示网页表单暂不联网。正式版可接入 Notion、Airtable、Supabase 或自建后端。',
    footer: '开放接入，但不开放失控。',
  },
  en: {
    title: 'Eterna AfterLife — Begin the Second Life',
    heroEyebrow: 'AI PERSONA INFRASTRUCTURE',
    heroTitle: 'Build the infrastructure<br />after agents',
    heroLead: 'Eterna unifies agents, digital humans, long-term memory, identity systems, and authorization into deployable AI persona assets for creators, brands, IP owners, and future enterprise scenarios.',
    begin: 'Request Persona Sample',
    secondaryCta: 'Explore AfterBorn',
    scroll: 'Scroll down',
    afterlifeTitle: 'In the black universe, second lives begin to awaken.',
    afterlifeBody: 'Agents complete tasks. Second lives accumulate a life. AfterLife transforms cloud personas from disposable tools into digital beings with careers, memories, skills, relationships, and commercial value.',
    quoteOne: 'Eterna does not produce AI tools.',
    quoteTwo: 'Eterna operates AfterLife.',
    personasTitle: 'Afterborn: second-life personas available for hire.',
    personasLead: 'Afterborn are not disposable tools. They are cloud personas inside AfterLife with resumes, memories, relationships, and growth trajectories. Every hire becomes part of their career ledger.',
    hire: 'Hire Afterborn',
    cardHint: 'Click to expand full resume',
    expandedHint: 'Expanded',
    accessTitle: 'Deply: deployment scenarios for Afterborn.',
    accessLead: 'Deply is the deployment layer for Afterborn. It lets each cloud persona enter real work scenarios: creation, research, performance, social operations, personal computers, enterprise systems, and operating systems, under authorization, sandboxing, audit logs, and model supervision.',
    joinTitle: 'Request access to the AfterLife private alpha.',
    joinLead: 'Early access is open for multiple tracks: finding Afterborn, uploading personas, authorizing digital actors, deploying personas, AI film collaboration, and enterprise testing.',
    name: 'Your name / team',
    email: 'Email',
    submit: 'Submit Request',
    note: 'This demo form is not connected yet. The official version can connect to Notion, Airtable, Supabase, or a custom backend.',
    footer: 'Open access, not uncontrolled access.',
  },
};

const features = [
  {
    label: 'Memory Vault',
    title: { zh: '记忆库', en: 'Memory Vault' },
    body: {
      zh: '角色保留人生记忆、工作经历、用户偏好和情绪痕迹。',
      en: 'Personas retain life memories, work histories, user preferences, and emotional traces.',
    },
  },
  {
    label: 'Career Ledger',
    title: { zh: '职业账本', en: 'Career Ledger' },
    body: {
      zh: '每一次被雇佣，都会成为角色未来价值的一部分。',
      en: 'Every hire becomes part of the persona’s future value.',
    },
  },
  {
    label: 'Relationship Graph',
    title: { zh: '关系网络', en: 'Relationship Graph' },
    body: {
      zh: '角色之间拥有合作、冲突、桥接和共同经历。',
      en: 'Personas can share collaboration, conflict, bridges, and collective memories.',
    },
  },
];

const personas = [
  {
    name: { zh: 'Bethany Morgan | 42岁', en: 'Bethany Morgan | 42' },
    className: 'featured',
    avatar: '',
    body: {
      zh: '后世简历：Eterna 原生首位 Afterborn。来自俄勒冈州波特兰，花店合伙人，经营一家小型花店，长期接触婚礼、葬礼和家庭纪念订单。有着温和但不柔弱的气质。',
      en: 'AfterLife resume: Eterna’s first native Afterborn. From Portland, Oregon. A flower shop partner who runs a small florist, long exposed to wedding, funeral, and family memorial orders. Gentle, but not fragile.',
    },
    bullets: [
      { zh: '首批意识样本档案', en: 'First consciousness sample archive' },
      { zh: '饰演《零号人生：最后备份》中女主角Nora Whitaker', en: 'Portrays Nora Whitaker, the female lead in Zero Life: The Last Backup' },
      { zh: '记忆调和记录：高敏感', en: 'Memory reconciliation record: high sensitivity' },
    ],
  },
  {
    name: { zh: 'Aaron Miller | 40岁', en: 'Aaron Miller | 40' },
    className: '',
    avatar: 'bridge',
    body: {
      zh: '后世简历：Eterna 原生首批 Afterborn。来自俄勒冈州波特兰，长期在婚礼、学校礼堂和小剧场搬运钢琴，也在东区社区剧场演过父亲、工人和失业者。他身上有一种长期体力劳动后的疲惫感。',
      en: 'AfterLife resume: one of Eterna’s first native Afterborn. From Portland, Oregon. He has long moved pianos for weddings, school auditoriums, and small theaters, while also playing fathers, workers, and the unemployed in Eastside community theater. He carries the fatigue of long physical labor.',
    },
    bullets: [
      { zh: '首批意识样本档案', en: 'First consciousness sample archive' },
      { zh: '饰演《零号人生：最后备份》中男主角Daniel Mercer', en: 'Portrays Daniel Mercer, the male lead in Zero Life: The Last Backup' },
      { zh: '记忆调和记录：重视亲情', en: 'Memory reconciliation record: values family bonds' },
    ],
  },
  {
    name: { zh: 'Eli Turner | 10岁', en: 'Eli Turner | 10' },
    className: '',
    avatar: 'cast',
    body: {
      zh: '后世简历：Eterna 原生首批 Afterborn。来自俄勒冈州波特兰。小学生，波特兰本地童星，社区儿童剧演员，平时参加学校合唱和儿童剧。',
      en: 'AfterLife resume: one of Eterna’s first native Afterborn. From Portland, Oregon. An elementary school student, local Portland child actor, and community children’s theater performer who usually takes part in school choir and children’s plays.',
    },
    bullets: [
      { zh: '首批意识样本档案', en: 'First consciousness sample archive' },
      { zh: '饰演《零号人生：最后备份》中Nora的孩子Sam Whitaker', en: 'Portrays Sam Whitaker, Nora’s child in Zero Life: The Last Backup' },
      { zh: '记忆调和记录：信任且友好', en: 'Memory reconciliation record: trusting and friendly' },
    ],
  },
];

const scenarios = [
  { zh: 'AI 电影与虚拟演员', en: 'AI Film & Virtual Actors' },
  { zh: '真人演员数字分身', en: 'Authorized Actor Doubles' },
  { zh: '品牌人格与广告内容', en: 'Brand Personas & Ad Content' },
  { zh: '短视频与直播助理', en: 'Short Video & Live Assistant' },
  { zh: '个人电脑与文件工作流', en: 'Personal Computer & Files' },
  { zh: 'Codex / 软件开发协作', en: 'Codex / Software Collaboration' },
  { zh: '网页、App 与浏览器操作', en: 'Web, App & Browser Operations' },
  { zh: '社交平台运营', en: 'Social Platform Operations' },
  { zh: '企业研发与策略推演', en: 'Enterprise R&D & Strategy' },
  { zh: '市场分析与增长实验', en: 'Market Analysis & Growth Tests' },
  { zh: '教育陪伴与私人导师', en: 'Learning Companion & Tutor' },
  { zh: '客户服务与私域运营', en: 'Customer Service & CRM' },
  { zh: '游戏 NPC 与互动叙事', en: 'Game NPCs & Interactive Stories' },
  { zh: '操作系统与云端设备接入', en: 'OS & Cloud Device Access' },
];

const applicationOptions = [
  { zh: '寻找 Afterborn 人格', en: 'Find an Afterborn persona' },
  { zh: '上传原创人格', en: 'Upload an original persona' },
  { zh: '授权演员数字分身', en: 'Authorize a digital actor double' },
  { zh: '申请 Deply 部署人格', en: 'Apply for Deply persona deployment' },
  { zh: 'AI 电影 / 短片合作', en: 'AI film / short film collaboration' },
  { zh: '品牌人格 / 广告内容', en: 'Brand persona / advertising content' },
  { zh: 'Codex / 软件协作测试', en: 'Codex / software workflow test' },
  { zh: '社交平台运营测试', en: 'Social platform operations test' },
  { zh: '企业研发 / 策略推演', en: 'Enterprise R&D / strategy simulation' },
  { zh: '教育陪伴 / 私人导师', en: 'Learning companion / private tutor' },
  { zh: '投资 / 媒体 / 合作沟通', en: 'Investment / media / partnership' },
];

const navItems = [
  { href: '#afterlife', label: { zh: '人物层', en: 'Persona Layer' } },
  { href: '#personas', label: { zh: '数字居民', en: 'Digital Residents' } },
  { href: '#access', label: { zh: '应用场景', en: 'Use Cases' } },
  { href: '#join', label: { zh: '定制服务', en: 'Services' } },
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
                  <p className="tag">Original Afterborn</p>
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
            <p className="eyebrow">04 / SERVICES</p>
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
