// ProductDetails.jsx
import { useGetProductQuery } from '@/utils/api';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import ProductReview from '@/components/ProductReview';
import { useAppDispatch } from '@/redux/hook';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { toast } from '@/components/ui/use-toast';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { data: product, isLoading, isError } = useGetProductQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching product details.</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Dispatch the addToCart action with the product as the payload
    toast({
      description: 'Product added to cart!',
      // Add any other properties or customize the toast as needed
    });
  };

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={product?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.name}</h1>
          <p className="text-xl">Rating: {product?.rating}</p>
          <ul className="space-y-1 text-lg">
            {product?.features?.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button onClick={handleAddToCart}>Add to cart</Button>
        </div>
      </div>
      <ProductReview productId={id} />
    </>
  );
}
