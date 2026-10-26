import { IGeocodeParams, IGeocodingResponse } from '@/interfaces/geocoding.interface';
import { BASE_PATH } from "@/lib/basePath";

class GeocodingService {
  async geocode(params: IGeocodeParams): Promise<IGeocodingResponse> {
    const response = await fetch(`${BASE_PATH}/api/geocode?query=${encodeURIComponent(params.query)}&type=${params.type}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch geocoding data');
    }

    return response.json();
  }
}

export const geocodingService = new GeocodingService();
