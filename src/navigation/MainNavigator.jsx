import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigation from "./auth/AuthStackNavigation";
import TabsNavigation from "./tabs/TabsNavigation";
import { useSelector, useDispatch } from "react-redux";
import { useGetProfilePictureQuery } from "../services/profileApi";
import { setProfileImage } from "../store/slice/userSlice";
import { useEffect } from "react";
const MainNavigator = () => {
    const email = useSelector(state => state.userReducer.email)
    const localId = useSelector(state => state.userReducer.localId)
    const dispatch = useDispatch()

    const {data : profilePicture ,isLoading ,error } = useGetProfilePictureQuery(localId)
    
    useEffect(()=>{
        if(profilePicture){
            dispatch(setProfileImage(profilePicture.image))
        }
    },[profilePicture])
    return (
        <NavigationContainer>
            {
                email?<TabsNavigation/>:<AuthStackNavigation/>
            }
        </NavigationContainer>
    )
}

export default MainNavigator