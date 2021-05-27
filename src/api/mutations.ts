import gql from 'graphql-tag';

export const createMeeting = gql`
    mutation createMeeting(
        $title: String!
        $date: String!
        $startTime: String!
        $endTime: String!
        $meetingRoomId: ID!
    ) {
        Meeting(
            meetingInput: {
                title: $title
                date: $date
                startTime: $startTime
                endTime: $endTime
            }
            meetingRoomId: $meetingRoomId
        ) {
            id
            title
            meetingRoom {
                name
                building {
                    name
                }
            }
        }
    }
`;
