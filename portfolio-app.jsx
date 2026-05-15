/* Portfolio App – Main assembly + Tweaks */

const ACCENT_PRESETS = {
  '#5eead4': { rgb: '94,234,212', label: 'Teal' },
  '#4ade80': { rgb: '74,222,128', label: 'Green' },
  '#a78bfa': { rgb: '167,139,250', label: 'Purple' },
  '#f59e0b': { rgb: '245,158,11', label: 'Amber' },
};

function applyAccent(hex) {
  const preset = ACCENT_PRESETS[hex];
  if (!preset) return;
  const root = document.documentElement;
  root.style.setProperty('--accent', hex);
  root.style.setProperty('--accent-rgb', preset.rgb);
  root.style.setProperty('--accent-dim', `rgba(${preset.rgb}, 0.07)`);
  root.style.setProperty('--accent-glow', `rgba(${preset.rgb}, 0.25)`);
}

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    applyAccent(t.accentColor);
  }, [t.accentColor]);

  return (
    <React.Fragment>
      <Nav />
      <Hero accentColor={t.accentColor} particleDensity={t.particleDensity} />
      <About />
      <Works />
      <Skills />
      <Timeline />
      <Footer />
      <ScrollTopBtn />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Accent Color">
          <TweakColor value={t.accentColor}
                      options={Object.keys(ACCENT_PRESETS)}
                      onChange={(v) => setTweak('accentColor', v)} />
        </TweakSection>
        <TweakSection label="Particles">
          <TweakRadio value={t.particleDensity}
                      options={['low', 'medium', 'high']}
                      onChange={(v) => setTweak('particleDensity', v)} />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
