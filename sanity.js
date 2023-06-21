import  {createClient}  from '@sanity/client'
import ImageUrlBuilder from '@sanity/image-url'
import 'react-native-url-polyfill/auto'

export const client = createClient({
	projectId: '8kr7aii6',
	dataset: 'production',
	useCdn: true,
	apiVersion: '2021-08-31',
})

const builder = ImageUrlBuilder(client)
export const urlFor = (source) =>
	source
		? builder.image(source)
		: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'

export default client
