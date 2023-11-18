import { useLoaderData } from 'react-router-dom';

const FeedPage = () => {
  const { response } = useLoaderData();
  console.log(response);

  return (
    <>
      <h1>Feed page</h1>
    </>
  );
};

export default FeedPage;
