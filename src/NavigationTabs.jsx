import { useEffect, useRef } from 'react';

const NavigationTabs = ({ items, activeNav, language, onSelect }) => {
  const tabRefs = useRef({});

  useEffect(() => {
    tabRefs.current[activeNav]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeNav]);

  return (
    <nav className="navigation-tabs" aria-label="Primary navigation">
      {items.map((item) => (
        <a
          aria-current={activeNav === item.href ? 'page' : undefined}
          className={`navigation-tab ${activeNav === item.href ? 'active' : ''}`}
          href={item.href}
          key={item.href}
          onClick={() => onSelect(item.href)}
          ref={(element) => {
            tabRefs.current[item.href] = element;
          }}
        >
          {item.label[language]}
        </a>
      ))}
    </nav>
  );
};

export default NavigationTabs;
