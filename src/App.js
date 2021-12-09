import React from 'react'
import { View, Platform, Text, Alert, Image, StyleSheet, PermissionsAndroid, Button } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Hub, Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native'
import AmplifyTheme from 'aws-amplify-react-native/src/AmplifyTheme'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import Schedule from './Schedule'
import Profile from './Profile'
import link from "./link";
import Weather from './Weather'
import Map from './Map.js'
import { colors, logoLight } from './theme'

const Tab = createBottomTabNavigator();

export async function request_location_runtime_permission() {
 
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'ReactNativeCode Location Permission',
        'message': 'ReactNativeCode App needs access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
 
      // Alert.alert("Location Permission Granted.");
    }
    else {
 
      Alert.alert("Location Permission Not Granted");
 
    }
  } catch (err) {
    console.warn(err)
  }
}

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.highlight,
        inactiveTintColor: colors.inactive,
        style: { backgroundColor: colors.primary }
      }}
      screenOptions={screenProps => {
        const { route: { name } } = screenProps
        return {
          tabBarIcon: (props) => {
            console.log('props: ', props)
            const { color } = props
            if (name === 'Schedule') {
              return <Icon color={color} size={20} name='calendar' />
            }
            if (name === 'Google') {
              return <Icon color={color} size={20} name='google' />
            }

            if (name === 'Weather') {
              return <Icon color={color} size={20} name='anchor' />
            }

            if (name === 'Map') {
              return <Icon color={color} size={20} name='map' />
            }

            return <Icon color={color} size={20} name='user' />
          }
        }
      }}
    >
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Google" component={link} />
      <Tab.Screen name="Weather" component={Weather} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  ); 
}

class TabNavWithProps extends React.Component {
  static router = TabNavigator.router
  render() {
    return(
      <TabNavigator screenProps={{...this.props}} {...this.props}  />
    )
  }
}

const App = (props) => (
  <NavigationContainer >
    <TabNavWithProps {...props} />
  </NavigationContainer>)

const theme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: colors.primaryLight
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: colors.primaryLight
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: colors.primaryOpaque(0.6)
  }
}

class AppWithAuth extends React.Component {
  state = {
    signedIn: true
  }

// requestCameraPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: "Cool Photo App Camera Permission",
//           message:
//             "Cool Photo App needs access to your camera " +
//             "so you can take awesome pictures.",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK"
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log("You can use the camera");
//       } else {
//         console.log("Location permission denied");
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };
  

  async componentDidMount() {

    request_location_runtime_permission();

    try {
      await Auth.currentAuthenticatedUser()
      this.setState({ signedIn: true })
    } catch (err) { console.log('user not signed in') }
    Hub.listen('auth', (data) => {
      const { payload: { event } } = data
      if (event === 'signIn') {
        this.setState({ signedIn: true })
      }
      if (event === 'signOut' && this.state.signedIn) {
        this.setState({ signedIn: false })
      }
    })
  }
  render() {
    const AppComponent = withAuthenticator(App, 
      {
        signUpConfig: {
          hiddenDefaults: ['phone_number']
        }
      },
      null, null, theme
      )
    return (
      <View style={styles.appContainer}>
        
        <AppComponent {...this.props} />
        {/* <Text style={styles.text}>ASSNOLE</Text> */}
      </View>
    )
  }
}

// const Logo = () => (
//   <View style={styles.logoContainer}>
//     <Image
//       style={styles.logo}
//       resizeMode='contain'
//       source={logoLight}
//     />
//   </View>
// )

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    
  },
  logoContainer: {
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
textAlign: 'center'
  },
  logo: {
    height: 50,
    width: 200
  }
})

export default AppWithAuth