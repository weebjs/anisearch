// src/lib/animeTypes.ts

export type AnimeData = {
    title: string;
    images: {
        jpg: {
            image_url: string;
        };
    };
    type: string;
    episodes: number;
    rating: string;
    score: number;
    synopsis: string;
};

export type MangaData = {
    title: string;
    images: {
        jpg: {
            image_url: string;
        };
    };
    type: string;
    chapters: number;
    volumes: number;
    score: number;
    synopsis: string;
};

export const searchOptions = [
    { value: 'anime', label: 'Anime' },
] as const;