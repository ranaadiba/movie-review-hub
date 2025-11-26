import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ReviewCardProps {
  movieTitle: string;
  reviewText: string;
  reviewerName: string;
  rating: number;
  createdAt?: string;
}

export const ReviewCard = ({
  movieTitle,
  reviewText,
  reviewerName,
  rating,
  createdAt,
}: ReviewCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="bg-gradient-card border-border shadow-elevated hover:shadow-glow transition-all duration-300 animate-fade-in-up">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold text-foreground">{movieTitle}</h3>
          <div className="flex gap-1 shrink-0">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= rating
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-foreground/90 leading-relaxed">{reviewText}</p>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">
            By <span className="text-foreground font-medium">{reviewerName}</span>
          </span>
          {createdAt && (
            <span className="text-sm text-muted-foreground">
              {formatDate(createdAt)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
