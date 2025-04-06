import { notFound } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import FoodCard from '@/components/food/FoodCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { menuItems } from '@/data/menuData';

// Mock data for food items by category
const foodByCategory = {
  rice: [
    {
      id: 'jollof-rice-1',
      name: 'Jollof Rice',
      price: 12.99,
      image: '/images/jollof_rice.jpeg',
      restaurant: 'African Kitchen',
      calories: 400,
      time: 25
    },
    {
      id: 'fried-rice-1',
      name: 'Special Fried Rice',
      price: 10.99,
      image: '/images/fried_rice.jpeg',
      restaurant: 'African Kitchen',
      calories: 380,
      time: 25
    },
    {
      id: 'coconut-rice-1',
      name: 'Coconut Rice',
      price: 11.99,
      image: '/images/coconut_rice.jpeg',
      restaurant: 'African Kitchen',
      calories: 410,
      time: 25
    },
    {
      id: 'ofada-rice-1',
      name: 'Ofada Rice & Stew',
      price: 13.99,
      image: '/images/ofada_rice.jpeg',
      restaurant: 'African Kitchen',
      calories: 450,
      time: 30
    },
    {
      id: 'white-rice-1',
      name: 'White Rice & Stew',
      price: 10.99,
      image: '/images/white_rice.jpeg',
      restaurant: 'African Kitchen',
      calories: 350,
      time: 20
    },
    {
      id: 'nigerian-fried-rice',
      name: 'Nigerian Party Fried Rice',
      price: 12.99,
      image: '/images/Nigerian_ Fried Rice - 2 litres.jpeg',
      restaurant: 'African Kitchen',
      calories: 420,
      time: 25
    }
  ],
  snacks: [
    {
      id: 'shawarma-1',
      name: 'Chicken Shawarma',
      price: 8.99,
      image: '/images/Fresh_ shawarma .jpeg',
      restaurant: 'Shawarma House',
      calories: 280,
      time: 15
    },
    {
      id: 'meat-pie-1',
      name: 'Nigerian Meat Pie',
      price: 3.99,
      image: '/images/meatpie.jpeg',
      restaurant: 'Snack House',
      calories: 300,
      time: 10
    },
    {
      id: 'puff-puff-1',
      name: 'Nigerian Puff Puff',
      price: 4.99,
      image: '/images/puff_puff.jpeg',
      restaurant: 'Snack House',
      calories: 250,
      time: 10
    },
    {
      id: 'shawarma-sandwich',
      name: 'Shawarma Sandwich',
      price: 7.99,
      image: '/images/Shawarma_ sandwich .jpeg',
      restaurant: 'Shawarma House',
      calories: 260,
      time: 15
    },
    {
      id: 'hamburger-1',
      name: 'Classic Hamburger',
      price: 11.99,
      image: '/images/hamburger.jpeg',
      restaurant: 'Burger House',
      calories: 650,
      time: 15
    }
  ],
  pizza: [
    {
      id: 'pepperoni-pizza',
      name: 'Pepperoni Pizza',
      price: 15.99,
      image: '/images/Pepperoni_pizza.jpeg',
      restaurant: 'Pizza House',
      calories: 850,
      time: 20
    },
    {
      id: 'chicken-pizza',
      name: 'Chicken Pizza',
      price: 16.99,
      image: '/images/chicken_pizza.jpeg',
      restaurant: 'Pizza House',
      calories: 800,
      time: 20
    },
    {
      id: 'meat-pizza',
      name: 'Meat Pizza',
      price: 17.99,
      image: '/images/meat_ pizza _.jpeg',
      restaurant: 'Pizza House',
      calories: 900,
      time: 20
    },
    {
      id: 'pizza-pasta',
      name: 'Pizza & Pasta Combo',
      price: 24.99,
      image: '/images/Pizza_ And _Pasta .jpeg',
      restaurant: 'Pizza House',
      calories: 1200,
      time: 25
    }
  ],
  meat: [
    {
      id: 'roasted-chicken-1',
      name: 'Roasted Chicken',
      price: 13.99,
      image: '/images/Roasted_Chicken.jpeg',
      restaurant: 'African Kitchen',
      calories: 320,
      time: 20
    },
    {
      id: 'suya-1',
      name: 'Beef Suya',
      price: 10.99,
      image: '/images/Suya.jpeg',
      restaurant: 'Suya Spot',
      calories: 320,
      time: 15
    },
    {
      id: 'chicken-combo',
      name: 'Chicken & Rice Combo',
      price: 18.99,
      image: '/images/fried_rice_and__chicken.jpeg',
      restaurant: 'African Kitchen',
      calories: 750,
      time: 25
    },
    {
      id: 'shawarma-chicken',
      name: 'Shawarma & Chicken Combo',
      price: 16.99,
      image: '/images/shawarma_ and_chicken .jpeg',
      restaurant: 'Shawarma House',
      calories: 600,
      time: 20
    }
  ],
  soups: [
    {
      id: 'egusi-soup-1',
      name: 'Egusi Soup with Pounded Yam',
      price: 15.99,
      image: '/images/Egusi _Soup_and_pounded_yam.jpeg',
      restaurant: 'African Kitchen',
      calories: 600,
      time: 25
    },
    {
      id: 'ogbono-soup-1',
      name: 'Ogbono Soup',
      price: 15.99,
      image: '/images/ogbono_soup.jpeg',
      restaurant: 'African Kitchen',
      calories: 550,
      time: 25
    },
    {
      id: 'amala-combo-1',
      name: 'Amala with Ewedu & Gbegiri',
      price: 14.99,
      image: '/images/amala_gbrgiri_ewedu.jpeg',
      restaurant: 'African Kitchen',
      calories: 500,
      time: 20
    },
    {
      id: 'okro-soup',
      name: 'Okro Soup Special',
      price: 15.99,
      image: '/images/okoro_soup.jpeg',
      restaurant: 'African Kitchen',
      calories: 480,
      time: 25
    }
  ],
  drinks: [
    {
      id: 'coca-cola-1',
      name: 'Coca Cola',
      price: 2.99,
      image: '/images/coke.jpeg',
      restaurant: 'Beverage Store',
      calories: 140,
      time: 5
    },
    {
      id: 'can-coke',
      name: 'Canned Coca Cola',
      price: 1.99,
      image: '/images/can coke.jpeg',
      restaurant: 'Beverage Store',
      calories: 140,
      time: 5
    },
    {
      id: 'fanta-1',
      name: 'Fanta Orange',
      price: 2.99,
      image: '/images/Fanta_Orange jpeg',
      restaurant: 'Beverage Store',
      calories: 160,
      time: 5
    },
    {
      id: 'juice-1',
      name: 'Fresh Juice',
      price: 4.99,
      image: '/images/juicy_Juice.png',
      restaurant: 'Beverage Store',
      calories: 120,
      time: 5
    },
    {
      id: 'chivita-juice',
      name: 'Chivita Juice',
      price: 3.99,
      image: '/images/Chivita_Hollandia_.png',
      restaurant: 'Beverage Store',
      calories: 130,
      time: 5
    },
    {
      id: 'hollandia-yoghurt-1',
      name: 'Hollandia Yoghurt',
      price: 3.99,
      image: '/images/Hollandia_Yoghurt.png',
      restaurant: 'Beverage Store',
      calories: 150,
      time: 5
    }
  ]
};

// Helper function to format category name
const formatCategoryName = (id: string) => {
  return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default async function CategoryPage({ params }: { params: { id: string } }) {
  // Get the category ID
  const categoryId = params.id.toLowerCase();
  
  // Filter menu items by category
  const foodItems = menuItems.filter(item => 
    item.category.toLowerCase() === categoryId
  );
  
  // If no items found in category, show 404
  if (!foodItems.length) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container py-20">
        <SectionHeader
          title={`${formatCategoryName(categoryId)} Category`}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.map((food) => (
            <FoodCard key={food.id} {...food} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 