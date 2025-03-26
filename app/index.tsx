import GlobalApi from "@/services/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const { user } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const [createUserResponse, setCreateUserResponse] = useState<any>(null); // State for user creation response

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        console.log("******");
        console.log("User from Clerk:", user);
        console.log("******");

        try {
          // Fetch user data from Supabase
          const result = await GlobalApi.GetUserByEmail(
            user.primaryEmailAddress.emailAddress
          );

          console.log("Fetched user data:", result);

          // If user does not exist, create them
          if (!result) {
            const data = {
              email: user.primaryEmailAddress.emailAddress,
              name: user.fullName || "Unknown User",
              picture: user.profileImageUrl,
            };

            const createResp = await GlobalApi.CreateUser(data);
            console.log("User created successfully:", createResp);

            setCreateUserResponse(createResp);
          }

          setUserData(result);
        } catch (error) {
          console.error("Error fetching or creating user:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>User Data: {JSON.stringify(userData, null, 2)}</Text>

      {/* Display the response of creating a new user */}
      {createUserResponse && (
        <Text>
          New User Created: {JSON.stringify(createUserResponse, null, 2)}
        </Text>
      )}

      {/* Redirect to landing page */}
      <Redirect href={"/Landing"} />
    </View>
  );
}
