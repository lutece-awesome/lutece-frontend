import ApolloProvider from '@/plugins/essential/apollo-provider';
import gql from '@/plugins/essential/graphql-tag';

const mutation = gql`
    mutation ToggleArticleVote($pk: ID!){
        toggleArticleVote(pk:$pk){
            state
        }
    }
`;

const toggleArticleVote = pk => ApolloProvider.defaultClient.mutate({
	mutation,
	variables: { pk },
});

export default toggleArticleVote;
