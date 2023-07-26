import React from 'react';
import { 
    Text,
    View, 
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { AntDesign, Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const screenWidth = Dimensions.get('screen').width;

const HomeScreen = props => {
    const userId = useSelector((state) => state.auth.userId);
    console.log(userId)
    useEffect(() => {
        console.log(userId)
    }, [])
    return (
        <View style={styles.container}>
            {/* <View style={styles.headerView}>
                <Text style={styles.reserved1Text}>Hello Organizer</Text>
                <Text style={styles.organizerText}>:</Text>
            </View> */}

            {/* Create Event View */}
            <TouchableOpacity
                style={styles.createEventView}
                onPress={() => props.navigation.navigate("CreateEvent")}
            >
                <View style={styles.createEventTextView}> 
                    <Text style={styles.createEventText}>Create Event</Text>
                    <AntDesign name="plus" size={23} style={styles.plus} />
                </View>
            </TouchableOpacity>

            {/* Other Views */}
            <View style={styles.otherViews}>
                <TouchableOpacity
                    style={styles.otherView}
                    onPress={() => props.navigation.navigate("Notifications")}
                >
                    <View style={styles.iconContainer}>
                        <Ionicons name="notifications" size={40} />
                    </View>
                    <Text style={styles.otherViewText}>Notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.otherView}
                    onPress={() => props.navigation.navigate("CurrentEvent")}
                >
                    <View style={styles.iconContainer}>
                        <Entypo name="back-in-time" size={40} />
                    </View>
                    <Text style={styles.otherViewText}>Current Events</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.otherView}
                    onPress={() => props.navigation.navigate("Wallet")}
                >
                    <View style={styles.iconContainer}>
                        <Entypo name="wallet" size={40} />
                    </View>
                    <Text style={styles.otherViewText}>Wallet</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.otherView}
                    onPress={() => props.navigation.navigate("Insights")}
                >
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="insights" size={40} />
                    </View>
                    <Text style={styles.otherViewText}>Insights</Text>
                </TouchableOpacity>

                {/* Settings View */}
                <TouchableOpacity
                    style={styles.otherView}
                    onPress={() => props.navigation.navigate("Settings")}
                >
                    <View style={styles.iconContainer}>
                        <Ionicons name="settings" size={40} />
                    </View>
                    <Text style={styles.otherViewText}>Settings</Text>
                </TouchableOpacity>
            </View>

          
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6'
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 110,
    },
    reserved1Text: {
        fontFamily: 'open-sans-bold',
        fontSize: 25,
    },
    organizerText: {
        fontFamily: 'open-sans',
        fontSize: 25,
        color: '#C31F48',
    },
    createEventView: {
        height: 120,
        backgroundColor: '#C31F48',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    createEventTextView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    createEventText: {
        fontFamily: 'open-sans',
        fontSize: 20,
        color: 'white',
        marginLeft: 10,
    },
    plus: {},
    otherViews: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    otherView: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        height: 120,
    },
    iconContainer: {
        backgroundColor: '#f6f6f6',
        borderRadius: 40,
        padding: 20,
        marginBottom: 10,
    },
    otherViewText: {
        fontFamily: 'open-sans',
        fontSize: 17,
        textAlign: 'center',
    },
    forEventManagersView: {
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
        height: 120,
    },
    forEventManagersText: {
        fontFamily: 'open-sans',
        fontSize: 17,
        textAlign: 'center',
        marginTop: 10,
    },
});

export default HomeScreen;
