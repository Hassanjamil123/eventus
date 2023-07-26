 import React, {useEffect, useState} from 'react';
 import { Text,
    View, 
    StyleSheet, 
    Dimensions, 
    Image,
    ActivityIndicator, 
    } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, MaterialIcons, Feather, Foundation } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import SavedEventsScreen from './SavedEventsScreen';
import * as authActions from '../../store/actions/auth'
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
import { useDispatch, useSelector } from 'react-redux';
import { logout, clearSavedEventState } from '../../store/actions/auth';
import Colors from '../../constants/Colors';

 const SettingScreen = props => {

  const name = useSelector((state) => state.auth.name);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setIsLoading(true); // Set isLoading to true to show the ActivityIndicator

    // Call the logout action and pass the navigation prop from Settings screen
    await dispatch(clearSavedEventState());
    await dispatch(logout(props.navigation));
   
    setIsLoading(false); // Set isLoading to false after the logout process is completed
    props.navigation.navigate('Auth'); // Navigate to AuthScreen after successful logout
  };

  const editProfileHandler = id => {
    props.navigation.navigate('EditProfile', { userId: id });
  };

  const InterestedEvents = () => {
    props.navigation.navigate('SavedEvents')
  }

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const d = new Date();
  const  month = months[d.getMonth()];
  if(isLoading) {
    return (
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
        <ActivityIndicator size="small" color={Colors.primary} />
      </View>
    )
  } else {
    
  }
  return (
     <View style={styles.container}>
         <StatusBar style="auto" />

         {/* Header Starts */}
        <View style={styles.firstView}>
            <View>
                <View style={styles.dateView}>
                    <Text style={styles.dateViewText}>
                         {month.toUpperCase()} {d.getDate()}, {formatAMPM(new Date)} 
                        
                    </Text>
                </View>
            </View>    
        </View>
        {/* Header Ends */}
        {/* Mid View Starts */}
        <View style={styles.midView}>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => {
            editProfileHandler()
          }}>
          <View style={styles.seeProfileView}>
                <View style={{ width: '50%'}}>
                <Text style={styles.username}>
                {name}
                </Text>
                <Text style={styles.secondaryText}>
                  Tap to edit your Username
                </Text>
                </View>
              {/* <View style={styles.avatarView}>      
                  <Image 
                  source={require('../../assets/avatar.png')}
                  style={styles.avatar}
                  />
              </View> */}
          </View>
          </TouchableOpacity>
         
          <TouchableOpacity style={styles.components1View} onPress={InterestedEvents}>
          <View style={styles.settingsView}>
                <Feather name="bookmark" size={23} style={{marginLeft: 12}}/>
                <Text style={{
                  margin: 10,
                  fontFamily: 'open-sans',
                  fontSize: 15
                }}>
                  Saved Events
                </Text>
          </View>
          </TouchableOpacity>
     
          <TouchableOpacity style={styles.components2View}>
          <View style={styles.settingsView}>
                <Feather name="gift" size={23} style={{marginLeft: 12}}/>
                <Text style={{
                  margin: 10,
                  fontFamily: 'open-sans',
                  fontSize: 15
                }}>
                  Tickets History
                </Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.components3View}>
          <View style={styles.settingsView}>
                <AntDesign name="questioncircleo" size={23} style={{marginLeft: 12}}/>
                <Text style={{
                  margin: 10,
                  fontFamily: 'open-sans',
                  fontSize: 15
                }}>
                  Terms and Conditions
                </Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <MaterialIcons name="logout" size={23} style={{marginLeft: 12}}/>
                {isLoading ? (
              <ActivityIndicator size="small" color="blue" />
            ) : (
              <Text style={{
                margin: 10,
                fontFamily: 'open-sans',
                fontSize: 15
              }}>
                Sign out
              </Text>
            )}
            </View>
          </TouchableOpacity>
        </View>
        {/* Mid View Ends */}
        
        {/* Footer starts  */}
            <View style={styles.footerView}>
              <View style={styles.reservedView}>
                  <Text style={styles.reserved1Text}><Text style={{color: '#C31F48'}}>Event</Text>Us</Text>
                  <Text style={styles.reserved2Text}>All Rights Reserved.</Text>
                  <Text style={styles.reserved3Text}>v1.0</Text>
              </View>
                
            </View>
        {/* Footer ends */}



       {/* <Button
         onPress={() => {
           navigation.navigate('EventDetail');
         }}
         title="Go to Event Details Screen"
       /> */}
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
        flex: 1,
        backgroundColor: '#fff',
   },
   firstView: {
        width: screenWidth,
        height: 90,
   }, 
   dateView: {
       margin: 15
   },
   dateViewText: {
       fontFamily: 'open-sans',
       fontSize: 17,
       opacity: 0.5
   }, 
   secondText: {
       fontFamily: 'open-sans-bold',
       fontSize: 30,
   },
   midView: {
     marginTop: -40,
      width: screenWidth,
      height: screenHeight - 400
   },
   touchableOpacity: {
     backgroundColor: 'black',
      width: '94%',
     margin: 10,
     borderRadius: 10
   },
   seeProfileView: {
     flexDirection: 'row',
     backgroundColor: '#EEEEEE',
     borderRadius: 10
   },
   username: {
     margin: 15,
     fontFamily: 'open-sans-bold',
     fontSize: 19,
   }, 
   avatarView: {
     width: '50%',
     alignItems: 'flex-end'
   },
   avatar: {
       width: 55,
       height: 55,
       margin: 15,
       borderRadius: 30
   },
   secondaryText: {
     margin: 15,
     marginTop: -7,
     fontSize: 13,
     textDecorationLine: 'underline',
     fontWeight: '500'
   },
   componentsView: {
    width: '94%',
    margin: 10,
    height: 40,
    elevation: 1,
    shadowOpacity: 0.2,
    shadowColor: 'grey'
   },
  
   settingsView: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    height: 50,
    width: '100%',
    borderRadius: 4
   },
   components1View: {
    width: '94%',
    margin: 10,
    marginTop: 2,
    height: 50,
   },
   components2View: {
    width: '94%',
    margin: 10,
    marginTop: -8,
    height: 50,
   },
   components3View: {
    width: '94%',
    margin: 10,
    marginTop: 22,
    height: 50,
   },
   components4View: {
    width: '94%',
    margin: 10,
    marginTop: 22,
    height: 50,
   },
   footerView: {
    width: screenWidth,
    height: screenHeight - 400
   },
   reservedView: {
     margin: 10,
     width: '94%',
     height: 160,
     justifyContent: 'center',
     alignItems: 'center'
   },
   reserved1Text: {
     fontFamily: 'open-sans',
     fontSize: 18
   },
   reserved2Text: {
    fontSize: 14,
    fontWeight: '500'
  },
  reserved3Text: {
    fontSize: 15,
    fontWeight: '500'
  }

 });

 const mapStateToProps = (state) => ({
  name: state.auth.name,
  email: state.auth.email,
});

export default connect(mapStateToProps)(SettingScreen);




