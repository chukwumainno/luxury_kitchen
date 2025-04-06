# Luxury Kitchen: Premium Food Ordering Platform

A modern, feature-rich food ordering platform with a premium user experience, built with Next.js 14 and Tailwind CSS.

## Features

- Dynamic theming system (switch between green and red themes)
- Intuitive food browsing and filtering
- Detailed food customization options 
- Real-time order tracking
- Shopping cart management
- Mobile-responsive design

## Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS
- **State Management:** React Context
- **UI Components:** Custom components with Tailwind
- **Authentication:** Ready for NextAuth.js integration
- **Payments:** Ready for Stripe integration
- **Real-time:** Ready for WebSockets integration

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/chukwumainno/luxury_kitchen.git
cd luxury-kitchen
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
luxury-kitchen/
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js pages
│   │   └── api/           # Backend API routes (to be implemented)
│   ├── components/        # UI components
│   │   ├── cart/          # Cart-related components
│   │   ├── food/          # Food-related components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # UI utility components
│   ├── context/           # State management
│   ├── database/          # DB configuration (to be implemented)
│   │   └── models/        # Data schemas
│   ├── middleware/        # Request processing (to be implemented)
│   ├── services/          # Business logic (to be implemented)
│   ├── hooks/             # Custom React hooks (to be implemented)
│   └── utils/             # Helper functions (to be implemented)
```

## Future Enhancements

- Integration with backend API for real data
- User authentication and profiles
- Payment processing
- Order history
- Admin dashboard
- Enhanced search functionality

## License

This project is licensed under the MIT License - see the LICENSE file for details.
