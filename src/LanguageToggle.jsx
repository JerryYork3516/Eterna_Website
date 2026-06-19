const LanguageToggle = ({ language, ariaLabel, onChange, hidden = false }) => (
  <button
    className={`language-toggle ${language === 'en' ? 'is-en' : 'is-zh'} ${hidden ? 'is-hidden' : ''}`}
    type="button"
    aria-label={ariaLabel}
    aria-hidden={hidden}
    tabIndex={hidden ? -1 : 0}
    onClick={() => onChange(language === 'cn' ? 'en' : 'cn')}
  >
    <span className="language-icon" aria-hidden="true" />
  </button>
);

export default LanguageToggle;
