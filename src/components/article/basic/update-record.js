import ApolloProvider from '@/plugins/essential/apollo-provider';
import gql from '@/plugins/essential/graphql-tag';

const mutate = gql`
    mutation updateArticleRecord($pk: ID!){
        updateArticleRecord(pk:$pk){
          state
        }
      }
`;

const updateArticleRecord = pk => ApolloProvider.defaultClient.mutate({
	mutation: mutate,
	variables: { pk },
});

export default updateArticleRecord;
