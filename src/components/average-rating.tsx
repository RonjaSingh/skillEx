type StarRatingProps = {
  rating: number | null
  count?: number
  size?: "sm" | "md" | "lg"
  showCount?: boolean
}

export default function StarRating({
  rating,
  count,
  size = "md",
  showCount = true,
}: StarRatingProps) {
  if (rating === null) {
    return (
      <p className="text-sm text-gray-800 text-center">
        (No ratings yet)
      </p>
    )
  }

  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75
  const roundedUp = rating % 1 >= 0.75
  const totalFullStars = roundedUp ? fullStars + 1 : fullStars

  const sizeClass =
    size === "sm"
      ? "text-sm"
      : size === "lg"
      ? "text-2xl"
      : "text-lg"

  return (
    <div className="flex items-center justify-center gap-1 text-yellow-500">
      {[1, 2, 3, 4, 5].map((n) => {
        if (n <= totalFullStars) {
          return (
            <span key={n} className={sizeClass}>
              ★
            </span>
          )
        }

        if (n === totalFullStars + 1 && hasHalfStar) {
          return (
            <span key={n} className={`${sizeClass} opacity-50`}>
              ★
            </span>
          )
        }

        return (
          <span key={n} className={`${sizeClass} text-gray-300`}>
            ★
          </span>
        )
      })}

      {showCount && count !== undefined && (
        <span className="ml-2 text-sm text-gray-600">
          {rating.toFixed(1)} ({count})
        </span>
      )}
    </div>
  )
}