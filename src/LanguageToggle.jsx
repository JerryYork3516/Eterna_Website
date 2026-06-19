const LanguageToggle = ({ language, onChange }) => (
  <button
    className={`language-toggle ${language === 'en' ? 'is-en' : 'is-zh'}`}
    type="button"
    aria-label={language === 'zh' ? 'Switch to English' : '切换到中文'}
    onClick={() => onChange(language === 'zh' ? 'en' : 'zh')}
  >
    <span className="language-icon" aria-hidden="true" />
  </button>
);

export default LanguageToggle;
