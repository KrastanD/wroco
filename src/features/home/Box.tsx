import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { css, html } from "react-strict-dom";

interface BoxProps {
  color: string;
  onClick: (color: string) => void;
}

function Box({ color, onClick }: BoxProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleColorClick = () => {
    console.log("Box clicked:", color);
    scale.value = withSequence(
      withSpring(0.975, { duration: 50 }),
      withSpring(1, { duration: 50 })
    );
    onClick(color);
  };

  return (
    <Animated.View
      key={color}
      style={[
        {
          display: "flex",
          flex: 1,
          minWidth: "50%",
          height: "50%",
          backgroundColor: color,
        },
        animatedStyle,
      ]}
    >
      <html.div style={styles.box} onClick={handleColorClick} />
    </Animated.View>
  );
}

const styles = css.create({
  box: {
    display: "flex",
    flex: 1,
    flexBasis: "50%",
    height: "50%",
  },
});

export default Box;
