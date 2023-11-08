export default class Game {
  constructor(
    slug,
    name,
    playtime,
    platforms,
    stores,
    released,
    tba,
    background_image,
    rating,
    rating_top,
    ratings,
    ratings_count,
    reviews_text_count,
    added,
    added_by_status,
    metacritic,
    suggestions_count,
    updated,
    id,
    score,
    clip,
    tags,
    esrb_rating,
    user_game,
    reviews_count,
    saturated_color,
    dominant_color,
    short_screenshots,
    parent_platforms,
    genres
  ) {
    this.slug = slug;
    this.name = name;
    this.playtime = playtime;
    this.platforms = platforms;
    this.stores = stores;
    this.released = released;
    this.tba = tba;
    this.background_image = background_image;
    this.rating = rating;
    this.rating_top = rating_top;
    this.ratings = ratings;
    this.ratings_count = ratings_count;
    this.reviews_text_count = reviews_text_count;
    this.added = added;
    this.added_by_status = added_by_status;
    this.metacritic = metacritic;
    this.suggestions_count = suggestions_count;
    this.updated = updated;
    this.id = id;
    this.score = score;
    this.clip = clip;
    this.tags = tags;
    this.esrb_rating = esrb_rating;
    this.user_game = user_game;
    this.reviews_count = reviews_count;
    this.saturated_color = saturated_color;
    this.dominant_color = dominant_color;
    this.short_screenshots = short_screenshots;
    this.parent_platforms = parent_platforms;
    this.genres = genres;
  }
}
