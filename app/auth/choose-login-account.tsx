import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState} from "react";
import { Image, Text, TouchableOpacity, View} from "react-native";

export default function ChooseLoginAccount() {

    const [ selectedAccount, setSelectedAccount ] = useState<string | null>( "student" );
    const router = useRouter();

    const handleNext = () => {
        router.push(`/auth/${selectedAccount}/login` as any);
    }

    const accounts = [
        {
            id: "student",
            title: "Studdent"
        },
        {
            id: "parent",
            title: "Parent"
        },
        {
            id: "teacher",
            title: "Teacher"
        },
    ]
    return (
        <View>
            {/* Logo */}
            <View className="items-center mt-14 mb-5">
                <Image
                    source={require("@/assets/images/storra.png")}
                    className="w-24 h-24"
                    resizeMode="contain"
                />
                {/* <Text className="text-xl font-semibold text-gray-800">Storra</Text> */}
            </View>

            <Text className= "text-2xl px-6 from-neutral-900 font-bold text-center ">Which account type account type would you like to login with ?</Text>


            <View className="mt-10 px-6">
                {accounts.map((acc) => (
                    <TouchableOpacity
                        key={acc.id}
                        onPress={() => { setSelectedAccount(acc.id); handleNext(); }}
                        className="w-full mt-10 space-y-6"
                    >
                        <Text className="bg-blue-600 text-white text-xl py-4 rounded-full text-center w-full">{acc.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}