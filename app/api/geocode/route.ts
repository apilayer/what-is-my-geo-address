import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  const type = searchParams.get('type') || 'forward';

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  const apiKey = process.env.POSITIONSTACK_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: 'Positionstack API Key is not configured on the server' }, { status: 500 });
  }

  try {
    const endpoint = type === 'reverse' ? 'reverse' : 'forward';
    const apiUrl = `http://api.positionstack.com/v1/${endpoint}?access_key=${apiKey}&query=${encodeURIComponent(query)}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok || data.error) {
      console.error('Positionstack API Error:', data.error);
      return NextResponse.json(
        { error: data.error?.message || 'Failed to fetch geocoding data' }, 
        { status: response.status !== 200 ? response.status : 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Geocoding Proxy Error:', error);
    return NextResponse.json({ error: 'Internal server error during geocoding' }, { status: 500 });
  }
}
