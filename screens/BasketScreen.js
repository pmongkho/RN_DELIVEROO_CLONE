import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { selectRestaurant } from '../features/restaurantSlice'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XCircleIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../sanity'
import Currency from 'react-currency-formatter'

const BasketScreen = () => {
	const navigation = useNavigation()
	const restaurant = useSelector(selectRestaurant)
  const items = useSelector(selectBasketItems)
  const basketTotal = useSelector(selectBasketTotal)
	const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
	const dispatch = useDispatch()

	useEffect(() => {
		const groupedItems = items.reduce((results, item) => {
			;(results[item.id] = results[item.id] || []).push(item)
			return results
		}, {})
		setGroupedItemsInBasket(groupedItems)
	}, [items])
	return (
		<SafeAreaView className='flex-1 bg-white'>
			<View className='flex-1 bg-gray-100'>
				<View className='p-5 border-b border-[#00ccbb] bg-white shadow-xs'>
					<View>
						<Text className='text-lg font-bold text-center'>Basket</Text>
						<Text className='text-center text-gray-400'>
							{restaurant.title}
						</Text>
					</View>
					<TouchableOpacity
						onPress={navigation.goBack}
						className='rounded-full bg-gray-100 absolute top-3 right-5'
					>
						<XCircleIcon color='#00ccbb' height={50} width={50} />
					</TouchableOpacity>
				</View>
				<View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
					<Image
						source={{
							uri: 'https://links.papareact.com/wru',
						}}
						className='h-7 w-7 bg-gray-300 p-4 rounded-full'
					/>
					<Text className='flex-1'>
						Deliver in 50-75 min
						<TouchableOpacity>
							<Text className='text-[#00ccbb]'>Change</Text>
						</TouchableOpacity>
					</Text>
				</View>
				<ScrollView className='divide-y divide-gray-200'>
					{Object.entries(groupedItemsInBasket).map(([key, item]) => (
						<View
							key={key}
							className='flex-row items-center space-x-3 bg-white py-2 px-5'
						>
							<Text className='text-[#00ccbb]'>{item.length} x</Text>
							<Image
								// debug the .url() for urlFor!!!
								source={{ uri: urlFor(item[0]?.image) }}
								className='h-12 w-12 rounded-full'
							/>
							<Text className='flex-1'>{item[0]?.name}</Text>
							<Text className='text-gray-600'>
								<Currency quantity={item[0]?.price} currency='USD' />
							</Text>
							<TouchableOpacity>
								<Text
									className='text-[#00ccbb] text-xs'
									onPress={() => dispatch(removeFromBasket({ id: key }))}
								>
									Remove
								</Text>
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>
        <View className='p-5 bg-white mt-5 space-y-4'>
          
					<View className='flex-row justify-between'>
						<Text className='text-gray-400'>Subtotal</Text>
						<Text>
							<Currency quantity={basketTotal} currency='USD' />
						</Text>
					</View>

					<View className='flex-row justify-between'>
						<Text className='text-gray-400'>Delivery Fee</Text>
						<Text>
							<Currency quantity={5.99} currency='USD' />
						</Text>
          </View>

					<View className='flex-row justify-between'>
						<Text className='font-extrabold'>Order Total</Text>
						<Text>
							<Currency quantity={basketTotal + 5.99} currency='USD' />
						</Text>
          </View>
          <TouchableOpacity onPress={()=> navigation.navigate("PreparingOrderScreen")} className='rounded-lg bg-[#00ccbb] p-4'>
          <Text className='text-center text-white text-lg font-bold'>Place Order</Text>
            </TouchableOpacity>
        </View>
			</View>
		</SafeAreaView>
	)
}

export default BasketScreen
