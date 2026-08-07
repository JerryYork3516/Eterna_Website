import { useCallback, useEffect, useRef, useState } from 'react';

const NavigationTabs = ({ items, activeNav, ariaLabel, onSelect }) => {
  const navRef = useRef(null);
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const updateIndicator = useCallback(() => {
    const nav = navRef.current;
    const tab = tabRefs.current[activeNav];
    if (!nav || !tab) return;

    setIndicator({
      left: tab.offsetLeft,
      width: tab.offsetWidth,
      opacity: 1,
    });
  }, [activeNav]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator, items]);

  useEffect(() => {
    const nav = navRef.current;
    const tab = tabRefs.current[activeNav];
    if (!nav || !tab) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    nav.scrollTo({
      left: tab.offsetLeft - (nav.clientWidth - tab.offsetWidth) / 2,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [activeNav, items]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;

    const ro = new ResizeObserver(updateIndicator);
    ro.observe(nav);
    items.forEach((item) => {
      const tab = tabRefs.current[item.href];
      if (tab) ro.observe(tab);
    });

    window.addEventListener('resize', updateIndicator);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateIndicator);
    };
  }, [updateIndicator, items]);

  return (
    <nav className="navigation-tabs nav" aria-label={ariaLabel} ref={navRef}>
      <span
        className="nav-indicator"
        aria-hidden="true"
        style={{
          transform: `translateX(${indicator.left}px)`,
          width: indicator.width,
          opacity: indicator.opacity,
        }}
      />
      {items.map((item) => (
        <a
          aria-current={activeNav === item.href ? 'location' : undefined}
          className={`navigation-tab nav-item i18n-safe ${activeNav === item.href ? 'active' : ''}`}
          href={item.href}
          key={item.href}
          onClick={(event) => {
            event.preventDefault();
            onSelect(item.href);
          }}
          ref={(element) => {
            tabRefs.current[item.href] = element;
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default NavigationTabs;
