import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { sonhos } from './pages/um'
import { escolherPeixe } from './pages/dois'
import { localizarLugar } from './pages/tres'
import { alimentoSaudavel } from './pages/quatro'
import { Ionicons } from '@expo/vector-icons/'

const Tab = createBottomTabNavigator();

export function Routes() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="home"
                component={sonhos}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={25} color={"#000"} name="home" />)
                        }
                        return (<Ionicons size={20} color={"#000"} name="home-outline" />)
                    }
                }}
            />
            <Tab.Screen
                name="dois"
                component={escolherPeixe}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={25} color={"#000"} name="fish-outline" />)
                        }
                        return (<Ionicons size={20} color={"#000"} name="fish-outline" />)
                    }
                }}
            />
            <Tab.Screen
                name="tres"
                component={localizarLugar}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={25} color={"#000"} name="location-outline" />)
                        }
                        return (<Ionicons size={20} color={"#000"} name="location-outline" />)
                    }
                }}
                />
                 <Tab.Screen
                name="quatro"
                component={alimentoSaudavel}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={25} color={"#000"} name="book-outline" />)
                        }
                        return (<Ionicons size={20} color={"#000"} name="book-outline" />)
                    }
                }}
                />
        </Tab.Navigator>
    )
}