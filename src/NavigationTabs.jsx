const NavigationTabs = ({ items, activeNav, language, onSelect }) => (
  <nav className="navigation-tabs" aria-label="Primary navigation">
    {items.map((item) => (
      <a
        aria-current={activeNav === item.href ? 'page' : undefined}
        className={`navigation-tab ${activeNav === item.href ? 'active' : ''}`}
        href={item.href}
        key={item.href}
        onClick={() => onSelect(item.href)}
      >
        {item.label[language]}
      </a>
    ))}
  </nav>
);

export default NavigationTabs;
