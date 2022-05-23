import StoreHeading from "@/components/StoreHeading";
import ProductListings from "@/components/ProductListings";
import { getAllProductsInCollection } from "@/lib/shopify";
import axios from "axios";

function IndexPage({ products }) {
  return (
    <div className="mx-auto max-w-6xl">
      <StoreHeading />
      <ProductListings products={products} />
    </div>
  );
}

export const products = [
  {
    node: {
      id: 1,
      handle: "test",
      title: "titleTest",
      description: "desc",
      variants: {
        edges: [{ node: { id: 123, price: 100, title: "edge1" } }],
      },
      images: {
        edges: [
          {
            node: {
              id: 1,
              originalSrc: "http://localhost:1337/uploads/2_fec749f9b0.png",
              height: 960,
              width: 640,
              altText: "",
            },
          },
        ],
      },
    },
  },
  {
    node: {
      id: 2,
      handle: "test2",
      title: "titleTest2",
      description: "desc22",
      variants: {
        edges: [
          { node: { id: 123, price: 250, title: "edge1" } },
          { node: { id: 123, price: 1234, title: "edge2" } },
        ],
      },
      images: {
        edges: [
          {
            node: {
              id: 1,
              originalSrc:
                "http://localhost:1337/uploads/1640713812478_06e7ed253c.jpeg",
              height: 1078,
              width: 1078,
              altText: "",
            },
          },
        ],
      },
    },
  },
];

export const getProducts = async () => {
  const { data } = await axios.get(
    "http://localhost:1337/api/products?populate=*"
  );

  const temp2 = data.data.map((item) => {
    return {
      node: {
        id: item.id,
        handle: item.attributes.handle,
        title: item.attributes.title,
        description: item.attributes.description,
        variants: {
          edges: item.attributes.variants.data.map((item) => {
            return {
              node: {
                id: item.id,
                price: item.attributes.price,
                title: item.attributes.title,
              },
            };
          }),
        },
        images: {
          edges: item.attributes.image.data.map((item) => {
            return {
              node: {
                id: item.id,
                height: item.attributes.height,
                width: item.attributes.width,
                originalSrc: `http://localhost:1337${item.attributes.url}`,
              },
            };
          }),
        },
      },
    };
  });

  return temp2;
};

export async function getStaticProps() {
  // const products = await getAllProductsInCollection()
  const products = await getProducts();
  console.log(products[0].node.variants.edges[0]);

  return {
    props: {
      products,
    },
  };
}

export default IndexPage;
