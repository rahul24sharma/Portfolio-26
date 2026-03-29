import LightweightCharacter from "./LightweightCharacter";
import Scene from "./Scene";

const CharacterModel = ({
  lightweightMode = false,
}: {
  lightweightMode?: boolean;
}) => {
  return lightweightMode ? <LightweightCharacter /> : <Scene />;
};

export default CharacterModel;
