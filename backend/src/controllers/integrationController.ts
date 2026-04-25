import { Request, Response } from 'express';
import { google } from 'googleapis';
import axios from 'axios';
import Business from '../models/Business.js';

const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirect: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/integration/google/callback`,
};

const createGoogleAuthClient = () => {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
};

export const googleAuth = (req: Request, res: Response) => {
  const auth = createGoogleAuthClient();
  const url = auth.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/userinfo.email'],
    state: (req as any).user.businessId.toString(),
  });
  res.json({ url });
};

export const googleCallback = async (req: Request, res: Response) => {
  const { code, state } = req.query;
  const auth = createGoogleAuthClient();
  const { tokens } = await auth.getToken(code as string);

  await Business.findByIdAndUpdate(state as string, {
    $set: {
      'integrations.googleMeet': {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      }
    }
  });

  res.send('Google Meet connected successfully! You can close this window.');
};

// Zoom implementation would follow a similar pattern with axios to Zoom OAuth endpoints
export const zoomAuth = (req: Request, res: Response) => {
  const businessId = (req as any).user.businessId;
  const zoomUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.ZOOM_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.BACKEND_URL || 'http://localhost:5000')}/api/integration/zoom/callback&state=${businessId}`;
  res.json({ url: zoomUrl });
};

export const zoomCallback = async (req: Request, res: Response) => {
  const { code, state } = req.query;

  try {
    const response = await axios.post('https://zoom.us/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/integration/zoom/callback`,
      },
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64')}`,
      },
    });

    const { access_token, refresh_token } = response.data;
    await Business.findByIdAndUpdate(state as string, {
      $set: {
        'integrations.zoom': {
          accessToken: access_token,
          refreshToken: refresh_token,
        }
      }
    });

    res.send('Zoom connected successfully! You can close this window.');
  } catch (err: any) {
    res.status(500).send('Error connecting Zoom');
  }
};
