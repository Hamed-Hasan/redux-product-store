import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  HiMinus,
  HiOutlinePlus,
  HiOutlineShoppingCart,
  HiOutlineTrash,
} from 'react-icons/hi';
import { Button } from './ui/button';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartProducts,
} from '@/redux/features/cart/cartSlice';
import { AppDispatch } from '@/redux/store';
import { IProduct } from '@/types/globalTypes';

export default function Cart() {
  const cartProducts: IProduct[] = useAppSelector(selectCartProducts);

  const dispatch = useAppDispatch<AppDispatch>();

  const handleIncreaseQuantity = (productId: number) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId: number) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleRemoveProduct = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  // Calculate the total price
  const total = cartProducts.reduce(
    (accumulator, product) =>
      accumulator + product.price * (product.quantity ?? 0),
    0
  );

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          <HiOutlineShoppingCart size="25" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <h1>Total: {total.toFixed(2)}</h1>
        </SheetHeader>
        <div className="space-y-5">
          {cartProducts.map((product) => (
            <div
              className="border h-44 p-5 flex justify-between rounded-md"
              key={product._id}
            >
              <div className="border-r pr-5 shrink-0">
                <img src={product.image} alt="" className="h-full" />
              </div>
              <div className="px-2 w-full flex flex-col gap-3">
                <h1 className="text-2xl self-center">{product.name}</h1>
                <p>Quantity: {product.quantity ?? 0}</p>
                <p className="text-xl">
                  Total Price: {(product.price * (product.quantity ?? 0)).toFixed(2)} $
                </p>
              </div>
              <div className="border-l pl-5 flex flex-col justify-between">
                <Button onClick={() => handleIncreaseQuantity(product._id)}>
                  <HiOutlinePlus size="20" />
                </Button>
                <Button onClick={() => handleDecreaseQuantity(product._id)}>
                  <HiMinus size="20" />
                </Button>
                <Button
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-400"
                  onClick={() => handleRemoveProduct(product._id)}
                >
                  <HiOutlineTrash size="20" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
