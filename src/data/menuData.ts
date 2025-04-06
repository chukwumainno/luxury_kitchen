export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  restaurant: string;
  category: string;
  rating?: number;
  ratingCount?: string;
  calories: number;
  time: number;
  description?: string;
  dietary: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    halal: boolean;
    spicy: boolean;
  };
  sizes?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  ingredients?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  addons?: Array<{
    id: string;
    name: string;
    weight: string;
    price: number;
  }>;
}

export const menuItems: MenuItem[] = [
  {
    id: 'jollof-rice',
    name: 'Classic Jollof Rice',
    price: 12.99,
    image: '/images/foods/jollof-rice.jpg',
    restaurant: 'African Delights',
    category: 'Main Dishes',
    rating: 4.8,
    ratingCount: '1.2k',
    calories: 450,
    time: 25,
    description: 'Traditional West African rice dish cooked in rich tomato sauce with aromatic spices.',
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      halal: true,
      spicy: true
    },
    sizes: [
      {
        id: 'small',
        name: 'Small',
        price: 12.99
      },
      {
        id: 'medium',
        name: 'Medium',
        price: 15.99
      },
      {
        id: 'large',
        name: 'Large',
        price: 18.99
      }
    ],
    ingredients: [
      {
        id: 'chicken',
        name: 'Chicken',
        price: 3.99
      },
      {
        id: 'beef',
        name: 'Beef',
        price: 4.99
      },
      {
        id: 'fish',
        name: 'Fish',
        price: 5.99
      }
    ],
    addons: [
      {
        id: 'plantain',
        name: 'Fried Plantain',
        weight: '150g',
        price: 2.99
      },
      {
        id: 'moin-moin',
        name: 'Moin Moin',
        weight: '200g',
        price: 3.99
      },
      {
        id: 'coleslaw',
        name: 'Coleslaw',
        weight: '100g',
        price: 1.99
      }
    ]
  },
  {
    id: 'chicken-shawarma',
    name: 'Chicken Shawarma',
    price: 9.99,
    image: '/images/foods/shawarma.jpg',
    restaurant: 'Mediterranean Grill',
    category: 'Quick Bites',
    rating: 4.6,
    ratingCount: '856',
    calories: 520,
    time: 15,
    description: 'Grilled marinated chicken wrapped in pita with garlic sauce and fresh vegetables.',
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      halal: true,
      spicy: false
    }
  },
  {
    id: 'egusi-soup',
    name: 'Egusi Soup',
    price: 15.99,
    image: '/images/foods/egusi-soup.jpg',
    restaurant: 'African Delights',
    category: 'Soups',
    rating: 4.7,
    ratingCount: '543',
    calories: 380,
    time: 35,
    description: 'Rich Nigerian soup made with ground melon seeds, leafy vegetables, and assorted meat.',
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
      halal: true,
      spicy: true
    }
  },
  {
    id: 'pepperoni-pizza',
    name: 'Classic Pepperoni Pizza',
    price: 18.99,
    image: '/images/foods/pepperoni-pizza.jpg',
    restaurant: 'Pizza Paradise',
    category: 'Main Dishes',
    rating: 4.5,
    ratingCount: '2.1k',
    calories: 850,
    time: 20,
    description: 'Hand-tossed pizza topped with pepperoni, mozzarella, and our signature tomato sauce.',
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      halal: false,
      spicy: false
    }
  },
  {
    id: 'grilled-chicken',
    name: 'Herb Grilled Chicken',
    price: 16.99,
    image: '/images/foods/grilled-chicken.jpg',
    restaurant: 'Grill Master',
    category: 'Grills',
    rating: 4.4,
    ratingCount: '768',
    calories: 320,
    time: 30,
    description: 'Tender chicken breast marinated in herbs and grilled to perfection.',
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
      halal: true,
      spicy: false
    }
  },
  {
    id: 'caesar-salad',
    name: 'Classic Caesar Salad',
    price: 8.99,
    image: '/images/foods/caesar-salad.jpg',
    restaurant: 'Fresh & Green',
    category: 'Sides',
    rating: 4.3,
    ratingCount: '432',
    calories: 220,
    time: 10,
    description: 'Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing.',
    dietary: {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
      halal: true,
      spicy: false
    }
  },
  {
    id: 'suya',
    name: 'Spicy Beef Suya',
    price: 13.99,
    image: '/images/foods/suya.jpg',
    restaurant: 'African Delights',
    category: 'Grills',
    rating: 4.9,
    ratingCount: '678',
    calories: 410,
    time: 20,
    description: 'Nigerian style spiced and grilled beef skewers.',
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
      halal: true,
      spicy: true
    }
  },
  {
    id: 'spring-rolls',
    name: 'Vegetable Spring Rolls',
    price: 6.99,
    image: '/images/foods/spring-rolls.jpg',
    restaurant: 'Asian Fusion',
    category: 'Appetizers',
    rating: 4.2,
    ratingCount: '345',
    calories: 180,
    time: 15,
    description: 'Crispy rolls filled with fresh vegetables and served with sweet chili sauce.',
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: false,
      halal: true,
      spicy: false
    }
  },
  {
    id: 'fish-pepper-soup',
    name: 'Catfish Pepper Soup',
    price: 17.99,
    image: '/images/foods/fish-pepper-soup.jpg',
    restaurant: 'African Delights',
    category: 'Soups',
    rating: 4.7,
    ratingCount: '432',
    calories: 290,
    time: 30,
    description: 'Spicy Nigerian soup made with fresh catfish and aromatic spices.',
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
      halal: true,
      spicy: true
    }
  },
  {
    id: 'margherita-pizza',
    name: 'Margherita Pizza',
    price: 16.99,
    image: '/images/foods/margherita-pizza.jpg',
    restaurant: 'Pizza Paradise',
    category: 'Main Dishes',
    rating: 4.6,
    ratingCount: '1.5k',
    calories: 780,
    time: 20,
    description: 'Classic pizza with fresh mozzarella, tomatoes, and basil.',
    dietary: {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
      halal: true,
      spicy: false
    }
  }
]; 