# AdTech - Campaign Management Platform

A professional Next.js-based advertising campaign management system with MongoDB integration. This platform allows users to create, manage, and analyze advertising campaigns with real-time performance metrics.

## 📸 Screenshots

### 🖥️ Desktop

#### Dashboard
![Dashboard Desktop](public/screenshots/dashboard_desk.png)

#### All Campaigns
![All Campaigns Desktop](public/screenshots/all_campaigns_desk.png)

#### Campaign Details
![Campaign Details Desktop](public/screenshots/campaign_details_desk.png)

#### Create Campaign
![Create Campaign Desktop](public/screenshots/create_campaign_desk.png)

---

### 📱 Mobile

#### Dashboard
![Dashboard Mobile](public/screenshots/dashboard_mobile.png)

#### All Campaigns
![All Campaigns Mobile](public/screenshots/all_campaigns_mobile.png)

#### Campaign Details
![Campaign Details Mobile](public/screenshots/campaign_details_mobile.png)

#### Create Campaign
![Create Campaign Mobile](public/screenshots/create_campaing_mobile.png)


## Features

- **Campaign Management**: Create, edit, pause, and finish advertising campaigns
- **Real-time Analytics**: Track CTR (Click-Through Rate), CPC (Cost Per Click), impressions, and clicks
- **Responsive Design**: Fully responsive UI optimized for desktop, tablet, and mobile
- **Professional UI**: Clean, modern interface with ergonomic design
- **Toast Notifications**: User feedback for all operations
- **RESTful API**: Comprehensive API endpoints for campaign operations
- **Data Validation**: Client and server-side validation for data integrity

## Tech Stack

- **Frontend**: Next.js 15+ (React 19+)
- **Backend**: Node.js with Next.js Route Handlers
- **Database**: MongoDB
- **Styling**: Tailwind CSS + Shadcn/UI
- **Icon Library**: Lucide React
- **State Management**: React hooks + SWR-ready architecture

## Project Structure

```
├── app/
│   ├── api/
│   │   └── campaigns/          # Campaign API endpoints
│   │       ├── route.ts        # GET /campaigns, POST /campaigns
│   │       ├── [id]/
│   │       │   ├── route.ts    # GET, PATCH campaign
│   │       │   └── stats/route.ts  # Campaign statistics
│   ├── campaigns/
│   │   ├── page.tsx            # Campaigns list page
│   │   ├── new/page.tsx        # Create campaign page
│   │   └── [id]/page.tsx       # Campaign detail page
│   ├── page.tsx                # Home/dashboard page
│   ├── layout.tsx              # Root layout with sidebar
│   └── globals.css             # Global styles with zinc theme
├── components/
│   ├── sidebar.tsx             # Main navigation sidebar
│   ├── campaign-list.tsx       # Campaign list component
│   ├── campaign-card.tsx       # Individual campaign card
│   ├── campaign-form.tsx       # Create/edit campaign form
│   ├── campaign-detail.tsx     # Campaign detail view
│   ├── toast.tsx               # Toast notification component
│   ├── toast-provider.tsx      # Toast context provider
│   ├── layout-wrapper.tsx      # Main layout wrapper
│   └── ui/                     # Shadcn UI components
├── lib/
│   ├── db.ts                   # MongoDB connection
│   ├── types.ts                # TypeScript types
│   └── services/
│       └── campaign.service.ts # Campaign business logic
├── .env.example                # Environment variables template
└── package.json
```

## Installation & Setup

### 1. Clone & Install Dependencies

```bash
# Install dependencies
npm install

# Or using yarn/pnpm
yarn install
pnpm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then update `.env.local` with your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/adtech?retryWrites=true&w=majority
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Getting MongoDB Connection String:**
- Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster (free tier available)
- Get your connection string from Connect → Drivers
- Replace username:password with your credentials

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Campaigns

#### List Campaigns
```http
GET /api/campaigns?page=1&limit=10
```
**Query Parameters:**
- `page` (optional): Page number, default 1
- `limit` (optional): Items per page, default 10

**Response:**
```json
{
  "success": true,
  "data": {
    "campaigns": [...],
    "total": 42,
    "page": 1,
    "pages": 5
  }
}
```

#### Create Campaign
```http
POST /api/campaigns
Content-Type: application/json

{
  "name": "Summer Sale 2024",
  "advertiser": "Acme Corp",
  "budget": 5000,
  "startDate": "2024-06-01T00:00:00Z",
  "endDate": "2024-08-31T23:59:59Z",
  "status": "active"
}
```

#### Get Campaign Details
```http
GET /api/campaigns/{id}
```

#### Update Campaign Status
```http
PATCH /api/campaigns/{id}
Content-Type: application/json

{
  "status": "paused"
}
```

#### Update Campaign Stats
```http
PATCH /api/campaigns/{id}
Content-Type: application/json

{
  "impressions": 50000,
  "clicks": 1500
}
```

#### Get Campaign Statistics
```http
GET /api/campaigns/{id}/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "campaign": {...},
    "stats": {
      "ctr": 3.00,
      "cpc": 2.50,
      "totalImpressions": 50000,
      "totalClicks": 1500,
      "remainingBudget": 1250.00
    }
  }
}
```

## Data Models

### Campaign
```typescript
{
  _id: ObjectId
  name: string
  advertiser: string
  budget: number
  startDate: Date
  endDate: Date
  status: 'active' | 'paused' | 'finished'
  impressions: number
  clicks: number
  createdAt: Date
  updatedAt: Date
}
```

### Campaign Stats
```typescript
{
  ctr: number           // Click-Through Rate (%)
  cpc: number          // Cost Per Click ($)
  totalImpressions: number
  totalClicks: number
  remainingBudget: number
}
```

## Key Features Implementation

### 1. Sidebar Navigation
- Fixed left sidebar with campaign management navigation
- Active page highlighting
- Logo and branding area
- Responsive collapse on mobile (can be enhanced)

### 2. Campaign Management
- Create campaigns with validation
- View campaign list with pagination
- View detailed campaign statistics
- Pause/resume/finish campaigns
- Update impressions and clicks

### 3. Analytics Dashboard
- Real-time CTR calculation
- Cost Per Click (CPC) metrics
- Remaining budget tracking
- Performance visualization (ready for charts)

### 4. Form Validation
- Client-side validation for all inputs
- Budget validation (> 0)
- Date validation (end > start)
- Server-side validation for data integrity
- Toast notifications for user feedback

### 5. Toast Notifications
- Success, error, info, and warning types
- Auto-dismiss after 3 seconds
- Manual dismiss option
- Color-coded by type

## Styling & Design

### Color Scheme (Zinc Primary)
- **Primary**: `#000000` (zinc-900)
- **Secondary**: `#F7F7F7` (zinc-50)
- **Accent**: `#F4F4F5` (zinc-100)
- **Muted**: `#A1A1AA` (zinc-400)
- **Destructive**: `#EF4444` (red-500)

### Typography
- **Headings**: Geist Sans (bold, 24-48px)
- **Body**: Geist Sans (400-600, 14-16px)
- **Spacing**: Tailwind scale (4px base unit)

### Components
- Responsive grid layouts
- Flexbox for alignment
- Shadcn/UI components with custom styling
- Lucide React icons

## Technical Decisions

### Why Next.js?
- Full-stack capabilities (API routes + frontend)
- Server Components for performance
- Built-in optimization (Image, Font, Code Splitting)
- Great DX with file-based routing
- Easy deployment on Vercel

### Why MongoDB?
- Flexible schema for campaign data
- Easy to scale horizontally
- JSON-like documents match JavaScript objects
- Efficient indexing for queries

### Why Shadcn/UI?
- Highly customizable component library
- Built on Radix UI primitives (accessibility)
- Dark mode support ready
- Copy-paste components approach

### API Structure
- RESTful endpoints with HTTP standards
- Clear separation of concerns (services, routes)
- Pagination support for scalability
- Consistent response format

## Future Enhancements

### Short Term
1. **Charts & Graphs**: Add Recharts for campaign performance visualization
2. **Filtering & Sorting**: Campaign list filtering by status, date, advertiser
3. **Bulk Actions**: Select multiple campaigns for batch operations
4. **Export Data**: CSV export for campaign data and statistics
5. **Search**: Full-text search for campaigns

### Medium Term
1. **Authentication**: User accounts and campaign ownership
2. **Roles & Permissions**: Admin and advertiser roles
3. **Team Collaboration**: Share campaigns with team members
4. **Audit Logs**: Track all campaign changes
5. **Notifications**: Email alerts for campaign milestones

### Long Term
1. **Advanced Analytics**: Predictive analytics and recommendations
2. **A/B Testing**: Test different campaign variations
3. **Budget Optimization**: AI-powered budget allocation
4. **Multi-channel Support**: Web, CTV, Mobile channel management
5. **Integration API**: Third-party integrations (GA, Facebook, etc.)

## Performance Optimization

### Implemented
- Server Components for faster initial load
- Image optimization (Shadcn uses optimized icons)
- CSS-in-JS with Tailwind (critical CSS inlined)
- API pagination to limit data transfer

### Potential Improvements
- Add caching headers to API responses
- Implement database indexing on frequently queried fields
- Use ISR (Incremental Static Regeneration) for campaign list
- Add client-side caching with SWR
- Implement virtual scrolling for large lists

## Security Considerations

### Current Implementation
- Input validation on client and server
- Error messages don't leak sensitive data
- MongoDB connection uses secure URI
- No authentication required (as per requirements)

### Production Recommendations
1. Add rate limiting to API endpoints
2. Implement authentication (OAuth2, JWT)
3. Add CORS configuration
4. SQL injection prevention (parameterized queries - MongoDB uses prepared statements)
5. XSS protection with Next.js built-in security headers
6. Environment variables never exposed to client
7. Input sanitization for all form fields

## Testing Strategy

### Unit Tests (To Be Added)
- Campaign service functions
- Calculation functions (CTR, CPC)
- Validation functions

### Integration Tests (To Be Added)
- API endpoints with mock database
- Campaign creation workflow
- Status update flows

### E2E Tests (To Be Added)
- Complete campaign creation to detail view
- Campaign status transitions
- Form validation flows

## Deployment



### Docker
```bash
docker build -t adtech .
docker run -p 3000:3000 adtech
```

### Environment Setup for Production
- Set `NODE_ENV=production`
- Configure production MongoDB URI
- Set secure random secrets for cookies (if added)
- Enable HTTPS only

## Troubleshooting

### Database Connection Issues
**Error**: `Invalid/missing environment variable: MONGODB_URI`
- Ensure `.env.local` file exists
- Check MongoDB connection string format
- Verify IP whitelist in MongoDB Atlas



### Form Validation Failing
**Error**: Toast showing validation error
- Ensure all required fields are filled
- Budget must be greater than 0
- End date must be after start date
- Check browser console for detailed errors



## Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Examine component implementations
4. Check browser console for errors

---

**Created with Next.js 15, React 19, and Modern Web Standards**


