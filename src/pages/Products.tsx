import ProductCard from '@/components/ProductCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { IProduct } from '@/types/globalTypes';
import { useGetProductsQuery } from '@/utils/api';
import { useEffect, useState } from 'react';

export default function Products() {
  const [status, setStatus] = useState(true);
  const [priceRange, setPriceRange] = useState(100);
  const { data: productsDataRaw = [], isLoading, isError } = useGetProductsQuery();
// console.log(productsDataRaw)
  const { toast } = useToast();

  const handleSlider = (value: number[]) => {
    setPriceRange(value[0]);
  };

  const handleToggleStock = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.checked);
  };

  const filterProducts = (product: IProduct) => {
    if (status) {
      return product.status && product.price < priceRange;
    } else {
      return product.price < priceRange;
    }
  };
  

  const productsData = productsDataRaw?.data?.filter(filterProducts) || [];
  console.log(productsData);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }
  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          <div className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              id="in-stock"
              checked={status}
              onChange={handleToggleStock}
            />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[priceRange]}
              max={150}
              min={0}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>From 0$ To {priceRange.toFixed(2)}$</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {productsData.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
