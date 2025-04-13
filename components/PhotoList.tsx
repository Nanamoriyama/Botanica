"use client";

import { gql, useQuery } from "@apollo/client";

const GET_PHOTOS = gql`
  query GetPhotos {
    photosCollection(orderBy: [{ created_at: DescNullsLast }]) {
      edges {
        node {
          id
          caption
          image_url
          created_at
        }
      }
    }
  }
`;

export default function PhotoList() {
  const { data, loading, error } = useQuery(GET_PHOTOS);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました：{error.message}</p>;

  const photos = data?.photosCollection?.edges ?? [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {photos.map((photo: any) => (
        <div key={photo.node.id} className="bg-white p-4 rounded shadow">
          <img
            src={photo.node.image_url}
            alt={photo.node.caption}
            className="w-full h-48 object-cover rounded mb-2"
          />
          <p className="text-sm text-gray-700">{photo.node.caption}</p>
        </div>
      ))}
    </div>
  );
}
