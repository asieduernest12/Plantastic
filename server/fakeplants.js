function getRandomElementFromArray(array) {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

export function generateRandomPlants() {
	// Arrays with possible values for each property
	const categories = ['Indoor', 'Outdoor'];
	const diseases = ['None', 'Aphids', 'Fungus'];
	const insects = ['None', 'Spider mites', 'Mealybugs'];
	const styles = ['Bushy', 'Vining', 'Upright'];
	// Add more arrays with possible values for other properties if needed

	const randomPlants = [];

	for (let i = 0; i < 10; i++) {
		const randomPlant = {
			Categories: getRandomElementFromArray(categories),
			Disease: getRandomElementFromArray(diseases),
			Img: 'random_image_url', // You can replace this with an array of image URLs and get a random one if you have it available
			Use: ['Indoor', 'Ornamental'],
			'Latin name': 'Randomus plantus',
			Insects: [getRandomElementFromArray(insects)],
			Avaibility: 'All year',
			Style: getRandomElementFromArray(styles),
			Bearing: 'Medium',
			'Light tolered': null,
			'Height at purchase': {
				M: Math.random() * 2 + 0.2, // Random height between 0.2 and 2.2 meters
				CM: Math.floor(Math.random() * 100),
			},
			'Light ideal': 'Bright light',
			'Width at purchase': {
				M: Math.random() * 1 + 0.1, // Random width between 0.1 and 1.1 meters
				CM: Math.floor(Math.random() * 100),
			},
			id: `plant-${i}`,
			Appeal: 'High',
			Perfume: 'None',
			Growth: 'Moderate',
			'Width potential': {
				M: Math.random() * 3 + 0.5, // Random width potential between 0.5 and 3.5 meters
				CM: Math.floor(Math.random() * 100),
			},
			'Common name (fr.)': 'Plante aléatoire',
			Pruning: 'Occasional',
			Family: 'Araceae',
			'Height potential': {
				M: Math.random() * 3 + 0.5, // Random height potential between 0.5 and 3.5 meters
				CM: Math.floor(Math.random() * 100),
			},
			Origin: ['Asia'],
			Description: 'A random plant description.',
			'Temperature max': {
				F: Math.floor(Math.random() * 30) + 60, // Random Fahrenheit temperature between 60 and 90
				C: Math.floor(Math.random() * 15) + 20, // Random Celsius temperature between 20 and 35
			},
			'Blooming season': 'Spring',
			Url: 'https://example.com', // Replace with an actual URL if you have one
			'Color of leaf': ['Green'],
			Watering: 'Regular',
			'Color of blooms': 'Red',
			Zone: ['Zone 10'],
			'Common name': ['Random Plant'],
			'Available sizes (Pot)': '6 inches',
			'Other names': null,
			'Temperature min': {
				F: Math.floor(Math.random() * 10) + 40, // Random Fahrenheit temperature between 40 and 50
				C: Math.floor(Math.random() * 10) + 10, // Random Celsius temperature between 10 and 20
			},
			'Pot diameter (cm)': {
				M: Math.random() * 20 + 10, // Random pot diameter between 10 and 30 centimeters
				CM: Math.floor(Math.random() * 100),
			},
			Climat: 'Tropical',
		};

		const randomPlantData = {
			item: randomPlant,
			refIndex: i,
		};

		randomPlants.push(randomPlantData);
	}

	return randomPlants;
}

// Example usage
const randomPlants = generateRandomPlants();
// console.log(randomPlants);
