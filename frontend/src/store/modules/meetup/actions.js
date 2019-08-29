export function listMeetupRequest(meetupId) {
  return {
    type: '@meetup/LIST_MEETUP_REQUEST',
    payload: meetupId,
  };
}

export function updateMeetupRequest(data, meetupId) {
  return {
    type: '@meetup/UPDATE_MEETUP_REQUEST',
    payload: { data, meetupId },
  };
}

export function updateMeetupSuccess(meetup) {
  return {
    type: '@meetup/UPDATE_MEETUP_SUCCESS',
    payload: meetup,
  };
}

export function updateMeetupFailure() {
  return {
    type: '@meetup/UPDATE_MEETUP_FAILURE',
  };
}
