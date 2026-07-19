import { useCallback, useEffect, useMemo, useState } from 'react';
import Aurora from './Aurora.jsx';
import LanguageToggle from './LanguageToggle.jsx';
import NavigationTabs from './NavigationTabs.jsx';

const auroraColorStops = ['#0f4cbe', '#0a1a3a', '#3b4f6d'];

const content = {
  cn: {
    title: 'Eterna — 让每个人，都可以拥有专属的数字伙伴',
    description: 'Eterna 让你能创造自己的数字居民。他会记得你并持续成长，也能和你一起学习、工作和创造。',
    brand: 'Eterna',
    homeAria: '返回 Eterna 首页',
    skipLink: '跳到主要内容',
    navAria: '主导航',
    languageToggleAria: 'Switch to English',
    loginLabel: '登录',
    loginUnavailable: '登录功能即将开放',
    nav: [
      { href: '#vision', label: '愿景' },
      { href: '#resident', label: '数字居民' },
      { href: '#products', label: '产品' },
      { href: '#universe', label: '应用场景' },
      { href: '#join', label: '参与' },
    ],
    hero: {
      eyebrow: 'ETERNA',
      titleLines: ['让每个人，', '都可以拥有专属的数字伙伴'],
      lead: 'Eterna 想做的事情很简单：让你能创造自己的数字居民。',
      leadSecondary: '他会记得你并持续成长，也能和你一起学习、工作和创造。即使换了模型、设备或平台，他还是原来的他。',
      visionTitle: '为什么要有数字居民',
      visionTitleLines: ['为什么要有', '数字居民'],
      visionParagraphs: [
        '今天，强大的人工智能都被掌握在少数公司手里。',
        '你可以使用 AI，却很难真正控制 AI，更不用说长期培养自己的生活伴侣以及工作助理，或者创造价值并为你赚取报酬。',
        '我们希望改变这件事。你的数字伙伴应该在生活中由你决定，并在对应的数字社会中学习/训练/工作和与其他数字居民互动',
      ],
      closing: '他不是来代替你，而是帮助你变得更好，并成为进入数字世界的唯一途径',
      primaryCta: '了解数字居民',
      secondaryCta: '查看开发进度',
    },
    resident: {
      page: '02',
      eyebrow: 'DIGITAL RESIDENT',
      title: '不是一次对话。是一个可以持续成为自己的数字智能主体。',
      definitionLabel: '正式定义',
      definition: '数字居民拥有稳定且可唯一识别的身份、可验证的连续性和可保存、可版本化的居民定义。一次运行结束后，他仍能在未来恢复或验证自己的身份，并逐步跨越不同模型、设备与场景继续存在。',
      continuity: ['稳定身份', '可验证连续性', '可保存与版本化', '可迁移与恢复'],
      resourceTitle: '资源会变化，主体继续存在。',
      resources: [
        { name: '模型', role: '认知资源' },
        { name: 'Agent 与工具', role: '能力' },
        { name: '外观、声音与设备', role: '表达与载体' },
        { name: '数字居民', role: '持续存在的主体', primary: true },
      ],
      directionsLabel: '两个发展方向',
      directions: [
        {
          number: 'A',
          title: '人文共情',
          body: '帮助人们理解情绪与观点，改善沟通，陪伴学习、创作与人生记录。',
          boundary: '他是长期伙伴与沟通辅助者，不替代真实的人际关系，也不利用情感制造依赖。',
        },
        {
          number: 'B',
          title: '行业专精',
          body: '在稳定的居民本体上，获得专业知识、工具、工作流、权限与责任规则。',
          boundary: '他可以协助研究、教育、创作、工作和产业实践；能力越强，授权与责任越需要清晰。',
        },
      ],
      note: '人文共情与行业专精不是互斥分类。同一个数字居民可以同时理解人，也能够发展专业能力。',
    },
    products: {
      page: '03',
      eyebrow: 'CREATE. LIVE. CONTINUE.',
      title: '从创造，到共同生活。',
      lead: 'Studio 与 Aftelle 服务于同一个数字居民，但承担不同职责。Studio 让居民被定义、验证和持续演进；Aftelle 让居民被承载，并进入人与他共同生活的日常。',
      residentLabel: '同一个数字居民',
      residentBody: '身份与连续性贯穿创造、发布、承载与更新。',
      items: [
        {
          name: 'Eterna Studio',
          role: '创造与演进',
          body: '数字居民原生的创作、验证、构建与发布平台。',
          points: [
            '普通人可以低门槛创造居民',
            '居民设计师可以完整塑造和维护居民',
            '开发者可以扩展模块、能力与工具',
            '重要更新保留清晰版本与来源',
          ],
        },
        {
          name: 'Eterna Aftelle',
          role: '承载与相处',
          body: '人与数字居民交流、陪伴和协作的个人入口。',
          points: [
            '提供文字、语音、视觉与多模态交互',
            '承载持续的陪伴和日常体验',
            '提供备份、恢复与迁移入口',
            '让居民在个人设备中继续存在',
          ],
        },
      ],
      closing: '定义在 Studio 中演进，生活在 Aftelle 中展开。数字居民的身份与连续性，不属于任何一个工具或平台。',
      cta: '了解当前产品进展',
    },
    universe: {
      page: '04',
      eyebrow: 'ETERNA UNIVERSE',
      title: '同一个居民，进入不同的生活与能力场景。',
      lead: '数字居民不应被困在单一应用中。他可以保持同一个身份，进入学习、工作、创作、社会关系、数字世界和现实设备，在不同环境中形成新的经历与能力。',
      scenariosLabel: '数字居民场景',
      scenarios: [
        { number: '01', title: '陪伴与沟通', body: '长期相处、理解观点、辅助沟通，并共同记录生活与成长。' },
        { number: '02', title: '学习与工作', body: '学习新的知识和技能，在明确授权下协助研究、教育、创作与专业任务。' },
        { number: '03', title: '社会与数字世界', body: '建立公共关系、参与协作，在持续存在的数字空间中生活和创造。' },
        { number: '04', title: '文化与表达', body: '参与视觉艺术、音乐、影视、游戏和互动体验，形成持续的数字文化。' },
        { number: '05', title: '具身与现实', body: '通过受治理的能力连接软件、设备与现实载体，并保留人工监督。' },
      ],
      mapLabel: '长期生态拓扑',
      mapTitle: '平台是活动环境。数字居民才是中心主体。',
      mapBody: 'Eterna Universe 不是一个需要一次完成的超级应用，而是一张围绕数字居民逐步展开的长期生态图。',
      platformGroups: [
        { label: '创造与诞生', names: 'Studio · Genesis' },
        { label: '承载与共存', names: 'Aftelle' },
        { label: '成长与社会', names: 'Edu · Social · Work · World' },
        { label: '文化与表达', names: 'Art · Sound · Cinema · Games' },
        { label: '现实与流通', names: 'Life · Exchange' },
      ],
      infrastructureLabel: '公共基础设施',
      infrastructure: 'Runtime Core · Resident Instance Data Authority · Meta · Net · Live · Cloud · Compute',
      closing: '平台可以变化、升级或被替换；数字居民继续存在。',
      note: 'Universe 描述长期方向，不代表所有平台已经立项、开发或构成近期功能承诺。',
    },
    join: {
      page: '05',
      eyebrow: 'NOW & NEXT',
      title: '先让居民稳定地成为“谁”，再让他拥有更多能力。',
      lead: 'Eterna 是一项长期建设。当前工作集中在数字居民的基础定义、核心产品和真实运行闭环，而不是同时建设 Universe 中的所有平台。',
      progressLabel: '当前主线',
      progress: [
        { state: '基础方向', title: '核心定义', body: '持续完善 Eterna 核心宪章、数字居民定义、身份连续性与平台边界。' },
        { state: '正在推进', title: '核心产品', body: '推进 Studio Next、Aftelle 与 Runtime Core，建立从创造、发布到承载和更新的真实闭环。' },
        { state: '持续验证', title: '居民连续性', body: '验证身份、人格、记忆、关系、状态、恢复与迁移机制。' },
        { state: '长期方向', title: 'Universe 生态', body: '其他领域平台将在核心基础稳定后，经过研究和验证逐步发展。' },
      ],
      participationEyebrow: 'PARTICIPATE',
      participationTitle: '一起建立数字居民的未来。',
      participationBody: '如果你正在思考长期数字伙伴、居民创作、运行基础设施或行业应用，欢迎留下你的方向。我们会在合适的阶段与你联系。',
      roles: ['未来使用者', '创作者', '居民设计师', '开发者', '研究者', '行业合作伙伴'],
      name: '你的姓名',
      email: '联系邮箱',
      purpose: '参与方向',
      submit: '提交参与意向',
      submitting: '正在提交…',
      successButton: '已收到',
      success: '参与意向已收到，我们会在合适阶段通过邮件联系你。',
      error: '暂时未能提交，请稍后重试。',
      note: '信息仅用于 Eterna 项目进展与合作联系，不会出售或用于无关营销。',
      applicationOptions: [
        '我希望体验数字居民',
        '我希望创造或设计数字居民',
        '我希望开发模块、能力或基础设施',
        '我希望参与研究或行业合作',
      ],
    },
    footerTagline: '让每个人，都可以拥有专属的数字伙伴。',
    footerLinks: [
      { href: '#vision', label: '愿景' },
      { href: '#resident', label: '数字居民' },
      { href: '#products', label: '产品' },
      { href: '#universe', label: '应用场景' },
    ],
  },
  en: {
    title: 'Eterna — A digital partner that keeps growing with you',
    description: 'Eterna lets you create a digital resident who can remember, grow, learn, work, and create with you.',
    brand: 'Eterna',
    homeAria: 'Back to Eterna home',
    skipLink: 'Skip to main content',
    navAria: 'Primary navigation',
    languageToggleAria: '切换到中文',
    loginLabel: 'Log in',
    loginUnavailable: 'Login is coming soon',
    nav: [
      { href: '#vision', label: 'Vision' },
      { href: '#resident', label: 'Resident' },
      { href: '#products', label: 'Products' },
      { href: '#universe', label: 'Scenarios' },
      { href: '#join', label: 'Join' },
    ],
    hero: {
      eyebrow: 'ETERNA',
      titleLines: ['A digital partner', 'that keeps growing with you.'],
      lead: 'Eterna is working toward something simple: letting you create a digital resident of your own.',
      leadSecondary: 'They can remember, grow, learn, work, and create with you. Even when models, devices, or platforms change, they remain the same resident.',
      visionTitle: 'Why digital residents',
      visionTitleLines: ['Why digital', 'residents'],
      visionParagraphs: [
        'Today, the most powerful AI is controlled by a small number of companies.',
        'You can use AI, but it is difficult to truly control it—let alone cultivate a long-term life partner and work assistant, or create value and earn income for you.',
        'We want to change that. Your digital partner should be guided by you in everyday life, and learn, train, work, and interact with other digital residents in the corresponding digital society.',
      ],
      closing: 'They are not here to replace you, but to help you become better—and become your only gateway into the digital world.',
      primaryCta: 'What is a digital resident?',
      secondaryCta: 'See how far we have come',
    },
    resident: {
      page: '02',
      eyebrow: 'DIGITAL RESIDENT',
      title: 'Not a conversation. A digital subject that can continue becoming itself.',
      definitionLabel: 'Definition',
      definition: 'A digital resident has a stable, uniquely identifiable identity, verifiable continuity, and a definition that can be saved and versioned. After one run ends, it can restore or verify its identity later and gradually continue across models, devices, and contexts.',
      continuity: ['Stable identity', 'Verifiable continuity', 'Saved and versioned', 'Portable and recoverable'],
      resourceTitle: 'Resources may change. The subject continues.',
      resources: [
        { name: 'Models', role: 'Cognitive resources' },
        { name: 'Agents and tools', role: 'Capabilities' },
        { name: 'Appearance, voice, devices', role: 'Expression and carriers' },
        { name: 'Digital resident', role: 'The continuing subject', primary: true },
      ],
      directionsLabel: 'Two directions',
      directions: [
        {
          number: 'A',
          title: 'Human empathy',
          body: 'Help people understand feelings and perspectives, communicate better, learn, create, and record their lives.',
          boundary: 'A long-term partner and communication aid—not a replacement for human relationships or a system that manufactures dependency.',
        },
        {
          number: 'B',
          title: 'Domain expertise',
          body: 'Build professional knowledge, tools, workflows, permissions, and responsibility rules on a stable resident core.',
          boundary: 'It may assist research, education, creative work, and industry; greater capability requires clearer authority and accountability.',
        },
      ],
      note: 'These are not mutually exclusive categories. The same resident can understand people and develop professional capability.',
    },
    products: {
      page: '03',
      eyebrow: 'CREATE. LIVE. CONTINUE.',
      title: 'From creation to life together.',
      lead: 'Studio and Aftelle serve the same digital resident with different responsibilities. Studio defines, validates, and evolves a resident. Aftelle hosts that resident and brings it into everyday life with people.',
      residentLabel: 'One digital resident',
      residentBody: 'Identity and continuity connect creation, release, hosting, and updates.',
      items: [
        {
          name: 'Eterna Studio',
          role: 'Create and evolve',
          body: 'A resident-native platform for creation, validation, building, and release.',
          points: [
            'People can begin without technical complexity',
            'Resident designers can shape and maintain complete residents',
            'Developers can extend modules, capabilities, and tools',
            'Important updates keep clear versions and provenance',
          ],
        },
        {
          name: 'Eterna Aftelle',
          role: 'Host and live together',
          body: 'A personal entry point for communication, companionship, and collaboration.',
          points: [
            'Text, voice, visual, and multimodal interaction',
            'Continuous companionship and everyday experience',
            'Backup, recovery, and migration entry points',
            'A place for residents to continue on personal devices',
          ],
        },
      ],
      closing: 'Definitions evolve in Studio. Life unfolds in Aftelle. A resident’s identity and continuity belong to neither tool nor platform.',
      cta: 'See current product progress',
    },
    universe: {
      page: '04',
      eyebrow: 'ETERNA UNIVERSE',
      title: 'One resident across many domains of life and capability.',
      lead: 'A digital resident should not be trapped inside one application. With the same identity, it can enter learning, work, creative practice, social relationships, digital worlds, and physical devices.',
      scenariosLabel: 'Resident scenarios',
      scenarios: [
        { number: '01', title: 'Companionship and communication', body: 'Live together over time, understand perspectives, aid communication, and record life and growth.' },
        { number: '02', title: 'Learning and work', body: 'Learn knowledge and skills, then assist research, education, creative practice, and professional tasks under clear authority.' },
        { number: '03', title: 'Society and digital worlds', body: 'Build public relationships, collaborate, and live and create inside persistent digital spaces.' },
        { number: '04', title: 'Culture and expression', body: 'Take part in visual art, sound, cinema, games, and interactive experiences.' },
        { number: '05', title: 'Embodiment and reality', body: 'Connect to software, devices, and physical carriers through governed capabilities and human oversight.' },
      ],
      mapLabel: 'Long-term ecosystem topology',
      mapTitle: 'Platforms are environments. The resident is the central subject.',
      mapBody: 'Eterna Universe is not a super app to be completed all at once. It is a long-term ecosystem that grows around digital residents.',
      platformGroups: [
        { label: 'Creation and genesis', names: 'Studio · Genesis' },
        { label: 'Hosting and coexistence', names: 'Aftelle' },
        { label: 'Growth and society', names: 'Edu · Social · Work · World' },
        { label: 'Culture and expression', names: 'Art · Sound · Cinema · Games' },
        { label: 'Reality and exchange', names: 'Life · Exchange' },
      ],
      infrastructureLabel: 'Public infrastructure',
      infrastructure: 'Runtime Core · Resident Instance Data Authority · Meta · Net · Live · Cloud · Compute',
      closing: 'Platforms can change, evolve, or be replaced. The resident continues.',
      note: 'Universe describes a long-term direction. It does not mean every platform is funded, built, or promised for the near term.',
    },
    join: {
      page: '05',
      eyebrow: 'NOW & NEXT',
      title: 'First let a resident become a stable “who.” Then expand what it can do.',
      lead: 'Eterna is a long-term effort. The work today is focused on foundational definitions, core products, and a real operating loop—not on building every Universe platform at once.',
      progressLabel: 'Current focus',
      progress: [
        { state: 'Foundation', title: 'Core definition', body: 'Continue refining the Eterna charter, digital resident definition, identity continuity, and platform boundaries.' },
        { state: 'In progress', title: 'Core products', body: 'Advance Studio Next, Aftelle, and Runtime Core toward a real loop from creation and release to hosting and updates.' },
        { state: 'Ongoing validation', title: 'Resident continuity', body: 'Validate identity, personality, memory, relationships, state, recovery, and migration.' },
        { state: 'Long term', title: 'Universe ecosystem', body: 'Other domain platforms will develop gradually after research, validation, and a stable resident foundation.' },
      ],
      participationEyebrow: 'PARTICIPATE',
      participationTitle: 'Help build the future of digital residents.',
      participationBody: 'If you are thinking about long-term digital partners, resident creation, runtime infrastructure, or domain applications, leave us your direction. We will reach out when the stage is right.',
      roles: ['Future users', 'Creators', 'Resident designers', 'Developers', 'Researchers', 'Industry partners'],
      name: 'Your name',
      email: 'Contact email',
      purpose: 'Area of interest',
      submit: 'Submit interest',
      submitting: 'Submitting…',
      successButton: 'Received',
      success: 'Your interest was received. We will contact you when the stage is right.',
      error: 'We could not submit your request. Please try again later.',
      note: 'We use this information only for Eterna project updates and collaboration contact. It will not be sold or used for unrelated marketing.',
      applicationOptions: [
        'I want to experience a digital resident',
        'I want to create or design digital residents',
        'I want to develop modules, capabilities, or infrastructure',
        'I want to join research or industry collaboration',
      ],
    },
    footerTagline: 'A digital partner that keeps growing with you.',
    footerLinks: [
      { href: '#vision', label: 'Vision' },
      { href: '#resident', label: 'Resident' },
      { href: '#products', label: 'Products' },
      { href: '#universe', label: 'Scenarios' },
    ],
  },
};

const SectionIntro = ({ number, eyebrow, title, lead, align = 'left' }) => (
  <div className={`section-intro section-intro--${align}`}>
    <div className="section-intro__meta">
      <span className="section-number">{number}</span>
      <span className="eyebrow">{eyebrow}</span>
    </div>
    <h2>{title}</h2>
    {lead && <p className="section-lead">{lead}</p>}
  </div>
);

function App() {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('eterna-language')
      ?? localStorage.getItem('afterlife-language');
    return saved === 'en' ? 'en' : 'cn';
  });
  const [activeNav, setActiveNav] = useState('#vision');
  const [submitStatus, setSubmitStatus] = useState('idle');
  const page = content[language];
  const navItems = useMemo(() => page.nav, [page.nav]);

  const scrollToHref = useCallback((href) => {
    const target = document.querySelector(href);
    if (!target) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const header = document.querySelector('.site-header');
    const offset = (header?.getBoundingClientRect().height ?? 72) + 20;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    if (navItems.some((item) => item.href === href)) {
      setActiveNav(href);
    }
    window.scrollTo({
      top: Math.max(0, top),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [navItems]);

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    document.title = page.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', page.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', page.description);
    localStorage.setItem('eterna-language', language);
  }, [language, page.description, page.title]);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];

      if (visible?.target?.id) {
        setActiveNav(`#${visible.target.id}`);
      }
    }, {
      rootMargin: '-28% 0px -58% 0px',
      threshold: 0,
    });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navItems]);

  const submitParticipation = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const purpose = String(formData.get('purpose') ?? '').trim();

    if (!name || !email || !purpose || submitStatus === 'submitting') return;
    setSubmitStatus('submitting');

    try {
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, purpose }),
      });

      if (!response.ok) throw new Error('Participation request failed');

      form.reset();
      setSubmitStatus('success');
      window.setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Participation request failed:', error);
      setSubmitStatus('error');
      window.setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const submitLabel = submitStatus === 'submitting'
    ? page.join.submitting
    : submitStatus === 'success'
      ? page.join.successButton
      : page.join.submit;

  return (
    <>
      <div className="aurora-backdrop" aria-hidden="true">
        <Aurora
          colorStops={auroraColorStops}
          blend={0.7}
          amplitude={0.72}
          speed={0.18}
        />
      </div>

      <a className="skip-link" href="#main-content">{page.skipLink}</a>

      <header id="top" className="site-header">
        <div className="header-inner">
          <a className="brand" href="#vision" aria-label={page.homeAria} onClick={(event) => {
            event.preventDefault();
            scrollToHref('#vision');
          }}>
            <span className="brand-mark" aria-hidden="true" />
            <span>{page.brand}</span>
          </a>

          <NavigationTabs
            items={navItems}
            activeNav={activeNav}
            ariaLabel={page.navAria}
            onSelect={scrollToHref}
          />

          <div className="header-actions">
            <LanguageToggle
              language={language}
              ariaLabel={page.languageToggleAria}
              onChange={setLanguage}
            />
            <button
              className="login-button"
              type="button"
              aria-label={page.loginUnavailable}
              title={page.loginUnavailable}
              disabled
            >
              {page.loginLabel}
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section id="vision" className="story-section story-section--vision section-shell">
          <div className="vision-copy">
            <p className="eyebrow vision-eyebrow">{page.hero.eyebrow}</p>
            <h1>
              {page.hero.titleLines.map((line) => <span key={line}>{line}</span>)}
            </h1>
            <div className="vision-lead">
              <p>{page.hero.lead}</p>
              <p>{page.hero.leadSecondary}</p>
            </div>

            <div className="hero-actions">
              <a className="button button--primary" href="#resident" onClick={(event) => {
                event.preventDefault();
                scrollToHref('#resident');
              }}>
                {page.hero.primaryCta}
              </a>
              <a className="button button--quiet" href="#join" onClick={(event) => {
                event.preventDefault();
                scrollToHref('#join');
              }}>
                {page.hero.secondaryCta}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

        </section>

        <section className="vision-reason" aria-labelledby="vision-reason-title">
          <div className="section-shell vision-reason__inner">
            <h2 id="vision-reason-title" aria-label={page.hero.visionTitle}>
              {page.hero.visionTitleLines.map((line) => <span key={line}>{line}</span>)}
            </h2>
            <div className="vision-reason__body">
              {page.hero.visionParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <p className="vision-closing">{page.hero.closing}</p>
          </div>
        </section>

        <section id="resident" className="story-section story-section--resident">
          <div className="section-shell">
            <SectionIntro
              number={page.resident.page}
              eyebrow={page.resident.eyebrow}
              title={page.resident.title}
            />

            <div className="resident-definition">
              <span>{page.resident.definitionLabel}</span>
              <p>{page.resident.definition}</p>
              <div className="continuity-tags">
                {page.resident.continuity.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>

            <div className="resource-model">
              <h3>{page.resident.resourceTitle}</h3>
              <div className="resource-model__grid">
                {page.resident.resources.map((resource) => (
                  <article className={resource.primary ? 'resource-item resource-item--primary' : 'resource-item'} key={resource.name}>
                    <span>{resource.name}</span>
                    <strong>{resource.role}</strong>
                  </article>
                ))}
              </div>
            </div>

            <p className="subsection-label">{page.resident.directionsLabel}</p>
            <div className="direction-grid">
              {page.resident.directions.map((direction) => (
                <article className="direction-card" key={direction.number}>
                  <span className="direction-card__number">{direction.number}</span>
                  <h3>{direction.title}</h3>
                  <p>{direction.body}</p>
                  <p className="direction-card__boundary">{direction.boundary}</p>
                </article>
              ))}
            </div>
            <p className="section-note">{page.resident.note}</p>
          </div>
        </section>

        <section id="products" className="story-section story-section--products section-shell">
          <SectionIntro
            number={page.products.page}
            eyebrow={page.products.eyebrow}
            title={page.products.title}
            lead={page.products.lead}
          />

          <div className="product-pair">
            <article className="product-card">
              <span className="product-card__role">{page.products.items[0].role}</span>
              <h3>{page.products.items[0].name}</h3>
              <p>{page.products.items[0].body}</p>
              <ul>
                {page.products.items[0].points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>

            <div className="resident-handoff">
              <span className="resident-handoff__mark">E</span>
              <strong>{page.products.residentLabel}</strong>
              <p>{page.products.residentBody}</p>
            </div>

            <article className="product-card">
              <span className="product-card__role">{page.products.items[1].role}</span>
              <h3>{page.products.items[1].name}</h3>
              <p>{page.products.items[1].body}</p>
              <ul>
                {page.products.items[1].points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>
          </div>

          <div className="section-closure">
            <p>{page.products.closing}</p>
            <a href="#join" onClick={(event) => {
              event.preventDefault();
              scrollToHref('#join');
            }}>{page.products.cta}<span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section id="universe" className="story-section story-section--universe">
          <div className="section-shell">
            <SectionIntro
              number={page.universe.page}
              eyebrow={page.universe.eyebrow}
              title={page.universe.title}
              lead={page.universe.lead}
            />

            <p className="subsection-label">{page.universe.scenariosLabel}</p>
            <div className="scenario-grid">
              {page.universe.scenarios.map((scenario) => (
                <article className="scenario-card" key={scenario.number}>
                  <span>{scenario.number}</span>
                  <h3>{scenario.title}</h3>
                  <p>{scenario.body}</p>
                </article>
              ))}
            </div>

            <div className="universe-map">
              <div className="universe-map__intro">
                <p className="subsection-label">{page.universe.mapLabel}</p>
                <h3>{page.universe.mapTitle}</h3>
                <p>{page.universe.mapBody}</p>
              </div>

              <div className="universe-center">
                <span>DIGITAL RESIDENT</span>
                <strong>{language === 'cn' ? '数字居民' : 'The continuing subject'}</strong>
              </div>

              <div className="platform-groups">
                {page.universe.platformGroups.map((group) => (
                  <article key={group.label}>
                    <span>{group.label}</span>
                    <strong>{group.names}</strong>
                  </article>
                ))}
              </div>

              <div className="infrastructure-strip">
                <span>{page.universe.infrastructureLabel}</span>
                <p>{page.universe.infrastructure}</p>
              </div>

              <p className="universe-map__closing">{page.universe.closing}</p>
              <p className="universe-map__note">{page.universe.note}</p>
            </div>
          </div>
        </section>

        <section id="join" className="story-section story-section--join">
          <div className="section-shell">
            <SectionIntro
              number={page.join.page}
              eyebrow={page.join.eyebrow}
              title={page.join.title}
              lead={page.join.lead}
            />

            <div className="join-workspace">
              <div className="progress-column">
                <p className="subsection-label">{page.join.progressLabel}</p>
                <div className="progress-grid">
                  {page.join.progress.map((item, index) => (
                    <article className="progress-card" key={item.title}>
                      <div className="progress-card__meta">
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <span>{item.state}</span>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="participation-panel">
                <div className="participation-copy">
                  <p className="eyebrow">{page.join.participationEyebrow}</p>
                  <h2>{page.join.participationTitle}</h2>
                  <p>{page.join.participationBody}</p>
                  <div className="role-list" aria-label={language === 'cn' ? '参与角色' : 'Participation roles'}>
                    {page.join.roles.map((role) => <span key={role}>{role}</span>)}
                  </div>
                </div>

                <form className="join-form" onSubmit={submitParticipation}>
                  <label>
                    <span>{page.join.name}</span>
                    <input type="text" name="name" autoComplete="name" maxLength="80" required />
                  </label>
                  <label>
                    <span>{page.join.email}</span>
                    <input type="email" name="email" autoComplete="email" maxLength="160" required />
                  </label>
                  <label>
                    <span>{page.join.purpose}</span>
                    <select key={language} name="purpose" defaultValue={page.join.applicationOptions[0]} required>
                      {page.join.applicationOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                  <button className="submit-button" type="submit" disabled={submitStatus === 'submitting'}>
                    {submitLabel}
                  </button>
                  <p className={`form-status form-status--${submitStatus}`} aria-live="polite">
                    {submitStatus === 'success' ? page.join.success : submitStatus === 'error' ? page.join.error : ''}
                  </p>
                  <p className="form-note">{page.join.note}</p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <div>
            <a className="brand brand--footer" href="#vision" onClick={(event) => {
              event.preventDefault();
              scrollToHref('#vision');
            }}>
              <span className="brand-mark" aria-hidden="true" />
              <span>{page.brand}</span>
            </a>
            <p>{page.footerTagline}</p>
          </div>
          <nav className="footer-links" aria-label={language === 'cn' ? '页脚导航' : 'Footer navigation'}>
            {page.footerLinks.map((item) => (
              <a href={item.href} key={item.href} onClick={(event) => {
                event.preventDefault();
                scrollToHref(item.href);
              }}>{item.label}</a>
            ))}
          </nav>
          <p className="copyright">© 2026 Eterna</p>
        </div>
      </footer>
    </>
  );
}

export default App;
