import { ConnectToSocketIoParams, CreateEventParams, CreateItineraryParams, CreatePartnerAuthParams, CreateUserParams, DestinationGeocodeParams, DestinationSearchParams, FlightPredictionParams, GetActivitiesParams, GetCachedItineraryParams, GetItineraryByUuidParams, GetVideoParams, GetVideoSimilarityParams, HotelSearchParams, RelatedItineraryParams, ResolveIpParams, SendAudioMessageParams, SendCommandParams, SendTextMessageParams, StartConversationParams } from './apiServiceModels';
import { getLocalStorageItem } from './localStorageService';

// Utility function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Utility function to handle API errors
const handleError = (error: unknown) => {
  console.error('API call failed. ' + error);
  throw error;
};

// Function to create headers with authentication token
const createHeaders = (token: string): Record<string, string> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const apiBaseUrl = (): string => getLocalStorageItem('connectionUrl', 'https://bd-api.dev.beautifuldestinations.app');

// API Service
const apiService = {
  getActivities: async ({ token, latitude, longitude, radius = 25, limit = 50, locale = 'en' }: GetActivitiesParams) => {
    try {
      const response = await fetch(`${apiBaseUrl()}/activity?latitude=${latitude}&longitude=${longitude}&radius=${radius}&limit=${limit}`, {
        method: 'GET',
        headers: {
          ...createHeaders(token),
          'X-Locale': locale,
        },
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getAuth: async ({ token }: { token: string }) => {
    try {
      const response = await fetch(`${apiBaseUrl()}/auth`, {
        method: 'GET',
        headers: createHeaders(token),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  createPartnerAuth: async ({ token, userId }: CreatePartnerAuthParams) => {
    try {
      const response = await fetch(`${apiBaseUrl()}/auth/partner`, {
        method: 'POST',
        headers: createHeaders(token),
        body: JSON.stringify({ userId }),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  startConversation: async ({ token, name, skipGreeting }: StartConversationParams) => {
    try {
      const response = await fetch(`${apiBaseUrl()}/chatbot/conversation`, {
        method: 'POST',
        headers: createHeaders(token),
        body: JSON.stringify({ name, skipGreeting }),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  sendTextMessage: async ({ token, conversationId, text, id }: SendTextMessageParams) => {
    try {
      const response = await fetch(`${apiBaseUrl()}/chatbot/conversation/${conversationId}/message/text`, {
        method: 'POST',
        headers: createHeaders(token),
        body: JSON.stringify({ text, id }),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  sendAudioMessage: async ({ token, conversationId, file, id }: SendAudioMessageParams) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (id) {
        formData.append('id', id);
      }

      const response = await fetch(`${apiBaseUrl()}/chatbot/conversation/${conversationId}/message/audio`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  sendCommand: async ({ token, conversationId, type, payload }: SendCommandParams) => {
    try {
      const response = await fetch(`${apiBaseUrl()}/chatbot/conversation/${conversationId}/command`, {
        method: 'POST',
        headers: createHeaders(token),
        body: JSON.stringify({ type, payload }),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  connectToSocketIo: async ({ token, conversationId }: ConnectToSocketIoParams) => {
    try {
      const response = await fetch(`${apiBaseUrl()}/chatbot/socket.io?conversationId=${conversationId}`, {
        method: 'GET',
        headers: createHeaders(token),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  destinationSearch: async ({ token, params, locale = 'en' }: DestinationSearchParams) => {
    const query = new URLSearchParams(params as any).toString();
    try {
      const response = await fetch(`${apiBaseUrl()}/destination/search?${query}`, {
        method: 'GET',
        headers: {
          ...createHeaders(token),
          'X-Locale': locale,
        },
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  destinationGeocode: async ({ token, query, booking = false }: DestinationGeocodeParams) => {
    try {
      const response = await fetch(`${apiBaseUrl()}/destination/geocode?query=${query}&booking=${booking}`, {
        method: 'GET',
        headers: createHeaders(token),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  createEvent: async ({ token, event, platform, origin, pseudoUserId, sessionId }: CreateEventParams) => {
    try {
      const headers: Record<string, string> = createHeaders(token);

      if (platform) {
        headers['X-Platform'] = platform;
      }
      if (origin) {
        headers['X-Origin'] = origin;
      }
      if (pseudoUserId) {
        headers['X-Pseudo-User-Id'] = pseudoUserId;
      }
      if (sessionId) {
        headers['X-Session-Id'] = sessionId;
      }

      const response = await fetch(`${apiBaseUrl()}/event`, {
        method: 'POST',
        headers,
        body: JSON.stringify(event),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  flightPrediction: async ({ token, fromIata, toIata, date }: FlightPredictionParams) => {
    try {
      const response = await fetch(`${apiBaseUrl()}/flight-prediction/${fromIata}/${toIata}/${date}`, {
        method: 'GET',
        headers: createHeaders(token),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  hotelSearch: async ({ token, params }: HotelSearchParams) => {
    const query = new URLSearchParams(params as any).toString();
    try {
      const response = await fetch(`${apiBaseUrl()}/hotel/search?${query}`, {
        method: 'POST',
        headers: createHeaders(token),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  resolveSelfIp: async ({ token }: { token: string }) => {
    try {
      const response = await fetch(`${apiBaseUrl()}/ip`, {
        method: 'GET',
        headers: createHeaders(token),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  resolveIp: async ({ token, ip }: ResolveIpParams) => {
    try {
      const response = await fetch(`${apiBaseUrl()}/ip/${ip}`, {
        method: 'GET',
        headers: createHeaders(token),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  createItinerary: async ({ token, itinerary, locale = 'en' }: CreateItineraryParams) => {
    try {
      const response = await fetch(`${apiBaseUrl()}/itinerary`, {
        method: 'POST',
        headers: {
          ...createHeaders(token),
          'X-Locale': locale,
        },
        body: JSON.stringify(itinerary),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  relatedItinerary: async ({ token, userAgent, itineraryId, locale = 'en' }: RelatedItineraryParams) => {
    try {
      const response = await fetch(`${apiBaseUrl()}/itinerary/related`, {
        method: 'POST',
        headers: {
          ...createHeaders(token),
          'X-Locale': locale,
        },
        body: JSON.stringify({ userAgent, itineraryId }),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getCachedItinerary: async ({ token, query, locale = 'en' }: GetCachedItineraryParams) => {
    try {
      const response = await fetch(`${apiBaseUrl()}/itinerary/cached`, {
        method: 'POST',
        headers: {
          ...createHeaders(token),
          'X-Locale': locale,
        },
        body: JSON.stringify({ query }),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getItineraryByUuid: async ({ token, uuid }: GetItineraryByUuidParams) => {
    try {
      const response = await fetch(`${apiBaseUrl()}/itinerary/${uuid}`, {
        method: 'GET',
        headers: createHeaders(token),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getStatus: async () => {
    try {
      const response = await fetch(`${apiBaseUrl()}/status`, {
        method: 'GET',
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getHealth: async () => {
    try {
      const response = await fetch(`${apiBaseUrl()}/status/health`, {
        method: 'GET',
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getOpenApiJson: async () => {
    try {
      const response = await fetch(`${apiBaseUrl()}/partner/openapi.json`, {
        method: 'GET',
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getOpenApiYaml: async () => {
    try {
      const response = await fetch(`${apiBaseUrl()}/partner/openapi.yaml`, {
        method: 'GET',
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  createUser: async ({ token, user }: CreateUserParams) => {
    try {
      const response = await fetch(`${apiBaseUrl()}/user`, {
        method: 'POST',
        headers: createHeaders(token),
        body: JSON.stringify(user),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getVideo: async ({ token, id }: GetVideoParams) => {
    try {
      const response = await fetch(`${apiBaseUrl()}/video/${id}`, {
        method: 'GET',
        headers: createHeaders(token),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getVideoSimilarity: async ({ token, id, months, maxVisuallySimilarVideos }: GetVideoSimilarityParams) => {
    const query = new URLSearchParams({ months: months?.join(','), maxVisuallySimilarVideos } as any).toString();
    try {
      const response = await fetch(`${apiBaseUrl()}/video/${id}/similarity?${query}`, {
        method: 'GET',
        headers: createHeaders(token),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },
};

export default apiService;
