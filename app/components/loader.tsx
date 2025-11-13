
import { MotiView } from "moti";
import { Image, View } from "react-native";

export default function Loader({ message = "Logging you in..." }) {
  return (
    <View className="flex-1  items-center justify-center">
      {/* Animated Logo Circle */}
      <MotiView
        from={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{
          loop: true,
          type: "timing",
          duration: 1000,
        }}
        className="w-30 h-30 bg-white rounded-full items-center justify-center shadow-lg"
      >
        <Image
                  source={require("@/assets/images/storra.png")}
          style={{ width: 90, height: 90, resizeMode: "contain" }}
        />
      </MotiView>

      {/* Text Section */}
      {/* <Text className="text-white text-lg font-semibold mt-10">
        {message}
      </Text> */}
      {/* <Text className="text-white/80 mt-2">Please wait...</Text> */}
    </View>
  );
}
