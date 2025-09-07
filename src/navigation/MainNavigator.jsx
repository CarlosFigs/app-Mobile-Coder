import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigation from "./auth/AuthStackNavigation";
import TabsNavigation from "./tabs/TabsNavigation";
import { useSelector } from "react-redux";

const MainNavigator = () => {
    const email = useSelector(state => state.userReducer.email)
    return (
        <NavigationContainer>
            {
                email?<TabsNavigation/>:<AuthStackNavigation/>
            }
        </NavigationContainer>
    )
}

export default MainNavigator