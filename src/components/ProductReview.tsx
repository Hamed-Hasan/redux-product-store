import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { FiSend } from 'react-icons/fi';
import { useState } from 'react';
import { useAddCommentMutation, useGetCommentsQuery } from '@/utils/api';

interface Comment {
  _id: string;
  comment: string;
}

interface ProductReviewProps {
  productId: string;
}

export default function ProductReview({ productId }: ProductReviewProps) {
  const [commentValue, setCommentValue] = useState('');
  const { data: comments, isError, isLoading } = useGetCommentsQuery(productId);
  const [addComment] = useAddCommentMutation();

  const handleSubmitComment = () => {
    if (commentValue.trim() === '') return;

    addComment({ productId, comment: commentValue })
      .then(() => {
        setCommentValue('');
      })
      .catch((error) => {
        console.error('Failed to add comment:', error);
      });
  };

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  if (isError) {
    return <p>Error fetching comments.</p>;
  }

  const commentArray = Array.isArray(comments) ? comments : []; // Ensure comments is an array

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5 items-center">
        <Textarea
          className="min-h-[30px]"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />
        <Button className="rounded-full h-10 w-10 p-2 text-[25px]" onClick={handleSubmitComment}>
          <FiSend />
        </Button>
      </div>
      <div className="mt-10">
        {commentArray.map((comment: Comment) => (
          <div key={comment._id} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
