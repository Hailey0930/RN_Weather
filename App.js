import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

// NOTE 해당 기기의 넓이값 가져오기
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "145ac9e4880d44e525c972645ffa6a9d";

const icons = {
  Clouds: "cloudy-outline",
  Clear: "sunny-outline",
  Snow: "snow-outline",
  Rain: "rainy-outline",
  Drizzle: "md-rainy-outline",
  Thunderstorm: "thunderstorm-outline",
  Atmosphere: "cloudy-outline",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [ok, setOk] = useState(true);
  const [days, setDays] = useState([]);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude={alerts}&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(
      json.list.filter((weather) => {
        if (weather.dt_txt.includes("00:00:00")) {
          return weather;
        }
      })
    );
  };

  useEffect(() => {
    getWeather();
  }, []);

  // NOTE RN에서는 flexDirection 기본값이 column
  if (!ok) {
    return (
      <View style={styles.container}>
        <View style={styles.icon}>
          <FontAwesome5 name="sad-cry" size={100} color="white" />
        </View>
      </View>
    );
  } else
    return (
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
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
          {days.length === 0 ? (
            <View style={styles.day}>
              <ActivityIndicator color="white" size="large" />
            </View>
          ) : (
            days.map((day, index) => (
              <View key={index} style={styles.day}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Text style={styles.temp}>
                    {parseFloat(day.main.temp).toFixed(1)}
                  </Text>
                  <Ionicons
                    name={icons[day.weather[0].main]}
                    size={60}
                    color="white"
                  />
                </View>
                <Text style={styles.description}>{day.weather[0].main}</Text>
                <Text style={styles.tinyText}>
                  {day.weather[0].description}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 48,
    fontWeight: "700",
    color: "white",
  },
  // NOTE 가로 스크롤 시 flex 사이즈를 주면 넘어가는 부분은 보이지 않으므로 flex를 제거
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    padding: 20,
  },
  temp: {
    fontSize: 120,
    marginTop: 30,
    color: "white",
  },
  description: {
    fontSize: 40,
    marginTop: -30,
    color: "white",
  },
  tinyText: {
    fontSize: 20,
    color: "white",
  },
});
