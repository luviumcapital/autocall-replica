# Autocall Replica

A comprehensive Autocall.ai-like system built with modern technologies including Twilio, Railway, Supabase, MongoDB, Brevo, and TySolid.

## Architecture Overview

### Core Components

- **Twilio**: Voice calling, SMS capabilities, and webhook integration
- **Railway**: Deployment and hosting for Node.js/Express backend
- **Supabase**: PostgreSQL database with built-in authentication
- **MongoDB**: NoSQL database for unstructured call data and analytics
- **Brevo**: Email transactional services and templates
- **TySolid**: Frontend framework for reactive UI components
- **APIVault & Bytebot**: Free API integrations for phone validation and data enrichment

## Project Structure

```
autocall-replica/
├── server.js                 # Express server entry point
├── package.json              # Project dependencies
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore configuration
└── frontend/
    ├── src/
    │   ├── components/       # TySolid components
    │   ├── pages/            # Page components
    │   └── App.tsx          # Main app component
    └── package.json          # Frontend dependencies
```

## Prerequisites

- Node.js 16+ and npm/yarn
- Git
- Accounts on: Twilio, Railway, Supabase, MongoDB Atlas, Brevo, GitHub

## Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/luviumcapital/autocall-replica.git
cd autocall-replica
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` with your credentials from each service:

```env
# Twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_key

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/autocall

# Brevo
BREVO_API_KEY=your_api_key
BREVO_SENDER_EMAIL=no-reply@example.com

# Additional APIs
APIVAULT_KEY=your_apivault_key
```

## Service Setup Guide

### Twilio Setup

1. Create account at [twilio.com](https://www.twilio.com)
2. Get your Account SID and Auth Token from Dashboard
3. Configure a phone number for voice calls
4. Set webhook URL in Twilio Console to `https://your-railway-app.railway.app/call-handler`

### Supabase Setup

1. Create project at [supabase.com](https://supabase.com)
2. Navigate to SQL Editor and run:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

3. Enable Authentication (Email/Password)
4. Get your project URL and API key

### MongoDB Setup

1. Create cluster at [mongodb.com/cloud](https://www.mongodb.com/cloud)
2. Create collections:
   - `call_logs`
   - `call_recordings`

### Brevo Setup

1. Sign up at [brevo.com](https://www.brevo.com)
2. Generate API key from Settings
3. Create email templates for transactional emails

### Railway Setup

1. Create account at [railway.app](https://railway.app)
2. Connect GitHub repository
3. Add environment variables from `.env`
4. Deploy automatically on git push

## Running Development Server

```bash
npm run dev
```

Server will start on `http://localhost:3000`

## API Endpoints

### Voice

- `POST /call-handler` - Twilio webhook for incoming calls
- `POST /api/calls/make` - Initiate outbound call
- `GET /api/calls/:id` - Get call details

### Database

- `GET /api/campaigns` - List campaigns
- `POST /api/campaigns` - Create campaign
- `GET /api/analytics` - Call analytics

## Frontend Setup (TySolid)

```bash
cd frontend
npm install
npm run dev
```

## Database Schema

### Supabase (PostgreSQL)

- `users` - User accounts and authentication
- `campaigns` - Call campaigns
- `contacts` - Contact lists
- `call_templates` - Pre-configured call scripts

### MongoDB

- `call_logs` - Detailed call records
- `call_recordings` - Recording metadata
- `analytics` - Aggregated statistics

## Deployment

### Railway Deployment

1. Connect GitHub repo to Railway
2. Set environment variables
3. Deploy triggers on git push

### Configuration

Railway will auto-detect Node.js and:
- Install dependencies
- Build (if needed)
- Start with `npm start`

## Testing

```bash
# Health check
curl http://localhost:3000/health

# Make test call
curl -X POST http://localhost:3000/api/calls/make \
  -H "Content-Type: application/json" \
  -d '{"to": "+1234567890", "message": "Hello"}'
```

## Security

- Never commit `.env` file
- Use strong API keys
- Enable Supabase Row Level Security (RLS)
- Use environment variables for all secrets
- Validate all webhook signatures from Twilio

## Troubleshooting

### Connection Issues

- Verify all API keys in `.env`
- Check Railway logs: `railway logs`
- Test Twilio webhook URL directly

### Database Issues

- Verify MongoDB connection string
- Check Supabase network settings
- Ensure tables exist in Supabase

## Cost Optimization

- Twilio: Pay-as-you-go (~$0.0085/min voice)
- Railway: Free tier available (~$5/month for production)
- Supabase: Generous free tier (500MB database)
- MongoDB Atlas: Free tier (512MB storage)
- Brevo: Free tier (300 emails/day)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push and open a pull request

## License

MIT

## Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/luviumcapital/autocall-replica/issues)
- Documentation: See `/docs` folder

## Roadmap

- [ ] Advanced call scripting
- [ ] AI-powered call analysis
- [ ] Real-time dashboard analytics
- [ ] Multi-language support
- [ ] Advanced reporting
- [ ] Team collaboration features
