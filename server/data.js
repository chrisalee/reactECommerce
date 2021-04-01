import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Christopher',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'Lee',
            email: 'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],

    products: [
        {
            _id: '1',
            name: 'Black Suit',
            category: 'suits',
            image: '/images/product-1.png',
            price: 600,
            countInStock: 0,
            brand: 'Armani',
            rating: .5,
            numReviews: 10,
            description: 'high quality product'
        },
        {
            _id: '2',
            name: 'Blue Suit',
            category: 'suits',
            image: '/images/product-2.png',
            price: 1600,
            countInStock: 10,
            brand: 'D-7',
            rating: 4.5,
            numReviews: 9,
            description: 'high quality product'
        },
        {
            _id: '3',
            name: 'Black Tie',
            category: 'ties',
            image: '/images/product-3.png',
            price: 40,
            countInStock: 20,
            brand: 'Duckie',
            rating: 4,
            numReviews: 20,
            description: 'neck-tie'
        },
        {
            _id: '4',
            name: 'Blue Tie',
            category: 'ties',
            image: '/images/product-4.png',
            price: 60,
            countInStock: 4,
            brand: 'Stripe',
            rating: 3.5,
            numReviews: 8,
            description: 'neck-tie'
        },
        {
            _id: '5',
            name: 'Blue Trousers',
            category: 'pants',
            image: '/images/product-5.png',
            price: 100,
            countInStock: 100,
            brand: 'Stripe',
            rating: 4.5,
            numReviews: 81,
            description: 'comfortable'
        },
        {
            _id: '6',
            name: 'Grey Trousers',
            category: 'pants',
            image: '/images/product-6.png',
            price: 100,
            countInStock: 40,
            brand: 'Dockers',
            rating: 5,
            numReviews: 1,
            description: 'comfortable'
        },
        {
            _id: '7',
            name: 'Blue Trousers',
            category: 'shirt',
            image: '/images/product-7.png',
            price: 100,
            countInStock: 5000,
            brand: 'Dockers',
            rating: 5,
            numReviews: 181,
            description: 'comfortable'
        }
    ]
};

export default data;