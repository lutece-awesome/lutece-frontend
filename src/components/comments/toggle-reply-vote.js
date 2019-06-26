import ApolloProvider from '@/plugins/essential/apollo-provider';
import gql from '@/plugins/essential/graphql-tag';

const mutation = gql`
    mutation ToggleReplyVote($pk: ID!){
        toggleReplyVote(pk:$pk){
            state
        }
    }
`;

const toggleReplyVote = pk => ApolloProvider.defaultClient.mutate({
	mutation,
	variables: { pk },
});

export default toggleReplyVote;
