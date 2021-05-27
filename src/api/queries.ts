import { gql } from '@apollo/client';
export const Buildings = gql`
    # Write your query or mutation here
    query {
        Buildings {
            id
            name
            meetingRooms {
                id
                name
                floor
                meetings {
                    id
                    title
                    date
                    startTime
                    endTime
                    meetingRoom {
                        name
                        floor
                        building {
                            name
                        }
                    }
                }
                building {
                    id
                    name
                }
            }
        }
    }
`;
export const MeetingRooms = gql`
    query {
        MeetingRooms {
            id
            name
            floor
            building {
                id
                name
            }
            meetings {
                id
                title
                date
                startTime
                endTime
            }
        }
    }
`;
export const Meetings = gql`
    query {
        Meetings {
            id
            title
            date
            startTime
            endTime
            meetingRoom {
                id
                name
                floor
                building {
                    id
                    name
                }
            }
        }
    }
`;
