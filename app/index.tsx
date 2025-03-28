import { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { UserContext } from "@/context/UserContext";
import GlobalApi from "@/services/GlobalApi";

export default function Index() {
  const { user } = useUser();
  const router = useRouter();
  const { userData, setUserData } = useContext(UserContext);
  const [createUserResponse, setCreateUserResponse] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      console.log("User from Clerk:", user.imageUrl);

      try {
        const result = await GlobalApi.GetUserByEmail(
          user.primaryEmailAddress.emailAddress
        );
        console.log("Fetched user data:", result);

        if (!result) {
          const newUser = {
            email: user.primaryEmailAddress.emailAddress,
            name: user.fullName || "Unknown User",
            picture: user.imageUrl,
          };

          const createdUser = await GlobalApi.CreateUser(newUser);
          console.log("User created successfully:", createdUser);
          setCreateUserResponse(createdUser);
          setUserData(createdUser);
        } else {
          setUserData(result);
        }

        router.replace("/Landing");
      } catch (error) {
        console.error("Error fetching or creating user:", error);
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>User Data: {JSON.stringify(userData, null, 2)}</Text>
      {createUserResponse && (
        <Text>
          New User Created: {JSON.stringify(createUserResponse, null, 2)}
        </Text>
      )}
    </View>
  );
}
