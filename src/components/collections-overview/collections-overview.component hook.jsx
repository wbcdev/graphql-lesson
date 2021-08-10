import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
 
import CollectionPreview from '../collection-preview/collection-preview.component';
import Spinner from '../spinner/spinner.component';
import './collections-overview.styles.scss';
 
const GET_COLLECTIONS = gql`
  query {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;
 
const CollectionsOverview = () => {
  const { loading, error, data } = useQuery(GET_COLLECTIONS);
 
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return `Error! ${error.message}`;
  }
 
  return (
    <div className='collections-overview'>
      {data.collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};
 
export default CollectionsOverview;