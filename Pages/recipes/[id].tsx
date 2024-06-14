// pages/recipes/[id].tsx

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Recipe } from '../../types';
import receitas from '../../data/recipes.json';

interface RecipeProps {
  recipe: Recipe;
}

const RecipeDetail: React.FC<RecipeProps> = ({ recipe }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} style={{ width: '400px' }} />
      <h2>Ingredientes</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instruções</h2>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = receitas.map((recipe) => ({
    params: { id: recipe.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const recipeId = params?.id;
  const recipe = receitas.find((r) => r.id === recipeId);

  if (!recipe) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recipe,
    },
    revalidate: 1, // Regenerate page every second for incremental static regeneration
  };
};

export default RecipeDetail;
