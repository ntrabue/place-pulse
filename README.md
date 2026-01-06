# Place Pulse

Find businesses with missing or underperforming websites to target as potential web service clients.

## Features

- **Search by Location**: Enter city, state, and radius to find nearby businesses
- **Industry Filter**: 26 pre-filled industries with the option of searching for one with free text.
- **Multiple View Modes**: View results in Table or Cards format with photos
- **Export Functionality**: Download results as CSV or JSON
- **Business Details**:
  - Name, address, and location coordinates
  - Phone numbers and websites
  - Ratings and review counts
  - Photos and opening hours
  - Business status
- **Secure API**: Server-side API routes keep your Google API key secure

## Tech Stack

- **Next.js 16** - React framework with App Router and API routes
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Google Places API** - Business data (Text Search + Place Details)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Google Cloud account with Places API enabled

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up your Google Places API key:

   ```bash
   cp .env.example .env
   ```

4. Open `.env` and add your API key:

   ```
   GOOGLE_PLACES_API_KEY=your_api_key_here
   ```

5. Start the development server:

   ```bash
   pnpm dev
   ```

6. Open your browser to `http://localhost:3000`

## Getting a Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Places API (New)
   - Maps JavaScript API
   - Geocoding API
4. Create credentials (API Key)
5. Copy the API key to your `.env` file

## Usage

1. Choose an industry from the dropdown (focused on high-revenue businesses like law firms, medical practices, and home services contractors)
2. Optionally expand "Location Settings" to set your city/state and search radius (defaults to 15 miles)
3. Click "Search" to find businesses
4. Switch between Table and Cards view to browse results
5. Export results as CSV or JSON for outreach campaigns

## Target Industries

The app focuses on high-revenue service businesses that are ideal clients for web services:

- **Legal**: Law firms and attorneys
- **Medical & Healthcare**: Doctors, dentists, physical therapists, chiropractors, veterinarians
- **Home Services**: Plumbers, electricians, roofers, HVAC, general contractors, painters, landscapers, pest control, moving companies, and more
- **Professional Services**: Accounting firms, real estate agencies, insurance agencies
- **Auto Services**: Auto repair and body shops
- **Premium Personal Services**: Spas and beauty salons

## Future Enhancements

- Map view with Mapbox integration
- Website analysis (responsive, performance, Facebook links)
- Filter by businesses without websites
- Save search history
- Batch processing for multiple locations

## License

MIT
