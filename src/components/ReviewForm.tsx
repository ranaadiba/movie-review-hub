import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ReviewFormProps {
  onReviewSubmitted: () => void;
}

export const ReviewForm = ({ onReviewSubmitted }: ReviewFormProps) => {
  const [movieTitle, setMovieTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!movieTitle || !reviewText || !reviewerName || rating === 0) {
      toast.error("Please fill in all fields and select a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("movie_reviews")
        .insert([
          {
            movie_title: movieTitle,
            review_text: reviewText,
            reviewer_name: reviewerName,
            rating: rating,
          },
        ]);

      if (error) throw error;

      toast.success("Review submitted successfully!");
      setMovieTitle("");
      setReviewText("");
      setReviewerName("");
      setRating(0);
      onReviewSubmitted();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
      <div className="space-y-2">
        <Label htmlFor="movie-title" className="text-foreground">
          Movie Title
        </Label>
        <Input
          id="movie-title"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          placeholder="Enter the movie title"
          className="bg-secondary border-border focus:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reviewer-name" className="text-foreground">
          Your Name
        </Label>
        <Input
          id="reviewer-name"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          placeholder="Enter your name"
          className="bg-secondary border-border focus:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Rating</Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= (hoveredRating || rating)
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="review-text" className="text-foreground">
          Your Review
        </Label>
        <Textarea
          id="review-text"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your thoughts about this movie..."
          className="bg-secondary border-border focus:ring-primary min-h-[120px] resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all hover:shadow-glow"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};
