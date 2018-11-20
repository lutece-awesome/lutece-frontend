// Delegate request to Apollo provider, used this middleware to maintain global loading state.
const ApolloProxy = ({ route, gql, variables }) => {
	console.log(route, gql, variables);
};


export default ApolloProxy;
