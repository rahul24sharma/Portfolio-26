const LightweightCharacter = () => {
  return (
    <div className="character-container">
      <div className="character-model character-model-lite">
        <div className="character-rim character-rim-lite"></div>
        <div className="character-fallback">
          <div className="character-fallback-core"></div>
          <div className="character-fallback-orbit character-fallback-orbit-a"></div>
          <div className="character-fallback-orbit character-fallback-orbit-b"></div>
          <div className="character-fallback-grid"></div>
        </div>
      </div>
    </div>
  );
};

export default LightweightCharacter;
