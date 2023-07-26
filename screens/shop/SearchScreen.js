import { View, Text, StyleSheet, Image, TextInput, FlatList, Button, ActivityIndicator, Dimensions } from 'react-native'
import React, {useCallback, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import * as productActions from '../../store/actions/products'
import Colors from '../../constants/Colors'
import ProductItem from '../../components/shop/ProductItem'


const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

 const  SearchScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedProducts, setSearchedProducts] = useState([]);

    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setIsRefreshing(true);
        await dispatch(productActions.fetchProducts());
        setIsRefreshing(false);
        console.log("Loaded content")
    }, [dispatch, setIsLoading])



    useEffect(() => {
        setIsLoading(true)
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadProducts]);


    const searchProducts = () => {
        const filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchedProducts(filteredProducts);
      };
 

    if(isLoading) {
        return <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="small" color={Colors.primary} />
        </View>
    }

    if(!isLoading && products.length === 0) {
        return <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>No products found. Maybe start adding some</Text>
        </View>
    }


  return (
    <View style={styles.container}>
        {/* Header Starts */}
        <View style={styles.firstView}>
        <View>
            <View style={styles.dateView}>
                <Text style={styles.dateViewText}>
                    NOVEMBER 29, 3:34 PM
                </Text>
            </View>
        </View>
        </View>
        {/* Header Ends */}
        <View style={styles.searchView}>
                <Image
                source={require('../../assets/search_icon.png')}
                style={styles.searchIcon}
                />
                <TextInput 
                placeholder="Search"
                placeholderTextColor="grey"
                style={styles.search}
                onChangeText={(text) => setSearchTerm(text)}
                onSubmitEditing={searchProducts}
                />
                {/* <Ionicons name="ios-filter" size={23} color="grey" style={styles.filterIcon}/> */}
        </View>

        <View style={styles.featuredView}>
                <View style={styles.featuredTextView}>
                    <Text style={styles.featuredText}>
                        SUGGESTED EVENTS
                    </Text>
                </View>
                <View style={styles.cardView}>
                <FlatList
                    onRefresh={loadProducts}
                    refreshing={isLoading} 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={searchedProducts.length > 0 ? searchedProducts : products}
                    keyExtractor={item => item.id}
                    renderItem={itemData => 
                    <ProductItem 
                        image={itemData.item.imageUrl} 
                        title={itemData.item.title} 
                        price={itemData.item.price}
                    >
                    <Button color={Colors.primary} title="View details" onPress={() => {
                            props.navigation.navigate('ProductDetail', {
                                productId: itemData.item.id,
                                productTitle: itemData.item.title
                            })
                        }} />
                  
               
                    </ProductItem>
                    }
                />
                </View>
            </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
},
firstView: {
width: screenWidth,
height: 90,
flexDirection: 'row',


},
dateView: {
margin: 15
},
dateViewText: {
fontFamily: 'open-sans-bold',
fontSize: 17,
opacity: 0.5
},
searchView: {
flexDirection: 'row',
backgroundColor: '#EEEEEE',
marginTop: -50,
width: '91%',
height: 50, 
margin: 15,
borderRadius: 12,
},
searchIcon: {
 width: 28,
 height: 28,
 margin: 10
},
search: {
left: 5,
fontSize: 15,
width: '72%',
}, 
filterIcon: {
margin: 10,
}, 
featuredView: {
    width: screenWidth,
    height: screenHeight - 480
},
featuredTextView: {
    margin: 15
},
featuredText: {
    fontFamily: 'open-sans',
    fontSize: 15,
    letterSpacing: 0.5,
    textShadowColor: 'black'
},
fullCardView: {
    marginLeft: 10,
    marginRight: 5,
    borderRadius: 5,
    width: '50%'
},
cardView: {
    width: '100%',
    height: 340,

},
eventCard: {
    backgroundColor: '#f6f6f6',
    width: '80%',
    marginLeft: 5,
    marginRight: 5
},
})

export default SearchScreen;