import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigation from "./auth/AuthStackNavigation";
import TabsNavigation from "./tabs/TabsNavigation";
import { useSelector, useDispatch } from "react-redux";
import { useGetProfilePictureQuery } from "../services/profileApi";
import { setLocalId, setProfileImage, setUserEmail } from "../store/slice/userSlice";
import { useEffect } from "react";
import { initSessionTable, getSession } from "../DB";
const MainNavigator = () => {
    const email = useSelector(state => state.userReducer.email)
    const localId = useSelector(state => state.userReducer.localId)
    const dispatch = useDispatch()

    const {data : profilePicture ,isLoading ,error } = useGetProfilePictureQuery(localId)

    useEffect(()=>{
        const bootstrap = async ()=>{
            await initSessionTable();
            const session = await getSession(); // se obtiene la session de getSession
            if(session){ //aca simplemente evaluamos si session existe 
                dispatch(setUserEmail(session.email)) // esto se puede optimizar si en el userSlice se hubiera indicado un reducer justo con ambos valores se hubiera optimizado este codigo
                dispatch(setLocalId(session.localId))
            }
        }
        bootstrap();
    },[])
    
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