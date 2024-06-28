export interface Timestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface ItineraryDay {
  title?: string;

  dayNumber?: number;

  location?: string;

  morning?: string;

  afternoon?: string;

  evening?: string;
}

export interface ItineraryPOI {
  id?: string;

  provider?: string;

  name?: string;

  description?: string;

  webUrl?: string;

  rating?: number | null;

  price?: object;

  location?: {
    lat: number;
    lng: number;
  };

  images?: string[];

  metadata?: object;
}

export interface Itinerary {
  uuid: string;

  query?: string;

  title?: string | null;

  location?: string;

  adjacentCities?: string[];

  days?: ItineraryDay[];

  locationImgUrl?: string | null;

  locale?: string;

  pois?: ItineraryPOI[];

  destinations?: string[];

  createdAt: Timestamp;

  isProcessing: boolean;
}

export enum CabinClass {
  CABIN_CLASS_UNSPECIFIED = 'CABIN_CLASS_UNSPECIFIED',
  CABIN_CLASS_ECONOMY = 'CABIN_CLASS_ECONOMY',
  CABIN_CLASS_PREMIUM_ECONOMY = 'CABIN_CLASS_PREMIUM_ECONOMY',
  CABIN_CLASS_BUSINESS = 'CABIN_CLASS_BUSINESS',
  CABIN_CLASS_FIRST = 'CABIN_CLASS_FIRST',
}

export interface Flight {
  fromDate: Date;
  fromIata?: string;
  toDate?: Date;
  toIata?: string;
  price: number;
  duration: string;
  durationInMinutes: number;
  stops: number;
  type: 'oneWay' | 'return';
}

export interface ChatMessageFlight {
  fromCity?: string;

  toCity?: string;

  fromIata?: string;

  toIata?: string;

  thumbnailUrl?: string;

  departureDate?: string;

  returnDate?: string;

  priceInEuros?: number;

  duration?: string;

  durationInMinutes?: number;

  stops?: number;

  destinationAirportInDifferentCity?: boolean;

  cabinClass?: CabinClass;

  numberOfAdults?: number;

  childrenAges?: number[];

  latest?: boolean;

  carriers?: Array<{
    name: string;
    imageUrl: string;
    iata: string;
  }>;
}

export interface ChatMessageGoogleDestination {
  placeId?: string;

  name?: string;

  city?: string;

  parentCity?: string;

  country?: string;

  countryCode?: string;

  continent?: string;

  continentCode?: string;

  imageUrl?: string;

  mapUrl?: string;

  lat?: number;

  lng?: number;

  iata?: string;

  iataName?: string;

  iataCity?: string;

  iataLat?: number;

  iataLng?: number;

  booking?: any;

  flight?: Flight;
}

export interface Creator {
  username: string;
  profilePicUrl: string;
}

export interface Video {
  id: string;
  m3u8Url: string;
  mp4Url: string;
  instagramUrl: string;
  instagramLocation: string;
  thumbnailUrl: string;
  startThumbnailUrl: string;
  duration: number;
  width: number;
  height: number;
  categories: string[];
  subcategories: string[];
  caption: string;
  lat: number;
  lng: number;
  likes: number;
  creator: Creator;
  seo?: {
    title?: string;
    description?: string;
  };
}

export interface ChatMessageHotel {
  id?: number;

  name?: string;

  url?: string;

  description?: string;

  imageUrl?: string;

  imagesUrls?: string[];

  reviewScore?: number;

  numberOfReviews?: number;

  stars?: number;

  address?: string;

  lat?: number;

  lng?: number;

  price?: number;

  discountPercentage?: number;

  videos?: Video[];
}

export interface ChatMessageDirections {
  from: string;
  fromCoordinate: {
    lat: number;
    lng: number;
  };

  fromIata: string;
  fromIataCoordinate: {
    lat: number;
    lng: number;
  };

  to: string;
  toCoordinate: {
    lat: number;
    lng: number;
  };

  toIata: string;
  toIataCoordinate: {
    lat: number;
    lng: number;
  };

  shortDescription: string;
  transportation: string[];
  legs: {
    title: string
    description: 'plane' | 'train' | 'bus' | 'car' | 'boat' | 'ferry'
  }[];
}

export interface Hotel {
  id: number;
  name: string;
  url: string;
  description: string;
  photos: string[];
  reviewScore: number;
  numberOfReviews: number;
  stars: number;
  address: string;
  currency: string;
  lat: number;
  lng: number;
  videos: Video[];
}

export interface WeatherDay {
  date: string;
  code?: number | null;
  maximumTemperature?: number | null;
  minimumTemperature?: number | null;
  precipitationSum?: number | null;
  rainSum?: number | null;
  snowfallSum?: number | null;
  precipitationProbabilityMax?: number | null;
  sunrise?: Date | null;
  sunset?: Date | null;
  windSpeedMax?: number | null;
}

export interface Destination {
  id: number;
  displayName: string;
  city: string;
  parentCity: string;
  country: string;
  countryCode: string;
  continent: string;
  continentCode: string;
  iata: string;
  iataName: string;
  iataCity: string;
  iataLat?: number;
  iataLng?: number;
  lat?: number;
  lng?: number;
  terms?: string[];
  price?: {
    [month: string]: string | null;
  };
  idealNumberOfDays?: {
    [month: string]: number | null;
  };
  showOnlyVideos?: boolean;
  videos: Video[];
  hotels: Hotel[];
  flight?: Flight;
  booking?: any;
  weather?: {
    days?: WeatherDay[];
  };
}

export interface ChatMessage {
  createdAt: Timestamp;

  id: string;

  isUserMessage: boolean;

  text?: string;

  reaction?: string;

  flights?: ChatMessageFlight[];

  destinations?: Destination[];

  googleDestinations?: ChatMessageGoogleDestination[];

  hotels?: ChatMessageHotel[];

  booking?: any;

  itinerary?: Itinerary;

  itineraryTitle?: string;

  itineraryId?: string;

  directions?: ChatMessageDirections;

  quickReplies?: string[];

  index?: number;
}

export interface Conversation {
  id?: string;

  name?: string;

  createdAt?: Timestamp;

  updatedAt?: Timestamp;

  chatMessages?: Array<ChatMessage>;

  isProcessing?: boolean;

  locale?: string;
}
