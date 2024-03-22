import React, { useState, useEffect } from 'react';
import { useCatalogContext } from '../hooks/useCatalogContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const CatalogDetails = ({ catalogId }) => {
  const { dispatch } = useCatalogContext();
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await fetch(`/api/catalog/${catalogId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched catalog data:', data); // Log the fetched data
          setCatalog(data);
        } else {
          throw new Error('Failed to fetch catalog details');
        }
      } catch (error) {
        console.error('Error fetching catalog details:', error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCatalog();
  }, [catalogId]);

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/catalog/' + catalog._id, {
        method: 'DELETE'
      });

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'DELETE_CATALOG', payload: catalog._id });
      } else {
        throw new Error('Failed to delete catalog');
      }
    } catch (error) {
      console.error('Error deleting catalog:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!catalog) {
    return <div>Error: Catalog details not found</div>;
  }

  return (
    <div className="catalog-details">
      <h4>{catalog.structureType}</h4>
      <p><strong>User ID: </strong>{catalog.userId}</p>
      {catalog.createdAt && (
        <p>Created {formatDistanceToNow(new Date(catalog.createdAt), { addSuffix: true })}</p>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CatalogDetails;
