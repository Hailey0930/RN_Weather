import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";

// NOTE 해당 기기의 넓이값 가져오기
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  // NOTE RN에서는 flexDirection 기본값이 column
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>서울</Text>
      </View>
      <ScrollView
        // 가로 스크롤
        horizontal
        // 스크롤 시 하나씩 넘어가게 설정
        pagingEnabled
        // 가로 스크롤바 안보이게 설정
        showsHorizontalScrollIndicator={false}
        // 스크롤바 스타일링
        // indicatorStyle="white"
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 48,
    fontWeight: 500,
  },
  // NOTE 가로 스크롤 시 flex 사이즈를 주면 넘어가는 부분은 보이지 않으므로 flex를 제거
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    fontSize: 178,
    marginTop: 50,
  },
  description: {
    fontSize: 60,
    marginTop: -30,
  },
});
