import { css, html } from "react-strict-dom";
// Required for CSS to work on Expo Web.
import "./strict.css";
// Required for Fast Refresh to work on Expo Web
import HomeScreen from "@/src/features/home/HomeScreen";
import "@expo/metro-runtime";

export default function Index() {
  return (
    <html.div style={style.container} data-layoutconformance="strict">
      <HomeScreen />
    </html.div>
  );
}

const style = css.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
