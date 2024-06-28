export interface GetActivitiesParams {
  token: string;
  latitude: number;
  longitude: number;
  radius?: number;
  limit?: number;
  locale?: string;
}

export interface CreatePartnerAuthParams {
  token: string;
  userId: string;
}

export interface StartConversationParams {
  token: string;
  name: string;
  skipGreeting: boolean;
}

export interface SendTextMessageParams {
  token: string;
  conversationId: string;
  text: string;
  id?: string;
}

export interface SendAudioMessageParams {
  token: string;
  conversationId: string;
  file: File;
  id?: string;
}

export interface SendCommandParams {
  token: string;
  conversationId: string;
  type: string;
  payload: object;
}

export interface ConnectToSocketIoParams {
  token: string;
  conversationId: string;
}

export interface DestinationSearchParams {
  token: string;
  params: Record<string, string | number | boolean>;
  locale?: string;
}

export interface DestinationGeocodeParams {
  token: string;
  query: string;
  booking?: boolean;
}

export interface CreateEventParams {
  token: string;
  event: object;
  platform?: string;
  origin?: string;
  pseudoUserId?: string;
  sessionId?: string;
}

export interface FlightPredictionParams {
  token: string;
  fromIata: string;
  toIata: string;
  date: string;
}

export interface HotelSearchParams {
  token: string;
  params: Record<string, string | number | boolean>;
}

export interface ResolveIpParams {
  token: string;
  ip: string;
}

export interface CreateItineraryParams {
  token: string;
  itinerary: object;
  locale?: string;
}

export interface RelatedItineraryParams {
  token: string;
  userAgent: string;
  itineraryId: string;
  locale?: string;
}

export interface GetCachedItineraryParams {
  token: string;
  query: string;
  locale?: string;
}

export interface GetItineraryByUuidParams {
  token: string;
  uuid: string;
}

export interface CreateUserParams {
  token: string;
  user: object;
}

export interface GetVideoParams {
  token: string;
  id: string;
}

export interface GetVideoSimilarityParams {
  token: string;
  id: string;
  months?: string[];
  maxVisuallySimilarVideos?: number;
}