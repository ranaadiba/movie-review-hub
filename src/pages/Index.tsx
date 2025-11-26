import { useEffect, useState } from "react";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewCard } from "@/components/ReviewCard";
import { supabase } from "@/integrations/supabase/client";
import { Film } from "lucide-react";

interface Review {
  id: string;
  movie_title: string;
  review_text: string;
  reviewer_name: string;
  rating: number;
  created_at: string;
}

const Index = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("movie_reviews")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-cinematic border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center gap-3 mb-4 animate-fade-in">
            <Film className="w-12 h-12 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              CineReview
            </h1>
          </div>
          <p className="text-center text-muted-foreground text-lg animate-fade-in">
            Share your passion for cinema with the world
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <div>
            <div className="bg-card rounded-lg p-8 shadow-elevated border border-border">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Write a Review
              </h2>
              <ReviewForm onReviewSubmitted={fetchReviews} />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Recent Reviews
            </h2>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : reviews.length === 0 ? (
              <div className="bg-card rounded-lg p-8 shadow-elevated border border-border text-center">
                <p className="text-muted-foreground">
                  No reviews yet. Be the first to share your thoughts!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div
                    key={review.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ReviewCard
                      movieTitle={review.movie_title}
                      reviewText={review.review_text}
                      reviewerName={review.reviewer_name}
                      rating={review.rating}
                      createdAt={review.created_at}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
