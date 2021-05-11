import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Remote from "../screens/MainRemoteScreen"
const Stack = createStackNavigator()

function MainNav(){
    return(
        <Stack.Navigator initialRouteName='remote' headerMode='none' >
            <Stack.Screen name="remote" component={Remote} />
        </Stack.Navigator>
    )
}

export default MainNav