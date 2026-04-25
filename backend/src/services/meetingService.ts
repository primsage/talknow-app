import { google } from 'googleapis';
import axios from 'axios';

export const createGoogleMeet = async (accessToken: string, refreshToken: string, startTime: Date, endTime: Date, summary: string) => {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  auth.setCredentials({ access_token: accessToken, refresh_token: refreshToken });

  const calendar = google.calendar({ version: 'v3', auth });
  const event = {
    summary,
    start: { dateTime: startTime.toISOString() },
    end: { dateTime: endTime.toISOString() },
    conferenceData: {
      createRequest: { requestId: Math.random().toString(36).substring(7), conferenceSolutionKey: { type: 'hangoutsMeet' } },
    },
  };

  const res = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: event,
    conferenceDataVersion: 1,
  });

  return res.data.hangoutLink;
};

export const createZoomMeeting = async (accessToken: string, startTime: Date, duration: number, topic: string) => {
  const res = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
    topic,
    type: 2,
    start_time: startTime.toISOString(),
    duration,
    settings: {
      join_before_host: true,
      jbh_time: 0,
    }
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data.join_url;
};
