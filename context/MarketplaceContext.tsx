import { createContext, useContext, useState, type ReactNode } from 'react';

export type Product = {
  id: string;
  vendorId: string;
  vendorName: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string | null;
};

type NewProduct = Omit<Product, 'id'>;

type MarketplaceContextValue = {
  products: Product[];
  addProduct: (product: NewProduct) => void;
  removeProduct: (id: string) => void;
};

const initialProducts: Product[] = [
  {
    id: 'product-1',
    vendorId: '1',
    vendorName: 'Akosua Kente Weaves',
    name: 'Handwoven Kente Stole',
    price: 180,
    category: 'Crafts',
    description: 'A handwoven Bonwire kente stole made by local artisans. Colours and patterns may vary slightly.',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=60',
  },
  {
    id: 'product-2',
    vendorId: '1',
    vendorName: 'Akosua Kente Weaves',
    name: 'Custom Kente Cloth',
    price: 650,
    category: 'Crafts',
    description: 'Full traditional kente cloth made to order. Message the vendor to discuss colours, size and completion time.',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=60',
  },
  {
    id: 'product-3',
    vendorId: '2',
    vendorName: "Mama Ama's Kitchen",
    name: 'Ghanaian Lunch Experience',
    price: 65,
    category: 'Food',
    description: 'Choose from jollof, waakye or fufu with a refreshing local drink. Confirm today’s menu before ordering.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=60',
  },
  {
    id: 'product-4',
    vendorId: '3',
    vendorName: 'Vume Pottery Studio',
    name: 'Handmade Clay Bowl',
    price: 95,
    category: 'Crafts',
    description: 'A locally fired decorative bowl from Vume. Each piece is handmade and has its own character.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=60',
  },
  {
    id: 'product-5',
    vendorId: '4',
    vendorName: "Kojo's Drumming Experience",
    name: 'Traditional Drumming Session',
    price: 100,
    category: 'Culture',
    description: 'A beginner-friendly Ghanaian drumming session. Enquire to confirm group size, venue and availability.',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=60',
  },
  {
    id: 'product-6',
    vendorId: '5',
    vendorName: 'Abena African Fashion',
    name: 'Made-to-measure Print Shirt',
    price: 220,
    category: 'Fashion',
    description: 'A tailored African-print shirt made to your measurements. Fabric choices are confirmed in chat.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=60',
  },
];

const MarketplaceContext = createContext<MarketplaceContextValue | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: NewProduct) => {
    setProducts((current) => [
      { ...product, id: `product-${Date.now()}` },
      ...current,
    ]);
  };

  const removeProduct = (id: string) => {
    setProducts((current) => current.filter((product) => product.id !== id));
  };

  return (
    <MarketplaceContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
